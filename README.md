Clone the repo

git clone git@github.com:Meshack-Odunowe/Book-search-app.git

cd book-app

Install the dependencies
npm install

Create a .env.local file in the root directory and add your Google Books API key:

NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=AIzaSyBOawfLr4zE7twoTacRN1RC152_Es6Kx0o

Update next.config.mjs to allow image domains for book thumbnails.

module.exports = {
  images: {
    domains: ['books.google.com'],
  },
};

To run the development server, run 
npm run dev

Open http://localhost:3000 with your browser to see the result.