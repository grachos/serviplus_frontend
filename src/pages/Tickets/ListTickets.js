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

    const deleteTicket=  async (e, idTicket) =>{
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
                swal("El registro ha sido eliminado con exito", {icon: "success"});
                const response = APIInvoke.invokeDELETE("/tickets/delticket/"+idTicket);
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
                                                                                className="btn btn-outline-danger"
                                                                                onClick={(e)=>deleteTicket(e, iticket.idticket)}
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
}

export default ListTickets;