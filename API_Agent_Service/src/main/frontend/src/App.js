import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import Compare from './component/Compare'
import Answer from './component/Answer'
import Feedback from './component/Feedback'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./component/Header";


function App() {
  return (

      <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Header/>}></Route>
              <Route path="/getCountByAnswer" element={<Answer/>}>  </Route>
              <Route path="/CompareReviews" element={<Compare/>}>  </Route>
                <Route path="/getFeedbackReview" element={<Feedback/>}>  </Route>
            </Routes>
        </BrowserRouter>
      </div>
  );
}
export default App;
