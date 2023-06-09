import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const DB = process.env.DB!;
export const PORT = parseInt(process.env.PORT!);
