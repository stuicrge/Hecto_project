import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button} from 'react-bootstrap';
import { FormControl, InputGroup, Form } from 'react-bootstrap';
import 'chart.js/auto';
import {Bar, Doughnut} from "react-chartjs-2";
const AnswerComponent = ({positiveAnswerCount, negativeAnswerCount }) => {
    return (
        <div>
            {/*<h2>Review Information for {productName}</h2>*/}
            <p>Positive Answer Count: {positiveAnswerCount}</p>
            <p>Negative Answer Count: {negativeAnswerCount}</p>
        </div>
    );
};

const Answer = () => {
    const [productName, setProductName] = useState('');
    const [positiveAnswerCount, setPositiveAnswerCount] = useState(null);
    const [negativeAnswerCount, setNegativeAnswerCount] = useState(null);
    const [showAnswerComponent, setShowAnswerComponent] = useState(false);

    const getCountByAnswer = async () => {
        try {
            const encodedProductName = encodeURIComponent(productName);
            const response = await fetch(`/getCountByAnswer?productName=${encodedProductName}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // 결과 값을 상태에 업데이트
            setPositiveAnswerCount(data.PositiveAnswerCount);
            setNegativeAnswerCount(data.NegativeAnswerCount);
            setShowAnswerComponent(true); // AnswerComponent를 보이도록 설정

        } catch (error) {
            console.error('Error fetching data:', error);
            setShowAnswerComponent(false); // 에러 발생 시 AnswerComponent를 숨기도록 설정
        }
    };

    const chartData = {
        labels: ['Positive', 'Negative'],
        datasets: [
            {
                label: 'Answer Count',
                data: [positiveAnswerCount, negativeAnswerCount],
                backgroundColor: ['#4CAF50', '#FF5733'], // Green for positive, Red for negative
            },
        ],
    };

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>0
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            </Container>
            </Navbar>
            <br />

            <h1>Review Information</h1>
            <Form>
                <Form.Label></Form.Label>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Search Product"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </InputGroup>
            </Form>
            <br />
            <Button onClick={getCountByAnswer}>Get Answer Count</Button>

            {showAnswerComponent && (

                <div>
                <AnswerComponent
                    productName={productName}
                    positiveAnswerCount={positiveAnswerCount}
                    negativeAnswerCount={negativeAnswerCount}
                />
                    <Bar data={chartData} />
                    <Doughnut data={chartData} />

                </div>
            )}


        </div>
    );
};
export default Answer;



