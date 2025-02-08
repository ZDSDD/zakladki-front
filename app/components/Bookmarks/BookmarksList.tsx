import { useEffect, useState } from "react";
import { Bookmark } from "../../types/bookmark";
import BookmarkListItem from "./BookmarkListItem";
import { useBookmarksStore } from "@/store/BookmarksStore";
import { useLikeStore } from "@/store/BookmarksLikesStore";

function BookmarksList() {
    const { bookmarks, fetchBookmarks } = useBookmarksStore();
    const { likedBookmarks, fetchLikedBookmarks } = useLikeStore();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                await Promise.all([
                    fetchBookmarks(),
                    fetchLikedBookmarks()
                ]);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
                setError(error instanceof Error ? error : new Error('Failed to fetch bookmarks'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            // Cleanup logic if required
        };
    }, [fetchBookmarks, fetchLikedBookmarks]);

    if (isLoading) {
        return (
            <div className="m-3 flex justify-center items-center min-h-[200px]">
                <div className="text-blue-500">Loading bookmarks...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-3 flex justify-center items-center min-h-[200px]">
                <div className="text-red-500 text-center">
                    <p className="font-semibold">An error occurred</p>
                    <p className="text-sm">{error.message}</p>
                </div>
            </div>
        );
    }

    if (!bookmarks?.length) {
        return (
            <div className="m-3 flex justify-center items-center min-h-[200px]">
                <div className="text-gray-500">No bookmarks available.</div>
            </div>
        );
    }

    return (
        <div className="m-3">
            <div className="p-2 flex flex-wrap gap-2 items-center justify-center">
                {bookmarks.map((bookmark: Bookmark) => (
                    <BookmarkListItem
                        key={bookmark.ID}
                        bookmark={bookmark}
                        isLikedByUser={likedBookmarks instanceof Set && likedBookmarks.has(bookmark.ID)}
                    />
                ))}
            </div>
        </div>
    );
}

export default BookmarksList;