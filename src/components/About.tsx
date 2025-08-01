import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            What is United Hacks V6?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            United Hacks V6 is the premier global online hackathon bringing together the brightest minds from around the world. 
            For 48 hours, participants will collaborate, innovate, and compete to build solutions that can change the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20">
              <h3 className="text-2xl font-semibold text-blue-400 mb-3">48 Hours of Innovation</h3>
              <p className="text-gray-300">Non-stop coding, learning, and building with developers from 50+ countries.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-2xl font-semibold text-purple-400 mb-3">$50,000+ in Prizes</h3>
              <p className="text-gray-300">Compete for cash prizes, internships, and exclusive opportunities with top tech companies.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20">
              <h3 className="text-2xl font-semibold text-blue-400 mb-3">Learn from the Best</h3>
              <p className="text-gray-300">Workshops, mentorship, and guidance from industry experts and successful entrepreneurs.</p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l7-5z"/>
                  </svg>
                </div>
                <p className="text-gray-400">Trailer Video</p>
                <p className="text-sm text-gray-500">Click to watch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;