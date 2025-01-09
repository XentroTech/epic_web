import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      category: " User Registration and Authentication",
      questions: [
        {
          question: "How do I register on the platform?",
          answer:
            "You can register using your phone number, name, and password. A verification code will be sent via SMS or email to confirm your account.",
        },
        {
          question: "What are the different types of users on the platform?",
          answer:
            "There are two types of users:Photographers: Can upload and sell photos.Competition Participants: Can purchase photos and join daily or weekly competitions.",
        },
        {
          question: "What should I do if I forget my password?",
          answer:
            "You can reset your password by clicking on the 'Forgot Password' link during login and following the instructions.",
        },
      ],
    },
    {
      category: "Wallet and Payment System",
      questions: [
        {
          question: "What is the Epic Wallet?",
          answer:
            "The Epic Wallet is your digital wallet where you manage Picoins. Picoins can be used to buy photos or participate in competitions.",
        },
        {
          question: "How can I top up my wallet?",
          answer:
            "You can add funds to your Epic Wallet using various payment methods like bank transfer, card payment, or PayPal.",
        },
        {
          question: "How much is 10 Picoins worth?",
          answer:
            "10 Picoins = 0.50 RM for Malaysian Users. and 2 BDT for Bangladeshi Users",
        },
        {
          question: "Can photographers withdraw their earnings?",
          answer:
            "Yes, photographers can withdraw earnings once they reach a minimum of 2000 Picoins (equivalent to 20 RM for MY 400 BDT).",
        },
      ],
    },
    {
      category: " Marketplace for Photo Sales",
      questions: [
        {
          question: "How do photographers upload photos?",
          answer:
            "Photographers can upload up to 5 photos for free. To upload more, they can purchase additional gallery space.",
        },
        {
          question: "What happens after I purchase a photo?",
          answer:
            "Purchased photos are moved to 'My Gallery' for future use, such as participating in competitions.",
        },
        {
          question: "Are there categories for photos?",
          answer:
            "Yes, photos are displayed in different categories to make browsing easier.",
        },
      ],
    },
    {
      category: " Competitions (Daily and Weekly)",
      questions: [
        {
          question: "How do daily competitions work?",
          answer:
            "Competitions start at 12 AM and end at 9 PM. Users enter by purchasing photos, and each photo has a unique number entered into a lottery system.Winners are randomly selected.",
        },
        {
          question: "What are weekly competitions?",
          answer:
            "Weekly competitions run every Friday from 12 AM to 6 PM. Users pay 10 RM to upload a themed photo, which is then shared on social media to gather likes. The photo with the most likes wins.",
        },
      ],
    },
    {
      category: " Content Moderation and Rules",
      questions: [
        {
          question: "Are there rules for uploading photos?",
          answer:
            "Yes, uploaded photos must comply with platform rules (e.g., no political content, nudity, or controversial material).",
        },
        {
          question: " What happens if I violate the rules?",
          answer:
            "You will receive a warning for inappropriate content.After three warnings, your account will be automatically blocked.",
        },
      ],
    },
    {
      category: "Leaderboard and User Analytics",
      questions: [
        {
          question: "Can I see my competition performance?",
          answer:
            "Yes, you can view your personal stats, including the number of wins and performance trends.",
        },
        {
          question: "Can photographers track their sales?",
          answer:
            "Photographers have access to detailed sales statistics, including revenue and growth trends.",
        },
      ],
    },
    {
      category: "Advertisement and Sponsorships",
      questions: [
        {
          question: "How can I earn Picoins by watching ads?",
          answer:
            "You earn 1 Picoin for every ad video you watch on the platform.",
        },
        {
          question: "Can brands sponsor competitions?",
          answer:
            "Yes, large brands can sponsor competitions or purchase ad placements on the homepage.",
        },
      ],
    },
    {
      category: "Paid Gallery and Art Showcase",
      questions: [
        {
          question: "What is the cost of additional gallery space?",
          answer:
            "Additional space pricing is as follows: 5 pictures = 5 RM , 10 pictures = 8 RM,20 pictures = 15 RM,50 pictures = 35 RM,100 pictures = 50 RM",
        },
        {
          question: "Can artists showcase their art?",
          answer:
            "Yes, artists can upload their art for sale with custom descriptions and pricing.",
        },
      ],
    },
    {
      category: "Supported Devices and Platforms",
      questions: [
        {
          question: " What devices are compatible with the platform?",
          answer:
            "Our platform is compatible with:Mobile Devices: Android and iOS smartphones.Desktops/Laptops: Windows, macOS, and Linux operating systems.Tablets: Android and iOS tablets.",
        },
        {
          question: "Can I access the platform through a web browser?",
          answer:
            "Yes, the platform is fully accessible through modern web browsers like Chrome, Safari, Firefox, and Edge. but you cant play game on web browser game only available on mobile app",
        },
        {
          question: " Will the platform work on low-end devices?",
          answer:
            "The platform is optimized to work on a wide range of devices, including low-end smartphones and older desktops. However, a stable internet connection is recommended for a smooth experience.Q8: What should I do if the platform lags on my device?Ensure your device meets the minimum requirements.Clear cache and temporary files.Update the app or browser to the latest version.Restart your device.",
        },
      ],
    },
    {
      category: "Notification System",
      questions: [
        {
          question: "What kind of notifications will I receive?",
          answer:
            "You’ll receive notifications for: Competition deadlines and winner announcements.Photo purchases and changes in your Picoins balance.Moderation warnings if your content is flagged.",
        },
        {
          question: "Can I turn off notifications?",
          answer:
            "Essential notifications like account or competition alerts cannot be disabled. However, you can manage preferences for other updates in your settings.",
        },
      ],
    },
  ];

  return (
    <div className="bg-white-900 text-white min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">Epic FAQ</h1>
          <p className="text-lg text-green-800">Frequently Asked Questions</p>
        </header>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl text-green-600 font-semibold border-b border-[#eab71a] pb-2 mb-4">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((item, i) => (
                  <div key={i}>
                    <button
                      className="w-full text-left font-medium text-lg flex justify-between items-center"
                      onClick={() => toggleFAQ(`${index}-${i}`)}
                    >
                      <span className="text-gray-600">{item.question}</span>
                      <span className="ml-4 text-gray-800">
                        {activeIndex === `${index}-${i}` ? "-" : "+"}
                      </span>
                    </button>
                    {activeIndex === `${index}-${i}` && (
                      <p className="mt-2 text-gray-400">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
