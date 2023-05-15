import {HashRouter, Route, Routes} from "react-router-dom";
import Directors from "./Pages/directors/directors";
import Filter from "./Pages/filter";
import Actors from "./Pages/actors/actors";
import Movies from "./Pages/movies/movies";
import Roles from "./Pages/roles/roles";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={Directors}/>
                <Route path="/directors" Component={Directors}/>
                <Route path="/actors" Component={Actors}/>
                <Route path="/movies" Component={Movies}/>
                <Route path="/filter" Component={Filter}/>
                <Route path="/roles" Component={Roles}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
