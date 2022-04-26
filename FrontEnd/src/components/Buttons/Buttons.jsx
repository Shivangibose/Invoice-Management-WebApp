import React, { useState , useEffect} from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "./Buttons.css";
import RefreshIcon from '@mui/icons-material/Refresh';
import Paper from '@mui/material/Paper';
import AddData from '../AddData';
import EditData from '../EditData';
import DeleteData from '../DeleteData';
import AdvanceSearch from '../AdvanceSearch';
import AnalyticsView from '../AnalyticsView';

const useStyles=makeStyles(()=>({
    btn: {
        fontSize:'0.8rem',
        fontWeight:'bold',
        width:'10vw',
        padding: '0.7rem',
        color:'#fff',
        border:'2px solid #1b83b1',
        '&:hover':{
            background:"#1b83b1"
        },
        '&:disabled':{
          color:'#6c757d',
          border:'2px solid #6c757d'
        }
    },
    btnref: {
      fontSize:'0.7rem',
      width:'3vw',
      padding: '0.5rem',
      color:'#fff',
      border:'2px solid #1b83b1',
      '&:hover':{
          background:"#1b83b1"
      }
  },
    field:{
            background:"#fff",
            borderRadius:'0.4rem',
            border:'none'
        },
        fieldd:{
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



function Buttons({selected,data, setData,setPage, search,setSearch,setSearchResult}) {

    const classes=useStyles();
    const [add,setAdd]=useState(false);
    const [edit,setEdit]=useState(true);
    const [del,setDel]=useState(true);
    const [predict,setPredict]=useState(true);
    const [addPopup,setAddPopup]=useState(false);
    const [editPopup,setEditPopup]=useState(false);
    const [deletePopup,setDeletePopup]=useState(false);
    const [aSearchPopup,setASearchPopup]=useState(false);
    const [aViewPopup,setAViewPopup]=useState(false);
    
    React.useEffect(() => {

      async function fetchData(){

      axios.get(`http://localhost:8080/B2B/SearchData?search=${search}`)
          .then((response) => {
              setPage(0);
              setSearchResult(response.data);
          })
          .catch((error) => {
              console.log(error);
          })
  }fetchData()
    },[`http://localhost:8080/B2B/SearchData?search=${search}`])
    
const popupAdd=()=>{
  setAddPopup(true);
}

const popupEdit=()=>{
  setEditPopup(true);
}
const popupDelete=()=>{
  setDeletePopup(true);
}
const popupAsearch=()=>{
  setASearchPopup(true);
}
const popupAView=()=>{
  setAViewPopup(true);
}
const handleRefresh=()=>{
  window. location. reload();
}


    React.useEffect(()=>{
       if(selected.length===0)
       {
         setAdd(false);
         setDel(true);
         setPredict(true);
       }
       else{
         setAdd(true);
         setDel(false);
         setPredict(false);
       }

       if(selected.length===1)
       {
         setEdit(false);
       }
       else{
         setEdit(true);
       }
        
    })

    const searchWord=(event)=>{
      setSearch(event.target.value);
    }
    

  return (
    
         <div className="body">
        <div className="body1">
          <ButtonGroup variant="outlined" >

            <Button className={classes.btn} disabled={predict}>Predict</Button>

            <Button className={classes.btn} onClick={popupAView}>Analytics View</Button>
            <AnalyticsView open={aViewPopup} setOpen={setAViewPopup}/>

            <Button className={classes.btn} onClick={popupAsearch}>Advance Search</Button>
            <AdvanceSearch open={aSearchPopup} setOpen={setASearchPopup} data={data} setData={setData} />
            
            <Button className={classes.btnref} onClick={handleRefresh}><RefreshIcon/></Button>
          
          </ButtonGroup>
    
          </div>

          <div className="body2">
          <TextField
           className={classes.field}
           label="Search Customer Number"
           id="filled-size-small"
           variant='filled'
           size="small"
           InputLabelProps={{style: {fontSize: '1vw'}}}
           onChange={(event)=>searchWord(event)}
           />
          </div>
          
          <div className="body3">
          <ButtonGroup variant="outlined">

          <Button className={classes.btn} disabled={add} onClick={popupAdd}>ADD</Button>
          <AddData open={addPopup} setOpen={setAddPopup}/>

          <Button className={classes.btn} disabled={edit} onClick={popupEdit}>EDIT</Button>
          <EditData open={editPopup} setOpen={setEditPopup} selected={selected}/>
          
          <Button className={classes.btn} disabled={del} onClick={popupDelete}>DELETE</Button>
          <DeleteData open={deletePopup} setOpen={setDeletePopup} selected={selected}/>

          </ButtonGroup>
          </div>
         </div>
    
  )

}

export default Buttons;