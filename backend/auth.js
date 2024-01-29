import express from 'express'
import session from 'express-session'
import { hash, compare } from 'bcrypt'
import { getUser, createUser } from './database.js'
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();
router.use(session({

    // secret to make cookie harder to break into
    secret: process.env.COOKIE_SECRET,
    // expiry time in milliseconds
    cookie: { maxAge: 30000 },
    
    // don't want to regenerate cookie on every server request
    saveUninitialized: false

    // resave : false

}))

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

// Dynamic middleware to check user existence
async function checkUser(req, res, next, shouldExist) {
    const name = req.body.name;
  
    try {
      const user = await getUser(name);
  
      if (user && !shouldExist) {
        return res.status(409).send('A user with this username or email already exists');
      } else if (!user && shouldExist) {
        return res.status(400).send('Cannot find user');
      }
  
      req.user = user;
      next();
    } catch (err) {
      res.status(500).send('Server error');
    }
}
  
// Wrappers for the middleware
const checkUserExists = (req, res, next) => checkUser(req, res, next, true);
const checkUserDoesNotExist = (req, res, next) => checkUser(req, res, next, false);

// bcrypt
router.post('/users', checkUserDoesNotExist, async (req, res)=>{

    const name = req.body.name;
    try{
        const hashedPassword = await hash(req.body.password, 10);
        const user = { name: name, password: hashedPassword };
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


router.post('/users/login', checkUserExists, async (req, res) => {
    // user is appended to req from checkUser middleware
    try {
        if (await compare(req.body.password, req.user.password)) {
        res.send('Successful Log in');
        } else {
        res.send('Password incorrect');
        }
    } catch {
        return res.status(500).send();
    }
});
  








export default router;






