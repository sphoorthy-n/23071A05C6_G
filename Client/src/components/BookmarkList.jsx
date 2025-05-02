import React from "react";

const BookmarkList = ({ bookmarks, onDelete }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        bookmarks.map((bookmark) => (
          <div className="bookmark-card" key={bookmark.id}>
            <h3>{bookmark.title}</h3>
            <p>
              <strong>URL:</strong>{" "}
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                {bookmark.url}
              </a>
            </p>
            {bookmark.notes && <p><strong>Notes:</strong> {bookmark.notes}</p>}
            {bookmark.tags.length > 0 && (
              <p><strong>Tags:</strong> {bookmark.tags.join(", ")}</p>
            )}
            <button
              onClick={() => onDelete(bookmark.id)}
              style={{ marginTop: "10px", backgroundColor: "red" }}
            >
              Delete ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkList;