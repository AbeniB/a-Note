import LocalStrategy from "passport-local";
import { findUserByEmail, findUserById, verifyPassword } from "./db.js";

export function initialize(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "Incorrect credentials" });
        }

        const passwordField = user.password || "";
        if (user.authenticate) {
          const authenticatedUser = await user.authenticate(password);
          return done(null, authenticatedUser ? user : false, authenticatedUser ? undefined : { message: "Incorrect credentials" });
        }

        if (!verifyPassword(password, passwordField)) {
          return done(null, false, { message: "Incorrect credentials" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    const userId = user.id || user._id?.toString() || user.email;
    done(null, userId);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserById(id);
      done(null, user || false);
    } catch (error) {
      done(error);
    }
  });
}

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ message: "Authentication required" });
}

export function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      message: "Already Logged In"
    });
  }
  next();
}