import { config } from "dotenv";
// load environment-specific file (was: "path: .env..." — that's incorrect)
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// keep original destructuring style but provide safe defaults so PORT is never undefined
export const { PORT } = process.env;