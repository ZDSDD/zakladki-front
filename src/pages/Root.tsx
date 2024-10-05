import Header from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="container mx-auto px-20">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

export default Root;
