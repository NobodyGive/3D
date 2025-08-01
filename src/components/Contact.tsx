import React, { useState } from 'react';
import { Mail, MessageSquare, Users, Instagram } from 'lucide-react';

const Contact = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? Want to get involved? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Email</h3>
                <p className="text-blue-400 hover:text-blue-300 transition-colors">
                  <a href="mailto:humans@hackunited.org">humans@hackunited.org</a>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <a
                href="#"
                className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border border-gray-600 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <span className="text-white font-medium">Discord</span>
              </a>

              <a
                href="#"
                className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border border-gray-600 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Users className="text-white" size={24} />
                </div>
                <span className="text-white font-medium">LinkedIn</span>
              </a>

              <a
                href="#"
                className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border border-gray-600 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Instagram className="text-white" size={24} />
                </div>
                <span className="text-white font-medium">Instagram</span>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest updates, announcements, and hackathon tips.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;