import React from 'react'
import { Button, Form, Container, Col, Row } from 'react-bootstrap';

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

      <h2>Get a Quote:</h2>
      <Form>
        {/* <Form.Group>
          <Form.Label>Sending To:</Form.Label>
          <Form.Control readOnly defaultValue="lcindustrialservices@gmail.com"/>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlID="formTextBox">
          <Form.Control as="textarea" rows={10} placeholder="How can we help you?"/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Col>
      </Container>
    </div>
    
  )
}

export default Contact
