const express = require("express"); // Importing the Express.js framework module
const session = require("express-session"); // Importing the express-session middleware for session management
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Importing connect-session-sequelize for storing sessions in Sequelize
const routes = require("./controllers"); // Importing routes defined in the controllers directory/file
const sequelize = require("./config/connection"); // Importing the Sequelize instance configured in the connection file
const exphbs = require("express-handlebars"); // Importing express-handlebars for rendering views
const hbs = exphbs.create({ helpers: require("./utils/helpers") }); // Creating an instance of express-handlebars with custom helpers

//Creating express app and setting port
const app = express();
const PORT = process.env.PORT || 3101;

//Setting up session object with secret, cookie, and store.
const sess = {
  secret: process.env.SECRET || "Secret key pass",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true, // Helps prevent XSS attacks
    secure: process.env.NODE_ENV === "production", //Use secure cookies in production
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Using session middleware with session object
app.set("trust proxy", 1);
app.use(session(sess));

// Parsing incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files such as images from public directory
app.use(express.static("public"));

//Setting up handlebars engine and view directory
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Using routes from controller
app.use(routes);

//Syncing sequelize models with database and starting server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
