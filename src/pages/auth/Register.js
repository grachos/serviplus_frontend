import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


const Register = () => {
    const {register, watch} = useForm();

    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        document.getElementById("names").focus()
    }, []);

    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
    })

    let names, lastName, roleType, password, confirmPassword;
    const onChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validatePassword(e);
    }

    //Validate password confirm*************************************************************************
    const validatePassword = (e) => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Por favor ingrese clave.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Clave y clave de confirmacion no concuerdan.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;
                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Por favor ingrese la confirmación de clave.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Clave y clave de confirmacion no concuerdan.";
                    }
                    break;

                default:
                    break;
            }
            return stateObj;
        });
    }
    //END validate password confirm********************************************************************

    const onSubmit = (e) => {
        e.preventDefault();
        /*logingUser();*/
    }
    return (
        <div>
            <section className="h-100 bg-dark">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0">
                                    <div className="col-xl-6 d-none d-xl-block">
                                        <img src="../Tickets-icon.png" alt="Ticket" />
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card-body p-md-0 text-black">

                                            <span className="h1 fw-bold mb-6" >ServiPlus</span>
                                            <img src="../icons8-ticket-confirmed-24.png" alt="Login" />
                                            <div className="row mb-4" ></div>
                                            <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>Registro de usuarios</h3>
                                            <form onSubmit={onSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <input
                                                                type="text"
                                                                id="names"
                                                                className="form-control form-control-lg"
                                                                name="names"
                                                                value={names}
                                                                required
                                                                onChange={onChange}
                                                            />
                                                            <label className="form-label" htmlFor="form3Example1m">Nombre</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <input
                                                                type="text"
                                                                id="lastName"
                                                                className="form-control form-control-lg"
                                                                name="lasName"
                                                                value={lastName}
                                                                required
                                                                onChange={onChange}
                                                            />
                                                            <label className="form-label" htmlFor="form3Example1n">Apellidos</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline mb-4">
                                                            <input type="email" id="form3Example8" className="form-control form-control-lg" />
                                                            <label className="form-label" htmlFor="form3Example8">Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline mb-4">

                                                            <select className="form-select form-select-lg mb-3"
                                                                name="roleType" id="roleType" required onChange={onChange}>
                                                                <option selected>Tipo de role</option>
                                                                <option value={roleType}>Cliente</option>
                                                                <option value={roleType}>Analista</option>
                                                                <option value={roleType}>Soporte</option>
                                                                <option value={roleType}>Desarrollador</option>
                                                                <option value={roleType}>Mediador</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline mb-4">
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                className="form-control form-control-lg"
                                                                onChange={onChange}
                                                                onBlur={validatePassword}
                                                                name="password"
                                                                value={password}
                                                                required

                                                            />
                                                            <label className="form-label" htmlFor="form3Example9">Clave</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline mb-4">
                                                            <input
                                                                type="password"
                                                                id="confirmPassword"
                                                                className="form-control form-control-lg"
                                                                onChange={onChange}
                                                                name="confirmPassword"
                                                                value={confirmPassword}
                                                                onBlur={validatePassword}
                                                                required
                                                            />

                                                            <label className="form-label" htmlFor="form3Example9">Repita clave</label>
                                                            {error.confirmPassword &&
                                                                <p className="text-danger">{error.confirmPassword}</p>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div class="d-flex justify-content-center pt-3">
                                                        <button type="reset" className="btn btn-light btn-lg">Limpiar</button>
                                                        <button type="submit" className="btn btn-warning btn-lg ms-2">Enviar</button>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Register;