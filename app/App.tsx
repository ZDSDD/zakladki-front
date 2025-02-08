import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./routes/Root";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import BookmarkDetailsPage from "./routes/BookmarkDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>,
            },
            {
                path: "about",
                element: <div>About</div>,
            },
            {
                path: "login",
                element: <LoginPage></LoginPage>,
            },
            {
                path: "/bookmark/:id",
                element: <BookmarkDetailsPage></BookmarkDetailsPage>,
            }
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App;
