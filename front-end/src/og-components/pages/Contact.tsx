
import { Container, Col } from 'react-bootstrap';
import EmailForm from '../EmailForm';

const Contact = () => {
  return (
    <div>
      <Container>
        <Col>
        
      <h2>Address:</h2>
      <p>
        1105 Britannia Road East
        Mississauga, ON L4W 3X1
        Canada
      </p>
      <h2>Phone Number:</h2>
      <p>(905) 696-0378</p>

      <h2>Our Email:</h2>
      <p>Lcindustrialservices@gmail.com</p>

      <h2>Get a Quote:</h2>
      <EmailForm/>
      </Col>
      </Container>
    </div>
    
  )
}

export default Contact
