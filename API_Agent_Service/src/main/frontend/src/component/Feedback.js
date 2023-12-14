import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './Feedback.css';
const FeedbackComponents = ({ mostnegFeedback, negFeedback,mostnegType,negType,mostnegImprove,negImprove }) => {
    return (
        <div className="feedback_container">
            <div className="mostneg-container">
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <td>유형</td>
                        <td>후기</td>
                        <td>개선점</td>
                    </tr>
                    </thead>
                    <tbody>
                    {/* negType 배열의 각 항목에 대한 행 */}
                    {mostnegType.map((sentence, index) => (
                        <tr key={index}>
                            <td>{sentence}</td>
                            <td>{mostnegFeedback[index]}</td>
                            <td>{mostnegImprove[index]}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <div className="neg-container">
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <td>유형</td>
                        <td>후기</td>
                        <td>개선점</td>
                    </tr>
                    </thead>
                    <tbody>
                    {/* negType 배열의 각 항목에 대한 행 */}
                    {negType.map((sentence, index) => (
                        <tr key={index}>
                            <td>{sentence}</td>
                            <td>{negFeedback[index]}</td>
                            <td>{negImprove[index]}</td>
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
                        negType={negType}
                        negFeedback={negFeedback}
                        negImprove={negImprove}
                        mostnegType={mostnegType}
                        mostnegFeedback={mostnegFeedback}
                        mostnegImprove={mostnegImprove}
                    />
                </div>
            )}
        </div>
    );
};

export default Feedback;