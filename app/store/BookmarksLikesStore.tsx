import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "@/store/authStore";

interface LikeState {
    likedBookmarks: Set<number>;
    fetchLikedBookmarks: (userId?: string) => Promise<void>;
    likeBookmark: (bookmarkId: number) => Promise<void>;
    unlikeBookmark: (bookmarkId: number) => Promise<void>;
}

export const useLikeStore = create<LikeState>()(
    persist(
        (set, get) => ({
            likedBookmarks: new Set<number>(),

            fetchLikedBookmarks: async (userId?: string) => {
                if (!userId) {
                    userId = useAuthStore.getState().user?.id;
                    if (!userId) {
                        return;
                    }
                }

                const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/likes/${userId}`, {
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to fetch liked bookmarks");

                const data: number[] = await res.json(); // Expecting an array of bookmark IDs
                set({ likedBookmarks: new Set(data) });
            },

            likeBookmark: async (bookmarkId: number) => {
                const token = useAuthStore.getState().token;
                if (!token) throw new Error("User not authenticated");

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_API_URL}/likes/${bookmarkId}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    }
                );

                if (!response.ok) throw new Error("Failed to like bookmark");

                set((state) => {
                    const updatedLikes = new Set(state.likedBookmarks);
                    updatedLikes.add(bookmarkId);
                    return { likedBookmarks: updatedLikes };
                });

            },

            unlikeBookmark: async (bookmarkId: number) => {
                const token = useAuthStore.getState().token;
                if (!token) throw new Error("User not authenticated");

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_API_URL}/likes/unlike/${bookmarkId}`, // Fixed the endpoint
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    }
                );

                if (!response.ok) throw new Error("Failed to unlike bookmark");

                set((state) => {
                    const updatedLikes = new Set(state.likedBookmarks);
                    updatedLikes.delete(bookmarkId);
                    return { likedBookmarks: updatedLikes };
                });
            },
        }),
        {
            name: "likes-storage",
            partialize: (state) => ({
                likedBookmarks: Array.from(state.likedBookmarks), // Convert to array for storage
            }),
        }
    )
);
