import React,  {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';
import {Bar, Doughnut} from "react-chartjs-2";
import styles from './Answer.module.css';
import Header from "./Header";

const AnswerComponent = ({mostposAnswerCount, positiveAnswerCount, normalAnswerCount,negativeAnswerCount,mostnegAnswerCount, allAnswerCounts }) => {
    return (
        <div style={{ fontFamily: 'TAEBAEKfont', fontSize: '25px'}}>
            <p>총 개수: {allAnswerCounts}개</p>
            <p>매우 좋음: {mostposAnswerCount}개</p>
            <p>좋음: {positiveAnswerCount}개</p>
            <p>보통: {normalAnswerCount}개</p>
            <p>나쁨: {negativeAnswerCount}개</p>
            <p>매우 나쁨: {mostnegAnswerCount}개</p>
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
                label: '만족도',
                data: [mostposAnswerCount, positiveAnswerCount, normalAnswerCount,  negativeAnswerCount, mostnegAnswerCount],
                backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FF5733', '#8A2BE2'],
            },
        ],
    };

    return (
        <div>
            <Header/>
            <br />
            <div className="select_container">
                <label htmlFor="productSelect" style={{ fontFamily: 'TAEBAEKfont', fontSize: '30px'}}>제품명:  </label>
                <select id="productSelect"
                        className="form-select custom-select-width"
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

            {showAnswerComponent && (

                <div className={styles.data_container}>
                    <div className={styles.count_container}>
                        <AnswerComponent
                            allAnswerCounts={allAnswerCounts}
                            mostposAnswerCount={mostposAnswerCount}
                            positiveAnswerCount={positiveAnswerCount}
                            normalAnswerCount={normalAnswerCount}
                            negativeAnswerCount={negativeAnswerCount}
                            mostnegAnswerCount={mostnegAnswerCount}
                        />
                    </div>

                    <div className={styles.chart_container}>
                        <Bar data={chartData} className={styles.Barchart}/>
                    </div>
                    <div className={styles.chart_container}>
                        <Doughnut data={chartData} className={styles.Doughnutchart} />
                    </div>
                </div>
            )}
        </div>
    );
};
export default Answer;



