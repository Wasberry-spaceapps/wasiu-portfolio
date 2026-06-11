import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from "lucide-react";

interface ContactProps {
  email: string;
  phone?: string;
  location: string;
  onInquirySubmit: (name: string, email: string, subject: string, message: string) => void;
}

export default function Contact({ email, phone, location, onInquirySubmit }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSucceeded, setSubmitSucceeded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate network delay for production fidelity
    setTimeout(() => {
      onInquirySubmit(formData.name, formData.email, formData.subject || "General Correspondence", formData.message);
      setIsSubmitting(false);
      setSubmitSucceeded(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear success banner after 8 seconds
      setTimeout(() => {
        setSubmitSucceeded(false);
      }, 8000);
    }, 1250);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF6EE] border-t border-[#E5DDD0]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#7A7366] uppercase flex items-center gap-1.5 font-bold">
            <Sparkles size={11} className="text-[#7A7366]" />
            05 / Correspondence
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#2E2C29]">
            Initiate Correspondence
          </h2>
          <div className="w-16 h-[2.5px] bg-[#4E5B4F] mt-1.5"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="font-display text-xl font-bold tracking-tight text-[#2E2C29]">
              Postal & Digital Coordinates
            </h3>
            <p className="text-sm sm:text-base text-[#5D574F] font-medium leading-relaxed max-w-sm">
              Whether you wish to discuss health, technology, writing, or collaboration, feel free to reach out.
            </p>

            <div className="flex flex-col gap-6 mt-2">
              {/* Email Detail Card */}
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-xl text-[#4E5B4F]">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-mono tracking-wider font-bold text-[#7A7366] uppercase">
                    Email Coordinates
                  </span>
                  <a
                    id="contact-detail-email"
                    href={`mailto:${email}`}
                    className="text-sm font-bold text-[#2E2C29] hover:text-[#4E5B4F] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Phone Detail Card */}
              {phone && (
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-[#FBF9F4] border border-[#E5DDD0] rounded-xl text-[#4E5B4F]">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-mono tracking-wider font-bold text-[#7A7366] uppercase">
                      Direct Voice Channel
                    </span>
                    <a
                      id="contact-detail-phone"
                      href={`tel:${phone}`}
                      className="text-sm font-bold text-[#2E2C29] hover:text-[#4E5B4F] transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}


            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:col-span-7 bg-[#FBF9F4] border border-[#E5DDD0] rounded-xl p-6 sm:p-8 shadow-2xs">
            <AnimatePresence mode="wait">
              {submitSucceeded ? (
                <motion.div
                  id="contact-success-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-8 gap-4"
                >
                  <div className="p-3 bg-[#FAF6EE] border border-[#E5DDD0] rounded-full text-[#4E5B4F] shadow-2xs">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="flex flex-col gap-2 max-w-md">
                    <h4 className="font-display font-extrabold text-lg text-[#2E2C29] tracking-tight">
                      Correspondence Saved!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5D574F] font-medium leading-relaxed">
                      Your message has been safely indexed in the archive. You can click on the{" "}
                      <strong>"Customize Site"</strong> button in the main header to read your submitted coordinates inside the live{" "}
                      <strong>Inbox Manager</strong> dashboard logs.
                    </p>
                  </div>
                  <button
                    id="btn-contact-again"
                    onClick={() => setSubmitSucceeded(false)}
                    className="mt-2 text-xs font-bold tracking-tight text-white bg-[#2E2C29] hover:bg-[#3E3A35] px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Submit Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  id="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-mono font-bold text-[#7A7366] uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="px-4 py-2.5 text-sm bg-[#FAF6EE] border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#4E5B4F] text-[#2E2C29] placeholder-[#7A7366]/40 transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-mono font-bold text-[#7A7366] uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alao@oxford.ac.uk"
                        className="px-4 py-2.5 text-sm bg-[#FAF6EE] border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#4E5B4F] text-[#2E2C29] placeholder-[#7A7366]/40 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-mono font-bold text-[#7A7366] uppercase">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Radical Pamphlet Essay Commission..."
                      className="px-4 py-2.5 text-sm bg-[#FAF6EE] border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#4E5B4F] text-[#2E2C29] placeholder-[#7A7366]/40 transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-mono font-bold text-[#7A7366] uppercase">
                      Detailed Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your scholarly inquiry or message..."
                      className="px-4 py-2.5 text-sm bg-[#FAF6EE] border border-[#E5DDD0] rounded-lg focus:outline-none focus:border-[#4E5B4F] text-[#2E2C29] placeholder-[#7A7366]/40 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto self-end text-sm font-bold text-white bg-[#2E2C29] hover:bg-[#3E3A35] disabled:bg-[#DDD5C5] rounded-full transition-all cursor-pointer select-none active:scale-99 shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Securing Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Correspondence</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
