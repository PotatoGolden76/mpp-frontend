import {HashRouter, Route, Routes} from "react-router-dom";
import Directors from "./Pages/directors/directors";
import Filter from "./Pages/filter";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={Directors}/>
                <Route path="/filter" Component={Filter}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
