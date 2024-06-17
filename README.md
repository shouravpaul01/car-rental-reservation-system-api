# Car Rental Reservation System API

An API for managing car rental reservations, including features for booking, modifying, and canceling car rentals.

## Description

The Car Rental Reservation System API allows users to search for available cars, book rentals, manage existing reservations, and handle returns. It provides endpoints for different functionalities related to car rentals, enabling seamless integration into car rental service applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)



## Installation

1. Clone the repository:
   ```sh
   gh repo clone shouravpaul01/car-rental-reservation-system-api
   
2. Navigate to the project directory:
   ```sh
   cd car-rental-reservation-system-api
 
3. Install dependencies:
   ```sh
   npm install

4. Set up environment variables:(Create a .env file in the root directory and add the required environment variables)

   ```sh
   PORT=****
   DATABASE_URL=mongodb+srv://********* 
   BCRYPT_SALT_ROUNDS=**
   JWT_SECRET=**json web token secret**
5. Start the application:
   ```sh
   npm start    
   
## Usage
After installation, you can start the server with:

```sh
npm start

```
Use a tool like Postman or cURL to interact with the API endpoints.


## Features
- Two type role .(admin,user)
- User authentication (register, login)
- Admin functionalities for managing cars and managing booked cars and rent.
- Search and filter available cars
- View user-specific reservations
Pending more features
## API Endpoints
#### Authentication

- **POST  /api/auth/signup:** Register a new user

- **POST  /api/auth/signin:** Login a user
#### Car Management
- **POST /api/cars:** Add a new car (Admin only)
- **GET /api/cars:** Retrieve all cars 
- **GET /api/cars/:carId:** Retrieve a car
- **PUT /api/cars/:carId:** Update car details (Admin only)
- **DELETE /api/v1/cars/:carId:** Soft Delete a car (Admin only)
- **PUT /api/cars/return:** Return booked car  (Admin only)
#### Booking Management
- **POST /api/bookings:** Create a new booking (User only)
- **GET /api/bookings:** Retrieve list of bookings ( Admin only)
- **GET /api/bookings/my-bookings:** Retrieve list of user own bookings ( User only)


