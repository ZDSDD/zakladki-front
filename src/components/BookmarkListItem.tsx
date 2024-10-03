import { Bookmark } from "../types/bookmark";

interface BookmarkListItemProps {
  bookmark: Bookmark;
}
function BookmarkListItem({ bookmark }: BookmarkListItemProps) {
  return (
    <div>
      <h3>{bookmark.Name}</h3>
      {/* <img src={bookmark.ImageUrl} alt={bookmark.Name} /> */}
      {/* <p>{bookmark.Description}</p> */}
      <p>Price: {bookmark.Price}</p>
      <p>Available: {bookmark.AvailableAmount}</p>
    </div>
  );
}

export default BookmarkListItem;
