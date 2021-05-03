const { env } = process;

// do I set the environment path here? is it global config?
// by Default env.NODE_ENV is undifined.
// but when we set this line  env: env.NODE_ENV || "development",
// we are telling that if it is undifined set it as development
const config = {
  env: env.NODE_ENV || "development",
};

// set the development config
const devConfig = {
  db: env.MONGO_URI_DEV,
  jwt_key: env.JWT_KEY_DEV,
  frontendOrigin: env.FRONTEND_ORIGIN_DEV,
  email: env.EMAIL,
  email_pass: env.EMAIL_PASS,
};

// set the production config
const prodConfig = {
  db: env.MONGO_URI_PROD,
  jwt_key: env.JWT_KEY_PROD,
  frontendOrigin: env.FRONTEND_ORIGIN_PROD,
  email: env.EMAIL,
  email_pass: env.EMAIL_PASS,
};

// here I am telling that if config.env === "production" then do prodConfig otherwisw devConfig;
// to see our current config we can log it
const currentConfig = config.env === "production" ? prodConfig : devConfig;
console.log("OUR ENVIROMENT SETUP IS:", config.env);
console.log(currentConfig);
module.exports = Object.assign({}, config, currentConfig);
