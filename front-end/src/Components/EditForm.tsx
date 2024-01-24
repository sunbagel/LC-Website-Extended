import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PartForm from "./PartForm";

import {useState} from 'react';
import Modal from "react-bootstrap/esm/Modal";
import { PartValues } from "@/types";

type EditFormProps = {
    showEditForm: boolean;
    closeEditForm: () => void;
    defaultValues: PartValues
    searchFunction: () => void;
}

const EditForm = ({showEditForm, closeEditForm, defaultValues, searchFunction} : EditFormProps) => {

    const sendPart = (e) => {
        const part = {
            part_number: e.PartNum,
            part_name: e.PartName,
            description: e.Description,
            quantity: e.Quantity,
            price: e.Price,
            part_type_id: e.PartType,
            supplier_id: e.Supplier,
            manufacturer_id: e.Manufacturer,
            location_id: e.Location
        }

        // get part id
        // data definition is trolling you since i sent a partObject for simplicity but it has diff field name formatting.
        const part_id = defaultValues.id;
        console.log(defaultValues);
        console.log('TEST PART ID:');
        console.log(part_id);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(part)
        }

        fetch(`http://localhost:8080/parts/${part_id}`, requestOptions)
        .then(response => response.json())
        .then(data=>console.log(data))
        .then(()=>searchFunction())
        .then(() => closeEditForm())
        
        console.log(searchFunction);
    }
    return(
        <Modal show={showEditForm} onHide={closeEditForm}>
            <Card className="mx-auto w-auto">
                <PartForm sendPart={sendPart} closeForm={closeEditForm} defaultValues={defaultValues}/>
            </Card>
        </Modal>

    )
}

export default EditForm;