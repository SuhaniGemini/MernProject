import React from 'react'

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600 ">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p>
            <strong>Address:</strong>  Plot No. 119 Gemini Solutions
          </p>
          <p>
            <strong>Email:</strong> pachourisuhani@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> 123456789
          </p>
          {/* Add other contact information as needed */}
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block font-medium">
                Message
              </label>
              <textarea
                id="message"
                className="w-full border rounded-lg px-4 py-2"
                rows="4"
                placeholder="Your Message"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Contact