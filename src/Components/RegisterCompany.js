import React,{ useState } from "react";
import { Form, Row, Col, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const RegisterCompany = () => {
    const url = "http://localhost:8090/api/v1.0/market/company/register";
    const [company, setCompany] = useState({
        companyCode: '',
        companyName: '',
        companyCeo: '',
        companyTurnOver: 0,
        companyWebsite: '',
        stockExchange: '',
      });
    const [ errors, setErrors ] = useState({});

      const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
        if ( !!errors[e.target.name] ) setErrors({
            ...errors,
            [e.target.name]: null
          })
      }


      const findFormErrors = () => {
        const { companyCode,companyName,companyCeo,companyTurnOver,companyWebsite,stockExchange} = company
        const newErrors = {}
        // companyCode errors
        if ( !companyCode || companyCode === '' ) newErrors.companyCode = 'Company Code cannot be blank'
        //company name errors
        if ( !companyName || companyName === '' ) newErrors.companyName = 'Company Name cannot be blank!'
        if ( !companyCeo || companyCeo === '' ) newErrors.companyCeo = 'Company Ceo cannot be blank!'
        if ( !companyTurnOver || companyTurnOver === '' ) newErrors.companyTurnOver = 'Company TurnOver cannot be blank!'
        else if ( companyTurnOver < 10000000 ) newErrors.companyTurnOver = 'Company TurnOver should be greater than 10cr'
        if ( !companyWebsite || companyWebsite === '' ) newErrors.companyWebsite = 'Company Website cannot be blank!'
        if ( !stockExchange || stockExchange === '' ) newErrors.stockExchange = 'Stock Exchange cannot be blank!'
        return newErrors
    }

      const submitButton = (e) => {
        e.preventDefault();
        console.log(company);
        const newErrors = findFormErrors()
        console.log("errors"+JSON.stringify(newErrors));
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
       axios.post(url,company).then(response => {
            console.log("company response" + company);
            toast.success("company registered successfully");
            setCompany({
                companyCode: '',
                companyName: '',
                companyCeo: '',
                companyTurnOver: 0,
                companyWebsite: '',
                stockExchange: '',
              });
        })
        .catch(error => {
            toast.error("There is an problem while saving company, Please try again");
            console.log(error);
          });
        }
      }
    return (
        <div>
            <ToastContainer />
            <Container>
                <Row className="justify-content-center">
                    <Col className="col-sm-6 col-md-6 col-lg-4">
                        <h2 className="text-success"> Register a Company </h2>
                        <form className="">
                            <Form.Group controlId="formCompanyCode" >
                                <Form.Label>Company Code</Form.Label>
                                <Form.Control required type="name" name="companyCode" value={company.companyCode} onChange={handleChange} className="form-control" 
                                isInvalid={ !!errors.companyCode } />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.companyCode }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formCompanyName" className="mb-3">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control required type="name" name="companyName" value={company.companyName} onChange={handleChange} className="form-control" 
                                isInvalid={ !!errors.companyName }/>
                                <Form.Control.Feedback type='invalid'>
                                    { errors.companyName }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formCompanyCeo" className="mb-3">
                                <Form.Label>Company Ceo</Form.Label>
                                <Form.Control required type="name" name="companyCeo" value={company.companyCeo} onChange={handleChange} className="form-control" 
                                isInvalid={ !!errors.companyCeo }/>
                                <Form.Control.Feedback type='invalid'>
                                    { errors.companyCeo }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formCompanyTurnOver" className="mb-3">
                                <Form.Label>Company TurnOver</Form.Label>
                                <Form.Control required type="name" name="companyTurnOver" value={company.companyTurnOver} onChange={handleChange} className="form-control" 
                                isInvalid={ !!errors.companyTurnOver }/>
                                <Form.Control.Feedback type='invalid'>
                                    { errors.companyTurnOver }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formCompanyWebsite" className="mb-3">
                                <Form.Label>Company Website</Form.Label>
                                <Form.Control required type="name" name="companyWebsite" value={company.companyWebsite} onChange={handleChange} className="form-control"
                                isInvalid={ !!errors.companyWebsite } />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.companyWebsite }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formStockExchange" className="mb-3">
                                <Form.Label>Stock Exchange</Form.Label>
                                <Form.Control required type="name" name="stockExchange" value={company.stockExchange} onChange={handleChange} className="form-control" 
                                isInvalid={ !!errors.stockExchange }/>
                                <Form.Control.Feedback type='invalid'>
                                    { errors.stockExchange }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formGridCheckbox">
                                <button type="submit" onClick={submitButton} className="me-4 btn btn-success btn-lg btn-block">Register</button>
                            </Form.Group>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterCompany;