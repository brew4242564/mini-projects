import { PrevButton, NextButton, RandomButton } from "./NavigationButtons";

const Gallery = ({
  cats,
  onBookmark,
  setTag,
  skip,
  decreaseSkip,
  hasNext,
  incrementSkip,
  search,
  handleRefresh,
  view,
}) => {
  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {cats.map((cat) => (
          <div key={cat.id}>
            <img
              src={`https://cataas.com/cat/${cat.id}`}
              alt="cat"
              className="photo"
            />
            <div className="image-menu">
              <button onClick={() => onBookmark(cat)}>Bookmark</button>
              <div className="image-tags">
                {cat.tags.map(
                  (tag) =>
                    tag.length > 0 && (
                      <button
                        key={`${cat.id}-${tag}`}
                        onClick={() => setTag(tag)}
                      >
                        {tag}
                      </button>
                    ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {view === "gallery" ? (
        <div className="navigation-btn-container">
          <PrevButton skip={skip} decrementSkip={decreaseSkip} />
          <NextButton hasNext={hasNext} incrementSkip={incrementSkip} />
          <RandomButton handleRefresh={handleRefresh} search={search} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;
