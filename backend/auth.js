import express from 'express'

import passport from 'passport'
import { hash, compare } from 'bcrypt'
import { getUser, createUser } from './database.js'
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();



// test environment
router.get('/', async(req, res)=>{
    if(req.isAuthenticated()){
        console.log('auth');
    } else {
        console.log('not auth');
    }
    
    res.send();
})

router.get('/user', async (req, res)=>{
    const username = req.query.username;
    try{
        const user = await getUser(username);

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

    const username = req.body.username;
    try{
        const user = await getUser(username);

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
    } catch(error) {
        if (error.code === 'ER_DUP_ENTRY') {
            // Unique constraint violation
            return res.status(400).send('Username already exists');
        }

        res.status(500).send('Failed to create user');
    }
        
})

router.post('/users/login', passport.authenticate('local'), async (req, res)=>{
    res.status(200).send();
    // const {username, password} = req.body;

    // if(username && password){
    //     if(req.session.authenticated){
    //         res.json(req.session);
    //     } else {
    //         try{
    //             const user = await getUser(username);
        
    //             if(user === undefined){
    //                 return res.status(400).send('Cannot find user');
    //             }
        
    //             if(await compare(password, user.password)){
    //                 req.session.authenticated = true;
    //                 // can append things to cookies
    //                 req.session.user = {
    //                     username, password
    //                 }
    //                 res.status(201).send('Successfully logged in');
    //                 // res.json(req.session);
    //             } else {
    //                 res.status(403).json({msg: 'Bad Credentials'});
    //             }
    //         } catch{
    //             return res.status(500).send();
    //         }
            
    //     }
    // } else {
    //     res.status(403).json({msg: 'Bad Credentials'});
    // }
    

})








export default router;






