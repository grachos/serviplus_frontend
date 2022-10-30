import { React} from "react";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
             <Navbar page={"Home"}/>
                <main className="flex-shrink-0">
                    <div className="container">
                        <h1 className="mt-5">Página principal ServiPlus.</h1>
                        <p className="lead">Sistema integrado de tickets que le permitirá registrar y hacer seguimiento a sus tickets. </p>
                    </div>
                    <div className="d-flex col-sm-8 px-1 justify-content-md-center">
                        <img src="../Tickets-icon.png" alt="Login" align="center" />

                    </div>
                </main>
            <Footer />

        </div>
    );
}

export default Home;