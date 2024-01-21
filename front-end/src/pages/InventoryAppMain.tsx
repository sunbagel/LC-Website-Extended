import { Outlet, Route, Routes } from "react-router-dom"
import SearchPage from "./SearchPage"
import AddPartPage from "./AddPartPage"

import AppNavBar from '@/components/AppNavBar';



const InventoryAppMain = () =>{

    return (
        <>

            <AppNavBar/>
            {/* could use this for styling/containing purposes */}
            <div>
                <Outlet/>
            </div>
            
        
        </>

    )



}



export default InventoryAppMain



