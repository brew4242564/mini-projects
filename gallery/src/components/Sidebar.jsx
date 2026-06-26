const Sidebar = ({ isSidebar, view, activeView }) => {
  if (isSidebar) {
    return (
      <div className="sidebar">
        <button
          className={activeView === "gallery" ? "active" : ""}
          onClick={() => view("gallery")}
        >
          Home
        </button>
        <button
          className={activeView === "tags" ? "active" : ""}
          onClick={() => view("tags")}
        >
          Tags
        </button>
        <button
          className={activeView === "bookmarks" ? "active" : ""}
          onClick={() => view("bookmarks")}
        >
          Bookmarks
        </button>
      </div>
    );
  }
};
export default Sidebar;
