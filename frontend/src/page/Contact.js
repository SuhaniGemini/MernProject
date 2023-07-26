import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p>
              <strong>Address:</strong> 119,Gemini Solution Udyog Vihar ,Gurgaon
            </p>
            <p>
              <strong>Email:</strong> tastytracks@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +123456789
            </p>
          </div>

          {/* Map */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Find Us on the Map</h2>
            <div className="aspect-w-16 aspect-h-9">
              {/* Replace the src attribute with the URL of your map or an embedded map */}
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.5678!2d12.345678!3d56.789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDUwJzIwLjciTiAxMsKwMzEnMjUuNiJF!5e0!3m2!1sen!2sus!4v1620824476380!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
