import { useParams, useNavigate } from "react-router";
import { memo, useEffect, useState } from "react";
import { Bookmark } from "@/types/bookmark";
import { useBookmarksStore } from "@/store/BookmarksStore";

function BookmarkDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { bookmarks } = useBookmarksStore();
    const [bookmark, setBookmark] = useState<Bookmark | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            setIsLoading(false);
            return;
        }

        const foundBookmark = bookmarks.find((b: Bookmark) => b.ID === Number(id));

        if (foundBookmark) {
            setBookmark(foundBookmark);
        }

        setIsLoading(false);
    }, [id, bookmarks]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-blue-500 text-lg">Loading bookmark details...</div>
            </div>
        );
    }

    if (!bookmark) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-500">
                <p className="text-lg">Bookmark not found.</p>
                <button
                    className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl pb-0.5 mx-auto bg-white shadow-lg rounded-lg">
            <div className="p-5">
                {/* Back Button */}
                <BackButton onClick={() => navigate("/")} />

                {/* Bookmark Info */}
                <BookmarkInfo bookmark={bookmark} />
                {/* Created/Updated Date */}
            </div>
            <p className="text-gray-500 text-sm mt-4 text-center flex justify-center space-x-6">
                <span>
                    Added: {bookmark.CreatedAt ? new Date(bookmark.CreatedAt).toLocaleDateString() : "N /A"}
                </span>
                <span>
                    Updated: {bookmark.UpdatedAt ? new Date(bookmark.UpdatedAt).toLocaleDateString() : "N/A"}
                </span>
            </p>
        </div >
    );
}

// Reusable Back Button Component
const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button
        className="mb-6 px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
        onClick={onClick}
        aria-label="Go back"
    >
        ← Back
    </button>
);

// Reusable Bookmark Info Component
const BookmarkInfo = ({ bookmark }: { bookmark: Bookmark }) => (
    <div className="text-center flex flex-col items-center border-2">
        <h1 className="text-2xl font-bold mb-4">{bookmark.Name}</h1>
        <img
            src={bookmark.ImageUrl}
            alt={bookmark.Name}
            className="w-64 h-64 object-cover mt-3 rounded-lg mx-auto"
            onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
        />

        <p className="text-gray-700 mt-4">{bookmark.Description}</p>

        {/* Extra Details */}
        <div className="mt-6 space-y-3">
            <DetailItem label="Price" value={`${bookmark.Price} PLN`} />
            <DetailItem label="Size" value={bookmark.Size} />
            <DetailItem label="Material" value={bookmark.Material} />
            <DetailItem label="Category" value={bookmark.Category} />
            <div className="flex items-center">
                <strong className="mr-2">Status:</strong>
                <StatusBadge isInStock={bookmark.AvailableAmount > 0} />
            </div>
        </div>

    </div>
);

// Reusable Detail Item Component
const DetailItem = memo(({ label, value }: { label: string; value: string | number }) => (
    <p>
        <strong>{label}:</strong> {value}
    </p>
));
// Reusable Status Badge Component
const StatusBadge = ({ isInStock }: { isInStock: boolean }) => (
    <span
        className={`px-2 py-1 rounded text-sm ${isInStock ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
    >
        {isInStock ? "In Stock" : "Out of Stock"}
    </span>
);

export default BookmarkDetailsPage;