'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from "framer-motion";

// Framer Motion animation variants
const leftFollow = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

const rightFollow = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

export default function Home() {
  // FAQ state management - moved outside map to fix React Hooks violation
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const partners = [
    { name: 'Binace BUSD', logo: '/partners/binance.svg' },
    { name: 'Amber', logo: '/partners/amber.svg' },
    { name: 'XPA', logo: '/partners/xpa.svg' },
    { name: 'Etherium', logo: '/partners/ethereum.svg' },
    { name: 'TRX', logo: '/partners/trx.svg' }
  ];

  const features = [
    {
      title: 'Immutable',
      icon: '/future/immutable.svg',
      description: 'Arcu pharetra venenatis amet tortor sagittis hendrerit porta. Faucibus nec risus purus ornare sodales ac cursus. Sed est amet suscipit faucibus tortor.'
    },
    {
      title: 'Maximum control',
      icon: '/future/maximum.svg',
      description: 'Odio placerat cursus nulla venenatis semper et. Urna risus quisque feugiat pretium hac malesuada purus ornare sodales turpis nisi est.'
    },
    {
      title: 'Minimal dependencies',
      icon: '/future/minimal.svg',
      description: 'Leo quam feugiat eget tincidunt gravida velit purus ornare sodales quisque risus enim. Sodales mattis at vitae volutpat neque.'
    }
  ];

  const faqs = [
    {
      question: 'How will Universal Liquidity Protocol manage crypto volatility?',
      answer: 'Amet amet dictum praesent mi diam diam. Volutpat facilisis sit sociis sagittis id massa ultricies. Arcu aenean gravida ornare elit nullam cras volutpat in scelerisque.'
    },
    {
      question: 'Where are my deposited funds stored?',
      answer: 'Risus quam facilisis velit pulvinar rhoncus lobortis amet tincidunt. Non porta cursus turpis amet. Massa semper vel natoque pharetra iaculis nullam.'
    },
    {
      question: 'How much can I earn by providing liquidity to Universal Liquidity Protocol?',
      answer: 'Turpis pellentesque vitae blandit purus arcu potenti egestas id. Id mi non dui.'
    },
    {
      question: 'How much do I have to wait to withdraw my money?',
      answer: 'Massa semper vel natoque pharetra iaculis nullam. Turpis pellentesque vitae blandit purus arcu potenti egestas id.'
    }
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 max-w-screen overflow-x-hidden">
      <div className='w-[360px] h-[360px] scale-[2] rounded-full blur-[100px] md:blur-[180px] bg-blue-primary opacity-40 absolute -top-20 left-0 -z-[1]' />
      {/* Hero Section */}
      <section className="relative py-10 md:pt-32 md:pb-40">
        <div className="max-w-[1096px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <motion.div
                className="herovariants"
                initial="hidden"
                animate="visible"
                custom={0}
                variants={leftFollow}
              >
                <h1 className="text-3xl md:text-5xl font-cleanow mb-[30px] text-blue-light leading-tight text-shadow-[-3px_3px_var(--blue-deep)]">
                  {['V', 'i', 'c', 't', 'o', 'r','P','r','o','t','o','c','o','l'].map((word, index) => (
                    <span
                      key={index}
                      className="wave-text inline-block text-6xl"
                      style={{
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      {word}{index < 5 ? ' ' : ''}
                    </span>
                  ))}
                  <br />will accelerate your business
                </h1>
                <p className="text-sm md:text-xl text-blue-light mb-10 font-cleanow">
                  Start building your smart contract with Victor Protocol
                </p>
                <button className="bg-gradient-blue-primary text-white px-4 py-3 rounded-full font-cleanow text-xl hover:bg-gradient-blue-sky transition-all border-[4px] border-blue-light shadow-[0_0_20px_var(--blue-primary)]">
                  CREATE A CONTRACT
                </button>
              </motion.div>
            </div>
            
          </div>
        </div>
          <video
            src="/Untitled design.mp4"
            autoPlay
            loop
            muted
            playsInline
            className='absolute right-50 top-20 hidden md:block w-[420px] h-[450px] rounded-3xl object-cover object-center'
          />

      </section>

    </div>
  );
}
