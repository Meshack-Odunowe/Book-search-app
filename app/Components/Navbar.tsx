import { Book } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="w-full fixed top-0  left-0 sm:flex hidden justify-between items-center bg-[#f5f1e6] py-8 px-12 shadow-md border-b border-[#c2b280] z-50">
        <Link href={'/'} className="text-3xl font-serif font-bold text-[#3e2f1c] flex items-center">
          <Book className="w-10 h-10 text-[#8b7b58] mr-2" />
          <span>Libra<span className="text-[#8b7b58]">.</span></span>
        </Link>
        <div className="space-x-6">
          {['Home', 'Search', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[#5b4636] hover:text-[#3e2f1c] transition-colors font-medium"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>
      {/* Placeholder div to offset content below the fixed navbar */}
      <div className="h-20"></div>
    </div>
  );
};

export default Navbar;
