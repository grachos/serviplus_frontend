import React from "react";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import APIInvoke from "../../utils/APIInvoke";
import { useParams, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const UpdateUser = () => {

    const { id } = useParams();
    const [users, setUser] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            const response = await APIInvoke.invokeGET("/tickets/finduser/" + id);
            setUser(response);
        }
        loadUser();
    }, [id]);

    const { register, watch, handleSubmit } = useForm();

    const watchAllFields = watch();

    console.log("watchAllFields", watchAllFields);

    const onSubmit = async (data) => {
        await swal({
            title: "¿Está seguro de actualizar el registro?",
            text: "Una vez editado, no podrá deshacer los cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((regUpdate) => {
                if (regUpdate) {
                    swal("El registro ha editado con exito", { icon: "success" });
                    APIInvoke.invokePUT("/tickets/updateuser/" + id, data);
                } else {
                    swal("No se editó el registro!");
                }
            });

    };

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
                    <div className="p-4"><span className="h4 fw-bold mb-4">Editar usuario</span></div>
                    {users.map(
                        (item, index) =>
                            <div className="d-flex justify-content-center" key={index}>
                                <form className="row align-items-center p-2" onSubmit={handleSubmit(onSubmit)}>


                                    <div className="col-md-5">
                                        <label htmlFor="inputEmail4" className="form-label">Id_user</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="_id"
                                            readOnly
                                            name="_id"
                                            defaultValue={item._id}
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <label htmlFor="inputPassword4" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            {...register("email")}
                                            placeholder="usuario@dominio.com"
                                            defaultValue={item.email}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="col-10">
                                        <label htmlFor="inputAddress" className="form-label">Nombres y apellidos</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            {...register("name")}
                                            defaultValue={item.name}
                                        />
                                    </div>

                                    <div className="col-md-5">
                                        <label htmlFor="inputState" className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            name="typeroll"
                                            id="typeroll"
                                            {...register("typeroll")}
                                            required
                                        >
                                            <option defaultValue="">{item.typeroll}</option>
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
                    )}
                </main>
                <Footer />
            </div>
        );
    }
}

export default UpdateUser; 