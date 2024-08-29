'use client';

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Book, Menu } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  route: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', route: '/' },
  { label: 'Search', route: '/search' },
  { label: 'About', route: '/about' },
  { label: 'Contact', route: '/contact' },
];

const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="sm:hidden flex justify-between px-8 items-center bg-[#f5f1e6] h-16 sticky top-0 py-8 z-20 border-b border-[#c2b280] shadow-md">
      <div className="text-3xl font-serif font-bold text-[#3e2f1c] flex items-center w-fit">
        <Book className="size-6 text-[#8b7b58] mr-2" />
        <span className="text-lg">Libra<span className="text-[#8b7b58]">.</span></span>
      </div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="hover:text-[#6b5a43] transition-colors bg-transparent">
              <Menu size={24} className="text-[#8b7b58]" />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[300px] sm:w-[400px] bg-[#f4e4c1] border-l border-[#c2b280] shadow-lg'>
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center mb-8">
                <Book className="w-8 h-8 text-[#8b7b58] mr-2" />
                <span className="text-2xl font-serif font-bold text-[#3e2f1c]">
                  Libra<span className="text-[#8b7b58]">.</span>
                </span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.route}>
                    <Link
                      href={link.route}
                      className={`text-lg font-medium py-2 px-4 rounded-md transition-colors ${
                        pathname === link.route
                          ? 'bg-[#8b7b58] text-white'
                          : 'text-[#5b4636] hover:text-[#3e2f1c] hover:bg-[#e6d4b8]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNav;
