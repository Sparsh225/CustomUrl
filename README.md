# CustomUrl
# URL Shortener

A URL shortener built using Node.js, Express, MongoDB, JWT, and cookies. It includes authentication and authorization features where normal users can access only their URLs, and admins have access to all URLs.

## Features

- Shorten long URLs into unique short URLs.
- User registration and login system.
- JWT-based authentication and authorization.
- Normal users can access only their URLs.
- Admin users can access all URLs.

## Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

## Installation

1. Clone the repository:
nstall dependencies:

npm install
Set up environment variables:
Create a .env file in the root of the project.
Add the following variables:
env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=yoursecretkey
