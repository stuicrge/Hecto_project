import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Correct import statement
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'; // Correct import statements

export default function Main() {
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        axios.get('/findByAnswer', { params: { answer: '긍정' } })
            .then(response => setAnswer(response.data.result))
            .catch(error => console.log(error))
    }, []);

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
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            긍정후기갯수: {answer}
            부정후기갯수: {answer}
        </div>
    );
}
