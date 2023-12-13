import React,  {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar} from 'react-bootstrap';
import 'chart.js/auto';
import {Bar, Doughnut} from "react-chartjs-2";
import './Answer.css';
import {Link} from "react-router-dom";


const AnswerComponent = ({mostposAnswerCount, positiveAnswerCount, normalAnswerCount,negativeAnswerCount,mostnegAnswerCount, allAnswerCounts }) => {
    return (
        <div>
            {/*<h2>Review Information for {productName}</h2>*/}
            <p>총 갯수: {allAnswerCounts}</p>
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
    const [selectProducts, setSelectProducts] = useState([]);
    const [mostposAnswerCount, setMostPositiveAnswerCount] = useState(null);
    const [positiveAnswerCount, setPositiveAnswerCount] = useState(null);
    const [normalAnswerCount, setNormalAnswerCount] = useState(null);
    const [negativeAnswerCount, setNegativeAnswerCount] = useState(null);
    const [mostnegAnswerCount, setMostNegativeAnswerCount] = useState(null);
    const [allAnswerCounts, setAllAnswerCount] = useState('');
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

            setSelectProducts(data.SelectProduct);
            console.log(data.SelectProduct);
            setMostPositiveAnswerCount(data.MostPositiveAnswerCount);
            setPositiveAnswerCount(data.PositiveAnswerCount);
            setNormalAnswerCount(data.NormalAnswerCount);
            setNegativeAnswerCount(data.NegativeAnswerCount);
            setMostNegativeAnswerCount(data.MostNegativeAnswerCount);
            setAllAnswerCount(data.AllAnswerCount);
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
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/getCountByAnswer">또박케어 상품 후기 선호도</Nav.Link>
                        <Nav.Link as={Link} to="/CompareReviews">타사 제품과 비교</Nav.Link>
                        <Nav.Link as={Link} to="/getFeedbackReview">또박케어 상품의 개선점</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <div>
                {/* Existing Navbar and other components */}
                <br />
                <h3>제품명: {productName}</h3>
                <div className="select_container">
                    {/* Bootstrap-styled Dropdown for selecting a product */}
                    <select
                        className="form-select custom-select-width" // oBotstrap class for styling select dropdown
                        value={productName}

                        onClick={()=>getCountByAnswer()}

                        onChange={(e) => setProductName(e.target.value)
                        }
                    >
                        {selectProducts.map((product, index) => (
                            <option key={index} value={product}>
                                {product}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Existing showAnswerComponent logic and components */}
            </div>



            {showAnswerComponent && (

                <div className="c_container">
                    <div className="Answercontainer">
                        <AnswerComponent
                            allAnswerCounts={allAnswerCounts}
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



