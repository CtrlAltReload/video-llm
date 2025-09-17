import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import dotenv from "dotenv";
import User, { IUser } from "../models/User"; 

dotenv.config();

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/redirect`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: IUser | false) => void
    ) => {
      try {
        let user = await User.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails?.[0]?.value },
          ],
        });

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            picture: profile.photos?.[0]?.value,
            accessToken,
            refreshToken,
            isVerified: true,
          });
          await user.save();
        } else {
          user.googleId = profile.id;
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.isVerified = true;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);

export default passport;
