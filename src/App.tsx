// module
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// custom
import Layout from "./layout/layout"
import { Store } from './models/store';
import { ROUTES } from "./routes/routes.enum";
import Home from "./pages/home";
import Edit from "./pages/edit";
import NotFound from "./pages/404";


export const initialStore: Store = {
    darkMode: false,
    tasks: [],
}

export const AppContext = createContext<Store>(initialStore);

const App = () => {
    const [darkMode, setDarkMode] = useState<Store['darkMode']>(false)
    const [tasks, setTasks] = useState<Store['tasks']>([])

    return (
        <AppContext.Provider value={{ darkMode, tasks, setDarkMode, setTasks }}>
            <Layout>
                <Routes>
                    <Route key={ROUTES.HOME} path={ROUTES.HOME} element={<Home />} />
                    <Route key={ROUTES.EDIT} path={ROUTES.EDIT} element={<Edit />} />
                    <Route key={ROUTES.NOT_FOUND} path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Routes>
                <ToastContainer />
            </Layout>
        </AppContext.Provider >
    );
};

export default App;