import Footer from "@/components/Footer";
import Header from "../components/Navbar";
import { Outlet } from "react-router";

function Root() {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
}

export default Root;
