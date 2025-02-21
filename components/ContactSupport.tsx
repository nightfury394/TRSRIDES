"use client";
import { MessageCircle, Phone, X } from "lucide-react";
import React, { useState } from "react";

const ContactSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = "https://wa.me/1234567890";
  const phoneNumber = "tel:+1234567890";

  return (
    <div className="fixed bottom-4 right-6 flex flex-col items-end gap-2">
      {/* Floating Button (Toggles Contact Options) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-gray-800 transition flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-2">
          <a
            href={phoneNumber}
            className="bg-blue-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-600 transition flex items-center justify-center"
          >
            <Phone className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactSupport;
