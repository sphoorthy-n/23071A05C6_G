import React, { useState } from "react";

const BookmarkForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    const bookmark = {
      title,
      url,
      notes,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    onAdd(bookmark);

    setTitle("");
    setUrl("");
    setNotes("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="url"
        placeholder="URL *"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Add Bookmark</button>
    </form>
  );
};

export default BookmarkForm;