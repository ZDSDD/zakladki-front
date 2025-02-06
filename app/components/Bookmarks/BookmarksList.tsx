import { useEffect, useState } from "react";
import { Bookmark } from "../../types/bookmark"; // Assuming you put the type in a separate file named `types.ts`
import BookmarkListItem from "./BookmarkListItem";
import { useBookmarksStore } from "@/store/BookmarksStore";

function BookmarksList() {
    const { bookmarks, likedBookmarks, fetchBookmarks, fetchLikedBookmarks } = useBookmarksStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await fetchBookmarks();
                await fetchLikedBookmarks();
            } catch (error: any) {
                console.error("Error fetching bookmarks:", error);
                setError(error.message);
            }
        };
        fetchData();
        setIsLoading(false);

    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-blue-500">Loading bookmarks...</div>; // Add spinner here if needed
        }

        if (error) {
            return (
                <div className="text-red-500">An error occurred. Please try again.</div>
            );
        }

        if (!bookmarks || bookmarks.length === 0) {
            return <div className="text-gray-500">No bookmarks available.</div>; // Handle empty data
        }

        return (
            <div className="p-2 flex flex-wrap gap-2 items-center justify-center">
                {bookmarks.map((bookmark: Bookmark) => {
                    const isLiked = likedBookmarks?.has?.(bookmark.ID) ?? false;
                    return (
                        <BookmarkListItem
                            key={bookmark.ID}
                            bookmark={bookmark}
                            isLikedByUser={isLiked}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="m-3">
            {renderContent()}
        </div>
    );
}

export default BookmarksList;
