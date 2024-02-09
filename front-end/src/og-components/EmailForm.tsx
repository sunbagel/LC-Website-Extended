
import { Button, Form } from 'react-bootstrap';
import emailjs from "emailjs-com";

const EmailForm = () => {

    function sendEmail(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        emailjs.sendForm('service_06984o5', 'template_aoxiikm', e.currentTarget, 'eELFir4dFuma9lzLD')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.currentTarget.reset();
    }

  return (
    <div>
      <Form onSubmit={sendEmail}>
        {/* <Form.Group>
          <Form.Label>Sending To:</Form.Label>
          <Form.Control readOnly defaultValue="lcindustrialservices@gmail.com"/>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formSubject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control name="subject" placeholder="Subject" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Your Name:</Form.Label>
          <Form.Control name="name" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter your email" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTextBox">
          <Form.Control name="message" as="textarea" rows={10} placeholder="How can we help you?"/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default EmailForm
