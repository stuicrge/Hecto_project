import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import './Answer.css';
import {Link} from "react-router-dom";
const PercentComponents = ({ mostposAnswerPer, positiveAnswerPer, normalAnswerPer, negativeAnswerPer, mostnegAnswerPer,
                              mostposComparePer, positiveComparePer, normalComparePer, negativeComparePer, mostnegComparePer}) => {
    return (
        <div>
            <p>매우 좋음: {mostposAnswerPer}</p>
            <p>좋음: {positiveAnswerPer}</p>
            <p>보통: {normalAnswerPer}</p>
            <p>나쁨: {negativeAnswerPer}</p>
            <p>매우 나쁨: {mostnegAnswerPer }</p>

            <p>매우 좋음: {mostposComparePer}</p>
            <p>좋음: {positiveComparePer}</p>
            <p>보통: {normalComparePer}</p>
            <p>나쁨: {negativeComparePer}</p>
            <p>매우 나쁨: {mostnegComparePer}</p>
        </div>
    );
};




const Compare = () => {

    const [productName, setProductName] = useState('');
    const [mostposAnswerPer, setMostPositiveAnswerPer] = useState(null);
    const [positiveAnswerPer, setPositiveAnswerPer] = useState(null);
    const [normalAnswerPer, setNormalAnswerPer] = useState(null);
    const [negativeAnswerPer, setNegativeAnswerPer] = useState(null);
    const [mostnegAnswerPer, setMostNegativeAnswerPer] = useState(null);
    const [showPercentComponents, setShowPercentComponents] = useState(false);

    const [mostposComparePer, setMostPositiveComparePer] = useState(null);
    const [positiveComparePer, setPositiveComparePer] = useState(null);
    const [normalComparePer, setNormalComparePer] = useState(null);
    const [negativeComparePer, setNegativeComparePer] = useState(null);
    const [mostnegComparePer, setMostNegativeComparePer] = useState(null);




    const CompareReviews = async () => {

        try {
            const encodedProductName = encodeURIComponent(productName);
            const encodedName = encodeURIComponent('락토핏 골드 1통 (50일분)');
            const response = await fetch(`/CompareReviews?productName=${encodedProductName}&name=${encodedName}`);


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setMostPositiveAnswerPer(data.MostPositiveAnswerPer);
            setPositiveAnswerPer(data.PositiveAnswerPer);
            setNormalAnswerPer(data.NormalAnswerPer);
            setNegativeAnswerPer(data.NegativeAnswerPer);
            setMostNegativeAnswerPer(data.MostNegativeAnswerPer);
            setShowPercentComponents(true); // AnswerComponent를 보이도록 설정

            setMostPositiveComparePer(data.MostPositiveComparePer);
            setPositiveComparePer(data.PositiveComparePer);
            setNormalComparePer(data.NormalComparePer);
            setNegativeComparePer(data.NegativeComparePer);
            setMostNegativeComparePer(data.MostNegativeComparePer);

        } catch (error) {
            console.error('Error fetching data:', error);
            //setShowAnswerComponent(false); // 에러 발생 시 AnswerComponent를 숨기도록 설정
            setShowPercentComponents(false);

        }
    };

    const chartData = {
        labels: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'],
        datasets: [
            {
                label: '또박케어2',
                data: [mostposAnswerPer, positiveAnswerPer, normalAnswerPer, negativeAnswerPer, mostnegAnswerPer],
                backgroundColor: ['#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB'],
            },

            {
                label: '락토핏2',
                data: [mostposComparePer, positiveComparePer, normalComparePer, negativeComparePer, mostnegComparePer],
                backgroundColor: ['#FF6384', '#FF6384', '#FF6384', '#FF6384', '#FF6384'],
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
            <Button onClick={CompareReviews}>Get Answer Count</Button>
            {showPercentComponents && (
                <div>
                    <PercentComponents
                        mostposAnswerPer={mostposAnswerPer}
                        positiveAnswerPer={positiveAnswerPer}
                        normalAnswerPer={normalAnswerPer}
                        negativeAnswerPer={negativeAnswerPer}
                        mostnegAnswerPer={mostnegAnswerPer}

                        mostposComparePer={mostposComparePer}
                        positiveComparePer={positiveComparePer}
                        normalComparePer={normalComparePer}
                        negativeComparePer={negativeComparePer}
                        mostnegComparePer={mostnegComparePer}
                    />
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


