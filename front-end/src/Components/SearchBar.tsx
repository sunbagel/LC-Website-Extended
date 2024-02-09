
import Form from 'react-bootstrap/Form';
import { Part, PartValues, tableType } from '@/types';
import { CSSProperties, useCallback, useEffect, useState } from 'react';

import Select from 'react-select';
import SimpleFieldBox from './SimpleFieldBox';
import axios from '@/lib/axios';


// import useEffect from 'react';
type SearchBarProps = {
    updatePartValues : (newPartValues : PartValues[]) => void;
    updateSearchFunction : (newSearchFunction : () => void) => void;
}

type SimpleParam = {
    field : string, operator : string, value : string
}

type SimpleParams = {
    // known property
    [id : string] : SimpleParam
}

type FieldBox = {
    // known property beforehand
    id : string
}


let idCounter = 0;
const SearchBar = ({updatePartValues, updateSearchFunction} : SearchBarProps) => {

    const [ partParams, setPartParams ] = useState<Part>({});

    // might need redux for this hahahahahha
    const [ partTypes, setPartTypes ] = useState<tableType[]>([]);
    const [ supplierList, setSupplierList ] = useState<tableType[]>([]);
    const [ manufacturerList, setManufacturerList ] = useState<tableType[]>([]);
    const [ locationList, setLocationList ] = useState<tableType[]>([]);

    // supplier that is chosen by react-select component
    const [selectedSupplier, setSelectedSupplier] = useState<string>('');
    const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedPartType, setSelectedPartType] = useState<string>('');


    // object of searchParameters
    // [id] : columnType / numValue / selectedOperator
    const [ simpleParams, setSimpleParams ] = useState<SimpleParams>({});

    const handleSimpleParams = (id : string, field : string, operator : string, value : string) => {
        setSimpleParams((prev) => ({...prev, [id]: {field, operator, value}}));
    }

    const [ simpleFieldBoxes, setSimpleFieldBoxes ] = useState<FieldBox[]>([]);
    
    
    const addSimpleFieldBox = () => {
        const newId = `combo${idCounter++}`;
        setSimpleFieldBoxes( (prevBoxes) => [...prevBoxes, {id : newId }]);

    }
    const removeSimpleFieldBox = (id : string) => {
        // remove that box from the array
        setSimpleFieldBoxes((prev) => prev.filter(box => box.id !== id));
        setSimpleParams((prev) => {
            // _ is variable to be deleted
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: toBeDeleted, ...rest } = prev;
            return rest;
        });

    }

    // styling for Select
    const commonStyles = {
        // Define common style properties here
        color: 'black',
        textAlign: 'left',
        // ...other styles
    };
    
    const customStyles = {
        control: (provided : CSSProperties) => ({
            ...provided,
            ...commonStyles,
        }),
        singleValue: (provided : CSSProperties) => ({
            ...provided,
            ...commonStyles,
        }),
        option: (provided : CSSProperties) => ({
            ...provided,
            ...commonStyles,

        }),
        menuList: (provided : CSSProperties) => ({
            ...provided,
            padding: 0,
        }),
        menu: (provided : CSSProperties) => ({
            ...provided,
            borderRadius: '4px',
            overflow: 'hidden' // This is to ensure that the rounded corners are visible
        }),
    };

    


    useEffect(()=>{
        fetchPart(partParams);
        updateSearchFunction(() => fetchPart(partParams));
    }, [partParams, simpleParams]);

    // updating selection for suppliers
    useEffect(() => {

        axios.get('http://localhost:8080/part_types',{
            withCredentials: true
        })
        .then(res => setPartTypes(res.data))


        axios.get('http://localhost:8080/suppliers', {
            withCredentials: true
        })
        .then(response => {
            setSupplierList(response.data);
        });

        axios.get('http://localhost:8080/manufacturers', {
            withCredentials: true
        })
        .then(response => {
            setManufacturerList(response.data);
        });

        axios.get('http://localhost:8080/locations', {
            withCredentials: true
        })
        .then(response => {
            setLocationList(response.data);
        });

    }, [])

    const fetchPart = useCallback((partParams : Part)=>{

        // constructs query for search
        // currently only support partNumber
        const filteredParams = Object.fromEntries(Object.entries(partParams).filter((pair) => pair[1] != null));

        // for the object pair, need to parse data to include field type gt/lt/equal, and number
        const conditionStrings = Object.values(simpleParams).map((param : SimpleParam) => {
            // Assuming param.field, param.operator, and param.value are strings
            return `${param.field}${param.operator}${param.value}`;
        });

        const combinedParams = { ...filteredParams, simpleParams: conditionStrings.join(',') };

        // makes usable for http request
        const queryString = new URLSearchParams(combinedParams).toString();
        // console.log("query: ", queryString);

        // console.log(simpleParams);
        axios.get(`/parts/search?${queryString}`, {
            withCredentials: true
        })
        .then(res => updatePartValues(res.data))
        .catch(err => console.log('Parts Query Failed: ', err))

    }, [simpleParams, updatePartValues]);


    // unnecessary if we keep onChange functionality.
    // because it will always update to the most current search, regardless of whether you "submit" or not.
    function onSubmit(e : React.FormEvent<HTMLFormElement>){
        // avoid refresh with e.preventDefault
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        
        const newPart = Object.fromEntries(formData.entries());

        setPartParams({
            ...partParams,
            ...newPart
        });

    }

    // refresh table (called when form changes)
    function onChange(e : React.FormEvent<HTMLFormElement>){

        const formData = new FormData(e.currentTarget);

        const newPart = Object.fromEntries(formData.entries());

        setPartParams({
            ...partParams,
            ...newPart
        });
    }
    
    return(
        <div>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group className="mb-3">
                    
                            <div className="max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 gap-x-0.5">

                            
                                
                                    <Form.Control className="max-w-sm my-3" name="part_number" type="text" placeholder="Enter Part Number" />
                                    {/* need to make dropdown form */}
                                    <Form.Control className="max-w-sm my-3" name="part_name" type="text" placeholder="Enter Part Name" />
                                


                                
                                    <Select
                                        className="py-2 max-w-sm col-span-1"
                                        placeholder="Select a Supplier"
                                        onChange={(option : tableType) => {setSelectedSupplier(option ? option.name : '');}}
                                        styles={customStyles}
                                        options={supplierList}
                                        getOptionLabel={(option : tableType) => option.name}
                                        getOptionValue={(option: tableType) => option.id.toString()}
                                        isClearable
                                    />
                                    {/* hidden input field */}
                                    <Form.Control
                                        readOnly
                                        className="hidden"
                                        name="suppliers"
                                        type="text"
                                        value={selectedSupplier}
                                    />
                                    <Select
                                        className="py-2 max-w-sm col-span-1"
                                        placeholder="Select a Manufacturer"
                                        onChange={(option : tableType) => {setSelectedManufacturer(option ? option.name : '');}}
                                        styles={customStyles}
                                        options={manufacturerList}
                                        getOptionLabel={(option : tableType) => option.name}
                                        getOptionValue={(option: tableType) => option.id.toString()}
                                        isClearable
                                    />
                                    <Form.Control
                                        readOnly
                                        className="hidden"
                                        name="manufacturers"
                                        type="text"
                                        value={selectedManufacturer}
                                    />
                                
                                
                                <Select 
                                    className="py-2 max-w-sm" 
                                    placeholder="Select a Location"
                                    onChange={(option : tableType) => {setSelectedLocation(option ? option.name : '');}}
                                    styles={customStyles}
                                    options={locationList}
                                    getOptionLabel={(option : tableType) => option.name}
                                    getOptionValue={(option: tableType) => option.id.toString()}
                                    isClearable
                                />
                           
                                <Form.Control
                                    readOnly
                                    className="hidden"
                                    name="locations"
                                    type="text"
                                    value={selectedLocation}
                                />


                                <Select 
                                    className="py-2 max-w-sm" 
                                    placeholder="Select a Part Type"
                                    onChange={(option : tableType) => {setSelectedPartType(option ? option.name : '');}}
                                    styles={customStyles}
                                    options={partTypes}
                                    getOptionLabel={(option : tableType) => option.name}
                                    getOptionValue={(option: tableType) => option.id.toString()}
                                    isClearable
                                />
                        
                                <Form.Control
                                    readOnly
                                    className="hidden"
                                    name="part_type"
                                    type="text"
                                    value={selectedPartType}
                                />
                                
                            </div>
                            {simpleFieldBoxes.map((box)=>(
                                
                                // key for react management
                                <SimpleFieldBox 
                                    key={box.id} 
                                    handleSimpleParams={handleSimpleParams} 
                                    removeSimpleFieldBox={removeSimpleFieldBox}
                                    id={box.id}
                                />
                            ))}
                            
                                <button className="flex default-btn justify-start my-4" onClick={addSimpleFieldBox}>Add Selector</button>

                                

                            
                        
                    
                    
                </Form.Group>

                <button className="bg-blue-lc_turquoise hover:border-white" type="submit">
                    Search
                </button>
            </Form>
        </div>
    )
}
    


export default SearchBar;