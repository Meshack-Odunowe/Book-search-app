import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { Book as BookIcon } from 'lucide-react';
import BookCard from './BookCard';
import SearchBar from './SearchBar';
import GoBackButton from './GoBackButton';

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
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState("");
  const maxResults = 10;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchBooks = useCallback(async (reset: boolean = false) => {
    if (isLoading || (!reset && !hasMore)) return;
    setIsLoading(true);
    setError("");
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const query = search.trim() ? search : 'subject:fiction';
    const newStartIndex = reset ? 0 : startIndex;
    try {
      const response = await axios.get<{ items: Book[], totalItems: number }>(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}&startIndex=${newStartIndex}&maxResults=${maxResults}&orderBy=relevance`
      );
      
      if (response.data.totalItems === 0) {
        setError("No books found. Please try a different search term.");
        setBookData([]);
        setHasMore(false);
      } else {
        if (reset) {
          setBookData(response.data.items || []);
          setTotalItems(response.data.totalItems);
        } else {
          setBookData(prevData => [...prevData, ...(response.data.items || [])]);
        }
        
        setStartIndex(newStartIndex + maxResults);
        setHasMore((newStartIndex + maxResults) < response.data.totalItems);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setError("An error occurred while fetching books. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [search, startIndex, isLoading, hasMore]);

  useEffect(() => {
    fetchBooks(true);
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      fetchBooks();
    }
  }, [inView, hasMore, fetchBooks]);

  const handleSearch = () => {
    setStartIndex(0);
    setHasMore(true);
    fetchBooks(true);
  };

  return (
    <div className="mt-20 px-4 max-w-5xl mx-auto">
      
      <h2 className="text-3xl font-serif font-bold text-[#3e2f1c] mb-8 text-center">Discover New Reads</h2>

      <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
      <GoBackButton />
      {error && (
        <div className="flex flex-col items-center justify-center mt-8 animate-fade-in">
          <BookIcon size={64} className="text-[#8b7b58] mb-4" />
          <p className="text-xl text-[#3e2f1c] text-center">{error}</p>
        </div>
      )}

      {!error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {bookData.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-20 mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b7b58]"></div>
        </div>
      )}

      {hasMore && !isLoading && !error && (
        <div ref={ref} className="h-20"></div>
      )}

      {!hasMore && bookData.length > 0 && !error && (
        <p className="text-center mt-8 text-[#3e2f1c] italic">
          Showing all {bookData.length} books
        </p>
      )}
    </div>
  );
};

export default FeaturedBooks;