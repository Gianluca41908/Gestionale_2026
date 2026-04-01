import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import AddClient from "../pages/AddClient";
import Clients from "../pages/Clients";
import Practices from "../pages/Practices";
import AddPractice from "../pages/AddPractice";
import EditClient from "../pages/EditClient";
import EditPractice from "../pages/EditPractice";
import PracticeDetail from "../pages/PracticeDetail";

export default function Routing() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/clienti" element={<Clients />} />
                <Route path="/add-client" element={<AddClient />} />
                <Route path="/edit-client" element={<EditClient />} />
                <Route path="/pratiche" element={<Practices />} />
                <Route path="/add-practice" element={<AddPractice />} />
                <Route path="/edit-practice" element={<EditPractice />} />
                <Route path="pratiche/:id" element={<PracticeDetail />} />  
            </Route>
        </Routes>
    )
}