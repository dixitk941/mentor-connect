import React from 'react';

const features = [
  {
    icon: '📅',
    title: 'Automated Calendar Booking',
    description: 'Both platforms include automated calendar booking and video call integration, but Mentor Connect specifically targets mentor-mentee interactions.',
  },
  {
    icon: '💻',
    title: 'GitHub Integration',
    description: 'GenZ Connect includes additional features like GitHub integration, allowing for coding collaboration, while Mentor Connect focuses more on career advice and mentorship.',
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Offer
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-xl px-6 pb-8 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg">
                        <span className="text-white text-3xl">{feature.icon}</span>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;