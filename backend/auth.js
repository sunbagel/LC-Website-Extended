import express from 'express'
import { hash, compare } from 'bcrypt'
import { getUser, createUser } from './database.js'

const router = express.Router();

// test environment

router.get('/user', async (req, res)=>{
    const name = req.query.name;
    try{
        const user = await getUser(name);

        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch(error){
        res.status(500).send();
    }
    
})

// bcrypt
router.post('/users', async (req, res)=>{

    const name = req.body.name;
    try{
        const user = await getUser(name);

        if(user){
            return res.status(409).send('A user with this username or email already exists');
        }
    } catch{
        return res.status(500).send();
    }

    try{
        const hashedPassword = await hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPassword };
        const createdUser = await createUser(user);
        res.status(201).send(createdUser);
    } catch {
        if (error.code === 'ER_DUP_ENTRY') {
            // Unique constraint violation
            return res.status(400).send('Username already exists');
        }

        res.status(500).send('Failed to create user');
    }
        
})

router.post('/users/login', async (req, res)=>{
    const name = req.body.name;
    try{
        const user = await getUser(name);

        if(user === undefined){
            return res.status(400).send('Cannot find user');
        }

        if(await compare(req.body.password, user.password)){
            res.send('Successful Log in');
        } else {
            res.send('Password incorrect');
        }
    } catch{
        return res.status(500).send();
    }

})








export default router;






