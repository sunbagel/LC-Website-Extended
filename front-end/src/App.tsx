

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './og-components/NavBar';
import Home from './og-components/pages/Home'
import Contact from './og-components/pages/Contact';
import FooterV2 from './og-components/FooterV2';

import SearchPage from './pages/SearchPage';
import AddPartPage from './pages/AddPartPage';
import NavBar2 from './components/NavBar';
import EditForm from "./components/EditForm";

import './App.css';

function App() {
  return ( <>
     {/* <div className="page-container">
       <div className = 'content-wrap'> */}
        <Router>
          <NavBar/>
          <NavBar2/>
          <Routes>
            <Route path = '/' element = {<Home/>}/>
            <Route path = '/contact_us' element = {<Contact/>}/>

            <Route path = '/search-page' element = {<SearchPage/>}/>
            <Route path = '/add-parts' element = {<AddPartPage/>}/>
            <Route path = 'edit-part' element = {<EditForm/>}/>
        
          </Routes>
          
        </Router>
       {/* </div> */}
      

      <FooterV2/>
     {/* </div> */}
     </>
  );
  
}

export default App;
