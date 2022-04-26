import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import "../src/App.css";

function App() {
  return (
    
      <Router>
        <Routes>
          <Route exact path="/" element={<Main/>}>
          </Route>
        </Routes>
      </Router>
   
  );
}

export default App;
