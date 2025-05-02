import React, { useState, useEffect } from "react";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import "./App.css";

const App = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    // Initialize from localStorage if available
    const stored = localStorage.getItem("bookmarks");
    return stored ? JSON.parse(stored) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark) => {
    const newBookmark = { id: Date.now(), ...bookmark }; // Ensure unique ID
    setBookmarks((prev) => [...prev, newBookmark]);
  };

  const deleteBookmark = (id) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
  };

  const exportBookmarks = () => {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarks.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterTag = (e) => setFilterTag(e.target.value);

  const uniqueTags = [...new Set(bookmarks.flatMap((b) => b.tags || []))];

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags || []).some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTag = filterTag === "" || b.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="container">
      <h1>📚 Bookmark Manager</h1>
      <BookmarkForm onAdd={addBookmark} />

      <input
        type="text"
        placeholder="Search bookmarks..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <select onChange={handleFilterTag} value={filterTag} className="filter-select">
        <option value="">Filter by tag</option>
        {uniqueTags.map((tag, i) => (
          <option key={i} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <button className="export-btn" onClick={exportBookmarks}>
        ⬇️ Export Bookmarks
      </button>

      <BookmarkList bookmarks={filteredBookmarks} onDelete={deleteBookmark} />
    </div>
  );
};

export default App;