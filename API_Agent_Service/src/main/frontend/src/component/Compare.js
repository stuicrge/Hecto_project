import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import styles from './Compare.module.css';
import Header from "./Header";
const Compare = () => {

    const [productName, setProductName] = useState('');
    const [selectProducts, setSelectProducts] = useState([]);
    const [mostposAnswerPer, setMostPositiveAnswerPer] = useState(null);
    const [positiveAnswerPer, setPositiveAnswerPer] = useState(null);
    const [normalAnswerPer, setNormalAnswerPer] = useState(null);
    const [negativeAnswerPer, setNegativeAnswerPer] = useState(null);
    const [mostnegAnswerPer, setMostNegativeAnswerPer] = useState(null);
    const [allAnswerCounts, setAllAnswerCounts] = useState('');
    const [showPercentComponents, setShowPercentComponents] = useState(false);

    const [mostposComparePer, setMostPositiveComparePer] = useState(null);
    const [positiveComparePer, setPositiveComparePer] = useState(null);
    const [normalComparePer, setNormalComparePer] = useState(null);
    const [negativeComparePer, setNegativeComparePer] = useState(null);
    const [mostnegComparePer, setMostNegativeComparePer] = useState(null);
    const [allCompareCounts, setAllCompareCounts] = useState('');

    const CompareReviews = async () => {

        try {
            const encodedProductName = encodeURIComponent(productName);
            const encodedName = encodeURIComponent('락토핏 골드 1통 (50일분)');
            const response = await fetch(`/CompareReviews?productName=${encodedProductName}&name=${encodedName}`);


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setSelectProducts(data.SelectDesimone);

            setMostPositiveAnswerPer(data.MostPositiveAnswerPer);
            setPositiveAnswerPer(data.PositiveAnswerPer);
            setNormalAnswerPer(data.NormalAnswerPer);
            setNegativeAnswerPer(data.NegativeAnswerPer);
            setMostNegativeAnswerPer(data.MostNegativeAnswerPer);
            setAllAnswerCounts(data.AllAnswerCount);
            setShowPercentComponents(true); // AnswerComponent를 보이도록 설정

            setMostPositiveComparePer(data.MostPositiveComparePer);
            setPositiveComparePer(data.PositiveComparePer);
            setNormalComparePer(data.NormalComparePer);
            setNegativeComparePer(data.NegativeComparePer);
            setMostNegativeComparePer(data.MostNegativeComparePer);
            setAllCompareCounts(data.AllCompareCount);

        } catch (error) {
            console.error('Error fetching data:', error);
            setShowPercentComponents(false);
        }
    };


    const chartData = {
        labels: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'],
        datasets: [
            {
                label: '또박케어',
                data: [mostposAnswerPer, positiveAnswerPer, normalAnswerPer, negativeAnswerPer, mostnegAnswerPer],
                backgroundColor: ['#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB'],
            },

            {
                label: '락토핏',
                data: [mostposComparePer, positiveComparePer, normalComparePer, negativeComparePer, mostnegComparePer],
                backgroundColor: ['#ffe563', '#ffe563', '#ffe563', '#ffe563', '#FF6384'],
            },
        ],
    };

    const PercentComponents = ({ mostposAnswerPer, positiveAnswerPer, normalAnswerPer, negativeAnswerPer, mostnegAnswerPer,
                                   mostposComparePer, positiveComparePer, normalComparePer, negativeComparePer, mostnegComparePer,allAnswerCounts,allCompareCounts,productName}) => {
        return (
            <div className={styles.data_container} style={{ fontFamily: 'TAEBAEKfont', fontSize: '25px'}} >
                <div className={styles.ttobak}>
                    <p className={styles.productName}>{productName}</p>
                    <p>총 개수: {allAnswerCounts}개</p>
                    <p>매우 좋음: {mostposAnswerPer}%</p>
                    <p>좋음: {positiveAnswerPer}%</p>
                    <p>보통: {normalAnswerPer}%</p>
                    <p>나쁨: {negativeAnswerPer}%</p>
                    <p>매우 나쁨: {mostnegAnswerPer }%</p>
                </div>
                <div className={styles.chart_container}>
                    <Bar data={chartData} className={styles.Barchart} />
                </div>
                <div className={styles.lactofit}>
                    <p className={styles.productName}>락토핏 골드 1통 (50일분)</p>
                    <p>총 개수: {allCompareCounts}개</p>
                    <p>매우 좋음: {mostposComparePer}%</p>
                    <p>좋음: {positiveComparePer}%</p>
                    <p>보통: {normalComparePer}%</p>
                    <p>나쁨: {negativeComparePer}%</p>
                    <p>매우 나쁨: {mostnegComparePer}%</p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header/>
            <br />
            <div className="select_container">
                <label htmlFor="productSelect" style={{ fontFamily: 'TAEBAEKfont', fontSize: '30px'}}>제품명:  </label>
                <select id="productSelect"
                    className="form-select custom-select-width" // Bootstrap class for styling select dropdown
                    value={productName}

                    onClick={()=>CompareReviews()}

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

            {showPercentComponents && (
                <PercentComponents
                    productName={productName}
                    allAnswerCounts = {allAnswerCounts}
                    mostposAnswerPer={mostposAnswerPer}
                    positiveAnswerPer={positiveAnswerPer}
                    normalAnswerPer={normalAnswerPer}
                    negativeAnswerPer={negativeAnswerPer}
                    mostnegAnswerPer={mostnegAnswerPer}

                    allCompareCounts={allCompareCounts}
                    mostposComparePer={mostposComparePer}
                    positiveComparePer={positiveComparePer}
                    normalComparePer={normalComparePer}
                    negativeComparePer={negativeComparePer}
                    mostnegComparePer={mostnegComparePer}
                />
            )}
        </div>
    );
};
export default Compare;


