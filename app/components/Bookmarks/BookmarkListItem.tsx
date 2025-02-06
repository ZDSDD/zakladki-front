import { Bookmark } from "../../types/bookmark";
import { useState } from "react";
import { Placeholder } from "react-bootstrap";
import "./BookmarkItem.css"
import { BsBasket } from "react-icons/bs";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

interface BookmarkListItemProps {
    bookmark: Bookmark;
    className?: string;
    isLikedByUser?: boolean;
}
function BookmarkListItem({ bookmark, className = "", isLikedByUser = false }: BookmarkListItemProps) {
    const inStock: boolean = bookmark.AvailableAmount > 0;
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={`${className} w-[150px] h-[300px] sm:w-[200px] sm:h-[400px] bookmark flex flex-col-reverse border-1 rounded-md bg-white`}>
            <div className="bookmark-description m-1 bg-slate-100 flex-grow flex flex-col justify-between">
                {/* Text container with fixed height and overflow handling */}
                <div className="pl-2 overflow-hidden text-ellipsis whitespace-nowrap text-center">
                    {bookmark.Name}
                </div>
                <div className="pl-2 flex mb-1 mt-1 justify-between text-sm text-gray-800">
                    <span className="font-bold">{bookmark.Price} PLN</span>
                    <span
                        className={`hidden sm:inline px-2 rounded-full ${inStock ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                    >
                        {inStock ? "dostępna" : "wyczerpana"}
                    </span>
                </div>
            </div>
            <div className={`${isLoaded ? "flex" : ""}`}>
                {!isLoaded && (
                    <div className="">
                        <Placeholder animation="glow" className="w-full h-full">
                            <Placeholder className="w-full h-full" bg="secondary" />
                        </Placeholder>
                    </div>

                )}
                <div className="m-1 border-1 bg-red-400 flex relative">
                    <img
                        src={bookmark.ImageUrl}
                        alt={bookmark.Name}
                        className="w-full h-auto"
                        onLoad={() => setIsLoaded(true)}
                    />
                    <div className="absolute flex">
                        {
                            isLikedByUser
                                ? <BsBookmarkHeartFill className="text-3xl text-black/15 hover:text-black hover:cursor-pointer" />
                                : <BsBookmarkHeart className="text-3xl text-black/15 hover:text-black hover:cursor-pointer" />
                        }
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center justify-center bg-indigo-600/30 hover:bg-indigo-600/80 hover:cursor-pointer bg-alga w-10 h-10 rounded-full">
                        <BsBasket className="text-2xl text-white" />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default BookmarkListItem;
