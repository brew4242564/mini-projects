import { PrevButton, NextButton, RandomButton } from "./NavigationButtons";
import { Heart, HeartCrack } from "lucide-react";
import { HoverIcon } from "./icons/HoverIcons";

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
  bookmark,
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
              <button className="fav-btn" onClick={() => onBookmark(cat)}>
                {bookmark.some((fav) => fav.id === cat.id) ? (
                  <HoverIcon
                    default={Heart}
                    hovered={HeartCrack}
                    defaultProps={{ fill: "red", color: "red" }}
                    hoveredProps={{ color: "red" }}
                  />
                ) : (
                  <HoverIcon default={Heart} hovered={Heart} hoveredProps={{color: "red"}}/>
                )}
              </button>
              <div className="image-tags">
                {cat.tags.map(
                  (tag) =>
                    tag.length > 0 && (
                      <button
                        key={`${cat.id}-${tag}`}
                        onClick={() => setTag(tag)}
                        className="tag-btn"
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
