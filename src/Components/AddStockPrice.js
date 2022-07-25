import React,{ useState } from "react";
import { Form, InputGroup, Row, Button } from 'react-bootstrap';
import axios from "axios";


const AddStockPrice = () => {
    const url = "http://localhost:9086/api/v1.0/market/stock/add/{companyCode}";
    const [addStock, setAddStock] = useState({
        companyCode: '',
        stockPrice: 0,
      });

      const handleChange = (e) => {
        setAddStock({ ...addStock, [e.target.name]: e.target.value });
      }

      const submitButton = (e) => {
        e.preventDefault();
        console.log(addStock);
        axios.post(url,addStock).then(response => {
            console.log("AddStockprice response" + response);
        })
        .catch(error => {
            console.log(error);
          });
        //resetButton()
      }
    return (
    <div>
        <h2 className="container text-success mt-3 mb-3">Add Stock Price</h2>
    <form className="container mt-3 mb-3">
        <Form.Group controlId="formCompanyCode" >
            <Form.Label>Company Code</Form.Label>
            <Form.Control type="name" name="companyCode" value={addStock.companyCode} onChange={handleChange} className="form-control" />
        </Form.Group>
        <Form.Group controlId="formStockPrice" className="mb-3">
            <Form.Label>Stock Price</Form.Label>
            <Form.Control type="name" name="stockPrice" value={addStock.stockPrice} onChange={handleChange} className="form-control" />
        </Form.Group>
    
    <Row className="mb-3">
        <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <button type="submit" onClick={submitButton} className="me-4 btn btn-success btn-lg btn-block">Add Stock</button>
        </Form.Group>
    </Row>
</form>
</div>
    )
}

export default AddStockPrice;