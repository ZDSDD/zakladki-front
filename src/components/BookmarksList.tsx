import { useFetchBookmarksQuery } from "../store";
import { Bookmark } from "../types/bookmark"; // Assuming you put the type in a separate file named `types.ts`
import BookmarkListItem from "./BookmarkListItem";

function BookmarksList() {
  const { data, error, isLoading } = useFetchBookmarksQuery(null);

  let content;
  if (isLoading) {
    content = <div>Is loading</div>;
  } else if (error) {
    content = <div>Some error happened</div>;
  } else {
    console.log(data);
    content = (
      <div className="p-2 m-3 border border-blue-500 flex flex-wrap">
        {data.map((bookmark: Bookmark) => (
          <BookmarkListItem
            key={bookmark.ID}
            bookmark={bookmark}
          ></BookmarkListItem>
        ))}
      </div>
    );
  }

  return (
    <div className="border m-3">
      <h1>Bookmarks</h1>
      <div>{content}</div>
    </div>
  );
}

export default BookmarksList;
