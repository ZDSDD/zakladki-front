import { Bookmark } from "../../types/bookmark";
import { useState } from "react";
import { Placeholder } from "react-bootstrap";
import "./BookmarkItem.css"

interface BookmarkListItemProps {
    bookmark: Bookmark;
    className?: string;
}
function BookmarkListItem({ bookmark, className = "" }: BookmarkListItemProps) {
    const inStock: boolean = bookmark.AvailableAmount > 0;
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={`${className} bookmark flex flex-col-reverse border-1 rounded-md bg-white`}>
            <div className="bookmark-description m-1 bg-slate-100 flex-grow flex flex-col justify-between h-[55px] w-[200px]">
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
            <div className={``}>
                {!isLoaded && (
                    <div className="w-[200px] h-[400px]">
                        <Placeholder animation="glow" className="w-full h-full">
                            <Placeholder className="w-full h-full" bg="secondary" />
                        </Placeholder>
                    </div>

                )}
                <img
                    src={bookmark.ImageUrl}
                    alt={bookmark.Name}
                    className="m-1 w-[200px] h-[400px] object-cover"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>

        </div>
    );
}

export default BookmarkListItem;
