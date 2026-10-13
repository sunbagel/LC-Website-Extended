

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
import RequireAuth from "./components/auth/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import Careers from "./og-components/pages/Careers";

function App() {
  
  return ( <>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-grey">
            <NavBar/>
            <div className="flex-1">
              <Routes>
                <Route path = '/' element = {<Home/>}/>
                <Route path = '/contact_us' element = {<Contact/>}/>
                <Route path='/careers' element={<Careers/>} />
                <Route element={<RequireAuth/>}>
                  <Route path = 'app-home' element = {<InventoryAppMain/>}>
                      <Route index element={<SearchPage/>}/>
                      <Route path='search-page' element={<SearchPage/>}/>
                      <Route path ='add-parts' element = {<AddPartPage/>}/>
                  </Route>
                </Route>
                <Route path = '/login' element = {<LoginPage/>}/>
              </Routes>
            </div>
            <FooterV2/>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
  
}

export default App;
