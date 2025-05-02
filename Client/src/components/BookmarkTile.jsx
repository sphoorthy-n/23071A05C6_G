import React from 'react';

const BookmarkTile = ({ title, url }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{title}</h3>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </div>
  );
};

export default BookmarkTile;