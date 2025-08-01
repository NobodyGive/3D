import React from 'react';
import { Network, BookOpen, Zap } from 'lucide-react';

const Explore = () => {
  const sections = [
    {
      icon: Network,
      title: 'NETWORK',
      description: 'Connect with developers, entrepreneurs, and industry leaders from around the globe. Build relationships that will last beyond the hackathon.',
      color: 'blue'
    },
    {
      icon: BookOpen,
      title: 'LEARN',
      description: 'Participate in workshops, masterclasses, and mentorship sessions led by experts from top tech companies and successful startups.',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'COMPETE',
      description: 'Challenge yourself against the best developers worldwide. Push your limits and showcase your skills in this ultimate coding competition.',
      color: 'cyan'
    }
  ];

  return (
    <section id="explore" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Explore the Experience
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.title}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r from-${section.color}-500 to-${section.color}-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-wider">{section.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-center">{section.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Explore;