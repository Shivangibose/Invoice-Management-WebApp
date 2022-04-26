import React ,{useState} from 'react'
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


const AddData=({open,setOpen})=> {


   const[businessCode,setBusinessCode]=useState("");
   const[custNum,setCustNum]=useState("");
   const[clearDate,setClearDate]=useState("");
   const[businessYear,setBusinessYear]=useState("");
   const[docId,setDocId]=useState("");
   const[postDate,setPostDate]=useState("");
   const[docCreateDate,setDocCreateDate]=useState("");
   const[dueDate,setDueDate]=useState("");
   const[invoiceCur,setInvoiceCur]=useState("");
   const[docType,setDocType]=useState("");
   const[postingId,setPostingId]=useState("");
   const[totalOpenAmt,setTotalOpenAmt]=useState("");
   const[baseCreateDate,setBaseCreateDate]=useState("");
   const[custPayTerms,setCustPayTerms]=useState("");
   const[invoiceId,setInvoiceId]=useState("");

   const handleBusinessCode=(event)=>{
    setBusinessCode(event.target.value)
   }
   const handleCustNum=(event)=>{
    setCustNum(event.target.value)
   }
   const handleClearDate=(event)=>{
      setClearDate(event.target.value)
   }
   const handleBusinessYear=(event)=>{
      setBusinessYear(event.target.value)
    }
    const handleDocId=(event)=>{
        setDocId(event.target.value)
    }
    const handlePostDate=(event)=>{
        setPostDate(event.target.value)
    }
    const handleDocCreateDate=(event)=>{
         setDocCreateDate(event.target.value)
    }
   const handleDueDate=(event)=>{
        setDueDate(event.target.value)
    }
    const handleInvoiceCur=(event)=>{
       setInvoiceCur(event.target.value)
    }
    const handleDocType=(event)=>{
       setDocType(event.target.value)
    }
    const handlePostingId=(event)=>{
        setPostingId(event.target.value)
     }
     const handleTotalOpenAmt=(event)=>{
        setTotalOpenAmt(event.target.value)
     }
     const handleBaseCreateDate=(event)=>{
       setBaseCreateDate(event.target.value)
     }
     const handleCustPayTerms=(event)=>{
        setCustPayTerms(event.target.value)
     }
     const handleInvoiceId=(event)=>{
         setInvoiceId(event.target.value)
     }


    const classes=useStyles();
    const handleCloseAdd=()=>
    {
        setOpen(false);
    }
    
    const addFunc=()=>{
    axios.get(`http://localhost:8080/B2B/AddData?buisnessCode=${businessCode}&CustomerNum=${custNum}&ClearDate=${clearDate}&BuisnessYear=${businessYear}&DocID=${docId}&PostingDate=${postDate}&DocumentCreateDate=${docCreateDate}&DueDate=${dueDate}&InvoiceCur=${invoiceCur}&DocumentType=${docType}&PostingID=${postingId}&TotalOpenAmt=${totalOpenAmt}&BaseLineDate=${baseCreateDate}&CustomerPayTerms=${custPayTerms}&invoiceID=${invoiceId}`)
    setOpen(false)
  }


  return (
         <Dialog open={open} onClose={handleCloseAdd} fullWidth maxWidth="lg">

          <DialogTitle className={classes.dTitleContent} >Add</DialogTitle>
           <DialogContent className={classes.dTitleContent} >
           <Grid container spacing={{ xs: 2, md: 4 }}>
           <Grid item xs={3}>
           <Item>
           <TextField className={classes.field} label="Business Code" id="filled-basic" size="small" fullWidth onChange={(event)=>handleBusinessCode(event)} />
          </Item>
          </Grid>
          <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Customer Number" id="filled-basic" size="small" fullWidth onChange={(event)=>handleCustNum(event)} />
          </Item>
          </Grid>
          <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} type="date" label="Clear Date" size="small" focused fullWidth onChange={(event)=>handleClearDate(event)} />
          </Item>
          </Grid>
          <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Business Year" id="filled-basic" size="small" fullWidth onChange={(event)=>handleBusinessYear(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Document ID" id="filled-basic" size="small" fullWidth onChange={(event)=>handleDocId(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} type='date' label="Posting Date" id="filled-basic" size="small" focused fullWidth onChange={(event)=>handlePostDate(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} type='date' label="Document Create Date" id="filled-basic" size="small" focused fullWidth onChange={(event)=>handleDocCreateDate(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} type='date' label="Due Date" id="filled-basic" size="small" focused fullWidth onChange={(event)=>handleDueDate(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Invoice Currency" id="filled-basic" size="small" fullWidth onChange={(event)=>handleInvoiceCur(event)}  />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Document Type" id="filled-basic" size="small" fullWidth onChange={(event)=>handleDocType(event)}  />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Posting ID" id="filled-basic" size="small" fullWidth onChange={(event)=>handlePostingId(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Total Open Amount" id="filled-basic" size="small" fullWidth onChange={(event)=>handleTotalOpenAmt(event)}  />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} type='date' label="Baseline Create Date" id="filled-basic" size="small" focused fullWidth onChange={(event)=>handleBaseCreateDate(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Customer Payment Terms" id="filled-basic" size="small" fullWidth onChange={(event)=>handleCustPayTerms(event)} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <TextField className={classes.field} label="Invoice ID" id="filled-basic" size="small" fullWidth onChange={(event)=>handleInvoiceId(event)}  />
          </Item>
        </Grid>
       </Grid>
        </DialogContent>
        <DialogActions className={classes.dAction}>
        
          <Button className={classes.btn} onClick={addFunc}>ADD</Button>
          <Button className={classes.btn} onClick={handleCloseAdd}>CANCEL</Button>
        </DialogActions>
      </Dialog>
  )
}
export default AddData;
