import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import { getUser } from '../database.js';
import { compare } from 'bcrypt'

// when req is made, no info except cookie
// take cookie + check which user the cookie belong to
// take user, serialize into the session
passport.serializeUser((user, done)=>{
    done(null, user.username)
});

passport.deserializeUser(async (username, done)=>{
    try{
        const result = await getUser(username);
        if(result[0][0]){
            done(null, result[0][0]);
        }
    } catch(err){
        
        done(err, null);
    }
});

passport.use(new LocalStrategy(

    async (username, password, done)=>{

        const result = await getUser(username);

        try{
            // user not found
            if(result.length === 0){
                done(null, false);
            } else {
                // check if password matches
                if(await compare(password, result.password)){
                    done(null, result);
                } else {
                    done(null, false);
                }
            }
        } catch(err){
            done(err, false);
        }

        console.log(result);


    }

));


export default passport;




