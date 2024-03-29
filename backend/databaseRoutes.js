
import express from 'express'
import * as dbFunctions from './database.js'


const router = express.Router();

// parts
router.get("/parts", async (req, res) =>{
    const parts = await dbFunctions.getParts();
    res.send(parts);
})

router.get("/parts/search", async (req, res) => {
    // console.log("GET Req: ", getTokenFromRequest(req));
    // console.log("Sess: ", getTokenFromState(req), "\n");
    const queryMroutering = {
        part_name: 'part_name',
        part_number: 'part_number',
        description: 'description',
        price: 'price',
        quantity: 'quantity',
    };

    const foreignTableMroutering = {
        suppliers: 'supplier_id',
        part_type: 'part_type_id',
        manufacturers: 'manufacturer_id',
        locations: 'location_id',
    }

    const simpleParamList = new Set(['price', 'quantity']);

    // console.log(req.query);
    
    const selects = [];
    const tableJoins = [];
    const conditions = [];
    const values = [];
    
    for (const [param, column] of Object.entries(queryMroutering)) {
        if (req.query[param]) {

            conditions.push(`${param} LIKE ?`);
            values.push("%" + req.query[param] + "%");

        }
    }

    // only join for foreign tables
    for (const [table, column] of Object.entries(foreignTableMroutering)) {
        selects.push(`${table}.name AS ${table}_name`);
        tableJoins.push(`JOIN ${table} ON parts.${column} = ${table}.id`);
        if (req.query[table]) {
            // ex. JOIN suppliers on parts.supplier_id = suppliers.id
            
            conditions.push(`${table}.name LIKE ?`);
            values.push("%" + req.query[table] + "%");

        }
    }

    // simple param
    const simpleParams = req.query.simpleParams;
    if(simpleParams){
        const paramConditions = simpleParams.split(',');

        paramConditions.forEach( (cond) => {

            const match = cond.match(/(\w+)([<=|>=|=]+)(\d+(?:\.\d{1,2})?)/);

            // if match invalid, skip over it
            // ASSUMES that only invalid input would come from quantity field
            if(!match){
                console.log("skipping empty/invalid input");
                return;
            }
            const [field, operator, value ] = match.slice(1);
            
            // if price or quantity
            // for size 2, array.includes() maybe better.
            if(simpleParamList.has(field)){

                conditions.push(`parts.${field} ${operator} ?`);
                values.push(value);
            }

        })
    }




    let searchQuery = `SELECT parts.*`;
    
    if(selects.length){
        searchQuery += ', ' + selects.join(', ');
    }

    searchQuery += " FROM parts";
    if(tableJoins.length){
        searchQuery += ' ' + tableJoins.join(' ');
    }
    if (conditions.length) {
      searchQuery += ' WHERE ' + conditions.join(' AND ');
    }

    // console.log(searchQuery);

    const parts = await dbFunctions.searchParts(searchQuery, values);

    if (parts) {
        res.send(parts);
    } else {
        res.status(404).send({ message: 'Part type not found' });
    }
})

router.get("/parts/:id", async (req, res) =>{
    const id = req.params.id;
    const part = await dbFunctions.getPart(id);
    res.send(part);
})

router.post("/parts", async (req, res) =>{
    const { part_name, supplier_id, part_number, description, price, 
            quantity, part_type_id, manufacturer_id, location_id } = req.body;
    
    const part = await dbFunctions.createPart(part_name, supplier_id, part_number, description, 
                                    price, quantity, part_type_id, manufacturer_id, location_id);

    res.status(201).send(part);
})


router.put("/parts/:id", async (req, res) =>{
    // console.log("PUT Req: ", getTokenFromRequest(req));
    // console.log("Sess: ", getTokenFromState(req), "\n");
    const queryMroutering = {
        part_name: 'part_name',
        supplier_id: 'supplier_id',
        part_number: 'part_number',
        description: 'description',
        price: 'price',
        quantity: 'quantity',
        part_type_id: 'part_type_id',
        manufacturer_id: 'manufacturer_id',
        location_id: 'location_id',
    };

    // console.log(req.body[partName]);
    
    const part_id = req.params.id;
    const conditions = [];
    const values = [];
    
    for (const [param, column] of Object.entries(queryMroutering)) {
        if (req.body[param]) {
            values.push(req.body[param])
            conditions.push(` ${column} = ?`)
        }
    }

    let searchQuery = 'UPDATE parts SET';
    if (conditions.length) {
      searchQuery += conditions.join(', ');
    }

    searchQuery += ` WHERE id = ${part_id}`;

    // console.log(searchQuery);
    // console.log(values);

    const parts = await dbFunctions.editPart(searchQuery, values);

    if (parts) {
        res.status(201).send(parts);
    } else {
        res.status(404).send({ message: 'Part type not found' });
    }


})




// part type
router.get("/part_types", async (req, res) => {
    const partTypes = await dbFunctions.getPartTypes();
    res.send(partTypes);
});

router.get("/part_types/:id", async (req, res) => {
    const id = req.params.id;
    const partType = await dbFunctions.getPartType(id);
    if (partType) {
        res.send(partType);
    } else {
        res.status(404).send({ message: 'Part type not found' });
    }
});

router.post("/part_types", async (req, res) => {
    const { type_name } = req.body;
    if (!type_name) {
        return res.status(400).send({ message: 'Type name is required' });
    }
    const partType = await dbFunctions.createPartType(type_name);
    res.status(201).send(partType);
});


// manufacturer
router.get("/manufacturers", async (req, res) => {
    const manufacturers = await dbFunctions.getManufacturers();
    res.send(manufacturers);
});

router.get("/manufacturers/:id", async (req, res) => {
    const id = req.params.id;
    const manufacturer = await dbFunctions.getManufacturer(id);
    if (manufacturer) {
        res.send(manufacturer);
    } else {
        res.status(404).send({ message: 'Manufacturer not found' });
    }
});

router.post("/manufacturers", async (req, res) => {
    const { manufacturer_name } = req.body;
    if (!manufacturer_name) {
        return res.status(400).send({ message: 'Manufacturer name is required' });
    }
    const manufacturer = await dbFunctions.createManufacturer(manufacturer_name);
    res.status(201).send(manufacturer);
});

// location
router.get("/locations", async (req, res) => {
    const locations = await dbFunctions.getLocations();
    res.send(locations);
});

router.get("/locations/:id", async (req, res) => {
    const id = req.params.id;
    const location = await dbFunctions.getLocation(id);
    if (location) {
        res.send(location);
    } else {
        res.status(404).send({ message: 'Location not found' });
    }
});

router.post("/locations", async (req, res) => {
    const { location_name } = req.body;
    if (!location_name) {
        return res.status(400).send({ message: 'Location name is required' });
    }
    const location = await dbFunctions.createLocation(location_name);
    res.status(201).send(location);
});

// supplier

router.get("/suppliers", async (req, res) => {
    const suppliers = await dbFunctions.getSuppliers();
    res.send(suppliers);
});

router.get("/suppliers/:id", async (req, res) => {
    const id = req.params.id;
    const supplier = await dbFunctions.getSupplier(id);
    res.send(supplier);
});

router.post("/suppliers", async (req, res) =>{

    const { supplier_name } = req.body;
    const supplier = await dbFunctions.createSupplier(supplier_name);
    res.status(201).send(supplier);
})

export default router;
