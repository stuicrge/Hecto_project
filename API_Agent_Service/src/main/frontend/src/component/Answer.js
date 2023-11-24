import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function Answer() {
    const [productAnswer, setAnswer] = useState('');
    const [productAnswer2, setAnswer2] = useState('');

    useEffect(() => {
        // Using an async function to fetch data
        const fetchData = async () => {
            try {
                const encodedProductName = encodeURIComponent('[골프에디션] 오투부스터 (5포)');
                const response = await axios.get('http://localhost:8080/findByAnswer', {
                    params: { productName: encodedProductName, productAnswer: '긍정', productAnswer2: '부정' }
                });

                // Update state with fetched data
                setAnswer(response.data.positiveness);
                setAnswer2(response.data.negativeness);
                console.log(response.data.positiveness);
                console.log(response.data.negativeness);
            } catch (error) {
                console.log(error);
            }
        };

        // Call the async function
        fetchData();
    }, []); // Empty dependency array to run the effect only once, similar to componentDidMount

    return (
        <div>
            <Navbar expand="lg" bg="light">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Display fetched data */}
            <div>
                {/*<p>상품명 : </p>*/}
                {/*<select>*/}
                {/*    <option value={}>{}</option>*/}
                {/*</select>*/}
                긍정후기갯수: {productAnswer}
            </div>
            <div>
                부정후기갯수: {productAnswer2}
            </div>
        </div>
    );
}
