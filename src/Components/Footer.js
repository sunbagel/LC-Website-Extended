import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
        <section class = "container">
            {/* <div class = "logo col">
                <img src="/images/LC_Logo_Transparent.png" alt="LC Logo"></img>
                <h1>LC Industrial Services</h1> 
            </div> */}
            <div class = "about col">
                <h3>About</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper massa at nulla ullamcorper sollicitudin. Mauris vestibulum laoreet metus nec rutrum. Curabitur porta vel urna nec luctus. Quisque ultricies ipsum.</p>
            </div>
            <div class = "contact col">
                <h3>Contact Us</h3>
                <ul>
                    <li>Street Address: 123 Mainstreet, Mississauga, Ontario</li>
                    <li>Phone Number: 905-xxx-xxxx</li>
                    <li>Email Address: filleremail@gmail.com</li>
                </ul>
            </div>
            <div class = "hours col">
                <h3>Hours</h3>
                <ul>
                    <li>Monday-Friday: 9-5</li>
                    <li>Saturday, Sunday: 11-5</li>
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
