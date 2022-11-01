import {
    React,
    useEffect,
    useState
} from "react";

import { Navigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import swal from "sweetalert";

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    const showUsers = async () => {
        const response = await APIInvoke.invokeGET("/tickets/userlist")
        console.log(response);
        setUsers(response);
    }

    useEffect(() => {
        showUsers()
    }, []);

    const deleteUser = async (e, id) => {
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
                    const response = APIInvoke.invokeDELETE("/tickets/deluser/" + id);
                    console.log(response);
                    showUsers();
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
                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                            <button className="btn btn-outline-success mx-3"
                                                                to={"#"}
                                                            >Actualizar</button>
                                                            <button
                                                                className="btn btn-outline-danger"
                                                                onClick={(e) => deleteUser(e, item._id)}
                                                            > Eliminar</button>
                                                        </div>
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