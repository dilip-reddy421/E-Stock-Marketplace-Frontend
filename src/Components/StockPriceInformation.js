import React,{ useState } from "react";
import { Form, Row, Col, Button} from 'react-bootstrap';
import axios from "axios";
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const StockPriceInformation = () => {
    const [stockData, setstockData] = useState({
        companyCode: '',
        startDate: '',
        endDate: ''
      });
    const [formStartDate, setFormStartDate] = useState('');
    const [formEndDate, setFormEndDate] = useState('');
      const url = `http://localhost:9086/api/v1.0/market/stock/get/${stockData.companyCode}/${formStartDate}/${formEndDate}`;
    
      const [stockPriceList, setStockPriceList] = useState([]);
      const [stockPriceAggregation, setStockPriceAggregation] = useState({});
      const handleChange = (e) => {
        
        setstockData({ ...stockData, [e.target.name]: e.target.value });
      }

      const handleStartDate = (date) => {
        console.log("start date"+ date._d);
        console.log("start date iso"+ date.toISOString());
        setstockData({ ...stockData, startDate: date});
        setFormStartDate(date.toISOString())
      }

      const handleEndDate = (date) => {
        console.log("end date"+ date);
        setstockData({ ...stockData, endDate: date});
        setFormEndDate(date.toISOString())
      }

      const submitButton = (e) => {
        e.preventDefault();
        console.log(stockData);
        axios.get(url).then(response => {
            console.log("fetch stock info response" + JSON.stringify(response));
            console.log("fetch stock info stockPriceAggregation" + response.data.stockPriceAggregation);
            if(response.data){
                setStockPriceList(response.data.stockList);
                setStockPriceAggregation(response.data.stockPriceAggregation);
            }
        })
        .catch(error => {
            console.log(error);
          });
        //resetButton()
      }
    return (
    <div>
    <h2  className="text-success text-center">Stock Price Information</h2>
    <form className="container mt-4 mb-3">
    <Row>
        <Col>
        <Form.Group controlId="formCompanyCode" >
            <Form.Control type="name" name="companyCode" placeholder="Company Code" value={stockData.companyCode} onChange={handleChange} className="form-control" />
        </Form.Group>
        </Col>
        <Col>
        <Datetime
          value={stockData.startDate}
          onChange={handleStartDate}
          closeOnSelect={true}
          inputProps={{ placeholder: "Start Date" }}
        />
        </Col>
        <Col>
        <Datetime
          value={stockData.endDate}
          onChange={handleEndDate}
          closeOnSelect={true}
          inputProps={{ placeholder: "End Date" }}
        />
        </Col>
    <Col className="mb-3">
        <Button onClick={submitButton} variant="outline-success">Search</Button>
    </Col>
    </Row>
</form>

{stockPriceList.length>0 &&
    <div>
    <div className="table-responsive-sm">
    <table className="table table-striped  my-3 ms-2 caption-top">
    <caption >{stockData.companyCode} -Stock Prices by Date</caption>
      <thead>
        <tr>
          <th scope="col">Price</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {stockPriceList.map(stock => (
                    <tr key={stock.idx} >
                      <td >{stock.stockPrice}</td>
                      <td >{moment(stock.createdDate).format('MMMM Do YYYY')}</td>
                      <td >{moment(stock.createdDate).format('h:mm:ss a')}</td>
                    </tr>
                 ))}
      </tbody>
    </table>
    </div>

    <div className="ms-3"> MIN    {stockPriceAggregation.minStockPrice}</div>
    <div className="ms-3"> MAX    {stockPriceAggregation.maxStockPrice}</div>
    <div className="ms-3"> AVG    {stockPriceAggregation.avgStockPrice}</div>
</div>
}
{!stockPriceList.length &&
    <span>No Stock prices available for the selection</span>
}
</div>)
}

export default StockPriceInformation;