# RAG Frontend

A sleek, modern React frontend for a Retrieval-Augmented Generation (RAG) appliacations.

## Features

- Clean, responsive UI with Tailwind CSS
- Text input for queries
- Display of AI-generated answers
- Source documents with clickable links
- Loading animations
- Error handling
- Copy to clipboard functionality
- Smooth scrolling to answers
- Mobile-friendly design

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Backend Integration

The app expects a backend API at `/api/rag` that accepts POST requests with JSON body:
```json
{
  "query": "user query"
}
```

And returns:
```json
{
  "answer": "AI generated answer",
  "sources": [
    {
      "title": "Source Title",
      "url": "https://example.com"
    }
  ]
}
```

Update the fetch URL in `src/App.tsx` to match your backend endpoint.

## Project Structure

```
src/
├── components/
│   ├── QueryInput.tsx
│   ├── AnswerDisplay.tsx
│   └── SourcesDisplay.tsx
├── pages/
├── styles/
├── App.tsx
├── main.tsx
└── index.css
```
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
