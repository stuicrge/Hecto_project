import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar,Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './Feedback.module.css';
import Header from "./Header";
const FeedbackComponents = ({ mostnegFeedback, negFeedback,mostnegType,negType,mostnegImprove,negImprove }) => {
    return (
        <div className="table_container">
            {mostnegType.length > 0 && (
                <div className="mostneg-container">
                    <label htmlFor="mostnegTable" style={{ fontFamily: 'TAEBAEKfont', fontSize: '30px', textAlign: 'center'}}>매우 나쁨</label>
                    <Table striped bordered hover size="sm" id="mostnegTable">
                        <thead>
                        <tr>
                            <td>유형</td>
                            <td>후기</td>
                            <td>개선점</td>
                        </tr>
                        </thead>
                        <tbody>
                        {mostnegType.map((sentence, index) => (
                            <tr key={index}>
                                <td className="type-box">{sentence}</td>
                                <td>{mostnegFeedback[index]}</td>
                                <td>{mostnegImprove[index]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <br/>
            {negType.length > 0 && (
                <div className="neg-container">
                    <label htmlFor="negTable" style={{ fontFamily: 'TAEBAEKfont', fontSize: '30px', textAlign: 'center'}}>나쁨</label>
                    <Table striped bordered hover size="sm" id="negTable">
                        <thead>
                        <tr>
                            <td>유형</td>
                            <td>후기</td>
                            <td>개선점</td>
                        </tr>
                        </thead>
                        <tbody>
                        {negType.map((sentence, index) => (
                            <tr key={index}>
                                <td className="type-box2">{sentence}</td>
                                <td>{negFeedback[index]}</td>
                                <td>{negImprove[index]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

const Feedback = () => {
    const [productName, setProductName] = useState('');
    const [selectProducts, setSelectProducts] = useState([]);
    const [negFeedback, setNegativeFeedback] = useState([]);
    const [mostnegFeedback, setMostNegativeFeedback] =useState([]);
    const [negType, setNegativeType] = useState([]);
    const [mostnegType, setMostNegativeType] =useState([]);
    const [negImprove, setNegativeImprove] = useState([]);
    const [mostnegImprove, setMostNegativeImprove] =useState([]);

    const [showFeedbackComponents, setShowFeedbackComponents] = useState(false);

    const ReviewFeedback = async () => {
        try {
            const encodedProductName = encodeURIComponent(productName);
            const response = await fetch(`/getFeedbackReview?productName=${encodedProductName}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setSelectProducts(data.SelectProduct);

            setNegativeFeedback(data.NegativeReviewFeedback);
            setMostNegativeFeedback(data.MostNegativeReviewFeedback);
            setNegativeType(data.NegativeTypeFeedback);
            setMostNegativeType(data.MostNegativeTypeFeedback);
            setNegativeImprove(data.NegativeImproveFeedback);
            setMostNegativeImprove(data.MostNegativeImproveFeedback);

            setShowFeedbackComponents(true);
        } catch (error) {
            console.error('Failed to fetch feedback review:', error);
            setShowFeedbackComponents(false);
        }
    };

    return (
        <div>
            <Header/>
            <br/>
            <div className="select_container">
                <label htmlFor="productSelect" style={{ fontFamily: 'TAEBAEKfont', fontSize: '30px'}}>제품명:  </label>
                <select id="productSelect"
                    className="form-select custom-select-width" // Bootstrap class for styling select dropdown
                    value={productName}

                    onClick={()=>ReviewFeedback()}

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
            <br/>
            {showFeedbackComponents && (
                <div>
                    <FeedbackComponents
                        productName={productName}
                        negFeedback={negFeedback}
                        mostnegFeedback={mostnegFeedback}
                        negType={negType}
                        mostnegType={mostnegType}
                        negImprove={negImprove}
                        mostnegImprove={mostnegImprove}
                    />
                </div>
            )}
        </div>
    );
};

export default Feedback;