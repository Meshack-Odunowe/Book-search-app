import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center mt-8">
    <Button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="mr-2 bg-[#8b7b58] text-white hover:bg-[#6b5a43] transition-colors disabled:opacity-50"
    >
      <ChevronLeft size={24} />
    </Button>
    <span className="mx-4 font-serif text-[#3e2f1c]">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="ml-2 bg-[#8b7b58] text-white hover:bg-[#6b5a43] transition-colors disabled:opacity-50"
    >
      <ChevronRight size={24} />
    </Button>
  </div>
);

export default Pagination;
