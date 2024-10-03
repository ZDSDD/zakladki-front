import { useFetchBookmarksQuery } from "../store";

function BookmarksList() {
  const { data, error, isLoading } = useFetchBookmarksQuery(null);

  let content;
  if (isLoading) {
    content = <div>Is loading</div>;
  } else if (error) {
    content = <div>Some error happened</div>;
  } else {
    console.log(data);
    content = <div> SUCCES !</div>;
  }

  return (
    <div>
      <h1>Bookmarks</h1>
      <div>{content}</div>
    </div>
  );
}

export default BookmarksList;
