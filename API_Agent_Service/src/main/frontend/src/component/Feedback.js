import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar,Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './Feedback.css';
const FeedbackComponents = ({ mostnegFeedback, negFeedback,mostnegType,negType,mostnegImprove,negImprove }) => {
    return (
        <div className="feedback_container">
            <div className="mostneg-container">
            <Table striped="columns">
                <thead>
                <tr>
                    <th>#</th>
                    <th>유형</th>
                    <th>후기</th>
                    <th>피드백</th>
                </tr>
                </thead>
                <tbody>
                {negType.map((type, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{type}</td>
                        <td>{negFeedback[index]}</td>
                        <td>{negImprove[index]}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>

            <div className="neg-container">
            <Table striped="columns">
                <thead>
                <tr>
                    <th>#</th>
                    <th>유형</th>
                    <th>후기</th>
                    <th>피드백</th>
                </tr>
                </thead>
                <tbody>
                {mostnegFeedback.map((review, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{mostnegType[index]}</td>
                        <td>{review}</td>
                        <td>{mostnegImprove[index]}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
        </div>
    );
};

const Feedback = () => {
    const [productName, setProductName] = useState('');
    const [selectProducts, setSelectProducts] = useState([]);
    const [negFeedback, setNegativeFeedback] = useState('');
    const [mostnegFeedback, setMostNegativeFeedback] =useState('');
    const [mostnegType, setNegativeType] = useState('');
    const [negType, setMostNegativeType] =useState('');
    const [mostnegImprove, setNegativeImprove] = useState('');
    const [negImprove, setMostNegativeImprove] =useState('');

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
            <h3>제품명: {productName}</h3>
            <div className="select_container">
                {/* Bootstrap-styled Dropdown for selecting a product */}
                <select
                    className="form-select custom-select-width" // oBotstrap class for styling select dropdown
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