import {BrowserRouter, Route, Routes} from "react-router-dom";
import Directors from "./Pages/directors";
import Filter from "./Pages/filter";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Directors}/>
                <Route path="/filter" Component={Filter}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
