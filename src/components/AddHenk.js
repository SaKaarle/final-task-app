import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function AddHenk(props) {
  const [open, setOpen] = useState(false);
  const [henk, setHenk] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const handleInputChange = (e) => {
    setHenk({ ...henk, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    props.saveHenk(henk);
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        style={{ margin: "5*" }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Lisää asiakas
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Uusi asiakas</DialogTitle>
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
            name="email"
            value={henk.email}
            onChange={(e) => handleInputChange(e)}
            label="Email"
            fullWidth
          />
          <TextField
            autoFocus
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
export default AddHenk;
