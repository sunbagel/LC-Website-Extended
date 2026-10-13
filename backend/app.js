import express, { json } from 'express'
import cors from 'cors';
import passport from 'passport'
import session from 'express-session'
import { csrfSync } from 'csrf-sync';
import csurf from 'csurf'
import cookieParser from 'cookie-parser';
import expressMySQLSession from 'express-mysql-session';
import local from './strategies/local.js'


import authRoutes from './auth.js'
import dbRoutes from './databaseRoutes.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json());

const whitelist = ['http://localhost:5174'];
const corsOptions = {
    origin : (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));

const MySQLStore = expressMySQLSession(session);

const options = {
    host: process.env.MSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    clearExpired: true, // Auto-clear expired sessions
    checkExpirationInterval: parseInt(process.env.CHECK_EXPIRATION_INTERVAL,10), // How frequently expired sessions will be cleared; e.g., 15 minutes
    expiration: parseInt(process.env.SESSION_EXPIRATION,10), // The maximum age of a valid session; e.g., 1 day
    // Other options...
};
  
const sessionStore = new MySQLStore(options);

app.use(session({

    // secret to make cookie harder to break into
    secret: process.env.COOKIE_SECRET,
    // expiry time in milliseconds
    cookie: { 
        maxAge : parseInt(process.env.SESSION_EXPIRATION,10),
        // secure : true // only for secure conections
        httpOnly: true, // Prevent access through client-side scripts
        sameSite: 'strict', // Strictly same-site that set the cookie
     },
    // don't want to regenerate cookie on every server request
    saveUninitialized: false,
    resave : false,
    store : sessionStore,
    name : 'session_cookie'
}))


// enable csurf protection
// app.use(csurf());
const {
    csrfSynchronisedProtection, // This is the default CSRF protection middleware.
    getTokenFromRequest,
    getTokenFromState
  } = csrfSync();


// require csrf to access
app.use(csrfSynchronisedProtection)

app.use(passport.initialize());
app.use(passport.session());

// function ensureAuthenticated(req, res, next){
//     if (req.isAuthenticated()) {
//         next();
//       } else {
//         res.status(401).json({ error: 'Not Authenticated' });
//       }      
// }
// app.use(ensureAuthenticated);

// auth routes
app.use('/api/auth', authRoutes);

app.use('/api', dbRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})