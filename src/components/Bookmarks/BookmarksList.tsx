import { useFetchBookmarksQuery } from "../../store";
import { Bookmark } from "../../types/bookmark"; // Assuming you put the type in a separate file named `types.ts`
import BookmarkListItem from "./BookmarkListItem";

function BookmarksList() {
  const { data, error, isLoading } = useFetchBookmarksQuery(null);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-blue-500">Loading bookmarks...</div>; // Add spinner here if needed
    }

    if (error) {
      return (
        <div className="text-red-500">An error occurred. Please try again.</div>
      );
    }

    if (!data || data.length === 0) {
      return <div className="text-gray-500">No bookmarks available.</div>; // Handle empty data
    }

    return (
      <div className="p-2 m-3 border border-blue-500 flex flex-wrap gap-1">
        {data.map((bookmark: Bookmark) => (
          <BookmarkListItem
            key={bookmark.ID}
            bookmark={bookmark}
          ></BookmarkListItem>
        ))}
      </div>
    );
  };

  return (
    <div className="border m-3">
      <h1 className="text-xl font-bold mb-4">Bookmarks</h1>
      {renderContent()}
    </div>
  );
}

export default BookmarksList;
