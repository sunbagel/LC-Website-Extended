

import EmailForm from '../EmailForm';

const Contact = () => {
  return (
    <div className="py-12 bg-grey">

    
      <div className="container">
        <div className="mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-black">
            <p className="text-black text-5xl font-bold mb-4">Contact us:</p>
            <p className="flex text-black items-center mb-2">
              <span className="material-icons-outlined mr-2">location_on</span>
              1105 Britannia Road East Mississauga, ON L4W 3X1 Canada
            </p>
            <p className="flex text-black items-center mb-2">
              <span className="material-icons-outlined mr-2">phone</span>
              (905) 696-0378
            </p>
            <p className="flex text-black items-center mb-2">
              <span className="material-icons-outlined mr-2">email</span>
              info@lcindustrial.ca
            </p>
          </div>

          {/* <div className="lg:w-1/2 flex justify-end">
            <img src="path-to-your-illustration.png" alt="Friendly person holding a sign that says hello" className="max-w-xs md:max-w-sm lg:max-w-md">
          </div> */}
        </div>
        <EmailForm />
      </div>
    </div>
    
  )
}

export default Contact
