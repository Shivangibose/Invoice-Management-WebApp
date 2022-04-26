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
import { Typography } from '@material-ui/core';



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
      ,
      typo:
      {
          color:'#fff',
          fontSize:'0.8rem',
          marginBottom:'0.5rem'
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
    marginBottom:'0.5rem',
    color: theme.palette.text.primary,
  }));
  
  const AnalyticsView=({open,setOpen})=> 
  {
    const classes=useStyles();
    
    // const[docId,setDocId]=useState("");
    // const[invoiceId,setInvoiceId]=useState("");
    // const[custNum,setCustNum]=useState("");
    // const[businessYear,setBusinessYear]=useState("");

    const handleCloseAView=()=>
    {
        setOpen(false);
    }

    return (
    <Dialog open={open} onClose={handleCloseAView} fullWidth maxWidth="sm">
    <DialogTitle className={classes.dTitleContent} >AnalyticsView</DialogTitle>
     <DialogContent className={classes.dTitleContent}>
   
   <Grid container spacing={{ xs: 2, md: 3 }}>
    
   <Grid item xs={6}>
   <Typography className={classes.typo}>Clear Date</Typography>
   <Item>
        <TextField
         className={classes.field}
         type="date"
         label="From"
         size="small"
         focused
         fullWidth
        //  onChange={(event)=>handleClearDate(event)}
        />
    </Item>
    <Item>
        <TextField
         className={classes.field}
         type="date"
         label="To"
         size="small"
         focused
         fullWidth
        //  onChange={(event)=>handleClearDate(event)}
        />
    </Item>
   </Grid>
   <Grid item xs={6}>
   <Typography className={classes.typo}>Due Date</Typography>
   <Item>
        <TextField
         className={classes.field}
         type="Date"
         label="From"
         size="small"
         focused
         fullWidth
        //  onChange={(event)=>handleClearDate(event)}
        />
    </Item>
    <Item>
        <TextField
         className={classes.field}
         type="date"
         label="To"
         size="small"
         focused
         fullWidth
        //  onChange={(event)=>handleClearDate(event)}
        />
    </Item>
   </Grid>
   <Grid item xs={6}>
   <Typography className={classes.typo}>Baseline Create Date</Typography>
   <Item>
        <TextField
         className={classes.field}
         type="date"
         label="From"
         size="small"
         focused
         fullWidth
        //  onChange={(event)=>handleClearDate(event)}
        />
    </Item>
    <Item>
        <TextField
         className={classes.field}
         type="date"
         label="To"
         size="small"
         focused
         fullWidth
        //  onChange={(event)=>handleClearDate(event)}
        />
    </Item>
   </Grid>
   <Grid item xs={6}>
   <Typography className={classes.typo}>Invoice Currency</Typography>
   <Item>
        <TextField
         className={classes.field}
         label="Invoice Currency"
         size="small"
         fullWidth
        //  onChange={(event)=>handleClearDate(event)}
        />
    </Item>
   </Grid>
   
  </Grid>
  </DialogContent>
   <DialogActions className={classes.dAction}>
    <Button className={classes.btn} onClick={handleCloseAView}>SEARCH</Button>
    <Button className={classes.btn} onClick={handleCloseAView}>CANCEL</Button>
   </DialogActions>
 </Dialog>
 )
}

export default AnalyticsView;