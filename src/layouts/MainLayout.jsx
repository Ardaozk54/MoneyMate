import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
}

export default MainLayout;
