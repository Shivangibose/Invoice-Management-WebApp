import React , {useState} from 'react';
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
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    width:'16vw',
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));
  

const AdvanceSearch=({open,data,setData,setOpen})=> {


    const[docid,setDocId]=useState("");
    const[invoiceid,setInvoiceId]=useState("");
    const[custno,setCustNum]=useState("");
    const[busyear,setBusinessYear]=useState("");

    const classes=useStyles();

    const handleDocId=(event)=>
    {
        setDocId(event.target.value)
    }
    const handleInvoiceId=(event)=>
    {
        setInvoiceId(event.target.value)
    }
    const handleCustNum=(event)=>
    {
        setCustNum(event.target.value)
       }

       const handleBusinessYear=(event)=>
       {
        setBusinessYear(event.target.value)
      }

    const handleCloseAsearch=()=>
    {
        setOpen(false);
    }

    const aSearchShow=()=>{
        axios.get(`http://localhost:8080/B2B/AdvanceSearch?docid=${docid}&invoiceid=${invoiceid}&custno=${custno}&busyear=${busyear}`)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        setOpen(false);
    }
    



  return (
      <Dialog open={open} onClose={handleCloseAsearch} fullWidth maxWidth="sm">
          <DialogTitle className={classes.dTitleContent} >Advance Search</DialogTitle>
           <DialogContent className={classes.dTitleContent} >
           <Grid container spacing={{ xs: 2, md: 3 }}>
        
        <Grid item xs={6}>
          <Item>
          <TextField className={classes.field} label="Document ID" id="filled-basic" variant='filled' size="small" fullWidth onChange={(event)=>handleDocId(event)} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <TextField className={classes.field} label="Invoice ID" id="filled-basic" variant='filled' size="small" fullWidth onChange={(event)=>handleInvoiceId(event)} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <TextField className={classes.field} label="Customer Number" id="filled-basic" variant='filled' size="small" fullWidth onChange={(event)=>handleCustNum(event)} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <TextField className={classes.field} label="Business Year" id="filled-basic" variant='filled' size="small" fullWidth onChange={(event)=>handleBusinessYear(event)} />
          </Item>
        </Grid>
        
      </Grid>
        </DialogContent>
        <DialogActions className={classes.dAction}>
        <Button className={classes.btn} onClick={aSearchShow}>SEARCH</Button>
          <Button className={classes.btn} onClick={handleCloseAsearch}>CANCEL</Button>
        </DialogActions>
      </Dialog>

  )
}

export default AdvanceSearch