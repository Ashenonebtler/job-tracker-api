# Job Application Tracker API

A CRUD API for keeping track of the jobs you apply to. Users sign up and log in, and job applications can be created, listed, viewed, updated and deleted.

Built with Node.js, Express and MongoDB (Mongoose) as the back end of a MERN stack project.

## Features

- Signup and login, with passwords hashed using Node's built-in `crypto` module (scrypt with a random salt)
- Full CRUD on job applications: create, read all, read by ID, update, delete
- Schema validation with Mongoose (required fields, allowed status values, unique email)

## Tech stack

| Part | Tool |
| --- | --- |
| Runtime | Node.js |
| Web framework | Express |
| Database | MongoDB Atlas + Mongoose |
| Password hashing | Node.js `crypto` (built in) |
| Config | dotenv |
| Testing | Postman |

## Getting started

```bash
git clone https://github.com/<your-username>/job-tracker-api.git
cd job-tracker-api
npm install
```

Create a `.env` file (see `.env.example`) with your MongoDB connection string:

```
DB=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/jobtracker
```

Then run:

```bash
npm run dev
```

The server runs on `http://localhost:4000`.

## API endpoints

| # | Method | Endpoint | Description |
| --- | --- | --- | --- |
| 1 | POST | `/users/signup` | Create an account |
| 2 | POST | `/users/login` | Log in |
| 3 | POST | `/applications/create` | Add a job application |
| 4 | GET | `/applications/getallapplications` | List all applications |
| 5 | GET | `/applications/getapplication/:id` | Get one application |
| 6 | PUT | `/applications/updateapplication/:id` | Update an application |
| 7 | DELETE | `/applications/deleteapplication/:id` | Delete an application |

### Application fields

| Field | Type | Notes |
| --- | --- | --- |
| company | String | required |
| position | String | required |
| status | String | `applied` (default), `interview`, `offer`, `rejected` |
| location | String | optional |
| salary | Number | optional, 0 or more |
| appliedDate | Date | defaults to today |
| notes | String | optional |

## Testing with Postman

Import `postman_collection.json` into Postman and run the requests in order. After "Create application", copy the `_id` from the response into the collection variable `id`.

## Project structure

```
├── index.js          # Express app and routes
├── database.js       # MongoDB connection
├── Models/           # Mongoose schemas (User, Application)
├── Controllers/      # Request logic
└── Routers/          # URL definitions
```

## Roadmap

- React front end (the "R" in MERN)
- Login tokens (JWT) so only logged-in users can manage applications
- Each user sees only their own applications
