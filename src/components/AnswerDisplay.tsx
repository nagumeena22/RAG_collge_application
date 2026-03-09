import React from 'react';

interface AnswerDisplayProps {
  answer: string;
  loading: boolean;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ answer, loading }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(answer);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="loading-skeleton">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    );
  }

  if (!answer) return null;

  return (
    <div className="answer-display">
      <div className="answer-header">
        <h2 className="answer-title">Answer</h2>
        <button
          onClick={copyToClipboard}
          className="copy-btn"
        >
          Copy
        </button>
      </div>
      <p className="answer-text">{answer}</p>
    </div>
  );
};

export default AnswerDisplay;