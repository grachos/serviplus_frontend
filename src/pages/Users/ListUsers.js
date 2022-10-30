import {
    React,
    useEffect,
    useState
} from "react";

import { Link, Navigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
//import swal from "sweetalert";

const ListUsers = () => {
   /* const alerta = (msg, tipo, titulo) => {
        swal({
            title: titulo,
            text: msg,
            icon: tipo,
            button: "Acept!"
        })
    }*/
    const [users, setUsers] = useState([]);

    const showUsers = async () => {
        const response = await APIInvoke.invokeGET("/tickets/userlist")
        console.log(response);
        setUsers(response);
    }

    useEffect(() => {
        showUsers()
    }, []);

    const idUsuario = localStorage.getItem("id_user");
    if (idUsuario === null) {
        return (
            <Navigate to="/" replace={true} />
        );
    } else {
        return (
            <div>
                <Navbar page={"ListUsers"} />
                <main className="flex-shrink-0">
                    <div className="container">
                        <h1 className="mt-5">Lista usuarios.</h1>
                        <p className="lead">Listado de usuarios pagina prueba</p>
                        <div className="row mt-5">
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th> Acciones </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(
                                        item =>
                                            <tr>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.typeroll}</td>
                                                <td>
                                                    <div>
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
                </main>
                <Footer />
            </div>
        );
    }
}

export default ListUsers;