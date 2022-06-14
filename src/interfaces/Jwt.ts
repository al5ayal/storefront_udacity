import { JwtPayload } from "jsonwebtoken";

export interface Jwt extends JwtPayload{
  last_name: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
