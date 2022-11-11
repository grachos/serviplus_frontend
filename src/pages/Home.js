import { React } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    const idUsuario = localStorage.getItem("id_user");
    if (idUsuario === null) {
        return (
            <Navigate to="/" replace={true} />
        );
    } else {
        return (
            <div>
                <Navbar page={"Home"} />
                <main className="flex-shrink-0">
                    <div className="container">
                        <h1 className="mt-5">Página principal ServiPlus.</h1>
                        <p className="lead">Sistema integrado de tickets que le permitirá registrar y hacer seguimiento a sus tickets. </p>
                        <img src="../Tickets-icon.png" alt="Login" align="center" style={{ width:"70%", height: "70%" }}/>
                    </div>
                </main>
                <Footer />

            </div>
        );
    }
}

export default Home;