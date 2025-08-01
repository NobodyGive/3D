import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

const Judges = () => {
  const judges = [
    {
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      expertise: 'AI/ML, Cloud Computing',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Marcus Johnson',
      title: 'CTO',
      company: 'TechStartup Inc',
      expertise: 'Full-Stack Development, DevOps',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Elena Rodriguez',
      title: 'Product Manager',
      company: 'Microsoft',
      expertise: 'Product Strategy, UX Design',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'David Kim',
      title: 'Principal Engineer',
      company: 'Meta',
      expertise: 'Mobile Development, AR/VR',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const criteria = [
    { category: 'Creativity', weight: '20%', description: 'Is the project a new idea? Does it provide a new experience or simplify an existing workflow?' },
    { category: 'Practicality', weight: '20%', description: 'Could this idea actually be implemented in real life? Would people be motivated to use it?' },
    { category: 'Presentation', weight: '20%', description: 'Is the project pitched convincingly? Is there a working demonstration?' },
    { category: 'Design', weight: '20%', description: 'Is the UI design user-friendly and intuitive? Does it enhance user experience?' },
    { category: 'Technical Complexity', weight: '20%', description: 'Does the project involve complex technologies? How relevant are the solutions?' }
  ];

  const sponsors = [
    { name: 'Google', tier: 'Platinum', logo: '🌐' },
    { name: 'Microsoft', tier: 'Gold', logo: '🏢' },
    { name: 'Meta', tier: 'Gold', logo: '🔗' },
    { name: 'Amazon', tier: 'Silver', logo: '📦' },
    { name: 'GitHub', tier: 'Silver', logo: '🐙' },
    { name: 'Vercel', tier: 'Bronze', logo: '▲' }
  ];

  return (
    <section id="judges" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judges Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Meet Our Judges
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry experts who will evaluate your projects and provide valuable feedback
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {judges.map((judge, index) => (
              <div
                key={judge.name}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500/20"
                  />
                  <h3 className="text-xl font-bold text-white mb-1">{judge.name}</h3>
                  <p className="text-blue-400 font-semibold mb-1">{judge.title}</p>
                  <p className="text-gray-400 mb-2">{judge.company}</p>
                  <p className="text-sm text-gray-300">{judge.expertise}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Judging Criteria */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Judging Criteria</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 text-blue-400 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 text-blue-400 font-semibold">Weight</th>
                    <th className="text-left py-3 px-4 text-blue-400 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion) => (
                    <tr key={criterion.category} className="border-b border-gray-700">
                      <td className="py-3 px-4 text-white font-medium">{criterion.category}</td>
                      <td className="py-3 px-4 text-purple-400 font-semibold">{criterion.weight}</td>
                      <td className="py-3 px-4 text-gray-300">{criterion.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Sponsors
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Proud partners making United Hacks V6 possible
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 text-center group"
              >
                <div className="text-4xl mb-3">{sponsor.logo}</div>
                <h3 className="text-lg font-bold text-white mb-1">{sponsor.name}</h3>
                <p className="text-sm text-blue-400">{sponsor.tier}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
              <ExternalLink size={20} />
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Judges;