

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './og-components/NavBar';
import Home from './og-components/pages/Home'
import Contact from './og-components/pages/Contact';
import FooterV2 from './og-components/FooterV2';

import './App.css';
import InventoryAppMain from "./pages/InventoryAppMain";
import SearchPage from "./pages/SearchPage";
import AddPartPage from "./pages/AddPartPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return ( <>
     {/* <div className="page-container">
       <div className = 'content-wrap'> */}
        <Router>
          <NavBar/>
          <Routes>
            <Route path = '/' element = {<Home/>}/>
            <Route path = '/contact_us' element = {<Contact/>}/>

            
            <Route path = 'app-home' element = {<InventoryAppMain/>}>
                <Route index element={<SearchPage/>}/>
                <Route path='search-page' element={<SearchPage/>}/>
                <Route path ='add-parts' element = {<AddPartPage/>}/>
            </Route>
            
            
            <Route path = '/login' element = {<LoginPage/>}/>
          </Routes>
          
        </Router>
       {/* </div> */}
      

      <FooterV2/>
     {/* </div> */}
     </>
  );
  
}

export default App;
