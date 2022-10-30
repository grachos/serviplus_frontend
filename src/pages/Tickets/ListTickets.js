import {
    React,
    useEffect,
    useState
} from "react";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import APIInvoke from "../../utils/APIInvoke";

const ListTickets = () => {

    const [tickets, setTikets] = useState([]);

    const showTickets = async () => {
        const response = await APIInvoke.invokeGET("/tickets/ticketlist")
        console.log(response);
        setTikets(response);
    }

    useEffect(() => {
        showTickets()
    }, []);

    return (
        <div>
            <Navbar page={"ListTickets"} />
            <main className="flex-shrink-0">
                <div className="container">
                    <h1 className="mt-5">Lista tickets.</h1>
                    <p className="lead">Lista de tickets por usuario.</p>
                </div>
   
                <div className="container mt-3">
                    <div id="accordion">
                        {tickets.map(
                            (item, index) =>
                                <div className="card">
                                    <div className="card-header">
                                        <Link className={`${index === 0 ? "btn" : "collapsed btn"}`} data-bs-toggle="collapse" to={`#listed${index}`}>
                                            Usuario: {item._id} : {item.name}
                                        </Link>
                                    </div>
                                    <div id={`listed${index}`} className={`${index === 0 ? "collapse show" : "collapse"}`} data-bs-parent="#accordion">
                                        <div className="card-body">
                                            <table className="table table-striped table-hover">
                                                <thead className="table-primary">
                                                    <tr>
                                                        <th scope="col">Id</th>
                                                        <th scope="col">Requerimiento</th>
                                                        <th scope="col">Descripción</th>
                                                        <th scope="col">Estatus</th>
                                                        <th scope="col">Fecha Inicio</th>
                                                        <th scope="col">Fecha Fin</th>
                                                        <th> Acciones </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.ticketsset.map(
                                                        iticket =>
                                                            <tr>
                                                                <td className="col-md-1">{iticket.idticket}</td>
                                                                <td className="col-md-1">{iticket.typerequest}</td>
                                                                <td className="col-md-2">{iticket.ticketdescript}</td>
                                                                <td className="col-md-1">{iticket.ticketstatus}</td>
                                                                <td className="col-md-1">{iticket.startdate}</td>
                                                                <td className="col-md-1">{iticket.finishdate}</td>
                                                                <td className="col-md-3">
                                                                    <div>
                                                                        <Link className="btn btn-outline-primary">Crear</Link>
                                                                        <Link className="btn btn-outline-success mx-3"
                                                                            to={"#"}
                                                                        >Actualizar</Link>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-danger"
                                                                            onClick={"#"}
                                                                        > Eliminar</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default ListTickets;