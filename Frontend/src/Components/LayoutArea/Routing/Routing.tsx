import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Insert from "../../DataArea/AddVacation/Insert";
import Chart from "../../DataArea/Chart/Chart";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import DataList from "../../DataArea/VacationList/DataList";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<DataList />} />
            <Route path="/add" element={<Insert />} /> 
            <Route path="/chart" element={<Chart />} />
            <Route path="/edit/:vacationId" element={<EditVacation />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default Routing;