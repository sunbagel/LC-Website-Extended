import React from 'react'
import "./FooterV2.css";

const FooterV2 = () => {
  return (
    
    <div className = 'footer'>
        <div className='container justify-content-center'>
            <div className='row '>
                <div className='col-md-4 col-sm-auto'>
                    <h4>About</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper massa at nulla ullamcorper sollicitudin. Mauris vestibulum laoreet metus nec rutrum. Curabitur porta vel urna nec luctus. Quisque ultricies ipsum.</p>
                </div>

                <div className='col-md-4 col-sm-auto'>
                    <h4>Contact Us:</h4>
                    <ul className='list-unstyled'>
                        <li>Street Address: 123 Mainstreet, Mississauga, Ontario</li>
                        <li>Phone Number: 905-xxx-xxxx</li>
                        <li>Email Address: filleremail@gmail.com</li>
                    </ul>
                </div>

                <div class = "col-md-4 col-sm-auto">
                    <h4>Hours</h4>
                    <ul className='list-unstyled'>
                        <li>Monday-Friday: 9-5</li>
                        <li>Saturday, Sunday: 11-5</li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default FooterV2
