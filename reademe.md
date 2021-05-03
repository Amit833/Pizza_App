// issues
const userFound = await User.findOne({ email }); // why {} userController

console.log("Mongo Connection URL: ", env.db); // why not env.devconfig.db because db is inside the devConfig/prodConfig (helpers/db-connection)

return process.exit(1); // exit with error why 1 inside the exit (helpers/env-check)

// do I set the environment path here? is it global config?
we set in package.json file "remote": "NODE_ENV=production nodemon server.js"
const config = {
env: env.NODE_ENV || "development",
};

// why npm init -y ?

// token only when login. dosen't need when sign up, right?
