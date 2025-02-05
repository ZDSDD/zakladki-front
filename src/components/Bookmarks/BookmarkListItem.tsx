import { Bookmark } from "../../types/bookmark";
import { useState } from "react";
import { Placeholder } from "react-bootstrap";
interface BookmarkListItemProps {
    bookmark: Bookmark;
    className?: string;
}
function BookmarkListItem({ bookmark, className = "" }: BookmarkListItemProps) {
    const inStock: boolean = bookmark.AvailableAmount > 0;
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={`${className} flex flex-col rounded-md`}>
            <div
                className={`relative m-1 flex`}
            >

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
                    className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0 h-[0px]"}`}
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
            <div className="px-2 border-t-2 border-lime-500 bg-slate-200 rounded-md flex-grow flex flex-col justify-between h-[55px] ">
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
