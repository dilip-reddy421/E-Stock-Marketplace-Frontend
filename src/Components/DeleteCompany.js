import React, {useState,useEffect,useContext} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCompany = (props) => {
    const url = `http://localhost:8090/api/v1.0/market/company/delete/${props.companyCode}`;

    const deleteComp = () => {
        console.log("props "+JSON.stringify(props));
        axios.delete(url).then(response => {
            console.log("response "+JSON.stringify(response))
            if(response.data === "sucess"){
                console.log("company successfully deleted");
                toast.success("company successfully deleted");
                props.onHide();
            }
        })
        .catch(error => {
            console.log(error);
            props.onHide();
        });
    }


    return (
        <div>
        <ToastContainer />
        <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm to delete company</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteComp}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}

export default DeleteCompany;