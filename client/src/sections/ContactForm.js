import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Contactform.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      alert('Form submitted successfully!'); 
      console.log('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error while submitting form:', error);
    }
  };

  return (
    <div className='siva123'>  
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}> 
        <div className="form-group33">
          <label htmlFor="name" className="label">Name:</label>
          <input type="text" id="name" name="name" className="input" value={formData.name} onChange={handleChange} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group32">
          <label htmlFor="email" className="label">Email:</label>
          <input type="email" id="email" name="email" className="input" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group31">
          <label htmlFor="phone" className="label">Phone:</label>
          <input type="tel" id="phone" name="phone" className="input" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group30">
          <label htmlFor="message" className="label">Message:</label>
          <textarea id="message" name="message" className="input" value={formData.message} onChange={handleChange} rows="4" required></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
   
    </div>

  );
}

export default ContactForm;
