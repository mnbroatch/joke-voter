import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  facebook: String,
})


userSchema.statics.authorize = function() {
  return function(req, res, next) {
    let tokenHeader = req.headers.authorization;

    if(!tokenHeader) {
      return res.status(401).send({error: 'Missing authorization header.'});
    }

    let token = tokenHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if(err) return res.status(401).send(err);

      User.findById(payload._id, (err, user) => {
        if(err || !user) return res.status(401).send(err || {error: 'User not found.'});

        req.user = user;

        next();
      });
    });
  }
};


userSchema.methods.generateToken = function() {
  let payload = {
    _id: this._id,
  };

  let token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1 day'});

  return token;
};


userSchema.statics.facebook = function(authCode, cb) {
  var fields = ['name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');

  var params = {
    code: authCode.code,
    client_id: authCode.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: authCode.redirectUri
  };
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return cb({ message: accessToken.error.message });
    }
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return cb({ message: profile.error.message });
      }
      User.findOne({facebook: profile.id}, (err, user) => {
        if(err) return cb(err);

        if(user) {
          let token = user.generateToken();
          cb(null, token);
        } else {
          let newUser = new User({
            email: profile.email,
            displayName: profile.name,
            profileImage: profile.picture.data.url,
            facebook: profile.id
          });
          newUser.save((err, savedUser) => {
            if(err) return cb(err);
            let token = savedUser.generateToken();
            cb(null, token);
          });
        }
      });
    });
  });
};


const User = mongoose.model('User', userSchema);

export default User;
