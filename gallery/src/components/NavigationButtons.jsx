export const PrevButton = ({ skip, decrementSkip }) => {
  if (skip > 0) {
    return (
      <button className="nav-btn" onClick={decrementSkip}>
        Prev!
      </button>
    );
  }
};
export const NextButton = ({ hasNext, incrementSkip }) => {
  if (hasNext) {
    return (
      <button className="nav-btn" onClick={incrementSkip}>
        Next!
      </button>
    );
  }
};
export const RandomButton = ({ search, handleRefresh }) => {
  if (!search)
    return (
      <button className="nav-btn" onClick={handleRefresh}>
        Random!
      </button>
    );
};
