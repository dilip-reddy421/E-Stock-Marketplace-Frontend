import React,{ useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Header() {

    const [companyCode, setCompanyCode] = useState();

    const handleChange = (e) => {
        console.log("companyCode"+ companyCode);
        setCompanyCode(e.target.value);
      }

  return (
    <Navbar bg="success" bg-success variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as= {Link} to="/home">E-StockMarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as= {Link} to="/home"> Home</Nav.Link>
            <Nav.Link as= {Link} to="/register"> Add Company</Nav.Link>
            <Nav.Link as= {Link} to="/fetchAllCompanies">List All Companies</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Company Code"
              value = {companyCode}
              onChange={handleChange}
              className="me-2"
              aria-label="Search"
            />
            <Button as = {Link} to= {`/companyInfo/${companyCode}`} variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;