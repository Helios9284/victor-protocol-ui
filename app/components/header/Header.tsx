'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ConnectionButton } from '../ConnectionButton/ConnectionButton';

export const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Swap', path: '/swap' },
    { name: 'Future development', path: '/future' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full py-4 px-4 md:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Victor Protocol Logo"
            width={58}
            height={43}
            className="w-10 h-auto md:w-[58px]"
          />
          <span className="text-blue-light font-semibold font-cleanow text-sm md:text-xl text-shadow-[-3px_3px_var(--blue-deep)]">
            Victor<br /> Protocol
          </span>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-blue-light font-cleanow font-semibold hover:text-blue-primary transition-colors ${pathname === item.path ? 'text-blue-primary border-b-2 border-blue-primary' : ''
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className='hidden md:block'>
          <ConnectionButton />
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-deep py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-blue-light hover:text-blue-primary transition-colors ${pathname === item.path ? 'text-blue-primary border-l-2 border-blue-primary pl-2' : 'pl-2'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <ConnectionButton />
          </nav>
        </div>
      )}
    </header>
  );
}; 