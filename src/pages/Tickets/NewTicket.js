import React from "react";
import { useState} from "react";
import APIInvoke from "../../utils/APIInvoke";
//import { useEffect } from "react";
//import ListTickets from "./ListTickets";
//import { confirm } from "react-confirm-box";
import swal from "sweetalert";
//import { Navigate} from "react-router-dom";

const NewTicket = ({ idUser}) => {

    const [idticket, setIdTikets] = useState();
    const [ticketdescript, setDescTikets] = useState();
    const [typerequest, setReqTikets] = useState();
    const [ticketstatus, setStaTikets] = useState();
    const [startdate, setSDateTikets] = useState();
    const [finishdate, setFDateTikets] = useState();



    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            idticket: idticket,
            ticketdescript: ticketdescript,
            typerequest: typerequest,
            ticketstatus: ticketstatus,
            startdate: startdate,
            finishdate: finishdate
        }
        await APIInvoke.invokePUT("/tickets/newticket/" + idUser, data);
        swal("El registro ha sido actualizado con exito", { icon: "success" });
    }

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Crea nuevo ticket</h1>

                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    User: {idUser}
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
                                    required
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
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>

    );
}

export default NewTicket;