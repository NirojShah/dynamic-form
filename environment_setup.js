import dotenv from "dotenv";

export const config_env = () => {
  let file = ".env.development";
  const env = process.env.NODE_ENV;

  switch (env) {
    case "production":
      file = ".env.production";
      break;
    case "development":
      file = ".env.developement";
      break;
  }
  dotenv.config({
    path: file
  })
};
