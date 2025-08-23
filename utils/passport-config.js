



const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByUsername, getUserById } = require('../api/db/models/users');

// Precomputed bcrypt hash of a random password for timing-safe user-not-found handling
// (cost 10). This helps reduce user enumeration via timing.
const DUMMY_HASH = '$2b$10$CwTycUXWue0Thq9StjUM0uJ8f9mQW6kuzj1G9kZg7lE8xHfJvG/4.';



module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      async (username, password, done) => {
        try {
          const user = await getUserByUsername(username);
          if (!user) {
            // Timing mitigation (do a dummy compare to match time of existing user path)
            await bcrypt.compare(password, DUMMY_HASH);
            return done(null, false, { message: 'Invalid credentials' });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return done(null, false, { message: 'Invalid credentials' });
          return done(null, { id: user.id, username: user.username });
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      if (!user) return done(null, false);
      done(null, { id: user.id, username: user.username });
    } catch (e) {
      done(e);
    }
  });
};