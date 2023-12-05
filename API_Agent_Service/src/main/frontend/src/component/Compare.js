import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import './Answer.css';
import {Link} from "react-router-dom";

const AnswerComponents = ({ mostposAnswerCount, positiveAnswerCount, normalAnswerCount, negativeAnswerCount, mostnegAnswerCount,
                              mostposCompareCount, positiveCompareCount, normalCompareCount, negativeCompareCount, mostnegCompareCount}) => {
    return (
        <div>
            <p>매우 좋음: {mostposAnswerCount}</p>
            <p>좋음: {positiveAnswerCount}</p>
            <p>보통: {normalAnswerCount}</p>
            <p>나쁨: {negativeAnswerCount}</p>
            <p>매우 나쁨: {mostnegAnswerCount}</p>

            <p>매우 좋음: {mostposCompareCount}</p>
            <p>좋음: {positiveCompareCount}</p>
            <p>보통: {normalCompareCount}</p>
            <p>나쁨: {negativeCompareCount}</p>
            <p>매우 나쁨: {mostnegCompareCount}</p>
        </div>
    );
};

const Compare = () => {

    const [productName, setProductName] = useState('');
    const [mostposAnswerCount, setMostPositiveAnswerCount] = useState(null);
    const [positiveAnswerCount, setPositiveAnswerCount] = useState(null);
    const [normalAnswerCount, setNormalAnswerCount] = useState(null);
    const [negativeAnswerCount, setNegativeAnswerCount] = useState(null);
    const [mostnegAnswerCount, setMostNegativeAnswerCount] = useState(null);
    const [showAnswerComponent, setShowAnswerComponent] = useState(false);

    const [mostposCompareCount, setMostPositiveCompareCount] = useState(null);
    const [positiveCompareCount, setPositiveCompareCount] = useState(null);
    const [normalCompareCount, setNormalCompareCount] = useState(null);
    const [negativeCompareCount, setNegativeCompareCount] = useState(null);
    const [mostnegCompareCount, setMostNegativeCompareCount] = useState(null);

    const CompareReviews = async () => {

        try {
            const encodedProductName = encodeURIComponent(productName);
            const encodedName = encodeURIComponent('락토핏 골드 1통 (50일분)');
            const response = await fetch(`/CompareReviews?productName=${encodedProductName}&name=${encodedName}`);


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

            setMostPositiveCompareCount(data.MostPositiveCompareCount);
            setPositiveCompareCount(data.PositiveCompareCount);
            setNormalCompareCount(data.NormalCompareCount);
            setNegativeCompareCount(data.NegativeCompareCount);
            setMostNegativeCompareCount(data.MostNegativeCompareCount);



        } catch (error) {
            console.error('Error fetching data:', error);
            setShowAnswerComponent(false); // 에러 발생 시 AnswerComponent를 숨기도록 설정

        }
    };

    const chartData = {
        labels: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'],
        datasets: [
            {
                label: '또박케어',
                data: [mostposAnswerCount, positiveAnswerCount, normalAnswerCount, negativeAnswerCount, mostnegAnswerCount],
                backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FF5733', '#8A2BE2'],
            },
            {
                label: '락토핏',
                data: [mostposCompareCount, positiveCompareCount, normalCompareCount, negativeCompareCount, mostnegCompareCount],
                backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FF5733', '#8A2BE2'],
            },
        ],
    };

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/getCountByAnswer">또박케어 상품 후기 선호도</Nav.Link>
                        <Nav.Link as={Link} to="/CompareReviews">타사 제품과 비교</Nav.Link>
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
                        className="small-placeholder"
                    />
                </InputGroup>
            </Form>
            <br />
            <Button onClick={CompareReviews}>Get Answer Count</Button>

            {showAnswerComponent && (
                <div className="c_container">
                    <div className="Answercontainer">
                        <AnswerComponents
                            mostposAnswerCount={mostposAnswerCount}
                            positiveAnswerCount={positiveAnswerCount}
                            normalAnswerCount={normalAnswerCount}
                            negativeAnswerCount={negativeAnswerCount}
                            mostnegAnswerCount={mostnegAnswerCount}

                            mostposCompareCount={mostposCompareCount}
                            positiveCompareCount={positiveCompareCount}
                            normalCompareCount={normalCompareCount}
                            negativeCompareCount={negativeCompareCount}
                            mostnegCompareCount={mostnegCompareCount}
                        />
                    </div>

                    <div className="chartcontainer">
                        <div className="Barchartcontainer">
                            <Bar data={chartData} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Compare;


