import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button} from 'react-bootstrap';
import { FormControl, InputGroup, Form } from 'react-bootstrap';
import 'chart.js/auto';
import {Bar, Doughnut} from "react-chartjs-2";
import './Answer.css';


const AnswerComponent = ({mostposAnswerCount, positiveAnswerCount, normalAnswerCount,negativeAnswerCount,mostnegAnswerCount }) => {
    return (
        <div>
            {/*<h2>Review Information for {productName}</h2>*/}
            <p>Most Positive Answer Count: {mostposAnswerCount}</p>
            <p>Positive Answer Count: {positiveAnswerCount}</p>
            <p>Normal Answer Count: {normalAnswerCount}</p>
            <p>Negative Answer Count: {negativeAnswerCount}</p>
            <p>Most Negative Answer Count: {mostnegAnswerCount}</p>
        </div>
    );
};

const Answer = () => {
    const [productName, setProductName] = useState('');
    const [mostposAnswerCount, setMostPositiveAnswerCount] = useState(null);
    const [positiveAnswerCount, setPositiveAnswerCount] = useState(null);
    const [normalAnswerCount, setNormalAnswerCount] = useState(null);
    const [negativeAnswerCount, setNegativeAnswerCount] = useState(null);
    const [mostnegAnswerCount, setMostNegativeAnswerCount] = useState(null);
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
            setMostPositiveAnswerCount(data.MostPositiveAnswerCount);
            setPositiveAnswerCount(data.PositiveAnswerCount);
            setNormalAnswerCount(data.NormalAnswerCount);
            setNegativeAnswerCount(data.NegativeAnswerCount);
            setMostNegativeAnswerCount(data.MostNegativeAnswerCount);
            setShowAnswerComponent(true); // AnswerComponent를 보이도록 설정

        } catch (error) {
            console.error('Error fetching data:', error);
            setShowAnswerComponent(false); // 에러 발생 시 AnswerComponent를 숨기도록 설정
        }
    };

    const chartData = {
        labels: ['Most Positive','Positive', 'Normal','Negative','Most Negative'],
        datasets: [
            {
                label: 'Answer Count',
                data: [mostposAnswerCount, positiveAnswerCount, normalAnswerCount,  negativeAnswerCount, mostnegAnswerCount],
                backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FF5733', '#8A2BE2'], // Green for positive, Red for negative
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
                    <div className="Answercontainer">
                        <AnswerComponent
                            productName={productName}
                            mostposAnswerCount={mostposAnswerCount}
                            positiveAnswerCount={positiveAnswerCount}
                            normalAnswerCount={normalAnswerCount}
                            negativeAnswerCount={negativeAnswerCount}
                            mostnegAnswerCount={mostnegAnswerCount}
                        />
                    </div>

                    <div className="chartcontainer">
                    <div className="Barchartcontainer">
                        <Bar data={chartData} />
                    </div>
                    <div className="Doughnutchartcontainer">
                        <Doughnut data={chartData} />
                    </div>
                    </div>

                </div>
            )}


        </div>
    );
};
export default Answer;



