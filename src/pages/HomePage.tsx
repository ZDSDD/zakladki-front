import BookmarksList from "@/components/Bookmarks/BookmarksList";

function HomePage() {
    return (
        <div>
            <div className="flex items-center justify-center h-40">
                <h1 className="text-3xl">Home Page</h1>
            </div>
            <BookmarksList></BookmarksList>
        </div>
    );
}

export default HomePage;
