"use client";

import { useState } from "react";
import { post } from "@/lib/api/client";

const FAQS = [
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery for a full refund, provided items remain in pristine condition with original tags attached.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship globally via insured courier services. Duties and taxes are calculated at checkout based on the destination.",
  },
  {
    question: "How can I book a private viewing?",
    answer:
      "Private viewings can be arranged at our flagship locations by selecting 'Book an Appointment' in the contact form above.",
  },
];

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await post("/api/contact", {
      first_name: firstName,
      last_name: lastName,
      email,
      inquiry_type: inquiryType,
      message,
    });

    setLoading(false);

    if (result.ok) {
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setInquiryType("general");
      setMessage("");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  function toggleFaq(index: number) {
    setOpenFaq(openFaq === index ? null : index);
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <a className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-pure-white" href="/">AETHER</a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="nav-link text-on-surface-variant hover:text-pure-white transition-colors font-body-md text-body-md" href="/collections">Collections</a>
            <a className="nav-link text-on-surface-variant hover:text-pure-white transition-colors font-body-md text-body-md" href="/">New Arrivals</a>
            <a className="nav-link text-on-surface-variant hover:text-pure-white transition-colors font-body-md text-body-md" href="/curations">Curations</a>
            <a className="nav-link text-on-surface-variant hover:text-pure-white transition-colors font-body-md text-body-md" href="/collections">Boutique</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-pure-white transition-all duration-300 opacity-100 hover:opacity-80 scale-100 hover:scale-95">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
            </button>
            <button className="text-on-surface-variant hover:text-pure-white transition-all duration-300 opacity-100 hover:opacity-80 scale-100 hover:scale-95">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative h-[409px] min-h-[300px] flex items-center justify-center bg-pitch-black">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-40"
              data-alt="A cinematic, high-contrast abstract composition of softly undulating dark fabric in a pitch black void. Lighting is extremely subtle, highlighting only the crests of the fabric folds in a silvery white, creating a luxurious, moody, minimal aesthetic."
              style={{ backgroundImage: "url('/assets/stitch/stitch-08.jpg')" }}
            ></div>
          </div>
          <div className="relative z-10 text-center px-margin-mobile">
            <h1 className="font-display-xl text-display-lg-mobile md:text-display-xl text-pure-white uppercase">Contact Us</h1>
            <p className="font-body-lg text-body-lg text-silver-mist mt-4 max-w-2xl mx-auto">We are here to assist you with inquiries, appointments, and bespoke services.</p>
          </div>
        </section>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          <div className="lg:col-span-7">
            <div className="bg-surface-deep rounded-lg p-8 md:p-12">
              <h2 className="font-headline-md text-headline-md text-pure-white mb-8">Send a Message</h2>

              {success && (
                <div className="mb-6 p-4 border border-secondary-container bg-secondary-container/10 text-secondary-container font-body-md text-body-md">
                  Your inquiry has been received. Our concierge team will be in touch shortly.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 border border-primary-container bg-primary-container/10 text-primary-container font-body-md text-body-md">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-silver-mist block mb-2" htmlFor="firstName">First Name</label>
                    <input
                      className="input-field w-full p-4 font-body-md text-body-md"
                      id="firstName"
                      placeholder="Enter your first name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-silver-mist block mb-2" htmlFor="lastName">Last Name</label>
                    <input
                      className="input-field w-full p-4 font-body-md text-body-md"
                      id="lastName"
                      placeholder="Enter your last name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-silver-mist block mb-2" htmlFor="email">Email Address</label>
                  <input
                    className="input-field w-full p-4 font-body-md text-body-md"
                    id="email"
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-silver-mist block mb-2" htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    className="input-field w-full p-4 font-body-md text-body-md appearance-none"
                    id="inquiryType"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="appointment">Book an Appointment</option>
                    <option value="press">Press &amp; Media</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-silver-mist block mb-2" htmlFor="message">Message</label>
                  <textarea
                    className="input-field w-full p-4 font-body-md text-body-md resize-none"
                    id="message"
                    placeholder="How can we assist you?"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  className="btn-primary w-full py-4 font-label-caps text-label-caps uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12 mt-12 lg:mt-0">

            <div className="bg-charcoal-canvas p-8 border border-surface-variant">
              <h3 className="font-headline-md text-headline-md text-pure-white mb-6">Direct Assistance</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-silver-mist" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                  <div>
                    <p className="font-label-caps text-label-caps text-silver-mist mb-1">Concierge Line</p>
                    <p className="font-body-lg text-body-lg text-pure-white">+1 (800) 555-0199</p>
                    <p className="font-body-md text-body-md text-surface-variant mt-1">Mon-Fri, 9am - 8pm EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-silver-mist" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                  <div>
                    <p className="font-label-caps text-label-caps text-silver-mist mb-1">Email</p>
                    <p className="font-body-lg text-body-lg text-pure-white">concierge@aetherluxury.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-surface-variant">
                <button className="btn-secondary w-full py-4 flex items-center justify-center gap-2 font-label-caps text-label-caps uppercase">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>chat_bubble</span>
                  Start Live Chat
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-headline-md text-headline-md text-pure-white mb-6">Frequently Asked</h3>
              <div className="space-y-4">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="accordion-item bg-pitch-black border border-surface-variant p-4 cursor-pointer"
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-body-lg text-body-lg text-pure-white">{faq.question}</h4>
                        <span
                          className="material-symbols-outlined accordion-icon text-silver-mist transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          expand_more
                        </span>
                      </div>
                      {isOpen && (
                        <div className="accordion-content mt-2">
                          <p className="font-body-md text-body-md text-silver-mist">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="bg-pitch-black w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="mb-8 md:mb-0">
            <span className="font-display-lg text-display-lg-mobile text-pure-white">AETHER</span>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8 mb-8 md:mb-0">
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/brand-story">Sustainability</a>
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Shipping</a>
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Returns</a>
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/brand-story">Privacy</a>
            <a className="font-body-md text-body-md text-pure-white hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Contact</a>
          </div>
          <div className="font-body-md text-body-md text-surface-variant">
            © 2024 AETHER LUXURY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
