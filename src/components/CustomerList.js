import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import EditHenk from './EditHenk';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
//ag-theme material on tärkeä, enemmän asetuksia

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";

function CustomerList() {
    const[henk, setHenk] = useState([]);
    const[open, setOpen] = React.useState(false);

    useEffect(()=>{
        getHenkilot();
        //console.log(henk)
    },[]);

    const handleOpen=()=>{
        setOpen(true);
    };
    const handleClose=()=>{
        setOpen(false);
    };
    
    const getHenkilot = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then((response) => response.json())
        .then((data) => setHenk(data.content))
        .catch((err) => console.error(err));
        console.log(henk)
    };

    const updateHenk = (link,tiedot) =>{

        fetch(link, {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tiedot)
        })
        .then(_=>getHenkilot())
        .catch((err)=>console.error(err));
    }

const columns = [

    {field: "firstname",sortable:true,filter:true},
    {field: "lastname",sortable:true,filter:true},
    {field: "streetaddress",sortable:true,filter:true},
    {field: "postcode",sortable:true,filter:true},
    {field: "city",sortable:true,filter:true},
    {field: "email",sortable:true,filter:true},
    {field: "phone",sortable:true,filter:true},

    {

        headerName: "",
        field: "_links.self.href",
        width: 90,
        cellRendererFramework: (params) => ( <EditHenk updateHenk={updateHenk} params={params}/>
        ),
  
      },

]

return(
    <div> 
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
    <AgGridReact
    rowData={henk}
    columnDefs={columns}
    pagination="true"
    paginationPageSize="10"
    ></AgGridReact>

    </div>
    <Snackbar open={open}
    onClose={handleClose}
    autoHideDuration={2500}
    message="Test"/>

    </div>
)
    
}
export default CustomerList;