import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import Compare from './component/Compare'
import Answer from './component/Answer'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./component/Main";


function App() {
  return (

      <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>}></Route>
              <Route path="/getCountByAnswer" element={<Answer/>}>  </Route>
              <Route path="/CompareReviews" element={<Compare/>}>  </Route>
            </Routes>
        </BrowserRouter>
      </div>
  );
}
export default App;
