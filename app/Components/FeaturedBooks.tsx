import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

interface VolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail: string;
  };
  infoLink?: string;
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

const FeaturedBooks: React.FC = () => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 10;

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=40'
      );
      setBookData(response.data.items || []);
      setTotalPages(Math.ceil((response.data.items?.length || 0) / booksPerPage));
    } catch (error) {
      console.error('Error fetching featured books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchBook = async () => {
    if (!search.trim()) return;
    setIsLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    try {
      const response = await axios.get<{ items: Book[] }>(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${apiKey}&maxResults=40`
      );
      setBookData(response.data.items || []);
      setTotalPages(Math.ceil((response.data.items?.length || 0) / booksPerPage));
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const paginatedBooks = bookData.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  return (
    <div className="mt-20 px-4">
      <h2 className="text-3xl font-serif font-bold text-[#3e2f1c] mb-8 text-center">Featured Books</h2>

      <SearchBar search={search} setSearch={setSearch} onSearch={searchBook} />

      {isLoading ? (
        <div className="flex justify-center items-center h-56">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b7b58]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {paginatedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default FeaturedBooks;
