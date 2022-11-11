import React from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = ({ page }) => {
    const navigate = useNavigate();
    const onClick = ()=>{
        localStorage.clear();
        return navigate('/');
    };
    return (
        <div>
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <Link className={`nav-link ${page === "Home" ? "active" : ""}`} aria-current="true" to={"/Home"}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${page === "ListUsers" ? "active" : ""}`} to={"/Listu"}>Usarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${page === "ListTickets" ? "active" : ""}`} to={"/Listt"}>Tickets</Link>
                        </li>
                        <li className="nav-item"><Link type="button" class="btn btn-outline-primary border border-light" onClick={onClick}>Cerrar sesión</Link></li>
                    </ul>
                    
                </div>
                <   div className="px-5 ms-xl-4">
                        <span className="h1 fw-bold mb-1">ServiPlus</span>
                        <img src="../icons8-ticket-confirmed-24.png" alt="Ticket" />
                    </div>
            </div>
        </div>
    );
}

export default Navbar;