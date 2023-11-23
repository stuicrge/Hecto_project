import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Correct import statement

import Answer from './Answer'
import Charts from "./Charts";
export default function Main() {

    return (
        <div>
            <Answer/>
            <Charts/>
        </div>
    );
}
