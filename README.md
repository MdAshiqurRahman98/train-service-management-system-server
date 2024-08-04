# Train Service Management System

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/MdAshiqurRahman98/train-service-management-system-server
   cd train-service-management

2. Install dependencies:
   npm install

3. Create a `.env` file and add the following variables:
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

4. Run the server:
   npm start

5. API Endpoints:
   - User Management
      - POST `/api/auth/register`: Register a new user
      - POST `/api/auth/login`: Login a user
      
   - Station Management
      - POST `/api/stations`: Create a station
      - PUT `/api/stations/:id`: Update a station
      - GET `/api/stations`: Retrieve all stations

   - Train Management
      - POST `/api/trains`: Create a train
      - PUT `/api/trains/:id`: Update a train
      - GET `/api/trains`: Retrieve all trains

   - Wallet Integration
      - POST `/api/wallet/add-funds`: Add funds to wallet
      - GET `/api/wallet`: Retrieve wallet balance

   - Ticketing System
      - POST `/api/tickets/purchase`: Purchase a ticket