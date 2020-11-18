const express = require( 'express' );
const app = express();
const PORT = process.env.PORT || 5000;

const passport = require( 'passport' );
require( './config/passport' )( passport )

const cookieParser = require( 'cookie-parser' );
const jwt = require ( 'jsonwebtoken' );
const cors = require ( 'cors' );

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ));
app.use( cookieParser() );

app.use( passport.initialize() );

app.post(
  '/api/login',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    console.log(req.user)
      const token = jwt.sign(req.user.userId, 'JWT_SECRET_OR_KEY');
      console.log(token)
      return res.json({ token });
  }
);

app.get(
  '/api/me',
  passport.authenticate(['jwt'], { session: false }),
  function(req, res,) {
  const { userId } = req.user;
  // users.findOne({ _id: userId }, (err, data) => {
      // if (err) {
      //     res.status(500).send(err);
      // } else 
      if (userId==1) {
          const userData =req.user;
          res.status(200).send(userData);
      } else {
          res.status(500).send('invalid token');
      }
  // });
  // res.send("Hello World")
  }
  );

app.get( '/', ( req,res ) => {
  res.send( 'Hello World' );
} );

app.listen( PORT, () => console.log( `Server is running on port ${PORT}...` ) ); 