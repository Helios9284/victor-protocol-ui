'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Image carousel - add your image paths here
  const carouselImages = [
    '/intro2.png',
    '/intro3.png',
    '/intro4.png',
    '/intro5.png',
    '/intro6.png',
   
  ];

  // Auto-cycle through images
  useEffect(() => {
    if (carouselImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Protocol Launch & Foundation",
      description: "Initial deployment of SVU protocol on MultiversX with core governance features and POL vaults.",
      status: "completed",
      date: "Q1 2024",
    },
    {
      phase: "Phase 2",
      title: "Governance Dashboard",
      description: "Launch of sleek governance UI with voting power visualization, proposal creation, and real-time voting.",
      status: "completed",
      date: "Q2 2024",
    },
    {
      phase: "Phase 3",
      title: "Advanced Features",
      description: "Implementation of advanced DeFi tools, multi-chain support, and enhanced POL management.",
      status: "in-progress",
      date: "Q3 2024",
    },
    {
      phase: "Phase 4",
      title: "Ecosystem Expansion",
      description: "Partnership integrations, cross-chain bridges, and community-driven protocol enhancements.",
      status: "upcoming",
      date: "Q4 2024",
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 max-w-screen overflow-x-hidden relative">
      <div className='w-[360px] h-[360px] scale-[2] rounded-full blur-[100px] md:blur-[180px] bg-blue-primary opacity-60 absolute top-20 left-0 z-15' />
      <div 
        className="absolute top-20 left-0 right-0 bottom-0 bg-[url('/landing.png')] bg-no-repeat bg-cover bg-center -z-10"
        style={{
          opacity: 0.15
        }}
      ></div>
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
                <p className="text-sm md:text-xl text-black-light mb-10 font-cleanow">
                  Start building your smart contract with Victor Protocol
                </p>
                <button className="bg-gradient-blue-primary text-white px-4 py-3 rounded-full font-cleanow text-xl hover:bg-gradient-blue-sky transition-all border-[4px] border-blue-light shadow-[0_0_20px_var(--blue-primary)]">
                  CREATE A CONTRACT
                </button>
              </motion.div>
            </div>
            
          </div>
        </div>
        {/* Animated Image Carousel with Stack Effect */}
        <div className='absolute right-50 top-20 hidden md:block w-[380px] h-[420px]'>
          {carouselImages.map((imageSrc, index) => {
            const position = (index - currentImageIndex + carouselImages.length) % carouselImages.length;
            const isActive = position === 0;
            const isNext = position === 1;
            if (position > 1 && position < carouselImages.length - 1) return null;

            return (
              <motion.div
                key={`${imageSrc}-${index}`}
                className="absolute inset-0"
                initial={isActive ? { opacity: 0, scale: 0.9, x: 50, rotateY: -15 } : false}
                animate={{
                  scale: isActive ? 1 : isNext ? 0.75 : 0.6,
                  x: isActive ? 0 : isNext ? 100 : 40,
                  y: isActive ? 0 : isNext ? -40 : -30,
                  zIndex: isActive ? 3 : isNext ? 2 : 1,
                  opacity: isActive ? 1 : isNext ? 0.8 : 0.3,
                  rotateY: isActive ? 0 : isNext ? -5 : -8,
                  filter: isActive ? 'blur(0px)' : isNext ? 'blur(1px)' : 'blur(5px)',
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  initial={isActive ? { opacity: 0, y: 30 } : false}
                  animate={{
                    opacity: isActive ? 1 : isNext ? 0.7 : 0.4,
                    y: isActive ? 0 : isNext ? 10 : -10,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isActive ? 0.2 : 0,
                  }}
                  className="w-full h-full"
                >
                  <Image
                    src={imageSrc}
                    alt={`Carousel image ${index + 1}`}
                    width={300}
                    height={350}
                    className='w-full h-full rounded-3xl object-contain shadow-2xl'
                    priority={isActive}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>
      <motion.div
          className="introduction mt-[200px] relative"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={rightFollow}
      >
      <div className='absolute w-[600px] h-[200px] blur-[80px] md:blur-[180px] bg-blue-primary opacity-50 -top-[200px] right-0 -z-[1]'></div>
        
        <section className="relative">
          <div className='max-w-[1096px] mx-auto px-6'>
            {/* Header Section */}
            <div className="mb-[30px] md:mb-[60px]">
              <h2 className="text-3xl md:text-[50px] font-bold text-center font-cleanow text-blue-primary text-shadow-[-3px_3px_var(--blue-deep)]">
                INTRODUCING SVU PROTOCOL
              </h2>
            </div>

            {/* Image and Content Sections */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image Section */}
              <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto ">
                <video
                  src="/Untitled design.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className='w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[400px] lg:h-[400px] rounded-3xl object-center'
                />

              </div>
              
              {/* Content Section */}
              <div className="flex-1 w-full">
                <div className="space-y-8">
                  <div>
                    <div className='mb-4 flex items-center gap-4'>
                      <div className='rounded-full bg-gradient-to-r bg-linear-to-r from-[#87CEEB] to-[#00BFFF] w-[15px] h-[15px] shadow-[0_0_8px_var(--blue-primary)]'></div>
                      <h3 className="text-base md:text-2xl font-semibold text-blue-primary">
                        Next-Generation DeFi on MultiversX
                      </h3>
                    </div>
                    <p className="text-xs md:text-base text-blue-primary ml-[31px]">
                      SVU is a next-generation DeFi protocol on MultiversX that empowers its community through transparent, token-holder governance, Protocol-Owned Liquidity (POL) vaults, and intuitive on-chain tools — all managed from one clean dashboard.
                    </p>
                  </div>
                  <div>
                    <div className='mb-4 flex items-center gap-4'>
                      <div className='rounded-full bg-gradient-to-r bg-linear-to-r from-[#87CEEB] to-[#00BFFF] w-[15px] h-[15px] shadow-[0_0_8px_var(--blue-primary)]'></div>
                      <h3 className="text-base md:text-2xl font-semibold text-blue-primary">
                        Community-Driven Governance
                      </h3>
                    </div>
                    <p className="text-xs md:text-base text-blue-primary ml-[31px]">
                      By holding SVU tokens, users gain real voting power to propose, vote on, and execute key protocol decisions — from reward adjustments to new features — in just a few simple steps.
                    </p>
                  </div>
                  <div>
                    <div className='mb-4 flex items-center gap-4'>
                      <div className='rounded-full bg-gradient-to-r bg-linear-to-r from-[#87CEEB] to-[#00BFFF] w-[15px] h-[15px] shadow-[0_0_8px_var(--blue-primary)]'></div>
                      <h3 className="text-base md:text-2xl font-semibold text-blue-primary">
                        Sleek Governance Dashboard
                      </h3>
                    </div>
                    <p className="text-xs md:text-base text-blue-primary ml-[31px]">
                      Connect your wallet, view your voting power, browse active proposals with clear vote breakdowns, and directly shape the future of the protocol.
                    </p>
                  </div>
                  <p className="text-sm md:text-xl font-semibold text-blue-primary mt-8">
                    <span className="text-blue-primary">SVU PROTOCOL</span> provides the building blocks that make all this possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      
    </div>
  );
}
