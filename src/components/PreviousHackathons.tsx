import React from 'react';
import { ExternalLink } from 'lucide-react';

const PreviousHackathons = () => {
  const hackathons = [
    { name: 'United Hacks V1', year: '2023', participants: '500+', image: '/HackUnitedLogo.webp' },
    { name: 'United Hacks V2', year: '2024', participants: '1,000+', image: '/HackUnitedLogo2.webp' },
    { name: 'United Hacks V3', year: '2024', participants: '1,000+', image: '/HackUnitedLogo3.jpeg' },
    { name: 'United Hacks V4', year: '2025 January', participants: '1,000+', image: '/HackUnitedLogo.webp' },
    { name: 'United Hacks V5', year: '2025 June', participants: '1,200+', image: '/HackUnitedLogo2.webp' },
  ];

  return (
    <section id="previous" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Previous Hackathons
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the legacy of innovation that has inspired thousands of developers worldwide
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {hackathons.map((hackathon, index) => (
            <div
              key={hackathon.name}
              className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={hackathon.image}
                  alt={hackathon.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{hackathon.name}</h3>
                <p className="text-blue-400 font-semibold mb-1">{hackathon.year}</p>
                <p className="text-gray-400 text-sm">{hackathon.participants} participants</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousHackathons;