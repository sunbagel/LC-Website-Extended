import { Listbox } from "@headlessui/react";
import { useState } from "react";

type SimpleFieldBoxProps = {
    handleSimpleParams : (id : string, field : string, operator : string, value : string ) => void;
    id : string;
}

const SimpleFieldBox = ({handleSimpleParams, removeSimpleFieldBox, id} : SimpleFieldBoxProps)=>{

    
    const columns = ['Price', 'Quantity'];
    const columnMap = {
        'Price' : 'price',
        'Quantity' : 'quantity'
    }
    
    // value / text pair
    // e.g. lt : 'Less Than'
    // or even > : 'Less Than'
    // or 'Less Than' : >
    const comparisonOperators = ['Less Than', 'Equal To', 'Greater Than'];
    const operatorMap = {
        'Less Than' : '<=',
        'Equal To' : '=',
        'Greater Than' : '>='
    }

    const [selectedOperator, setSelectedOperator] = useState<string>(comparisonOperators[0]);
    const [ numValue, setNumValue ] = useState<string>('');
    const [ selectedColumn, setSelectedColumn ] = useState<string>(columns[0]);

    return (
        <div className="py-2 flex items-center space-x-2">
            <Listbox 
                value={selectedColumn} 
                onChange={(value : string)=>{
                    setSelectedColumn(value);
                    handleSimpleParams(id, columnMap[value], operatorMap[selectedOperator], numValue); // maps to math symbol
                }}
            >
            <div className="relative">
                <Listbox.Button className="w-full sm:w-24 md:w-36 px-6 py-2 text-center bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline">
                    {selectedColumn}
                </Listbox.Button>
                <Listbox.Options className="absolute w-full mt-1 rounded-md bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none list-none z-10 p-0">
                {columns.map((col) => (
                    <Listbox.Option
                    key={col}
                    value={col}
                    className={({ active }) =>
                        `text-center cursor-default select-none relative py-2 pl-2 pr-2 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                    }
                    >
                    {({ selected }) => (
                        <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {col}
                        </span>
                        {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            {/* Include check icon or similar indication of selection */}
                            </span>
                        )}
                        </>
                    )}
                    </Listbox.Option>
                ))}
                </Listbox.Options>
            </div>
            </Listbox>

            <Listbox 
                value={selectedOperator} 
                onChange={(value : string)=>{
                    setSelectedOperator(value);
                    handleSimpleParams(id, columnMap[selectedColumn], operatorMap[value], numValue); // maps to math symbol
                }}
            >
            <div className="relative">
                <Listbox.Button className="w-full sm:w-24 md:w-36 px-6 py-2 text-center bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline">
                    {selectedOperator}
                </Listbox.Button>
                <Listbox.Options className="absolute w-full mt-1 rounded-md bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none list-none z-10 p-0">
                {comparisonOperators.map((op) => (
                    <Listbox.Option
                    key={op}
                    value={op}
                    className={({ active }) =>
                        `text-center cursor-default select-none relative py-2 pl-2 pr-2 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                    }
                    >
                    {({ selected }) => (
                        <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {op}
                        </span>
                        {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            {/* Include check icon or similar indication of selection */}
                            </span>
                        )}
                        </>
                    )}
                    </Listbox.Option>
                ))}
                </Listbox.Options>
            </div>
            </Listbox>
            
            <input
                type="number"
                min="0"
                max="10000000"
                id="decimalInput"
                step="0.01"
                value={numValue}
                onChange={(e) => {
                    setNumValue(e.target.value);
                    handleSimpleParams(id, columnMap[selectedColumn], operatorMap[selectedOperator], e.target.value);
                }}
                placeholder="Enter Quantity"
                className=" max-w-xs border border-gray-300 rounded-md p-2 text-sm flex-1"
            />

            <button onClick={()=>removeSimpleFieldBox(id)} className="justify-end bg-red-400">X</button>
        </div>
    )
}


export default SimpleFieldBox;















