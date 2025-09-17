import jwt, { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import '../config/passport'

interface User {
  _id: string;
  role: string;
}

interface DecodedToken extends JwtPayload {
  id: string;
  role?: string;
}

export const verifyRefreshToken = (
  refreshToken: string
): DecodedToken | null => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as DecodedToken;
    return decoded;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.error("Refresh token expired");
    } else if (err.name === "JsonWebTokenError") {
      console.error("Invalid refresh token");
    } else {
      console.error("Failed to verify refresh token:", err);
    }
    return null;
  }
};

export const createTokens = (user: User) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "3d" }
  );

  return { token, refreshToken };
};

export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("google", {
      scope: ["profile", "email"],
      accessType: "offline",
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const googleAuthCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("google", async (err: any, user: User | null) => {
    if (err) {
      console.error("Google Auth Error:", err);
      return res.redirect(`${process.env.CLIENT_URL}/?error=auth_failed`);
    }

    if (!user) {
      console.error("Google Auth Failed: No user found");
      return res.redirect(`${process.env.CLIENT_URL}/?error=no_user`);
    }

    const { token, refreshToken } = createTokens(user);

    res.redirect(
      `${process.env.CLIENT_URL}/redirect?token=${token}&refreshToken=${refreshToken}&uid=${user._id}`
    );
  })(req, res, next);
};
