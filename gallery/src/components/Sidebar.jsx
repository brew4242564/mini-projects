const Sidebar = ({isSidebar, view}) => {
  if (isSidebar) {
    return (
      <ul className="sidebar">
        <li>
          <button onClick={()=> view("gallery")}>Home</button>
        </li>
        <li>
          <button onClick={()=> view("tags")}>Tags</button>
        </li>
        <li>
          <button onClick={()=> view("bookmarks")}>Bookmarks</button>
        </li>
      </ul>
    );
  }

};
export default Sidebar;