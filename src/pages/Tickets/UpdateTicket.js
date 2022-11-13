import React from "react";
import { useState, useEffect } from "react";
import APIInvoke from "../../utils/APIInvoke";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import swal from "sweetalert";

const UpdateTicket = () => {

    const { id } = useParams();

    const [idticket, setIdTikets] = useState();
    const [ticketdescript, setDescTikets] = useState();
    const [typerequest, setReqTikets] = useState();
    const [ticketstatus, setStaTikets] = useState();
    const [startdate, setSDateTikets] = useState();
    const [finishdate, setFDateTikets] = useState();

    useEffect(() => {
        const loadTicket = async () => {
            const response = await APIInvoke.invokeGET("/tickets/findticket/" + id);
            setDescTikets(response[0]['ticketdescript']);
            setIdTikets(response[0]['idticket']);
            setReqTikets(response[0]['typerequest']);
            setStaTikets(response[0]['ticketstatus']);
            setSDateTikets(response[0]['startdate']);
            setFDateTikets(response[0]['finishdate']);
        }
        loadTicket();
    }, [id]);



    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ticketdescript: ticketdescript,
            typerequest: typerequest,
            ticketstatus: ticketstatus,
            startdate: startdate,
            finishdate: finishdate
        }
        let sw=0;
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
                    sw=1;
                    //console.log(request);
                } else {
                    swal("No se editó el registro!");
                    sw=0;
                }
            });
        if (sw===1){
            await APIInvoke.invokePUT("/tickets/updateticket/" + id, data);
        }

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
                < div className="modal-dialog modal-lg" >
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Actualiza ticket</h1>
                        </div>
                        {//tickets.map( item =>
                            <form className="row align-items-center p-2" onSubmit={onSubmit}>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            onChange={(e) => setIdTikets(e.target.value)}
                                            id="idticket"
                                            name="idticket"
                                            value={idticket || ''}
                                            readOnly
                                        />
                                        <label className="form-label">Id ticket</label>

                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={typerequest || ''}
                                            id="typerequest"
                                            name="typerequest"
                                            onChange={(e) => setReqTikets(e.target.value)}
                                            required
                                        />
                                        <label className="form-label">Requerimiento</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={ticketdescript || ''}
                                        id="ticketdescript"
                                        name="ticketdescript"
                                        onChange={(e) => setDescTikets(e.target.value)}
                                        required
                                    />
                                    <label className="form-label">Descripción</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={ticketstatus || ''}
                                        id="ticketstatus"
                                        name="ticketstatus"
                                        onChange={(e) => setStaTikets(e.target.value)}
                                        required
                                    />
                                    <label className="form-label">Estatus</label>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={startdate || ''}
                                            id="startdate"
                                            name="startdate"
                                            onChange={(e) => setSDateTikets(e.target.value)}
                                            required
                                        />
                                        <label className="form-label">Fecha de inicio</label>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={finishdate || ''}
                                            id="finishdate"
                                            name="finishdate"
                                            onChange={(e) => setFDateTikets(e.target.value)}
                                            required
                                        />
                                        <label className="form-label">Fecha de finalización</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Link className="btn btn-secondary" to={"/listt"}>Cerrar</Link>
                                    <button type="submit" className="btn btn-primary">Salvar cambios</button>

                                </div>
                            </form>
                        }
                    </div>
                </div >
                <Footer />
            </div>
        );
    }
}

export default UpdateTicket;