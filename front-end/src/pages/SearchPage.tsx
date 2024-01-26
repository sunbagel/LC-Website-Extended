import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react';
import { Part, PartValues } from '@/types';
import { columns } from '@/components/Table/PartColumn';
import { PartDataTable } from '@/components/Table/PartDataTable';

import EditForm from '@/components/EditForm';

import '@/styles/SearchPage.css'

const SearchPage = () => {

    // part object with key values
    const [partValuesList, setPartValues ] = useState<PartValues[]>([]);

    
    const [showEditForm, setShowEditForm] = useState(false);

    const [currentRow, setCurrentRow] = useState("");

    // searchFunction so we can restart the search when an item is updated
    const [ searchFunction, setSearchFunction ] = useState(() => ()=>{});
    const updateSearchFunction = ( newSearchFunction : () => void) =>{
        setSearchFunction(()=>{
            return newSearchFunction;
        })
    }

    const updatePartValues = (newPartValues : PartValues[]) =>{
        setPartValues(newPartValues);
    }

    const openEditForm = (rowId : string) => {
        setShowEditForm(true);
        setCurrentRow(rowId);
        // console.log(showEditForm);
        console.log(rowId);
    }

    const closeEditForm = () => {
        setShowEditForm(false);
    }

    useEffect(()=>{
        console.log("part values:");
        console.log(partValuesList);
    }, [partValuesList])



    return (
        <div className='flex flex-col search-container'>
            <h3 className="text-left">Search For Your Part</h3>
            <div className="mb-2">
                <SearchBar 
                    
                    updatePartValues={updatePartValues} 
                    updateSearchFunction={updateSearchFunction}
                />
            </div>
            
            <div className="my-2">
                <PartDataTable columns={columns} data={partValuesList} openEditForm={openEditForm}/>
            </div>
            
            <EditForm 
                showEditForm={showEditForm} 
                closeEditForm={closeEditForm} 
                defaultValues={partValuesList[Number(currentRow)]}
                searchFunction={searchFunction}
            />
        </div>
        
    )
}

export default SearchPage