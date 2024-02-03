import PartForm from "@/components/PartForm"
import { PartValues } from "@/types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import '@/styles/AddPage.css'
import axios from "@/lib/axios";

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

        

        axios.post('http://localhost:8080/parts', part, {
            withCredentials : true
        })
        .catch(err => console.log(err))

        closeForm()
    }

    return (
        <div className="addpage-container">
            {isSubmitted ? (<Button onClick={openForm}>Submit another part</Button>)
            : (
            <Card className="bg-light max-w-2xl mx-auto">
                <h3 className="text-left">Add Part:</h3>
                {/* not sure if i want cancel button on the add form */}
                <PartForm sendPart={sendPart} closeForm={closeForm} defaultValues={nullPart}/>
            </Card>)
            }
            
        </div>
    )
}

export default AddPartPage;