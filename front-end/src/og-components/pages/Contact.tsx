const Contact = () => {
  return (
    <div className="py-12 bg-grey">
      <div className="container">
        <div className="max-w-7xl mx-auto">

          <p className="text-black text-5xl font-bold mb-8">Contact Us</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            {/* Address */}
            <div className="p-6 shadow-lg rounded-lg bg-gray-50 text-black">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons-outlined" style={{ color: '#129384', fontSize: '2rem', lineHeight: '1', marginTop: '-12px' }}>location_on</span>
                <p className="font-bold text-2xl leading-none">Address</p>
              </div>
              <p className="text-gray-700 text-lg">
                1105 Britannia Road East, Mississauga, ON L4W 3X1, Canada
              </p>
            </div>

            {/* Phone */}
            <div className="p-6 shadow-lg rounded-lg bg-gray-50 text-black">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons-outlined" style={{ color: '#129384', fontSize: '2rem', lineHeight: '1', marginTop: '-12px' }}>phone</span>
                <p className="font-bold text-2xl leading-none">Phone</p>
              </div>
              <a href="tel:+19056960378" className="text-gray-700 text-lg" style={{ textDecoration: 'underline', textDecorationColor: '#9ca3af', textDecorationSkipInk: 'none', textUnderlineOffset: '3px' }}>
                (905) 696-0378
              </a>
            </div>

            {/* Email */}
            <div className="p-6 shadow-lg rounded-lg bg-gray-50 text-black">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons-outlined" style={{ color: '#129384', fontSize: '2rem', lineHeight: '1', marginTop: '-12px' }}>email</span>
                <p className="font-bold text-2xl leading-none">Email</p>
              </div>
              <a href="mailto:info@lcindustrial.ca" className="text-gray-700 text-lg" style={{ textDecoration: 'underline', textDecorationColor: '#9ca3af', textDecorationSkipInk: 'none', textUnderlineOffset: '3px' }}>
                info@lcindustrial.ca
              </a>
            </div>

          </div>

          {/* CTA */}
          <div className="p-8 shadow-lg rounded-lg bg-gray-50 text-black flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-2xl mb-2">Get in Touch</p>
              <p className="text-gray-700 text-lg">
                Have a question or need a quote? Send us an email and we'll get back to you as soon as possible.
              </p>
            </div>
            <a href="mailto:info@lcindustrial.ca?subject=Quote%20Request">
              <button className="default-btn whitespace-nowrap text-lg px-6 py-3">
                Send Us an Email
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
