import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import EditHenk from "./EditHenk";
import AddHenk from "./AddHenk";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
//ag-theme material on tärkeä, enemmän asetuksia

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";

function CustomerList() {
  const [henk, setHenk] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getHenkilot();
    //console.log(henk)
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getHenkilot = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setHenk(data.content))
      .catch((err) => console.error(err));
    console.log(henk);
  };

  const updateHenk = (link, tiedot) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tiedot),
    })
      .then((_) => getHenkilot())
      .catch((err) => console.error(err));
  };

  const uusHenk = (uusi) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uusi),
    })
      .then((response) => getHenkilot())
      .catch((err) => console.error(err));
  };

  const deleteHenk=(params)=>{
    if (window.confirm("Are you sure?")) {
        //console.log(params.value);
        fetch(params.value, {
          method: "DELETE",
        })
          //response
          .then(_ => getHenkilot())
          .then(_ => handleOpen())
          .catch((err) => console.error(err));
      }
  }

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    // links.[0].href ei toimi, ei tykkää hakasuluist
    {
      headerName: "",
      field: "links.0.href",
      width: 90,
      cellRendererFramework: (params) => (
        <EditHenk updateHenk={updateHenk} params={params} />
      ),
    },
    {
        headerName:"",
        field:"links.0.href",
        width:90,
        cellRendererFramework:(params)=>(
            <IconButton color="secondary" onClick={()=> deleteHenk(params)}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        )
    }
  ];
  //props.saveHenk(AddHenk.js) pitää kutsua että voi kutsua uusHenk
  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AddHenk saveHenk={uusHenk} />

        <AgGridReact
          rowData={henk}
          columnDefs={columns}
          pagination="true"
          paginationPageSize="10"
        ></AgGridReact>
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        message="Päivitys suoritettu onnistuneesti"
      />
    </div>
  );
}
export default CustomerList;
