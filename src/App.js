import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import RegisterCompany from './Components/RegisterCompany';
import Home from './Components/Home';
import AddStockPrice from './Components/AddStockPrice';
import StockPriceInformation from "./Components/StockPriceInformation"
import CompanyInfo from './Components/CompanyInfo';
import FetchAllCompanies from './Components/FetchAllCompanies';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/home" element = {<Home/>}/>
        <Route path ="/register" element = {<RegisterCompany/>}/>
        <Route path ="/companyInfo/:companyCode" element = {<CompanyInfo/>}/>
        <Route path ="/fetchAllCompanies" element = {<FetchAllCompanies/>}/>
        <Route path ="/addStockPrice" element = {<AddStockPrice/>}/>
        <Route path ="/fetchStockinfo" element = {<StockPriceInformation/>}/>
      </Routes>
    </Router>
    
  )
}


export default App