import React, { useState, useRef, useEffect } from 'react';
import './form.css';
import './service.css';

const ContactForm = ({ selectedServiceFromCard = '', triggerForm = false, onClose }) => {
  const [servicesOptions, setServicesOptions] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [open, setOpen] = useState(triggerForm);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    promotionalEmails: false,
  });

  const fetchServices = async () => {
    try {
      const response = await fetch('https://test.ezworks.ai/form-api');
      const data = await response.json();
      if (Array.isArray(data?.services)) {
        setServicesOptions(data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    if (triggerForm) {
      setOpen(true);
    }
  }, [triggerForm]);

  useEffect(() => {
    if (open) {
      fetchServices();
      setSelectedService(selectedServiceFromCard); // pre-fill service when modal opens
    }
  }, [open, selectedServiceFromCard]);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleRemoveService = () => {
    setSelectedService('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, promotionalEmails: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      service: selectedService,
    };

    try {
      const response = await fetch('http://localhost:5000/api/send-requirement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Error submitting form:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
        setSubmitted(false);
        onClose?.(); // notify parent
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* 👉 This is your "Get in Touch" Button */}
      <button
        className="get"
        onClick={() => {
          setSelectedService(selectedServiceFromCard); // manually link service
          setOpen(true);
        }}
      >
        Get in Touch
      </button>

      {open && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content" ref={modalRef}>
            <span
              className="close"
              onClick={() => {
                setOpen(false);
                setSubmitted(false);
                onClose?.(); // notify parent
              }}
            >
              &times;
            </span>

            {!submitted ? (
              <div className="contact-form-container">
                <div className="contact-left" />
                <div className="contact-right">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Mobile Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />

                    <div className="service-dropdown">
                      <select onChange={handleServiceChange} value={selectedService} required>
                        <option value="">Service</option>
                        {servicesOptions.map((service, idx) => (
                          <option key={idx} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>

                      {selectedService && (
                        <div className="selected-service">
                          {selectedService}
                          <button type="button" onClick={handleRemoveService}>
                            ×
                          </button>
                        </div>
                      )}
                    </div>

                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                    />

                    <div className="promo-checkbox">
                      <input
                        type="checkbox"
                        id="promo"
                        checked={formData.promotionalEmails}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="promo">I would like to receive promotional emails</label>
                    </div>

                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="success-message">
                <h2>Thank you!</h2>
                <p>Your message has been received. We'll contact you shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
