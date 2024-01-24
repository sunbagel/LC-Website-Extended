import { Outlet } from "react-router-dom"


import AppNavBar from '@/components/AppNavBar';



const InventoryAppMain = () =>{

    return (
        <>

            <AppNavBar/>
            {/* could use this for styling/containing purposes */}
            <div className="good-font">
                <Outlet/>
            </div>
            
        
        </>

    )



}



export default InventoryAppMain



