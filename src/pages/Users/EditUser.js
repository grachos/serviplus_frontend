import React, { useState, useEffect } from "react";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const EditUser = () => {

    const { id } = useParams();

    const [users, setUser] = useState([{
        _id:"", name:"", email:"", typeroll:"" 
    }]);

    const { _id, name, email, typeroll } = users;

    const showData = async () => {
        const response = await APIInvoke.invokeGET("/tickets/finduser/" + id);
        console.log(response);
        setUser(response);
    }

    useEffect(() => {
        document.getElementById("email").focus();
        document.getElementById("_id").value = users[0]._id;
        document.getElementById("name").value = users[0].name;
        document.getElementById("email").value = users[0].email;
        document.getElementById("typeroll").value = users[0].typeroll;
        showData();
    }, [users]);


    const onChange = (e) => {
        setUser({
            ...users,
            [e.target.name]: e.target.value
        });
    }

    const editUser = async () => {
        const data = {
            name: users.name,
            email: users.email,
            typeroll: users.typeroll
        }

        const response = await APIInvoke.invokePUT("/tickets/updateuser/" + id, data);
        console.log(response);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        swal({
            title: "¿Está seguro de eliminar el registro?",
            text: "Una vez editado, no podrá deshacer los cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((regUpdate) => {
                if (regUpdate) {
                    swal("El registro ha editado con exito", { icon: "success" });
                    editUser();
                } else {
                    swal("No se editó el registro!");
                }
            });

    }
    return (
        <div>
            <Navbar page={"ListUsers"} />
            <main className="flex-shrink-0">
                <div className="p-4"><span className="h4 fw-bold mb-4">Editar usuario</span></div>
                <div className="d-flex justify-content-center">
                    <form className="row align-items-center p-2" onSubmit={onSubmit}>
                        <div className="col-md-5">
                            <label htmlFor="inputEmail4" className="form-label">Id_user</label>
                            <input
                                type="text"
                                className="form-control"
                                id="_id"
                                readOnly
                                name="_id"
                                value={_id}
                            />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="inputPassword4" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="usuario@dominio.com" />
                        </div>
                        <div className="col-10">
                            <label htmlFor="inputAddress" className="form-label">Nombres y apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                name="name"
                                onChange={onChange}
                            />
                        </div>

                        <div className="col-md-5">
                            <label htmlFor="inputState" className="form-label">Role</label>
                            <select
                                className="form-select"
                                name="typeroll"
                                id="typeroll"
                                required
                                onChange={onChange}
                                
                            >
                                <option value={typeroll}>Tipo de role</option>
                                <option value="Cliente">Cliente</option>
                                <option value="Analista">Analista</option>
                                <option value="Soporte">Soporte</option>
                                <option value="Desarrollador">Desarrollador</option>
                                <option value="Mediador">Mediador</option>

                            </select>
                        </div>
                        <div className="col-12 p-4">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                                <div>
                                    <Link className="btn btn-danger" to={"/listu"}>Cerrar</Link>
                                </div>

                            </div>
                        </div>

                    </form>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default EditUser;