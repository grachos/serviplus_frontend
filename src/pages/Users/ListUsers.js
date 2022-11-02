import {
    React,
    useEffect,
    useState
} from "react";

import { Link, Navigate } from "react-router-dom";
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
                        <div className="row mt-5 p-4">
                            <div className="row row-cols-5 bg-primary text-white rounded-2 p-2 justify-content-around">

                                <div className="col">Id</div>
                                <div className="col">Nombre</div>
                                <div className="col">Email</div>
                                <div className="col">Role</div>
                                <div className="col">Acciones</div>
                            </div>
                            {users.map(
                                    (item, index) =>
                                    <div className={`row text-dark bg-opacity-10 p-2 rounded-2 ${(index % 2) === 0 ? "bg-success " : ""}`}>
                                        <div className="col">{item._id}</div>
                                        <div className="col">{item.name}</div>
                                        <div className="col">{item.email}</div>
                                        <div className="col">{item.typeroll}</div>
                                        <div className="col">
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                    <Link className="btn btn-outline-success mx-0"
                                                        to={`/Editu/${item._id}`}
                                                    >Actualizar</Link>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={(e) => deleteUser(e, item._id)}
                                                    > Eliminar</button>
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

export default ListUsers;