import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: '592dd66c-e5ec-4ebe-a866-9a0a22d100f9', // Replace with your Web3Forms access key
        ...formData,
      }),
    });

    setLoading(false);

    if (response.ok) {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-600">We'd love to hear from you!</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Name"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Email address"
              />
            
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              rows="4"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {success && (
            <p className="text-green-500 text-center mt-4">
              Message sent successfully!
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center mt-4">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;