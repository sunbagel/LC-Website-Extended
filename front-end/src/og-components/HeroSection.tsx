import { Image, Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css';
import './HeroSection.css';





const HeroSection = () => {
  return (
    <div>
      <div className="section-container bg-grey">

      
      <Container>
        <Col>
        
          <Row className="px-3 py-5 bg-grey">
            <Col lg={6}>
              <h1 className="header">
              Your Local CNC Machine & Industrial Electronics Service Provider
              </h1>
              <p className="body text-dark mx-3">
              LC Industrial is a team that provides fast, reliable, and quality service and parts for all kinds of industrial      electronics at a competitive price. We are based in Mississauga and have customers all around the GTA, and elsewhere in North America. From PCBs to servo drives and controllers, we can repair any make or model of electronics you use in your operations.
              </p>
              <p className="body text-dark mx-3">
              We invite you to contact us today!
              </p>
              <div className="text-center my-4">
              <Link to="/contact_us">
                <Button id="quote-button">Get a Quote</Button>
              </Link>
              
              </div>
            </Col>
            <Col lg={6}>
              <div className='image-container'>
                <Image
                    src="/images/LC_Store_Front_Edited.jpg"
                    className='hero-image'
                    fluid
                    rounded
                    

                />
              </div>
                
              
            </Col>
          </Row>
          <Row className="text-dark px-3 py-5">
          <h1 className="header">Provided Services:</h1>
            <p className="body">Our expert service team has over 30 years of experience in industrial electronic repair for a wide range of machines, including all major brands such as Fanuc, Siemens, Okuma, Heidenheim, Mitsubishi, Yaskawa, and more! We stock parts for many makes and models and can repair or provide custom solutions as needed. Our advantage is at the component-level repairing and reverse engineering – which enables us to repair obsolete or hard to find parts. We have a reputation for providing alternative solutions in creative ways.
            </p>
            <p>We've worked with:</p>
            <Col className="listBody">
            
              <ul>
                <li>CNC, EDM, Encoders & Machine Controls</li>
                <li>QC Lab Equipment</li>
                <li>AC/DC Drives</li>
                <li>Servo Amplifiers Logic Controllers</li>
                <li>PLC, HMI, Touch Screen Monitors, CRT to LCD</li>
              </ul>
            </Col>
            <Col className="listBody">
              <ul>
                <li>Industrial Computers, Networking</li>
                <li>Process Controllers and Sensors</li>
                <li>Custom and Obsolete circuit boards</li>
                <li>Power Supplies</li>
                <li>Weld Controllers</li>
                <li>And many more!</li>
              </ul>
            </Col>

            <p className="body">If you have any industrial electronics problems, contact us.</p>

            
          </Row>
        </Col>
      </Container>
    </div>
    </div>
    
    // <div className='hero-container'>
    //     <div className="header-container">
    //       <div className='row'>
    //         <div className="col">
    //           <div className="row-auto">
    //             <h1> Your Local CNC Machine & Industrial Electronics Service Provider</h1>
    //           </div>
    //           <div className="row-auto">
    //             <p>LC Industrial is a team that provides fast, reliable, and quality service and parts for all kinds of industrial      electronics at a competitive price. We are based in Mississauga and have customers all around the GTA, and elsewhere in North America. From PCBs to servo drives and controllers, we can repair any make or model of electronics you use in your operations.

    //             We invite you to contact us today!
    //             </p>
    //           </div>
    //         </div>

    //         <div className="col-auto">
    //           <div className="image-container">
    //             <Image src="/images/img-home.jpg" alt="temp" fluid/>
    //           </div>
    //         </div>
    //       </div>
          
          
    //     </div>
        

        /* <video src="/videos/video-2.mp4" autoPlay loop muted />
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for?</p>
        <div className='hero-btns'>
            <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
              GET STARTED
            </Button>

            <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
              WATCH TRAILER<i className='far fa-play-circle'/>
            </Button >
        </div> */

        

    // </div>
  )
}

export default HeroSection
