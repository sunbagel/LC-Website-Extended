import express from 'express'

import passport from 'passport'
import { csrfSync } from "csrf-sync";
import { hash } from 'bcrypt'
import { getUser, createUser } from './database.js'
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();

const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
    generateToken, // Use this in your routes to generate, store, and get a CSRF token.
    getTokenFromRequest, // use this to retrieve the token submitted by a user
    getTokenFromState, // The default method for retrieving a token from state.
    storeTokenInState, // The default method for storing a token in state.
    revokeToken, // Revokes/deletes a token by calling storeTokenInState(undefined)
    csrfSynchronisedProtection, // This is the default CSRF protection middleware.
  } = csrfSync();

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        next();
      } else {
        res.status(401).json({ error: 'Not Authenticated' });
      }      
}



// test environment
router.get('/', ensureAuthenticated, async(req, res)=>{
    res.status(200).json({message: 'User is authenticated'})
})

// Route to get CSRF token
const generateCSRF = (req, res, next) =>{
    generateToken(req);
    next();
}
router.get('/csrf-token', generateCSRF, (req, res) => {
    // storeTokenInState(req);
    res.json({token: getTokenFromState(req)});
});

router.get('/check-token', (req, res) => {
    res.status(200).json({token: getTokenFromState(req), given: getTokenFromRequest(req), stored: getTokenFromState(req)})
});

// purely for session check
// middleware in app.use() to check for auth
router.get('/session-check', ensureAuthenticated, (req, res)=>{
    const userInfo ={
        id : req.user.id,
        username : req.user.username
    }
    res.status(200).json({
        message : "User is logged in",
        user : userInfo
    })
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

// generate a new CSRF token upon login
router.post('/users/login', passport.authenticate('local'), generateCSRF, async (req, res)=>{
    // console.log("Req token: ", getTokenFromRequest(req));
    // req token comes from the initial login, state token is the new token that is now stored in the session
    // console.log("Session token: ", getTokenFromState(req));

    res.status(200).json({...req.user, csrfToken : getTokenFromState(req)});
})


router.post('/users/logout', (req, res)=>{
    console.log("Req token: ", getTokenFromRequest(req));
    console.log("Session token: ", getTokenFromState(req));
    req.session.destroy(err=>{
        if(err){
            res.status(500).send('Unable to log out');
        }

        res.clearCookie('session_cookie'); // remove cookie (optional)
        res.status(200).json({ message: 'Logged out'});
    })
})








export default router;






