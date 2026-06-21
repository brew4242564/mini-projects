const Header = ({ children, handleSidebar }) => {
  return (
    <header>
      <div className="header-top">
        <button className="sidebar-btn" onClick={handleSidebar}>☰</button>
        <div className="logo">Catllery 🐱</div>
      </div>

      <div className="search-container">{children}</div>
    </header>
  );
};

export default Header;
