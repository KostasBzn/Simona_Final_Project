import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

export default function ProfilePageLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
