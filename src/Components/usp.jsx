// usp.jsx
import React from "react";
import "./usp.css";

export default function Usp() {
  const steps = [
    { number: "10", label: "Minutes", action: "Acknowledge Request" },
    { number: "20", label: "Minutes", action: "Allocate Experts" },
    { number: "30", label: "Minutes", action: "Begin Assignment" },
  ];

  const cards = [
    {
      front: "Consistently High Quality",
      back: "Technology brings us high-quality services. Ex-consultants from top consulting firms ensure excellence. Read More",
    },
    {
      front: "Round the Clock Availability",
      back: "Our team is available 24/7 to support your needs anytime, anywhere. Read More",
    },
    {
      front: "Faster than the Fastest",
      back: "We pride ourselves on delivering results quicker than the industry standards. Read More",
    },
    {
      front: "Information Security",
      back: "Certified ISO standards ensure your data is protected with utmost security. Read More",
    },
  ];

  return (
    <div className="usp-wrapper">
      <h2 className="usp-heading">What makes us so special?</h2>
      <div className="usp-container">
        {/* Left Side */}
        <div className="usp-left">
          <h3 className="rule-heading">The 10-20-30 Rule at EZ</h3>
          <div className="rule-timeline">
            {steps.map((step, index) => (
              <div key={index} className="rule-step">
                <div className="rule-dot-line">
                  <div className="rule-dot"></div>
                  {index !== steps.length - 1 && <div className="rule-line"></div>}
                </div>
                <div className="rule-content">
                  <div className="rule-number-label">
                    <div className="rule-number">{step.number}</div>
                    <div className="rule-label">{step.label}</div>
                  </div>
                  <div className="rule-action">{step.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="usp-right">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-inner">
                <div className="card-front">{card.front}</div>
                <div className="card-back">{card.back}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
