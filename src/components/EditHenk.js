import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function EditHenk(props) {
    const[open,setOpen] = useState(false);
    const[henk, setHenk] = useState({
        firstname:"",
        lastname:"",
        streetaddress:"",
        postcode:"",
        city:"",
        email:"",
        phone:"",

    });

    const handleInputChange = (e) => {
        setHenk({ ...henk, [e.target.name]: e.target.value });

      };

      const handleSave = () => {

        props.updateHenk(props.params.value, henk); 
        handleClose();
      }
      const handleClickOpen = () => {
        setHenk( {
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
        console.log(props.params)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      return(
        <div>
        <Button
          size="small"
          color="primary"
          onClick={handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Päivitä auto</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              value={henk.firstname}
              onChange={(e) => handleInputChange(e)}
              label="Firstname"
              fullWidth
            />
            <TextField
              margin="dense"
              name="lastname"
              value={henk.lastname}
              onChange={(e) => handleInputChange(e)}
              label="Lastname"
              fullWidth
            />
            <TextField
              margin="dense"
              name="streetaddress"
              value={henk.streetaddress}
              onChange={(e) => handleInputChange(e)}
              label="Streetaddress"
              fullWidth
            />
            <TextField
              margin="dense"
              name="postcode"
              value={henk.postcode}
              onChange={(e) => handleInputChange(e)}
              label="Postcode"
              fullWidth
            />
            <TextField
              margin="dense"
              name="city"
              value={henk.city}
              onChange={(e) => handleInputChange(e)}
              label="City"
              fullWidth
            />
            <TextField
              margin="dense"
              name="price"
              value={henk.email}
              onChange={(e) => handleInputChange(e)}
              label="Price"
              fullWidth
            />
            <TextField
            margin="dense"
            name="phone"
            value={henk.phone}
            onChange={(e) => handleInputChange(e)}
            label="Phone"
            fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    
}
export default EditHenk;