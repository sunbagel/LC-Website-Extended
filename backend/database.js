import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config();

// pool of connections to database, can be reused
// promises so we can use async await
const pool = mysql.createPool({
    host: process.env.MSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getParts(){
    const [rows] = await pool.query("SELECT * FROM parts");
    return rows;
}

export async function getPart(part_id){
    const [rows] = await pool.query(`
        SELECT * 
        FROM parts 
        WHERE id = ?
    `, [part_id]);

    return rows[0];
}

export async function searchParts(query, values){
    const [rows] = await pool.query(query, values);

    return rows;
}

export async function createPart(part_name, supplier_id, part_number, description, price, 
                                quantity, part_type_id, manufacturer_id, location_id){
    const [result] = await pool.query(`
        INSERT INTO parts (part_name, supplier_id, part_number, description, price, 
            quantity, part_type_id, manufacturer_id, location_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [part_name, supplier_id, part_number, description, price, 
            quantity, part_type_id, manufacturer_id, location_id]);

    // can't return part since we don't know what the id is lol.
    return result;
}

export async function editPart(query, values){
    const [rows] = await pool.query(query, values);
    return rows;
}

// Part Type
export async function getPartTypes(){
    const [rows] = await pool.query("SELECT * FROM part_type");
    return rows;
}

export async function getPartType(id){
    const [rows] = await pool.query(`
        SELECT * 
        FROM part_type 
        WHERE id = ?
    `, [id]);

    return rows[0];
}

export async function createPartType(name){
    const [result] = await pool.query(`
        INSERT INTO part_type (name)
        VALUES (?)
        `, [name]);

    const id = result.insertId;
    return getPartType(id);
}

// Manufacturers
export async function getManufacturers(){
    const [rows] = await pool.query("SELECT * FROM manufacturers");
    return rows;
}

export async function getManufacturer(id){
    const [rows] = await pool.query(`
        SELECT * 
        FROM manufacturers 
        WHERE id = ?
    `, [id]);

    return rows[0];
}

export async function createManufacturer(name){
    const [result] = await pool.query(`
        INSERT INTO manufacturers (name)
        VALUES (?)
        `, [name]);

    const id = result.insertId;
    return getManufacturer(id);
}

// Location
export async function getLocations() {
    const [rows] = await pool.query("SELECT * FROM locations");
    return rows;
}

export async function getLocation(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM locations 
        WHERE id = ?
    `, [id]);

    return rows[0];
}

export async function createLocation(location_name) {
    const [result] = await pool.query(`
        INSERT INTO locations (name)
        VALUES (?)
        `, [location_name]);

    const id = result.insertId;
    return getLocation(id);
}


// Suppliers

export async function getSuppliers(){
    const [rows] = await pool.query("SELECT * FROM suppliers");
    return rows;
}

export async function getSupplier(id){
    const [rows] = await pool.query(`
        SELECT * 
        FROM suppliers 
        WHERE id = ?
    `, [id]);

    return rows[0];
}

export async function createSupplier(name){
    const [result] = await pool.query(`
        INSERT INTO suppliers (name)
        VALUES (?)
        `, [name]);

    const id = result.insertId;
    return getSupplier(id);
}

// export async function getNotes(){
//     // destructuring function (sets rows to the first item of the query result)
//     const [rows] = await pool.query("SELECT * FROM notes");
//     return rows;
// }

// export async function getNote(id) {
//     // should not embed id into query - untrusted value from user, can be used to get unrestricted data access
//     // "SQL injection attack", could use the id as a query instead of purely a value
//     // use prepared statements (placeholders)
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM notes 
//     WHERE id = ?
//     `, [id]);

//     return rows[0];
// }

// export async function createNote(title, contents){
//     const [result] = await pool.query(`
//         INSERT INTO notes (title, contents)
//         VALUES (?, ?)
//         `, [title, contents]);

//     const id = result.insertId;
//     return getNote(id);
// }


