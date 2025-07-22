# PDFQuery

**Tagline:** *Unlock insights from PDFs instantly - Upload, ask, and get intelligent answers from your documents.*

## Overview

PDFQuery is an intelligent document analysis tool that transforms static PDF documents into interactive knowledge sources. Built during HackRX's internal hackathon, this project leverages advanced text processing to extract information and provide accurate answers to user queries based on document content.

## Features

- 📄 **PDF Document Processing** - Upload and parse PDF files of any size
- 🔍 **Intelligent Query System** - Ask natural language questions about document content
- ⚡ **Fast Response Time** - Get answers quickly with optimized text processing
- 🎯 **Accurate Results** - Context-aware answers based on document analysis
- 📋 **Batch Question Processing** - Handle multiple questions efficiently

## How It Works

1. **Upload** your PDF document
2. **Ask** questions in natural language
3. **Receive** accurate, context-based answers extracted from the document

## Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn package manager
- OpenAI API access (or compatible API endpoint)

### Installation

```bash
git clone https://github.com/yourusername/PDFQuery.git
cd PDFQuery
npm install
```

### Running the Server

```bash
# Development mode
npm start

# Or with nodemon for auto-restart
npm run dev
```

The server will start on `http://localhost:3030`

- **Research & Academia** - Quickly extract key information from research papers
- **Legal Document Review** - Find specific clauses and information in contracts
- **Business Intelligence** - Analyze reports and extract actionable insights
- **Educational Content** - Create Q&A from textbooks and study materials

## Technology Stack

- **Backend:** Node.js with Express.js
- **PDF Processing:** Custom utility functions for PDF text extraction
- **AI Integration:** OpenAI GPT-4o via custom API gateway
- **HTTP Client:** Axios for API communication
- **Environment:** dotenv for configuration management

## Project Structure

```
PDFQuery/
├── server.js          # Main server file
├── util.js           # PDF processing utilities
├── package.json      # Dependencies and scripts
├── .env             # Environment variables (create this)
├── .env.example     # Environment template
└── README.md        # This file
```

## Features & Implementation Details

### Intelligent Chunking
- Documents are processed in 20KB chunks to handle large PDFs efficiently
- Smart text segmentation preserves context across chunks

### AI-Powered Analysis
- Uses GPT-4o for accurate question answering
- Structured prompts ensure consistent JSON responses
- Temperature set to 0 for deterministic results

### Error Handling
- Robust error handling for API failures
- Graceful degradation for partial document processing
- Automatic retries with exponential backoff

### Performance Optimizations
- API rate limiting with 150ms delays
- Efficient memory usage with streaming
- Early termination when all questions are answered

## Troubleshooting

### Common Issues

**PDF not loading:**
- Ensure the PDF URL is publicly accessible
- Check if the PDF is password-protected
- Verify the URL returns a valid PDF file

**API timeout errors:**
- Increase the timeout in axios configuration
- Check your internet connection
- Verify API key is valid and has sufficient quota

**Empty answers:**
- Ensure questions are clearly formatted
- Check if the PDF contains extractable text (not just images)
- Verify the document language is supported

**Rate limiting:**
- The system includes built-in rate limiting (150ms between requests)
- For heavy usage, consider implementing request queuing
- Monitor your API usage to avoid quota limits

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built during HackRX Internal Hackathon
- [Add any other acknowledgments]

---
