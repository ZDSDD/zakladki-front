import { useState, useEffect } from "react";
import { BsBasket, BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useLikeStore } from "@/store/BookmarksLikesStore";
import { Bookmark } from "@/types/bookmark";

interface BookmarkListItemProps {
    bookmark: Bookmark;
    className?: string;
    isLikedByUser?: boolean;
}

function BookmarkListItem({
    bookmark,
    className = "",
    isLikedByUser = false
}: BookmarkListItemProps) {
    const inStock = bookmark.AvailableAmount > 0;
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);
    const { likeBookmark, unlikeBookmark } = useLikeStore();

    useEffect(() => {
        let cooldownTimer: NodeJS.Timeout;

        if (isCooldown) {
            cooldownTimer = setTimeout(() => setIsCooldown(false), 3000);
        }

        return () => {
            if (cooldownTimer) {
                clearTimeout(cooldownTimer);
            }
        };
    }, [isCooldown]);

    const handleLikeAction = async (
        event: React.MouseEvent<SVGElement>,
        action: 'like' | 'unlike'
    ) => {
        event.stopPropagation();
        if (isCooldown) return;

        setIsCooldown(true);

        try {
            if (action === 'like') {
                await likeBookmark(bookmark.ID);
            } else {
                await unlikeBookmark(bookmark.ID);
            }
        } catch (error) {
            if (error instanceof Error && error.message === "User not authenticated") {
                alert("You need to be logged in to like a bookmark");
            }
            console.error('Error handling bookmark action:', error);
        }
    };

    const LikeButton = () => (
        isLikedByUser ? (
            <BsBookmarkHeartFill
                className={`text-3xl ${isCooldown ? "cursor-default" : "cursor-pointer"} 
          text-pink-600/15 hover:text-pink-600 transition-colors duration-200`}
                onClick={(e) => handleLikeAction(e, 'unlike')}
            />
        ) : (
            <BsBookmarkHeart
                className={`text-3xl ${isCooldown ? "cursor-default" : "cursor-pointer"} 
          text-black/15 hover:text-black transition-colors duration-200`}
                onClick={(e) => handleLikeAction(e, 'like')}
            />
        )
    );

    return (
        <div className={`
      ${className} 
      w-[150px] h-[300px] sm:w-[200px] sm:h-[400px] 
      flex flex-col-reverse border rounded-md bg-white
      shadow-sm hover:shadow-md transition-shadow duration-200
    `}>
            <div className="m-1 bg-slate-100 flex-grow flex flex-col justify-between">
                <div className="px-2 truncate text-center">
                    {bookmark.Name}
                </div>
                <div className="px-2 flex justify-between items-center text-sm text-gray-800">
                    <span className="font-bold">{bookmark.Price.toLocaleString()} PLN</span>
                    <span className={`
            hidden sm:inline px-2 py-1 rounded-full text-xs
            ${inStock ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}
          `}>
                        {inStock ? "dostępna" : "wyczerpana"}
                    </span>
                </div>
            </div>

            <div className="relative m-1">
                {!isLoaded && (
                    <div className="w-full h-48 sm:h-64 bg-gray-200 animate-pulse" />
                )}
                <img
                    src={bookmark.ImageUrl}
                    alt={bookmark.Name}
                    className={`w-full h-auto ${isLoaded ? 'block' : 'hidden'}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => console.error('Failed to load image:', bookmark.ImageUrl)}
                />
                <div className="absolute top-2 left-2">
                    <LikeButton />
                </div>
                <div className="absolute bottom-2 right-2 flex items-center justify-center bg-black/30 hover:bg-black/80 hover:cursor-pointer bg-alga w-10 h-10 rounded-xl">
                    <BsBasket className="text-2xl text-white" />
                </div>
            </div>
        </div>
    );
}

export default BookmarkListItem;