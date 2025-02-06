import Header from "../components/Navbar";
import { Outlet } from "react-router";

function Root() {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
}

export default Root;
