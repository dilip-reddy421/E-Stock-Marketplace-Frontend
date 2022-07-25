import React from "react";
import { Link } from "react-router-dom";
import {Button,Row, Col, Container} from "react-bootstrap";

const Home = () => {
   
    return (
        <Container className="mt-2">
            <Row className="justify-content-center">
        <Col className="col-md-10">
            <p>E Stock market application provides the features to list the companies and adding stock price for the companies registered</p>
            <h1 className = "text-success">Add Stock Price</h1>
            <p> Stock price can be added to the company by specify company code and stock to be added</p>
            <Button as = {Link} to="/addStockPrice" variant="outline-success">Add StockPrice</Button>

            <h1 className = "text-success mt-2"> Fetch StockPrice Information</h1>
            <p> Stock price for a company can be viewed by specify company code and date range</p>
            <Button as = {Link} to="/fetchStockinfo" variant="outline-success">StockPrice Information</Button>
        </Col>
        </Row>
        </Container>
    )
}

export default Home;