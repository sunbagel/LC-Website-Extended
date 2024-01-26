import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { useForm } from "react-hook-form";

import '../styles/PartForm.css';
import { useEffect, useState } from 'react';
import { PartValues, tableType } from '@/types';


type PartFormProps = {
    sendPart: (e : any) => void;
    closeForm: () => void;
    defaultValues: PartValues
}



const PartForm = ({ sendPart, closeForm, defaultValues } : PartFormProps) => {

    // console.log("Default vals")
    // console.log(defaultValues)

    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const [ partTypes, setPartTypes ] = useState<tableType[]>([]);
    const [ supplierList, setSupplierList ] = useState<tableType[]>([]);
    const [ manufacturerList, setManufacturerList ] = useState<tableType[]>([]);
    const [ locationList, setLocationList ] = useState<tableType[]>([]);
    

    useEffect(() => {
        if(defaultValues){
            const defaultValuesList = {
                PartNum: defaultValues["part_number"],
                PartName: defaultValues["part_name"],
                Description: defaultValues["description"],
                Quantity: defaultValues["quantity"],
                Price: defaultValues["price"],
                PartType: defaultValues["part_type_id"],
                Supplier: defaultValues["supplier_id"],
                Manufacturer: defaultValues["manufacturer_id"],
                Location: defaultValues["location_id"]
            };
            // defaultValuesList.Supplier = defaultValues["supplier_id"];
            reset({ ...defaultValuesList });
        }   
    }, [defaultValues, reset, partTypes, supplierList, manufacturerList, locationList])

    useEffect(() => {
        fetch('http://localhost:8080/part_types')
        .then(response => response.json())
        .then((data : tableType[]) => {
            setPartTypes(data)
        })

        fetch('http://localhost:8080/suppliers')
        .then(response => response.json())
        .then((data : tableType[]) => {
            setSupplierList(data)
        })

        fetch('http://localhost:8080/manufacturers')
        .then(response => response.json())
        .then((data : tableType[]) => {
            setManufacturerList(data)
        })

        fetch('http://localhost:8080/locations')
        .then(response => response.json())
        .then((data : tableType[]) => {
            setLocationList(data)
        })
    }, [])

    
    return (
        <div>
            
            <Form onSubmit={handleSubmit(sendPart)}>
                <Form.Group className="mb-3" controlId="formPartInfo">
                        <div className="grid grid-cols-2 gap-4">
                           

                            
                                    <div>
                                        <p className="inputHeader text-left block">Part Number:</p>
                                        <Form.Control
                                            className="w-full"
                                        
                                            type="text"
                                            {...register("PartNum",
                                                {required: "Part Number is required"})}
                                            name="PartNum"
                                            placeholder="Enter Part Number"
                                        />
                                        {errors.PartNum && <p className="errorMsg">{errors.PartNum.message}</p>}
                                    </div>

                                
                                

                                    <div>
                                        <p className="inputHeader text-left">Part Name:</p>
                                        <Form.Control
                                            className="w-full"
                                            type="text"
                                            {...register("PartName", { required: "Part Name is required" })}
                                            name="PartName"
                                            placeholder="Enter Part Name"
                                        />
                                        {errors.PartName && <p className="errorMsg">{errors.PartName.message}</p>}
                                    </div>

                                
                                <div className="col-span-2">
                                    <p className="inputHeader text-left">Description:</p>
                                    <Form.Control
                                        as='textarea'
                                        className="w-full h-24 max-w-xl" 
                                        {...register("Description", { required: "Description is required" })}
                                        name="Description"
                                        placeholder="Enter Description"
                                    />
                                    {errors.Description && <p className="errorMsg">{errors.Description.message}</p>}
                                </div>
                            

                                <div>
                                    <p className="inputHeader text-left">Quantity:</p>
                                    <Form.Control
                                        className=""
                                        type="number"
                                        {...register("Quantity", { required: "Quantity is required" })}
                                        name="Quantity"
                                        placeholder="Enter Quantity"
                                    />
                                    {errors.Quantity && <p className="errorMsg">{errors.Quantity.message}</p>}
                                </div>
                                
                                <div>
                                    <p className="inputHeader text-left">Price:</p>
                                    <Form.Control
                                        className=""
                                        type="number"
                                        step="0.01"
                                        {...register("Price", { required: "Price is required" })}
                                        name="Price"
                                        placeholder="Enter Price"
                                    />
                                    {errors.Price && <p className="errorMsg">{errors.Price.message}</p>}
                                </div>
                            
                            

                                <div>
                                    <p className="inputHeader text-left">Part Type:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Part Type Selection Dropdown"
                                        {...register("PartType", {required: true})}
                                        name="PartType"
                                    >
                                            <option value="">Select a Part Type</option>
                                            {partTypes.map( (partType : tableType) => (
                                                <option key={partType.id} value={partType.id}>{partType.name}</option>
                                            ))}
                                    </Form.Select>
                                    {errors.PartType && <p className="errorMsg">Please select part type</p>}
                                </div>

                                <div>
                                    <p className="inputHeader text-left">Supplier:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Supplier Selection Dropdown"
                                        {...register("Supplier", {
                                            required: true,
                                        })}
                                    >
                                            <option value="">Select a Supplier</option>
                                            {supplierList.map( (supplier : tableType) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                    
                                            ))}
                                    
                                    </Form.Select>
                                    {errors.Supplier && <p className="errorMsg">Please select a supplier</p>}
                                </div>
                            
                            
                                <div>
                                    <p className="inputHeader text-left">Manufacturer:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Manufacturer Selection Dropdown"
                                        {...register("Manufacturer", {required: true})}
                                        name="Manufacturer"
                                    >
                                            <option value="">Select a Manufacturer</option>
                                            {manufacturerList.map( (manufacturer : tableType) => (
                                                <option key={manufacturer.id} value={manufacturer.id}>
                                                    {manufacturer.name}
                                                </option>
                                    
                                            ))}
                                    </Form.Select>
                                    
                                    {errors.Manufacturer && <p className="errorMsg">Please select a manufacturer</p>}
                                </div>

                                <div>
                                    <p className="inputHeader text-left my-2">Location:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Location Selection Dropdown"
                                        {...register("Location", {required: true})}
                                        name="Location"
                                    >
                                            <option value="">Select a Location</option>
                                            {locationList.map( (location : tableType) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.name}
                                                </option>
                                    
                                            ))}
                                    </Form.Select>
                                    {errors.Location && <p className="errorMsg">Please select a location</p>}
                                </div>

                            </div>
                        
                    
                </Form.Group>

                <Container className="d-flex justify-content-end">
                    <Button onClick={closeForm} className="mx-2" variant="secondary">
                        Close
                    </Button>
                    <Button className="mx-2" variant="primary" type="submit">
                        Submit
                    </Button>
                </Container>
                
            </Form>


        </div>
    )
    
}


export default PartForm;