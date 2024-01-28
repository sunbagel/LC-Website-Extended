import express from 'express'
import { hash, compare } from 'bcrypt'

const router = express.Router();

// test environment
const users = [
    // {
    //     name: "alex",
    //     password: "$2b$10$aa9jdwIbfD.g/BtpWv1OXeiUWp3jDJQa3vLs8Eu6CiS5CmhZC90ZO"
    // }
]

router.get('/users', (req, res)=>{
    res.json(users);
})

// bcrypt
router.post('/users', async (req, res)=>{

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






