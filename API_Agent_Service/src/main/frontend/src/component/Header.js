import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import styles from "./Header.module.css";
import "./Header.css"
import './Font.css';

export default function Header(){
    const ttobakcareLog = "https://web.ttobakcare.com/assets/img_curation_pc_logo.4d01675e.svg";

    return (
        <>
            <div className={styles.home}>
                <span style={{ fontFamily: 'TAEBAEKfont', fontSize: '40px' }}><img src={ttobakcareLog} alt="ttobakcareLog"/>상품 후기 통계 분석</span>
            </div>
            <hr/>
            <div className={styles.navigator}>
                <Nav variant="tabs" defaultActiveKey="/getCountByAnswer">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/getCountByAnswer">또박케어 상품 후기 선호도</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/CompareReviews">타사 제품과 비교</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/getFeedbackReview">또박케어 상품의 개선점</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </>
    )
}