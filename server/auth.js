import {coll_Users} from "./db.js";

export function initialize(passport) {
  passport.use(coll_Users.createStrategy());
  passport.serializeUser(coll_Users.serializeUser());
  passport.deserializeUser(coll_Users.deserializeUser());
}

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.status(301).redirect('/api/login');
}

export function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      message: "Already Logged In"
    });
  }
  next()
}