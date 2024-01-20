import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
        <section className = "container">
            {/* <div class = "logo col">
                <img src="/images/LC_Logo_Transparent.png" alt="LC Logo"></img>
                <h1>LC Industrial Services</h1> 
            </div> */}
            <div className = "about col">
                <h3>About</h3>
            </div>
            <div className = "contact col">
                <h3>Contact Us</h3>
                <ul>
                    <li>Street Address: 1105 Britannia Road East Mississauga, ON L4W 3X1 Canada</li>
                    <li>Phone Number: (905) 696-0378</li>
                    <li>Email Address: Lcindustrialservices@gmail.com</li>
                </ul>
            </div>
            <div className = "hours col">
                <h3>Hours</h3>
                <ul>
                    <li>Monday-Friday: 9:30 AM - 5:30 PM</li>
                    <li>Saturday, Sunday: 1:00 PM - 6:00 PM</li>
                </ul>
            </div>
        </section>
    </footer>
    // <div className = 'footer'>
    //     <div className='container'>
    //         {/* need row div if want bootstrap */}
    //         <div className='col'>
    //             <h4>Contact Us:</h4>
    //             <ul className='list-unstyled'>
    //                 <li>(905) 696-0378</li>
    //                 <li>Email</li>
    //             </ul>
    //         </div>

    //         <div className='col'>
    //             <h4>Random:</h4>
    //             <ul className='list-unstyled'>
    //                 <li>balblalba</li>
    //                 <li>hihih</li>
    //             </ul>
    //         </div>
            
            
    //     </div>
      
    // </div>
  )
}

export default Footer
