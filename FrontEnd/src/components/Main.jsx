import React from 'react';
import Header from './Header/Header';
import DataTable from './DataTable';
import Footer from './Footer/Footer';



function Main() {


  return (
    <div style={{height:'100vh', backgroundColor:'#283d4a'}}>
      <Header />
      <DataTable />
      <Footer />
    </div>
  )
}

export default Main;