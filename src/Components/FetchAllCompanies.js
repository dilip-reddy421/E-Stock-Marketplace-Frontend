import React, {useState,useEffect} from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import DeleteCompany from "./DeleteCompany";
import 'react-toastify/dist/ReactToastify.css';


const FetchAllCompanies = () => {
    const url = `http://localhost:8090/api/v1.0/market/company/getAll`;

    const [companyStockDtoList, setCompanyStockDtoList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [companyCode, setCompanyCode] = useState('');

    useEffect(() => {
        console.log("component loaded with "+companyCode);
        axios.get(url).then(response => {
            console.log("response "+JSON.stringify(response))
            setCompanyStockDtoList(response.data);
        })
      },[modalShow])
    
    if(!companyStockDtoList.length){
        return (
            <div>No companies Have been registered</div>
        )
    }

    return (
    <div>
        <div className="table-responsive-sm">
        <table className="table table-striped  my-3 caption-top">
        <caption className= "text-success text-center"><h2>All Companies Information</h2></caption>
        <thead>
            <tr>
            <th scope="col">Company Code</th>
            <th scope="col">Company Name</th>
            <th scope="col">Company Ceo</th>
            <th scope="col">Company TurnOver</th>
            <th scope="col">Company Website</th>
            <th scope="col">Stock Exchange</th>
            <th scope="col">Latest StockPrice</th>
            <th style={{ width: "120px" }}>Actions</th>
            </tr>
        </thead>
        <tbody className="table-group-divider">
            {companyStockDtoList.map(companyStockDto => (
                        <tr key={companyStockDto.companyId} >
                        <td >{companyStockDto.companyCode}</td>
                        <td >{companyStockDto.companyName}</td>
                        <td >{companyStockDto.companyCeo}</td>
                        <td >{companyStockDto.companyTurnOver}</td>
                        <td >{companyStockDto.companyWebsite}</td>
                        <td >{companyStockDto.stockExchange}</td>
                        <td >{companyStockDto.latestStockPrice}</td>
                        <td>
                            <MdDelete onClick={() =>{
                                setCompanyCode(companyStockDto.companyCode);
                                setModalShow(true)
                                }} className="text-danger cursor" />
                            </td>
                        </tr>
                    ))}
        </tbody>
        </table>
        </div>
        <DeleteCompany
        show={modalShow}
        onHide={() => setModalShow(false)}
        companyCode = {companyCode}
      />
    </div>
    )
}

export default FetchAllCompanies;