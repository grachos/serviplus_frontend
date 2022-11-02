import {
    React,
    useEffect,
    useState
} from "react";

import { Link, Navigate } from "react-router-dom";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

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

    const deleteTicket = async (e, idTicket) => {
        e.preventDefault();
        await swal({
            title: "¿Está seguro de eliminar el registro?",
            text: "Una vez eliminado, no podrá recuperar el registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((regDelete) => {
                if (regDelete) {
                    swal("El registro ha sido eliminado con exito", { icon: "success" });
                    const response = APIInvoke.invokeDELETE("/tickets/delticket/" + idTicket);
                    console.log(response);
                    showTickets();
                } else {
                    swal("No se eliminó el registro!");
                }
            });
    }

    const idUsuario = localStorage.getItem("id_user");

    if (idUsuario === null) {
        return (
            <Navigate to="/" replace={true} />
        );
    } else {
        return (
            <div>
                <Navbar page={"ListTickets"} />
                <main className="flex-shrink-0">
                    <div className="container">
                        <h1 className="mt-5">Lista tickets.</h1>
                        <p className="lead">Lista de tickets por usuario.</p>
                    </div>

                    <div className="container mt-3 p-4">
                        <div id="accordion">
                            {tickets.map(
                                (item, index) =>
                                    <div className="card">
                                        <div className="card-header">
                                            <Link className={`fw-bolder ${index === 0 ? "btn" : "collapsed btn"}`} data-bs-toggle="collapse" to={`#listed${index}`}>
                                                Usuario: {item.email} : {item.name}
                                            </Link>
                                        </div>
                                        <div id={`listed${index}`} className={`${index === 0 ? "collapse show" : "collapse"}`} data-bs-parent="#accordion">

                                            <div className="row row-cols-7 bg-primary text-white rounded-2 p-2 justify-content-around">

                                                <div className="col">Id</div>
                                                <div className="col">Requerimiento</div>
                                                <div className="col">Descripción</div>
                                                <div className="col">Estatus</div>
                                                <div className="col">Fecha Inicio</div>
                                                <div className="col">Fecha Fin</div>
                                                <div className="col">Acciones</div>
                                            </div>
                                            {item.ticketsset.map(
                                                (iticket, index2) =>
                                                    <div className={`row text-dark bg-opacity-10 p-2 rounded-2 ${(index2 % 2) === 0 ? "bg-success " : ""}`}>
                                                        <div className="col">{iticket.idticket}</div>
                                                        <div className="col">{iticket.typerequest}</div>
                                                        <div className="col">{iticket.ticketdescript}</div>
                                                        <div className="col">{iticket.ticketstatus}</div>
                                                        <div className="col">{iticket.startdate}</div>
                                                        <div className="col">{iticket.finishdate}</div>
                                                        <div className="col">
                                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                                <button className="btn btn-outline-primary">Crear</button>
                                                                <button className="btn btn-outline-success mx-0"
                                                                    to={"#"}
                                                                >Actualizar</button>
                                                                <button
                                                                    className="btn btn-outline-danger"
                                                                    onClick={(e) => deleteTicket(e, iticket.idticket)}
                                                                > Eliminar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                            )}
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
}

export default ListTickets;