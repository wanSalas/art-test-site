# Sample MERN stack App with Auth and Sessions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is a simple one-page application/website built in React with a basic site scaffold(Home/Products/About/Contact) with Login/Logout functionality and working rudimentary session management. Sessions, user data and credentials, Contact requests and product list is hosted in a MongoDB website and accessed via Mongoose. Password management via bcrypt also implemented. Session management made possible by generation of JWT, and storage in MongoDB. Environment variables are used for MongoDB connection, Bcrypt hashing secret and JWT Secret. React Router used for updating the content pane with the specific page. Server routes structured into respective directories by the help of require-glob.

This project is for personal website template, and portfolio purposes only.

Main dependencies list:
1. react
2. material-ui
3. react-router-dom
4. express
5. cors
6. mongoose
7. bcrypt
8. jsonwebtoken
9. cookie-parser
10. require-glob
11. dotenv

## Instructions

1. Download the ZIP and extract to a directory. 
2. Navigate to the directory via terminal and run 'npm install'.
3. Navigate to the './server' directory and run 'npm install'.
4. Run 'npm start' in the server directory.
6. Open another terminal and navigate to the directory of installation.
7. run 'npm start'.

## Notes
You must have MongoDB running on localhost:27017 in order for this to work out of the box. 
Backend runs on http://localhost:8080/ by default
React app runs on http://localhost:3000/ by default
