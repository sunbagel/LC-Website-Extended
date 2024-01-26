import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { PartValues } from '../types';
import  Button  from "react-bootstrap/Button";
import { useState } from "react";

type PartTableProps = {
    partList : PartValues[]
}

const PartTable = ({ partList } : PartTableProps) => {

    const [editForm, setEditForm] = useState({});

    const updateEditForm = (fieldName : string) => (e) => {
        setEditForm({
            ...editForm,
            [fieldName]: e.target.value
        });
    };

    const closeEditForm = () => {
        setEditForm({});
    };

    return (
        <Table>
            {/* <TableCaption>Part Results</TableCaption> */}
            <TableHeader> 
            <TableRow>
                <TableHead className="w-[100px]">Part Number</TableHead>
                <TableHead>Part Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Part Type</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Location</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {partList.map((part : PartValues) => (
                // <Form>
                <TableRow key={part.id}>
                    <TableCell className="mx-4 font-medium text-left">{part.part_number}</TableCell>
                    <TableCell className="text-left">{part.part_name}</TableCell>
                    <TableCell className="text-left">{part.description}</TableCell>
                    <TableCell className="text-left">{part.quantity}</TableCell>
                    <TableCell className="text-left">${part.price}</TableCell>
                    <TableCell className="text-left">{part.part_type_name}</TableCell>
                    <TableCell className="text-left">{part.suppliers_name}</TableCell>
                    <TableCell className="text-left">{part.manufacturers_name}</TableCell>
                    <TableCell className="text-left">{part.locations_name}</TableCell>
                    <TableCell><Button onClick={() => console.log('Edit')}>Edit</Button></TableCell>
                    {/* <TableCell>
                        <Form><Form.Control name="PartNum" 
                                    placeholder="Enter Part Number" /></Form></TableCell> */}
                </TableRow>
                // </Form>
            ))}
            </TableBody>
        </Table>
    )
}

export default PartTable