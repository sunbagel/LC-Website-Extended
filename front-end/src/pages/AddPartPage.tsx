import PartForm from "@/components/PartForm"
import { PartValues } from "@/types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import '@/styles/AddPage.css'

const AddPartPage = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const nullPart: PartValues = {
        id: null,
        part_number: null,
        part_name: null,
        description: null,
        quantity: null,
        price: null,
        part_type_id: null,
        supplier_id: null,
        manufacturer_id: null,
        location_id: null
    };

    const closeForm = () => {
        setIsSubmitted(true)
    }

    const openForm = () => {
        setIsSubmitted(false)
    }

    const sendPart = (e) => {
        const part = {
            // defined in the PartForm value section
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

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(part)
        }

        fetch('http://localhost:8080/parts', requestOptions)
        .then(response => response.json())

        closeForm()
    }

    return (
        <div className="addpage-container">
            {isSubmitted ? (<Button onClick={openForm}>Submit another part</Button>)
            : (
            <Card style={{width: '32rem'}} className="bg-light  ">
                {/* not sure if i want cancel button on the add form */}
                <PartForm sendPart={sendPart} closeForm={closeForm} defaultValues={nullPart}/>
            </Card>)
            }
            
        </div>
    )
}

export default AddPartPage;