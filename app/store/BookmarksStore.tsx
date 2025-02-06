import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bookmark } from "@/types/bookmark";
import { useAuthStore } from "./authStore";

interface BookmarksState {
    bookmarks: Bookmark[];
    likedBookmarks: Set<number>;
    fetchBookmarks: () => Promise<void>;
    fetchLikedBookmarks: () => Promise<void>;
}

export const useBookmarksStore = create<BookmarksState>()(
    persist(
        (set) => ({
            bookmarks: [],
            likedBookmarks: new Set<number>(),

            fetchBookmarks: async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/bookmarks`);
                    const data = await res.json();
                    set({ bookmarks: data });
                } catch (error) {
                    console.error("Error fetching bookmarks:", error);
                }
            },

            fetchLikedBookmarks: async () => {
                try {
                    const userId = useAuthStore.getState().user?.id;
                    if (!userId) {
                        console.warn("User not logged in. Skipping fetching liked bookmarks.");
                        return;
                    }
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/likes/${userId}`, {
                        credentials: "include",
                    });
                    const data = await res.json();
                    console.log("Liked bookmarks from lala:", data);
                    set({ likedBookmarks: new Set(data) });
                } catch (error) {
                    console.error("Error fetching liked bookmarks:", error);
                }
            },
        }),
        {
            name: "bookmarks-storage",
            partialize: (state) => ({
                bookmarks: state.bookmarks,
                likedBookmarks: Array.from(state.likedBookmarks), // Convert to array for storage
            }),
        }
    )
);
