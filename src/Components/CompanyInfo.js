import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";


const CompanyInfo = () => {
    let params = useParams();
    const url = `http://localhost:8090/api/v1.0/market/company/info/${params.companyCode}`;
    const [companyStockDto, setcompanyStockDto] = useState({
        companyCode: '',
        companyName: '',
        companyCeo: '',
        companyTurnOver: 0,
        companyWebsite: '',
        stockExchange: '',
        latestStockPrice:''
      });
    const [companyExists, setCompanyExists] = useState(false);

    useEffect(() => {
        axios.get(url).then(response => {
            console.log("response "+JSON.stringify(response))
            if(response.data){
                setcompanyStockDto(response.data);
                setCompanyExists(true);
            }
        })
      }, [])
    
    if(!companyExists){
        return (
            <div>Company not exists with specified company code, Please specify correct company code</div>
        )
    }

    return (
        <div>
            <h1 className = "text-success mb-2 text-center">Company Information</h1>
            <Container className="justify-content-center">
                <Row className="justify-content-center">
                    <Col className = "me-2 text-info col-md-3">Company Code</Col>
                    <Col className = "col-md-3">{companyStockDto.companyCode}</Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className = "me-2 text-info col-md-3">Company Name</Col>
                    <Col className = "col-md-3">{companyStockDto.companyName}</Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className = "me-2 text-info col-md-3">Company Ceo</Col>
                    <Col className = "col-md-3">{companyStockDto.companyCeo}</Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className = "me-2 text-info col-md-3">Company TurnOver</Col>
                    <Col className = "col-md-3">{companyStockDto.companyTurnOver}</Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className = "me-2 text-info col-md-3">Company Website</Col>
                    <Col className = "col-md-3">{companyStockDto.companyWebsite}</Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className = "me-2 text-info col-md-3">Stock Exchange</Col>
                    <Col className = "col-md-3">{companyStockDto.stockExchange}</Col>
                </Row >
                <Row className="justify-content-center">
                    <Col className = "me-2 text-info col-md-3">Latest StockPrice</Col>
                    <Col className = "col-md-3">{companyStockDto.latestStockPrice}</Col>
                </Row>
            </Container>
        </div>
    )
}

export default CompanyInfo;