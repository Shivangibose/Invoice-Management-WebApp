import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle } from '@mui/material';
import axios from 'axios';


const useStyles=makeStyles(()=>({
    
  
    btn: {
      fontSize:'0.7rem',
      width:'50vw',
      padding: '0.5rem',
      color:'#fff',
      border:'1px solid #1b83b1',
      '&:hover':{
          background:"#1b83b1"
         }
      },
        field:{
          background:"#fff",
          fontSize:'0.7rem',
          borderRadius:'0.4rem',
          border:'none'
      }
        
    
   
  }))
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    width:'16vw',
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));
  
  
const EditData=({selected,open,setOpen})=> {
   
    const[invoiceCur,setInvoiceCur]=useState("");
    const[custPayTerms,setCustPayTerms]=useState("");
    

    const classes=useStyles();

    const handleCloseEdit=()=>
    {
        setOpen(false);
    }

    const handleInvoiceCur=(event)=>{
        setInvoiceCur(event.target.value)
     }

     const handleCustPayTerms=(event)=>{
        setCustPayTerms(event.target.value)
     }

     const editPopup=()=>{
      console.log(selected);
      axios.get(`http://localhost:8080/B2B/EditData?InvoiceCurrency=${invoiceCur}&CustomerPaymentTerms=${custPayTerms}&selected=${selected}`);
      setOpen(false); 
    }

  return (
    
       <Dialog open={open} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle sx={{bgcolor:"#283d4a", color:"#fff"}} >Edit</DialogTitle>
        <DialogContent sx={{bgcolor:"#283d4a"}} >
        <Grid container spacing={{ xs: 2, md: 4 }}>
        
        <Grid item xs={6}>
          <Item>
          <TextField className={classes.field} label="Invoice Currency" id="filled-basic" variant='filled' size="small" fullWidth onChange={(event)=>handleInvoiceCur(event)} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <TextField className={classes.field} label="Customer Payment Terms" id="filled-basic" variant='filled' size="small" fullWidth onChange={(event)=>handleCustPayTerms(event)} />
          </Item>
        </Grid>
        
      </Grid>
        </DialogContent>
        <DialogActions sx={{bgcolor:"#283d4a"}} style={{ justifyContent: "space-between" }}>
        <Button className={classes.btn} onClick={editPopup}>EDIT</Button>
          <Button className={classes.btn} onClick={handleCloseEdit}>CANCEL</Button>
        </DialogActions>
      </Dialog>
  )
}

export default EditData;