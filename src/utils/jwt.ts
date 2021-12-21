import "dotenv/config";
import jwt from "jsonwebtoken";
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.JWT_SECRET!, {
    ...(options && options),
  });
}
export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as T;
    return decoded;
  } catch (e) {
    console.log("TOKEN:", e);
    return null;
  }
}
