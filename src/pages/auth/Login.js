import {React, useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';
import Footer from "../../components/Footer";


const Login = () => {

    const message = (msg, type, title) =>{
        swal({
            title: title,
            text: msg,
            icon: type,
            button: "Acept"
        })
    }

    const navegate = useNavigate();

    const [users, SetUsers] = useState({
        email: "",
        password: ""
    });
    useEffect(()=>{
        document.getElementById("email").focus()
    },[]);

    const {email, password} = users;

    const onChange = (e)=>{
        SetUsers({
            ...users,
            [e.target.name]: e.target.value
        });
    }
    const logingUser = async ()=>{
        const data ={
            email: users.email,
            password: users.password
        };
        const response = await APIInvoke.invokePOST("/tickets/login", data);
        const respon_b = response.msg;

        if (respon_b === "disable"){
            console.clear();
            message("Denegado el acceso. Verifique su información",  "error", "ServiPlus");
            SetUsers({
                email : "",
                password : ""
            })
        }else{
            message("Ha ingresado correctamente", "success", "ServiPlus");
            localStorage.setItem("id_user", response.id_user);
            navegate("/Home");           
        }
      
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        logingUser();
    }
    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="px-5 ms-xl-4">
                                <span className="h1 fw-bold mb-6">ServiPlus</span>
                               <img src="../icons8-ticket-confirmed-24.png" alt="Ticket"/>
                            </div>
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form style={{ width: '23rem' }} onSubmit={onSubmit}>
                                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>Ingreso</h3>
                                    <div className="form-outline mb-4">
                                        <input 
                                            type="email" 
                                            id="email" 
                                            className="form-control form-control-lg" 
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="form-label" htmlFor="form2Example18">Correo electrónico</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input 
                                            type="password" 
                                            id="password" 
                                            className="form-control form-control-lg" 
                                            name="password"
                                            required
                                            value={password}
                                            onChange={onChange}
                                        />
                                        <label className="form-label" htmlFor="form2Example28">Clave</label>
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-info btn-lg btn-block" type="submit">Ingresar</button>
                                    </div>
                                    <p className="small mb-4 pb-lg-2"><Link className="text-muted" to={"#"}>Olvidó la clave?</Link></p>
                                    <p>No tiene cuenta? <Link to={"/Register"} className="link-info">Regitrar aquí</Link></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img src="../Tickets-icon.png" alt="Login" className="img-fluid" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Login;