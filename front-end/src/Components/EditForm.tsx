import Card from "react-bootstrap/Card";
import PartForm from "./PartForm";

import {useEffect} from 'react';
import Modal from "react-bootstrap/esm/Modal";
import { Part, PartValues } from "@/types";
import axios from "@/lib/axios";

type EditFormProps = {
    showEditForm: boolean;
    closeEditForm: () => void;
    defaultValues: PartValues
    searchFunction: () => void;
}

const EditForm = ({showEditForm, closeEditForm, defaultValues, searchFunction} : EditFormProps) => {

    useEffect(()=>{
        console.log("Default in edit:");
        console.log(defaultValues);
    }, [defaultValues])

    const sendPart = (part : Part) => {

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

        axios(`http://localhost:8080/parts/${part_id}`, requestOptions)
        // .then(res=>console.log(res.data))
        .then(()=>searchFunction())
        .then(() => closeEditForm())
        
        console.log(searchFunction);
    }
    return(
        <Modal dialogClassName="w-full max-w-2xl" show={showEditForm} onHide={closeEditForm}>
            <Card className="">
                <h3 className="text-left">Edit Part:</h3>
                <PartForm sendPart={sendPart} closeForm={closeEditForm} defaultValues={defaultValues}/>
            </Card>
        </Modal>

    )
}

export default EditForm;