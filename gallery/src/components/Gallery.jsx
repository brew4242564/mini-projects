const Gallery = ({ cats, onBookmark, setTag }) => (
  <div className="gallery-grid">
    {cats.map((cat) => (
      <div key={cat.id}>
        <img src={`https://cataas.com/cat/${cat.id}`} alt="cat" className="photo"/>
        <div className="image-menu">
        <button onClick={()=> onBookmark(cat)}>Bookmark</button>
        <div className="image-tags">
          {cat.tags.map((tag)=> (
            <button key={`${cat.id}-${tag}`} onClick={()=> setTag(tag)}>{tag}</button>
          ))}
        </div>
        </div>
      </div>
    ))}
  </div>
);

export default Gallery;