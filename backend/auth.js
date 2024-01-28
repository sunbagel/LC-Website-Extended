import express from 'express'
import { hash, compare } from 'bcrypt'
import { getUser } from './database.js'

const router = express.Router();

// test environment
const users = [
    // {
    //     name: "alex",
    //     password: "$2b$10$aa9jdwIbfD.g/BtpWv1OXeiUWp3jDJQa3vLs8Eu6CiS5CmhZC90ZO"
    // }
]

router.get('/user', async (req, res)=>{
    const name = req.query.name;
    try{
        const _users = await getUser(name);

        if(_users){
            res.status(200).json(_users);
        } else {
            res.status(404).send('User not found');
        }
    } catch{
        res.status(500);
    }
    
})

// bcrypt
router.post('/users', async (req, res)=>{

    const name = req.body.name;
    try{
        const _users = await getUser(name);

        if(_users){
            return res.status(409).send('A user with this username or email already exists');
        }
    } catch{
        res.status(500);
    }

    try{
        const hashedPassword = await hash(req.body.password, 10);

        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    }
    catch{
        res.status(500).send();
    }

})

router.post('/users/login', async (req, res)=>{

    // temp code
    const user = users.find(user => user.name == req.body.name);
    // try{
        
    // } catch {
    //     res.status(400).send('Cannot find user');
    // }
    if(user == null){
        return res.status(400).send('Cannot find user');
    }
    try{
        if(await compare(req.body.password, user.password)){
            res.send('Successful Log in');
        } else {
            res.send('Password incorrect');
        }
        
    } catch {
        res.status(500).send();
    }
})








export default router;






