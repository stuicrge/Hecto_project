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
            <p>매우 좋음: {mostposAnswerCount}</p>
            <p>좋음: {positiveAnswerCount}</p>
            <p>보통: {normalAnswerCount}</p>
            <p>나쁨: {negativeAnswerCount}</p>
            <p>매우 나쁨: {mostnegAnswerCount}</p>
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
        labels: ['매우 좋음','좋음', '보통','나쁨','매우 나쁨'],
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
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">또박케어 상품 후기 선호도</Nav.Link>0
            <Nav.Link href="#features">타사 제품과 비교</Nav.Link>
            </Nav>
            </Container>
            </Navbar>
            <br />

            <h1>Review Information</h1>
            <Form >
                <Form.Label></Form.Label>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Search Product"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className = "small-placeholder"
                    />
                </InputGroup>
            </Form>
            <br />
            <Button onClick={getCountByAnswer}>Get Answer Count</Button>

            {showAnswerComponent && (

                <div className="c_container">
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



