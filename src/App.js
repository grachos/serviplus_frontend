import './App.css';
import { Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import ListTickets from "./pages/Tickets/ListTickets";
import ListUsers from "./pages/Users/ListUsers";
import EditUser from './pages/Users/EditUser';


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
        <Route path="/Editu/:id" exact element={<EditUser/>}/>
      </Routes>
    </Router>
  </Fragment>
  );
}

export default App;
