import React from "react";

const cards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    heading: "Verified & Safe Spaces",
    description: "Every room on StudyNook is reviewed and verified. You get exactly what you see — clean, quiet, and ready to use.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    heading: "Book in Minutes",
    description: "No back-and-forth emails. Pick your room, choose your time slot, and confirm your booking instantly.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    heading: "Built for Students",
    description: "Whether you're studying solo or collaborating in a group, we have rooms sized and equipped for every need.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why Choose StudyNook?</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">We make finding and booking the perfect study room effortless — so you can focus on what actually matters.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div key={index} className="bg-[#0d1f3c] rounded-2xl p-7 border border-white/10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">{card.icon}</div>
              <h3 className="text-white font-semibold text-lg">{card.heading}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
