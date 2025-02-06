import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./routes/Root";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";

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
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App;
