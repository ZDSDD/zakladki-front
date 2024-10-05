import { Bookmark } from "../../types/bookmark";
import SkewImage from "./SkewImage";
import "./Bookmark.css";
interface BookmarkListItemProps {
  bookmark: Bookmark;
  className?: string;
}
function BookmarkListItem({ bookmark, className = "" }: BookmarkListItemProps) {
  return (
    <div
      className={`${className} bg-slate-100 shadow-lg rounded-lg border border-gray-200 p-5 m-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out`}
    >
      <h3 className="text-lg font-semibold mb-2 text-center">
        {bookmark.Name}
      </h3>
      <SkewImage
        src={`http://localhost:8080/images/${bookmark.ImageUrl}`}
        alt={bookmark.Name}
        className="border border-red-500 object-contain hover:cursor-pointer hover:drop-shadow-xl"
      />
      <p className="text-sm text-gray-600 mb-4 w-full line-clamp-2">
        {bookmark.Description}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-800">
        <span className="font-bold text-lg"> Price: {bookmark.Price} </span>
        <span
          className={`px-2 py-1 rounded-full ${bookmark.AvailableAmount > 0 ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
        >
          Available: {bookmark.AvailableAmount}
        </span>
      </div>
    </div>
  );
}

export default BookmarkListItem;
