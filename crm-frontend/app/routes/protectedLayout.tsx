import { Outlet, redirect } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export const clientLoader = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw redirect("/login");
    }

    return null;
}

const ProtectedLayout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default ProtectedLayout