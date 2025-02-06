import { create } from "zustand";
import { Bookmark } from "@/types/bookmark";

interface BookmarksState {
    bookmarks: Bookmark[];
    isLoading: boolean;
    error: string | null;
    fetchBookmarks: () => void;
}

const useBookmarksStore = create<BookmarksState>((set) => ({
    bookmarks: [],
    isLoading: false,
    error: null,

    fetchBookmarks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_API_URL}/bookmarks`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            set({ bookmarks: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useBookmarksStore;
