import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { TablePagination } from '@mui/material';
import Buttons from './Buttons/Buttons';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { isDisabled } from '@testing-library/user-event/dist/utils';


const styles = makeStyles(() => ({
    middle: {
        position: "relative",
    },
    pagination: {
        color: "#ffffff",
        maxWidth: "100vw"
    },
    checkbox: {
        root: {
            color: '#14AFF1',
            '&$checked': {
                color: '#14AFF1',
            },
        },
    },
}))

const DataTable = ({
}) => {

    
    const classes = styles()
    
    const [data, setData] = React.useState([])
    const [selected, setSelected] = React.useState([])
    const [sort,setSort]=useState('sl_no');
    const [dsort,setdSort]=useState('ASC');

    
    const [page, setPage] = React.useState(0)
    const [rowsperpage, setRowsPerPage] = React.useState(7)
    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);

    const [upIcon,setUpIcon]=useState('disabled');
    const [downIcon,setDownIcon]=useState('');


    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = data.map(n => n['doc_id']);
            setSelected(newSelecteds);

        }
        else {
            setSelected([]);
        }
    };


    const handleClick = (event, doc_id) => {
        const selectedIndex = selected.indexOf(doc_id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, doc_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    React.useEffect(() => {
      async function fetchData(){
          
        axios.get(`http://localhost:8080/B2B/SendData?sort=${sort}&dsort=${dsort}`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    fetchData()
    },[`http://localhost:8080/B2B/SendData?sort=${sort}&dsort=${dsort}`])

    const onChangePage = ((event, nextPage) => {
        setPage(nextPage)
    })

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const arrange=(name)=>{

        if(name !== sort)
        {
            setdSort("ASC")
            setSort(name)
        }
        else if(dsort === "ASC")
        {
            setdSort("DESC")
            setSort(name)
        }
        else 
        {
            setdSort("ASC")
            setSort(name)
        }
    }

    const isSelected = (doc_id) => selected.indexOf(doc_id) !== -1;
    const dataLength = data === undefined ? 0 : data.length;
    const selectedLength = selected === undefined ? 0 : selected.length;
    
    return (
        <div style={{backgroundColor:'#283d4a'}}>
            <Buttons selected={selected} data={data} setData={setData} setPage={setPage} search={search} setSearch={setSearch} setSearchResult={setSearchResult}/>
        
        <div className={classes.middle} >

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '42vw' }} aria-label="simple table" checkbox>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#283d4a" }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selectedLength > 0 && selectedLength < dataLength}
                                    checked={dataLength > 0 && selectedLength === dataLength}
                                    onChange={handleSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                    disableRipple={true}
                                    size='small'
                                />
                            </TableCell>
                            <TableCell align="left"  onClick={()=>arrange('sl_no')} sx={{ color: "white", minWidth: "3vw" }}>ID {sort==='sl_no' ?(dsort==='ASC'?<ArrowUpwardIcon sx={{fontSize:'1rem'}} />:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('business_code')} sx={{ color: "white", minWidth: "8vw" }}>Business Code {sort==='business_code' ?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('cust_number')} sx={{ color: "white", minWidth: "9vw" }}>Customer Number {sort==='cust_number'? (dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('clear_date')} sx={{ color: "white", minWidth: "8vw" }}>Clear Date {sort==='clear_date' ?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('buisness_year')} sx={{ color: "white", minWidth: "8vw" }}>Business Year {sort==='buisness_year'? (dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('doc_id')} sx={{ color: "white", minWidth: "7vw" }}>Document ID {sort==='doc_id' ?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('posting_date')} sx={{ color: "white", minWidth: "7vw" }}>Posting Date {sort==='posting_date' ?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('document_create_date')} sx={{ color: "white", minWidth: "11vw" }}>Document Create Date {sort==='document_create_date'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('document_create_date1')} sx={{ color: "white", minWidth: "12vw" }}>Document Create Date1 {sort==='document_create_date1'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('due_in_date')} sx={{ color: "white", minWidth: "7vw" }}>Due Date {sort==='due_in_date'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('invoice_currency')} sx={{ color: "white", minWidth: "9vw" }}>Invoice Currencey {sort==='invoice_currency'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('document_type')} sx={{ color: "white", minWidth: "8vw" }}>Document Type {sort==='document_type'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('posting_id')} sx={{ color: "white", minWidth: "6vw" }}>Posting ID {sort==='posting_id'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('area_business')} sx={{ color: "white", minWidth: "8vw" }}>Area Business {sort==='area_business'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('total_open_amount')} sx={{ color: "white", minWidth: "10vw" }}>Total Open Amount {sort==='total_open_amount'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('baseline_create_date')} sx={{ color: "white", minWidth: "11vw" }}>Baseline Create Date {sort==='baseline_create_date'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('cust_payment_terms')} sx={{ color: "white", minWidth: "13vw" }}>Customer Payment Terms {sort==='cust_payment_terms'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('invoice_id')} sx={{ color: "white", minWidth: "7vw" }}>Invoice Id {sort==='invoice_id'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('isOpen')} sx={{ color: "white", minWidth: "6vw" }}>is Open {sort==='isOpen'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                            <TableCell align="right" onClick={()=>arrange('is_deleted')} sx={{ color: "white", minWidth: "6vw" }}>is Deleted {sort==='is_deleted'?(dsort==='ASC'? <ArrowUpwardIcon sx={{fontSize:'1rem'}}/>:<ArrowDownwardIcon sx={{fontSize:'1rem'}}/>):<div></div>}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {(search===""?data:searchResult).slice(page * rowsperpage, page * rowsperpage + rowsperpage).map((row) => {
                            
                            const isItemSelected = isSelected(row['doc_id']);
                            return (
                                <TableRow
                                    
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }
                                        , backgroundColor: "#283d4a"
                                    }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onClick={(event) => handleClick(event, row['doc_id'])}
                                            disableRipple={true}
                                            size='small'
                                            className={classes.checkbox}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ color: "white" }}>
                                        {row.sl_no}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.business_code}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.cust_number}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.clear_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.buisness_year}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.doc_id}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.posting_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.document_create_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.document_create_date1}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.due_in_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.invoice_currency}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.document_type}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.posting_id}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.area_business}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.total_open_amount}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.baseline_create_date}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.cust_payment_terms}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.invoice_id}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.isOpen}</TableCell>
                                    <TableCell align="right" sx={{ color: "white" }}>{row.is_deleted}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7,14,21]}
                size="small"
                sx={{ color: "white", width: "100vw", borderBottom: "0", backgroundColor: "#283d4a" }}
                count={data.length}
                rowsPerPage={rowsperpage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
        </div>
    )
}

export default DataTable