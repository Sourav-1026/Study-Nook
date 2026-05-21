import React from "react";

const steps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    step: "01",
    heading: "Browse Available Rooms",
    description: "Search and filter rooms by amenities, capacity, floor, and hourly rate to find your perfect study space.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    step: "02",
    heading: "Pick Your Time Slot",
    description: "Choose your date and hour range. Our real-time availability system ensures you never double-book a room.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    step: "03",
    heading: "Confirm & Show Up",
    description: "Get instant booking confirmation. Head to the room at your scheduled time and make the most of your session.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">Booking a study room takes less than two minutes. Here's all you need to do.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, index) => (
            <div key={index} className="bg-[#0d1f3c] rounded-2xl p-7 border border-white/10 flex flex-col gap-4 relative overflow-hidden">
              {/* Step number watermark */}
              <span className="absolute top-4 right-5 text-6xl font-bold text-white/5 select-none leading-none">{item.step}</span>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">{item.icon}</div>

              <div>
                <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Step {item.step}</span>
                <h3 className="text-white font-semibold text-lg mt-1">{item.heading}</h3>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
