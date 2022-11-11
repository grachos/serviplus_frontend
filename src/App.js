import './App.css';
import { Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import ListTickets from "./pages/Tickets/ListTickets";
import ListUsers from "./pages/Users/ListUsers";
import UpdateUser from './pages/Users/UpdateUser';
import UpdateTicket from './pages/Tickets/UpdateTicket';


function App() {
  return (
    <Fragment>
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path='/Register' exact element={<Register/>} />
        <Route path='/Home' exact element={<Home/>} />
        <Route path="/Listu" exact element={<ListUsers/>}/>
        <Route path="/Listt" exact element={<ListTickets/>}/>
        <Route path="/UpdateUser/:id" exact element={<UpdateUser/>}/>
        <Route path="/Updateticket/:id" exact element={<UpdateTicket/>}/>
      </Routes>
    </Router>
  </Fragment>
  );
}

export default App;
