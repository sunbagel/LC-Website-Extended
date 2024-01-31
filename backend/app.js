import express, { json } from 'express'
import cors from 'cors';
import passport from 'passport'
import session from 'express-session'
import local from './strategies/local.js'

import * as dbFunctions from './database.js'
import authRoutes from './auth.js'

const app = express();

app.use(express.json());
app.use(cors());

const sessionStore = new session.MemoryStore();

app.use(session({

    // secret to make cookie harder to break into
    secret: process.env.COOKIE_SECRET,
    // expiry time in milliseconds
    cookie: { maxAge: 30000 },
    
    // don't want to regenerate cookie on every server request
    saveUninitialized: false,

    // resave : false

    store : sessionStore
}))

app.use(passport.initialize());
app.use(passport.session());

// auth routes
app.use('/auth', authRoutes);
// parts

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
      } else {
        res.status(401).json({ authenticated: false, error: 'Not Authenticated' });
      }      
}
app.use(ensureAuthenticated);
// app.use((req, res, next)=>{
//     console.log(sessionStore);
//     next();
// })

app.get("/parts", async (req, res) =>{
    const parts = await dbFunctions.getParts();
    res.send(parts);
})

app.get("/parts/search", async (req, res) => {
    // try to get the params to match table name
    const queryMapping = {
        part_name: 'part_name',
        part_number: 'part_number',
        description: 'description',
        price: 'price',
        quantity: 'quantity',
    };

    const foreignTableMapping = {
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
    
    for (const [param, column] of Object.entries(queryMapping)) {
        if (req.query[param]) {

            conditions.push(`${param} LIKE ?`);
            values.push("%" + req.query[param] + "%");

        }
    }

    // only join for foreign tables
    for (const [table, column] of Object.entries(foreignTableMapping)) {
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

    console.log(searchQuery);

    const parts = await dbFunctions.searchParts(searchQuery, values);

    if (parts) {
        res.send(parts);
    } else {
        res.status(404).send({ message: 'Part type not found' });
    }
})

app.get("/parts/:id", async (req, res) =>{
    const id = req.params.id;
    const part = await dbFunctions.getPart(id);
    res.send(part);
})

app.post("/parts", async (req, res) =>{
    
    const { part_name, supplier_id, part_number, description, price, 
            quantity, part_type_id, manufacturer_id, location_id } = req.body;
    
    const part = await dbFunctions.createPart(part_name, supplier_id, part_number, description, 
                                    price, quantity, part_type_id, manufacturer_id, location_id);

    res.status(201).send(part);
})


app.put("/parts/:id", async (req, res) =>{
    const queryMapping = {
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
    
    for (const [param, column] of Object.entries(queryMapping)) {
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
app.get("/part_types", async (req, res) => {
    const partTypes = await dbFunctions.getPartTypes();
    res.send(partTypes);
});

app.get("/part_types/:id", async (req, res) => {
    const id = req.params.id;
    const partType = await dbFunctions.getPartType(id);
    if (partType) {
        res.send(partType);
    } else {
        res.status(404).send({ message: 'Part type not found' });
    }
});

app.post("/part_types", async (req, res) => {
    const { type_name } = req.body;
    if (!type_name) {
        return res.status(400).send({ message: 'Type name is required' });
    }
    const partType = await dbFunctions.createPartType(type_name);
    res.status(201).send(partType);
});


// manufacturer
app.get("/manufacturers", async (req, res) => {
    const manufacturers = await dbFunctions.getManufacturers();
    res.send(manufacturers);
});

app.get("/manufacturers/:id", async (req, res) => {
    const id = req.params.id;
    const manufacturer = await dbFunctions.getManufacturer(id);
    if (manufacturer) {
        res.send(manufacturer);
    } else {
        res.status(404).send({ message: 'Manufacturer not found' });
    }
});

app.post("/manufacturers", async (req, res) => {
    const { manufacturer_name } = req.body;
    if (!manufacturer_name) {
        return res.status(400).send({ message: 'Manufacturer name is required' });
    }
    const manufacturer = await dbFunctions.createManufacturer(manufacturer_name);
    res.status(201).send(manufacturer);
});

// location
app.get("/locations", async (req, res) => {
    const locations = await dbFunctions.getLocations();
    res.send(locations);
});

app.get("/locations/:id", async (req, res) => {
    const id = req.params.id;
    const location = await dbFunctions.getLocation(id);
    if (location) {
        res.send(location);
    } else {
        res.status(404).send({ message: 'Location not found' });
    }
});

app.post("/locations", async (req, res) => {
    const { location_name } = req.body;
    if (!location_name) {
        return res.status(400).send({ message: 'Location name is required' });
    }
    const location = await dbFunctions.createLocation(location_name);
    res.status(201).send(location);
});

// supplier

app.get("/suppliers", async (req, res) => {
    const suppliers = await dbFunctions.getSuppliers();
    res.send(suppliers);
});

app.get("/suppliers/:id", async (req, res) => {
    const id = req.params.id;
    const supplier = await dbFunctions.getSupplier(id);
    res.send(supplier);
});

app.post("/suppliers", async (req, res) =>{

    const { supplier_name } = req.body;
    const supplier = await dbFunctions.createSupplier(supplier_name);
    res.status(201).send(supplier);
})




app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})