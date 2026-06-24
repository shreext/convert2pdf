# Convert2PDF

A lightweight Node.js service to convert office documents and images to PDF (and perform related PDF operations) using LibreOffice.

## Project Overview

This repository hosts a small Express application that accepts file uploads and converts them to PDF using LibreOffice's `soffice` command. The app provides multiple routes and HTML interfaces for common conversion tasks (DOCX, PPT, XLS/XLSX, images, PDF→images) and utilities such as merge, split, and rotate.

## Features

- Convert DOC/DOCX to PDF
- Convert PPT/PPTX to PDF
- Convert XLS/XLSX to PDF
- Convert images to PDF
- Convert PDF to images
- Basic UI pages for merge, split, rotate operations
- Temporary upload and converted folders with automatic cleanup after download

## Installation

Prerequisites:
- Node.js 16+ and npm
- LibreOffice installed (`soffice` must be available on PATH)

On Linux/macOS:

```bash
npm install
# Install LibreOffice if you don't have it (example on Debian/Ubuntu):
sudo apt-get update && sudo apt-get install -y libreoffice
```

On Windows: install Node.js and LibreOffice from their official installers; ensure `soffice` is available in your PATH.

## Environment Variables

- `PORT`: Optional — port the server listens on. Defaults to `3080`.

Note: upload and converted folders are configured as `uploads/` and `converted/` in `server.js`. Change these constants in the code if you need a different location.

## Running Locally

1. Install dependencies: `npm install`
2. Ensure LibreOffice is installed and `soffice` is on your PATH.
3. Start the server:

```bash
npm start
# or
PORT=3000 npm start
```

Open your browser at `http://localhost:3080` (or your configured `PORT`). The application serves static HTML pages from the `public/views` folder.

## Deployment

Docker (recommended for consistent environment):

1. Build the image (runs LibreOffice installation inside image):

```bash
docker build -t convert2pdf .
```

2. Run the container (map a port and optional persistent volumes):

```bash
docker run -p 3080:3080 --name convert2pdf convert2pdf
```

Notes on hosting: the app relies on `soffice` from LibreOffice. If deploying to a PaaS (Railway, Heroku, etc.), ensure the build or runtime environment can install LibreOffice or use a Docker deployment that includes LibreOffice.

## Folder Structure

- Dockerfile
- package.json
- server.js
- converted/         # converted PDFs (created at runtime)
- public/            # static assets and HTML views
  - css/
  - images/
  - js/
  - views/           # HTML pages for each conversion tool
- uploads/           # incoming uploaded files (created at runtime)

You can review the main server implementation at [server.js](server.js) and container build at [Dockerfile](Dockerfile).

## Technologies Used

- Node.js
- Express
- Multer (file uploads)
- LibreOffice (`soffice`) for conversions
- Docker + xvfb (for containerized deployments)
- EJS (installed but HTML views are static in `public/views`)

## Notes & Recommendations

- Ensure LibreOffice is installed where the app runs; without `soffice` the conversions will fail.
- This project performs file uploads and serves generated files for download — review and harden validations before using in production (size limits, allowed file types, authentication, rate limiting, storage cleanup policies).

---

If you want, I can also: add runtime environment variable support for upload paths, add basic file-type validation, or create a GitHub Actions workflow for Docker image builds. Which would you like next?
