import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogContentText } from '@material-ui/core';
import { DialogTitle } from '@mui/material';
import axios from 'axios';


const useStyles=makeStyles(()=>({
  
    btnd: {
      fontSize:'0.7rem',
      width:'50vw',
      padding: '0.5rem',
      color:'#fff',
      border:'1px solid #1b83b1',
      '&:hover':{
          background:"#1b83b1"
         }
      },
      fontCol:{
          color:'#fff'
      },
      dTitleContent:{
        backgroundColor:"#283d4a",
        color:"#fff"
      },
      dAction:{
        backgroundColor:"#283d4a",
        justifyContent: "space-between"
        
      }
   
  }))
  

const DeleteData=({open,setOpen, selected})=> {

    const classes=useStyles();

    const handleCloseDelete=()=>
    {
        setOpen(false);
    }

    const handleDelete=()=>{
      axios.get(`http://localhost:8080/B2B/DeleteData?selected=${selected}`);
      setOpen(false);
    }
   
  return (
    
    <Dialog open={open} onClose={handleCloseDelete} fullWidth maxWidth="xs">
          <DialogTitle className={classes.dTitleContent}>Delete Records ?</DialogTitle>
           <DialogContent className={classes.dTitleContent} >
           <DialogContentText id="alert-dialog-description" className={classes.fontCol}>
            Are you sure you want to delete these record[s] ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dAction} >
        <Button className={classes.btnd} onClick={handleDelete}>Delete</Button>
          <Button className={classes.btnd} onClick={handleCloseDelete}>CANCEL</Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteData