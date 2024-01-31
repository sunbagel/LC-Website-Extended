import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import { getUser } from '../database.js';
import { compare } from 'bcrypt'

passport.serializeUser((user, done)=>{

})

passport.deserializeUser((user, done)=>{
    
})

passport.use(new LocalStrategy(

    async (username, password, done)=>{

        const result = await getUser(username);

        try{
            // user not found
            if(result.length === 0){
                done(null, false);
            } else {
                // check if password matches
                if(await compare(password, user.password)){
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




