import Header from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Root() {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
}

export default Root;
