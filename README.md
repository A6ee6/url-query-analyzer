# URL Query String Analyzer

A simple web application that takes a URL (including shortened URLs) and displays all query parameters in a clean table format. The app automatically follows redirects to get the final URL before extracting the query parameters.

## Features

- Handles both direct URLs and shortened URLs (like bit.ly, tinyurl, etc.)
- Automatically follows redirects to get the final URL
- Displays all query parameters in a sortable table
- Shows the final resolved URL
- Mobile-responsive design

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Enter a URL (with or without query parameters) in the input field
2. Click "Analyze" or press Enter
3. View the extracted query parameters in the table below
4. The app will show the final URL after all redirects

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Node.js (for API routes)

## License

MIT
