import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function RootPage() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
}

export default RootPage;