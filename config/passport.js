const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports=function(passport){


passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
          const user={
            email:'admin@gmail.com',
            password:'123456',
            userId:1
          }
              if (email!=user.email) {
                // console.log("Invalid username")
                  return done(null, false, { error: 'Invalid username' });
              }
              if (password!=user.password) {
                // console.log("Invalid password")
                  return done(null, false, { error: 'invalid password'});
              }
              // passport.serializeUser(function())
              console.log("here")
                const info = { scope: '*' };
                 done(null, user, info);   
        }
    )
);

// passport.serializeUser(function(user,done){
//   done(null, user.userId)
// }),

// passport.deserializeUser(function(user,done){
//   done(null,user)
// })


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'JWT_SECRET_OR_KEY';
passport.use(
    new JwtStrategy(opts, function(payload, done) {

      const user={
        username:"admin",
        email:'admin@gmail.com',
        password:'123456',
        userId:1
      }
        // users.findById(payload, function(err, user) {
            // if (err) {
            //     return done(err, false);
            // }
            console.log(payload)
            if (payload==1) {
                return done(null, user);
            }
            return done(null, false);
        // });
    })
);

}