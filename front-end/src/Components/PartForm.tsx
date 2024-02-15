import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


import { useForm } from "react-hook-form";

import '../styles/PartForm.css';
import { useEffect, useState } from 'react';
import { PartValues, tableType } from '@/types';
import axios from '@/lib/axios';


type PartFormProps = {
    sendPart: (e : PartValues) => void;
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
                part_number: defaultValues["part_number"],
                part_name: defaultValues["part_name"],
                description: defaultValues["description"],
                quantity: defaultValues["quantity"],
                price: defaultValues["price"],
                part_type_id: defaultValues["part_type_id"], 
                supplier_id: defaultValues["supplier_id"],
                manufacturer_id: defaultValues["manufacturer_id"],
                location_id: defaultValues["location_id"]
            };
            // defaultValuesList.Supplier = defaultValues["supplier_id"];
            reset({ ...defaultValuesList });
        }   
    }, [defaultValues, reset, partTypes, supplierList, manufacturerList, locationList])

    useEffect(() => {
        const axiosOptions = {
            withCredentials: true
        }
        axios.get('/part_types', axiosOptions)
        .then( res => setPartTypes(res.data))

        axios.get('/suppliers', axiosOptions)
        .then( res => setSupplierList(res.data))

        axios.get('/manufacturers', axiosOptions)
        .then( res => setManufacturerList(res.data))

        axios.get('/locations', axiosOptions)
        .then( res => setLocationList(res.data))
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
                                            {...register("part_number",
                                                {required: "Part Number is required"})}
                                            name="part_number"
                                            placeholder="Enter Part Number"
                                        />
                                        {errors.part_number && <p className="errorMsg">{errors.part_number.message?.toString()}</p>}
                                    </div>

                                
                                

                                    <div>
                                        <p className="inputHeader text-left">Part Name:</p>
                                        <Form.Control
                                            className="w-full"
                                            type="text"
                                            {...register("part_name", { required: "Part Name is required" })}
                                            name="part_name"
                                            placeholder="Enter Part Name"
                                        />
                                        {errors.part_name && <p className="errorMsg">{errors.part_name.message?.toString()}</p>}
                                    </div>

                                
                                <div className="col-span-2">
                                    <p className="inputHeader text-left">Description:</p>
                                    <Form.Control
                                        as='textarea'
                                        className="w-full h-24 max-w-xl" 
                                        {...register("description", { required: "Description is required" })}
                                        name="description"
                                        placeholder="Enter Description"
                                    />
                                    {errors.description && <p className="errorMsg">{errors.description.message?.toString()}</p>}
                                </div>
                            

                                <div>
                                    <p className="inputHeader text-left">Quantity:</p>
                                    <Form.Control
                                        className=""
                                        type="number"
                                        {...register("quantity", { required: "Quantity is required" })}
                                        name="quantity"
                                        placeholder="Enter Quantity"
                                    />
                                    {errors.quantity && <p className="errorMsg">{errors.quantity.message?.toString()}</p>}
                                </div>
                                
                                <div>
                                    <p className="inputHeader text-left">Price:</p>
                                    <Form.Control
                                        className=""
                                        type="number"
                                        step="0.01"
                                        {...register("price", { required: "Price is required" })}
                                        name="price"
                                        placeholder="Enter Price"
                                    />
                                    {errors.price && <p className="errorMsg">{errors.price.message?.toString()}</p>}
                                </div>
                            
                            

                                <div>
                                    <p className="inputHeader text-left">Part Type:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Part Type Selection Dropdown"
                                        {...register("part_type_id", {required: true})}
                                        name="part_type_id"
                                    >
                                            <option value="">Select a Part Type</option>
                                            {partTypes.map( (partType : tableType) => (
                                                <option key={partType.id} value={partType.id}>{partType.name}</option>
                                            ))}
                                    </Form.Select>
                                    {errors.part_type_id && <p className="errorMsg">Please select part type</p>}
                                </div>

                                <div>
                                    <p className="inputHeader text-left">Supplier:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Supplier Selection Dropdown"
                                        {...register("supplier_id", {
                                            required: true,
                                        })}
                                        name="supplier_id"
                                    >
                                            <option value="">Select a Supplier</option>
                                            {supplierList.map( (supplier : tableType) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                    
                                            ))}
                                    
                                    </Form.Select>
                                    {errors.supplier_id && <p className="errorMsg">Please select a supplier</p>}
                                </div>
                            
                            
                                <div>
                                    <p className="inputHeader text-left">Manufacturer:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Manufacturer Selection Dropdown"
                                        {...register("manufacturer_id", {required: true})}
                                        name="manufacturer_id"
                                    >
                                            <option value="">Select a Manufacturer</option>
                                            {manufacturerList.map( (manufacturer : tableType) => (
                                                <option key={manufacturer.id} value={manufacturer.id}>
                                                    {manufacturer.name}
                                                </option>
                                    
                                            ))}
                                    </Form.Select>
                                    
                                    {errors.manufacturer_id && <p className="errorMsg">Please select a manufacturer</p>}
                                </div>

                                <div>
                                    <p className="inputHeader text-left my-2">Location:</p>
                                    <Form.Select
                                        className="my-2"
                                        aria-label="Location Selection Dropdown"
                                        {...register("location_id", {required: true})}
                                        name="location_id"
                                    >
                                            <option value="">Select a Location</option>
                                            {locationList.map( (location : tableType) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.name}
                                                </option>
                                    
                                            ))}
                                    </Form.Select>
                                    {errors.location_id && <p className="errorMsg">Please select a location</p>}
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