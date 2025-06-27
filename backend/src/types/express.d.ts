import { UserAttributes } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      cookies: Record<string, string>;
      user?: Pick<
        UserAttributes,
        "id" | "email" | "username" | "photo" | "role" | "city" | "profession" | "lastActive"
      >;
    }
  }
}
