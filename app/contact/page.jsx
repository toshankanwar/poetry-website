'use client';

import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setLoading(false);

    if (result.success) {
      setStatus('SUCCESS');
      e.target.reset(); // Clear form
    } else {
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-4">
          We'd love to hear from you! Whether it's feedback, suggestions, or just saying hello.
        </p>

        <div className="text-center mb-10">
          <p className="text-gray-700 font-medium mb-2">Prefer email?</p>
          <a
            href="mailto:contact@toshankanwar.in"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200"
          >
            Email Us Directly to contact@toshankanwar.in
          </a>
        </div>

        {/* Web3Forms Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 space-y-6 transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(59,130,246,0.7)] hover:ring-2 hover:ring-blue-400">
        
          {/* Required Web3Forms Access Key */}
          <input type="hidden" name="access_key" value="08ac4226-79c3-4554-8c7b-8397c9e00bca" />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              placeholder="Subject of your message"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium text-white transition duration-200 ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {/* Submission Status */}
          {status === 'SUCCESS' && (
            <p className="text-green-600 text-center mt-4 font-medium">
              ✅ Your message has been sent successfully!
            </p>
          )}
          {status === 'ERROR' && (
            <p className="text-red-600 text-center mt-4 font-medium">
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
