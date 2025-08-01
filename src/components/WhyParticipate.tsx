import React from 'react';
import { Code, Users, Lightbulb, Trophy } from 'lucide-react';

const WhyParticipate = () => {
  const reasons = [
    {
      icon: Code,
      title: 'Hack',
      description: 'Build innovative solutions using cutting-edge technologies and frameworks.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Learn',
      description: 'Expand your skills through workshops, mentorship, and hands-on experience.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Network with like-minded developers and form lasting professional relationships.',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Trophy,
      title: 'Win',
      description: 'Compete for amazing prizes, internships, and recognition from top companies.',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="why-join" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Why Participate?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of developers in an unforgettable experience that will boost your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={reason.title}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${reason.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{reason.title}</h3>
                <p className="text-gray-300 leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyParticipate;