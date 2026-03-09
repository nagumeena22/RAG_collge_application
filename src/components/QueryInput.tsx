import React from 'react';

interface QueryInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ query, setQuery, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="input-group">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask me anything..."
        className="input-field"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="submit-btn"
      >
        {loading ? (
          <span>
            <span className="loading-spinner"></span>
            Searching...
          </span>
        ) : (
          'Ask'
        )}
      </button>
    </form>
  );
};

export default QueryInput;