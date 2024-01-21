


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './og-components/NavBar';
import Home from './og-components/pages/Home'
import Contact from './og-components/pages/Contact';
import FooterV2 from './og-components/FooterV2';

import './App.css';

function App() {
  return (
    <div className="page-container">
      <div className = 'content-wrap'>
        <Router>
          <NavBar/>
          <Routes>
            <Route path = '/' element = {<Home/>}/>
            <Route path = '/contact_us' element = {<Contact/>}/>
        
          </Routes>
          
        </Router>
      </div>
      
      {/* <Footer /> */}
      <FooterV2/>
    </div>
  );
}

export default App;
