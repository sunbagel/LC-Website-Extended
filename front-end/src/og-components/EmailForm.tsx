
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
      <Form className="mx-auto mt-12 max-w-screen-md px-8" onSubmit={sendEmail}>
        {/* <Form.Group>
          <Form.Label>Sending To:</Form.Label>
          <Form.Control readOnly defaultValue="lcindustrialservices@gmail.com"/>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formSubject">
          <Form.Label className="font-bold text-black">Subject:</Form.Label>
          <Form.Control name="subject" placeholder="Subject" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label className="font-bold text-black">Your Name:</Form.Label>
          <Form.Control name="name" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font-bold text-black">Email address:</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter your email" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTextBox">
          <Form.Control name="message" as="textarea" rows={10} placeholder="How can we help you?"/>
        </Form.Group>
        
        <button className='default-btn' type="submit">
          Submit
        </button>
      </Form>
    </div>
  )
}

export default EmailForm
