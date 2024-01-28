import express from 'express'
import {genSalt, hash} from 'bcrypt'

const router = express.Router();

// test environment
const users = [

    

]

router.get('/users', (req, res)=>{
    res.json(users);
})

// bcrypt
router.post('/users', async (req, res)=>{

    console.log(req.body.name);
    try{
        const salt = await genSalt();
        const hashedPassword = await hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);

        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    }
    catch{
        res.status(500).send();
    }

})








export default router;






