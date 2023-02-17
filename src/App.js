
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './Components/NavBar';
import Home from './Components/pages/Home'
import Contact from './Components/pages/Contact';
import Footer from './Components/Footer';
import FooterV2 from './Components/FooterV2';
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
