import React, { useState, useEffect, useRef } from 'react';
import QueryInput from './components/QueryInput';
import AnswerDisplay from './components/AnswerDisplay';
import SourcesDisplay from './components/SourcesDisplay';

interface Source {
  title: string;
  url: string;
}

interface RAGResponse {
  answer: string;
  question: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const answerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setAnswer('');
    setSources([]);

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        // ✅ FIX HERE
        body: JSON.stringify({
          question: query,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data: RAGResponse = await response.json();

      setAnswer(data.answer);

      // backend does not send sources, so keep empty
      setSources([]);

    } catch (err) {
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answer]);

  return (
    <div className="app">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to RAG Assistant</h1>
          <p>
            Ask questions and get intelligent answers powered by AI + RAG
          </p>
        </div>
      </section>

      <main className="main-content">
        <div className="container">
          <h2 className="title">Ask Your Question</h2>

          <div className="query-input">
            <QueryInput
              query={query}
              setQuery={setQuery}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div ref={answerRef}>
            <AnswerDisplay answer={answer} loading={loading} />
          </div>

          <SourcesDisplay sources={sources} />
        </div>
      </main>
    </div>
  );
};

export default App;