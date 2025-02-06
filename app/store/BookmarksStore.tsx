import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bookmark } from "@/types/bookmark";

interface BookmarksState {
    bookmarks: Bookmark[];
    fetchBookmarks: () => Promise<void>;
}

export const useBookmarksStore = create<BookmarksState>()(
    persist(
        (set) => ({
            bookmarks: [],

            fetchBookmarks: async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/bookmarks`);
                    const data = await res.json();
                    set({ bookmarks: data });
                } catch (error) {
                    console.error("Error fetching bookmarks:", error);
                }
            },
        }),
        {
            name: "bookmarks-storage",
            partialize: (state) => ({
                bookmarks: state.bookmarks,
            }),
        }
    )
);
