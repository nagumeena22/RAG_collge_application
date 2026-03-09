import React from 'react';

interface Source {
  title: string;
  url: string;
}

interface SourcesDisplayProps {
  sources: Source[];
}

const SourcesDisplay: React.FC<SourcesDisplayProps> = ({ sources }) => {
  const copySourcesToClipboard = () => {
    const sourcesText = sources.map(source => `${source.title}: ${source.url}`).join('\n');
    navigator.clipboard.writeText(sourcesText);
    // You could add a toast notification here
  };

  if (sources.length === 0) return null;

  return (
    <div className="sources-display">
      <div className="sources-header">
        <h2 className="sources-title">Sources</h2>
        <button
          onClick={copySourcesToClipboard}
          className="copy-all-btn"
        >
          Copy All
        </button>
      </div>
      <div className="sources-list">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-item"
          >
            {source.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SourcesDisplay;