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
import NewTicket from "./NewTicket";


const ListTickets = () => {


    const [tickets, setTikets] = useState([]);

    const [idUser, setIdUset] = useState();

    const onClick = (e, id)=>{
        setIdUset(id);
    }
    

    const showTickets = async () => {
        const response = await APIInvoke.invokeGET("/tickets/ticketlist");
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
                    APIInvoke.invokeDELETE("/tickets/delticket/" + idTicket);
                    showTickets();
                } else {
                    swal("No se eliminó el registro!");
                }
            });
    }

    //Local storage that silulates a start session
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
                            {tickets.map((item, index) =>
                                <div key={index} className="card">
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
                                            <div className="col"></div>
                                        </div>

                                        {item.ticketsset.map(
                                            (iticket, index2) =>
                                                <div key={index2} className={`row text-dark bg-opacity-10 p-2 rounded-2 ${(index2 % 2) === 0 ? "bg-success " : ""}`}>
                                                    <div className="col">{iticket.idticket}</div>
                                                    <div className="col">{iticket.typerequest}</div>
                                                    <div className="col">{iticket.ticketdescript}</div>
                                                    <div className="col">{iticket.ticketstatus}</div>
                                                    <div className="col">{iticket.startdate}</div>
                                                    <div className="col">{iticket.finishdate}</div>
                                                    <div className="col">
                                                        <Link className="btn btn-primary" type="button" data-bs-toggle="collapse" to={`#colapsed${index2}`} aria-expanded="false" aria-controls={`colapsed${index2}`}>
                                                            Acciones
                                                        </Link>
                                                    </div>

                                                    <div className="collapse" id={`colapsed${index2}`}>
                                                        <div className="card card-body">
                                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                                <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={(e)=>(onClick(e, item._id))}>
                                                                    <img src="../icons8-create-order-32.png" alt="Crea" />
                                                                </button>
                                                                <Link
                                                                    className="btn btn-outline-success mx-0"
                                                                    to={`/Updateticket/${iticket.idticket}`} alt="Actualiza"
                                                                ><img src="../icons8-edit-property-32.png" alt="Actualiza" /></Link>
                                                                <Link className="btn btn-outline-success mx-0" >
                                                                    <img src="../icons8-add-tag-32.png" alt="Asigna" />
                                                                </Link>
                                                                <button type="submit"
                                                                    className="btn btn-outline-danger"
                                                                    onClick={(e) => deleteTicket(e, iticket.idticket)}
                                                                ><img src="../icons8-delete-document-32.png" alt="Elimina" /></button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                             <NewTicket idUser={idUser}/>
                        </div>
                    </div>

                </main >
                <Footer />
            </div >
        );
    }
}

export default ListTickets;