"use client";
import React, { useState } from "react";
import styles from "./contactForm.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaUserAstronaut, FaUserNinja, FaEnvelope, FaGoogle, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Textarea } from "@nextui-org/react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendWhatsapp1 = () => {
    if (!name || !email || !message) {
      setError("Name, Email, and Message must be filled in!");
      return;
    }

    const whatsappNumber = "+6283152659353";
    const formattedPhoneNumber = whatsappNumber.replace(/\D/g, ""); // Remove non-digit characters
    const contact = `${formattedPhoneNumber}@c.us`;

    // Combine name, email, and message values into the message
    const fullMessage = `Name: ${name}%0AEmail: ${email}%0A${encodeURIComponent(message)}`;

    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${fullMessage}`;
    window.open(whatsappLink, "_blank");

    setIsFormSubmitted(true);
  };

  const handleSendWhatsapp2 = () => {
    if (!name || !email || !message) {
      setError("Name, Email, and Message must be filled in!");
      return;
    }

    const whatsappNumber = "+6282150941180";
    const formattedPhoneNumber = whatsappNumber.replace(/\D/g, ""); // Remove non-digit characters
    const contact = `${formattedPhoneNumber}@c.us`;

    // Combine name, email, and message values into the message
    const fullMessage = `Name: ${name}%0AEmail: ${email}%0A${encodeURIComponent(message)}`;

    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${fullMessage}`;
    window.open(whatsappLink, "_blank");

    setIsFormSubmitted(true);
  };

  const handleSendEmail = () => {
    if (!name || !email || !message) {
      setError("Name, Email, and Message must be filled in!");
      return;
    }

    const subject = "Message from Contact Form"; // Subject for the email
    const emailBody = `Name: ${name}%0AEmail: ${email}%0A${message}`; // Combine name, email, and message values into the email body

    const emailLink = `mailto:sales.kaltimfolks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`; // Construct the email link with subject and message

    window.open(emailLink, "_blank"); // Open default email client with pre-filled information

    setIsFormSubmitted(true);
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Let&apos;s Collaborate with <Link className={styles.logo} href="/"> KALTIMFOLKS. </Link></h3>
        {!isFormSubmitted ? (
          <form className={styles.form}>
            <div className={styles.input}>
              <Input 
                type="text" 
                placeholder="Your Name" 
                name="name" 
                value={name} 
                onChange={handleChangeInput} 
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  border: 'none',
                  borderRadius: '7px',
                  boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
                  outline: 'none'
                }}
              />
              <Input 
                type="email" 
                placeholder="Your Email" 
                name="email" 
                value={email} 
                onChange={handleChangeInput} 
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  border: 'none',                    
                  borderRadius: '7px',
                  boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
                  outline: 'none'
                }}
              />
              <Textarea
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  border: 'none',
                  borderRadius: '7px',
                  boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
                  outline: 'none'
                }}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles["input-button"]}>
              <Button type="button" className={styles.button} onClick={handleSendEmail}> <FaEnvelope/>Send to Email</Button>
              <Popover placement="bottom" className="popover" showArrow offset={10}>
                <PopoverTrigger>
                  <Button className={styles.button}>
                    <FaWhatsapp className="icon" /> Send to WhatsApp
                  </Button>
                </PopoverTrigger>

                <PopoverContent className={styles["popover-content"]}>
                  <div className={styles.popoverbutton}>
                    <Button type="button" className={styles.button} onClick={handleSendWhatsapp1}>
                      <FaUserAstronaut className={styles.icon} /> George (CEO)
                    </Button>
                    <Button type="button" className={styles.button} onClick={handleSendWhatsapp2}>
                      <FaUserNinja className={styles.icon} /> Dede (AE)
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="head-text">
              Thank you for getting in touch!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactForm;