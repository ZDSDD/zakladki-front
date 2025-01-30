import { Bookmark } from "../../types/bookmark";
import SkewImage from "./SkewImage";
import "./Bookmark.css";
interface BookmarkListItemProps {
    bookmark: Bookmark;
    className?: string;
}
function BookmarkListItem({ bookmark, className = "" }: BookmarkListItemProps) {
    const inStock: boolean = bookmark.AvailableAmount > 0;

    return (
        <div className={`${className} border w-[200px] h-[600px] m-1 flex flex-col`}>
            <SkewImage
                src={bookmark.ImageUrl}
                alt={bookmark.Name}
                className="hover:cursor-pointer hover:drop-shadow-lg"
                maxRotation={12}
            />
            <div className="px-2 flex-grow flex flex-col justify-between h-[55px] ">
                {/* Text container with fixed height and overflow handling */}
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {bookmark.Name}
                </div>
                <div className="flex mb-1 mt-1 justify-between text-sm text-gray-800">
                    <span className="font-bold">{bookmark.Price} PLN</span>
                    <span
                        className={`px-2 rounded-full ${inStock ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                    >
                        {inStock ? "dostępna" : "wyczerpana"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BookmarkListItem;
