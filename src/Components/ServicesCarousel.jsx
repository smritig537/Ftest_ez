import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './service.css';
import PresentationCard from './PresentationCard';
import ContactForm from './form';

const presentationCardsData = [
  {
    heading: "Presentation Design",
    items: [
      "Flipping & Formatting",
      "Slide Design",
      "Report Design",
      "Animated Presentation",
      "Interactive Presentation"
    ]
  },
  {
    heading: "Document Design",
    items: [
      "Resume Formatting",
      "Case Study Layout",
      "Whitepaper Styling",
      "Proofreading",
      "Infographic Inserts"
    ]
  },
  {
    heading: "Graphics",
    items: [
      "Infographic Design",
      "HTML Email Designs",
      "Social Media Banner",
      "Creative & Editorial",
      "UI/UX Design"
    ]
  },
  {
    heading: "Service Pro",
    items: [
      "Legal Resources",
      "Training Development"
    ]
  },
  {
    heading: "Tech Support",
    items: [
      "IT Helpdesk",
      "Remote Troubleshooting",
      "Hardware Support",
      "Software Configuration",
      "Live Chat Support"
    ]
  },
  {
    heading: "Translation",
    items: [
      "Document Translation",
      "Website Localization",
      "Technical Translation",
      "Certified Translation",
      "Multilingual DTP"
    ]
  },
  {
    heading: "Language Services",
    items: [
      "Editing & Proofreading",
      "Transcreation",
      "Language QA",
      "Style Guide Development",
      "Linguistic Review"
    ]
  },
  {
    heading: "Voice Services",
    items: [
      "Voice Over",
      "Dubbing",
      "Subtitling",
      "Audio Editing",
      "Language Adaptation"
    ]
  },
  {
    heading: "Customer Engagement",
    items: [
      "Live Chat",
      "Customer Onboarding",
      "Email Support",
      "Customer Surveys",
      "Feedback Collection"
    ]
  },
  {
    heading: "Consulting",
    items: [
      "Process Optimization",
      "Digital Strategy",
      "Business Analysis",
      "Tech Implementation",
      "Change Management"
    ]
  }
];

const capabilityCards = [
  {
    id: 0,
    title: "Language Services",
    serviceLine: "Language & Communication",
    isCustomComponent: true,
    presentationDataIndex: 6,
    sectionHeading: "LANGUAGE & DATA",
    subHeading: "Expand your global reach with expert linguists and communicators"
  },
  {
    id: 1,
    title: "Voice Services",
    serviceLine: "Language & Communication",
    isCustomComponent: true,
    presentationDataIndex: 7,
    sectionHeading: "VOICE SOLUTIONS",
    subHeading: "Voice, dubbing, and editing services to localize your content"
  },
  {
    id: 2,
    title: "Customer Engagement",
    serviceLine: "Consulting Services",
    isCustomComponent: true,
    presentationDataIndex: 8,
    sectionHeading: "BUSINESS & CX",
    subHeading: "Boost loyalty with seamless customer interactions"
  },
  {
    id: 3,
    title: "Consulting",
    serviceLine: "Consulting Services",
    isCustomComponent: true,
    presentationDataIndex: 9,
    sectionHeading: "CONSULTING EXPERTISE",
    subHeading: "Drive strategic change through tailored solutions"
  },
  {
    id: 4,
    title: "Tech Support",
    serviceLine: "Technology",
    isCustomComponent: true,
    presentationDataIndex: 4,
    sectionHeading: "TECH SUPPORT",
    subHeading: "Reliable IT helpdesk and troubleshooting services"
  },
  {
    id: 5,
    title: "Translation",
    serviceLine: "Language & Communication",
    isCustomComponent: true,
    presentationDataIndex: 5,
    sectionHeading: "GLOBAL TRANSLATION",
    subHeading: "Accurate translation and localization services"
  },
  {
    id: 6,
    title: "Presentation Design",
    serviceLine: "Business & CX",
    isCustomComponent: true,
    presentationDataIndex: 0,
    sectionHeading: "PRESENTATION DESIGN",
    subHeading: "Captivating slides that drive business impact"
  },
  {
    id: 7,
    title: "Document Design",
    serviceLine: "Business & CX",
    isCustomComponent: true,
    presentationDataIndex: 1,
    sectionHeading: "DOCUMENT LAYOUTS",
    subHeading: "Visually stunning reports and resumes"
  },
  {
    id: 8,
    title: "Graphics",
    serviceLine: "Business & CX",
    isCustomComponent: true,
    presentationDataIndex: 2,
    sectionHeading: "CREATIVE GRAPHICS",
    subHeading: "Banners, social posts, and beautiful infographics"
  },
  {
    id: 9,
    title: "Service Pro",
    serviceLine: "Business & CX",
    isCustomComponent: true,
    presentationDataIndex: 3,
    sectionHeading: "SERVICE PRO",
    subHeading: "Specialized legal & training support on demand"
  }
];

const ServicesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const goTo = (index) => {
    if (index >= 0 && index < capabilityCards.length) {
      setCurrent(index);
    }
  };

  const goToServiceLine = (serviceLine) => {
    const index = capabilityCards.findIndex(card => card.serviceLine === serviceLine);
    if (index !== -1) goTo(index);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      goTo(current + 1);
    } else if (info.offset.x > 50) {
      goTo(current - 1);
    }
  };

  const handleGetInTouchClick = () => {
    setIsFormOpen(true);
  };

  const currentCard = capabilityCards[current];

  const maxVisibleIndicators = 6;
  const half = Math.floor(maxVisibleIndicators / 2);
  const start = Math.max(0, Math.min(current - half, capabilityCards.length - maxVisibleIndicators));
  const end = Math.min(capabilityCards.length, start + maxVisibleIndicators);

  return (
    <div className="services-background">
      <div className="services-heading">
        <h1>70+ Offerings that allow you to Focus on your core tasks</h1>
      </div>

      <div className="carousel-headings">
        <h2 className="main-heading">{currentCard.sectionHeading}</h2>
        <p className="sub-heading">{currentCard.subHeading}</p>
      </div>


      <div className="carousel-wrapper">
        {[-1, 0, 1].map((offset) => {
          const index = current + offset;
          if (index < 0 || index >= capabilityCards.length) return null;
          const card = capabilityCards[index];
          const absOffset = Math.abs(offset);
          const translateX = offset * 50;
          const scale = offset === 0 ? 1 : 0.8;
          const opacity = offset === 0 ? 1 : 0.4;
          const zIndex = 10 - absOffset;
          const rotateY = offset * 8;

          return (
            <motion.div
              key={card.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              onClick={() => goTo(index)}
              className="custom-gradient-card"
              animate={{
                transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
                zIndex
              }}
              transition={{ type: "spring", stiffness: 360, damping: 55 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: 'center',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
            >
              {card.isCustomComponent && card.presentationDataIndex !== undefined ? (
                <PresentationCard
                  heading={presentationCardsData[card.presentationDataIndex].heading}
                  items={presentationCardsData[card.presentationDataIndex].items}
                />
              ) : (
                <h3>{card.title}</h3>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="carousel-indicators">
        {capabilityCards.slice(start, end).map((_, index) => {
          const actualIndex = index + start;
          return (
            <button
              key={actualIndex}
              onClick={() => goTo(actualIndex)}
              className={`indicator-dot ${actualIndex === current ? 'active' : ''}`}
            />
          );
        })}
      </div>

      <div className="para">
        Send us your requirements, and get a response within 10 minutes
        <p className="sub_para">That's how we keep ourselves Faster than the Fastest</p>
      </div>

      
      <button className="get" onClick={handleGetInTouchClick}>Get in Touch</button>
      {isFormOpen && <ContactForm
        selectedServiceFromCard={currentCard.title}
        triggerForm={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />}
    </div>
  );
};

export default ServicesCarousel;
