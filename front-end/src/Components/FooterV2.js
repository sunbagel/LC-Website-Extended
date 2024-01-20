import React from 'react'
import "./FooterV2.css";
import { Link } from 'react-router-dom';

const FooterV2 = () => {
  return (
    
    <div className = 'footer'>
        <div className='container justify-content-center'>
            <div className='row '>
                <div className='col-md-4 col-sm-auto'>
                    <h4>Contact Us:</h4>
                    <ul className='list-unstyled'>
                        <li>Street Address:</li>
                        <li> 1105 Britannia Road East Mississauga, ON L4W 3X1 Canada</li>
                        <p></p>
                        
                    </ul>
                </div>

                <div className='col-md-4 col-sm-auto my-auto'>
                    
                    <ul className='list-unstyled'>
                        <li>Phone Number: (905) 696-0378</li>
                        <p></p>
                        <li>Email Address: Lcindustrialservices@gmail.com</li>
                    </ul>
                </div>

                <div className = "col-md-4 col-sm-auto">
                    <h4>Hours</h4>
                    <ul className='list-unstyled'>
                        <li>Monday-Friday: 9:30 AM - 5:30 PM</li>
                        <li>Saturday, Sunday: 1:00 PM - 6:00 PM</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default FooterV2
