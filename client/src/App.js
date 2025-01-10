import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//* the react-router-dom to routing in single-page applications
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* the roouts */}
          <Route path="/" element={<Books/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/update/:id" element={<Update/>} />
               {/* remeneber and the : in to acces to the essacly id */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
