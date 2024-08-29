import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Book as BookIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getBookDetails(id: string) {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
}

export default async function BookDetails({ params }: { params: { id: string } }) {
  const book = await getBookDetails(params.id);

  if (!book) {
    notFound();
  }

  const bookLink = book.volumeInfo.previewLink || book.volumeInfo.infoLink;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-[#f4e4c1] border border-[#c2b280] rounded-lg shadow-lg overflow-hidden transition hover:shadow-2xl">
        {/* Image Section */}
        <div className="">
          {book.volumeInfo.imageLinks ? (
            <Image
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={`Cover of ${book.volumeInfo.title}`}
              width={200}
              height={300}
              className="relative  h-80 shadow-lg py-2 px-2 rounded-t-lg border-b  bg-[#f5f1e6] transform hover:rotate-1 hover:scale-105  mx-auto transition-transform duration-300 border-4 border-[#e6d4b8] "
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-[#d8c4a0]">
              <BookIcon size={56} className="text-[#8b7b58]" />
            </div>
          )}
          
        </div>

        {/* Content Section */}
        <div className="p-8 bg-[#faf3e0]">
          <h1 className="text-3xl font-serif font-bold text-[#3e2f1c] mb-4">{book.volumeInfo.title}</h1>
          {book.volumeInfo.authors && (
            <p className="text-lg font-serif text-[#5b4636] mb-4">By: {book.volumeInfo.authors.join(', ')}</p>
          )}
          {book.volumeInfo.description && (
            <div
              className="text-[#4e3b2b] mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            />
          )}
          <div className="text-sm text-[#5b4636] space-y-2">
            {book.volumeInfo.publishedDate && (
              <p>Published: <span className="font-medium">{book.volumeInfo.publishedDate}</span></p>
            )}
            {book.volumeInfo.pageCount && (
              <p>Pages: <span className="font-medium">{book.volumeInfo.pageCount}</span></p>
            )}
            {book.volumeInfo.categories && (
              <p>Categories: <span className="font-medium">{book.volumeInfo.categories.join(', ')}</span></p>
            )}
            {book.volumeInfo.averageRating && (
              <p>Rating: <span className="font-medium">{book.volumeInfo.averageRating}/5</span></p>
            )}
          </div>
          {bookLink && (
            <Link
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-[#6b4f2b] hover:text-[#3e2f1c] underline font-medium transition-colors"
            >
              Read or Buy this Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
