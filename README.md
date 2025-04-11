# Exchange Rate Checker

A simple currency exchange rate converter built using Vue 3 (Options API), Tailwind CSS, and Node.js (Express). The application allows users to select two currencies, input an amount, and get the converted value using live data from exchangerate.host.

This project uses Vite for the frontend build tool and provides a backend proxy through Express to securely handle API requests.

## How to Run

1. **Clone the repository**
2. **Setup the backend**

Navigate to the `server` folder, install dependencies, and set up your environment: 
`cd server npm install`
Create a `.env` file in the `server/` directory and add your exchangerate.host API key:
`ACCESS_KEY=your_api_key_here`
Then start server:
`node index.js`

The server will run on `http://localhost:3000`.

3. **Setup the frontend**

Navigate to the `client` folder, install dependencies, and start the dev server:
`cd ../client npm install npm run dev`

The frontend will be available at `http://localhost:5173`.

## Project Structure

- `client/` — Vue 3 frontend (Options API) with Tailwind CSS
- `server/` — Express.js backend API proxy
- `README.md` — Project documentation

## Notes

- Make sure your `.env` file is created and the API key is valid.
- You can test the backend route manually by accessing `http://localhost:3000/api/list` or `http://localhost:3000/api/rate?from=USD&to=IDR&amount=1` in your browser or via tools like Postman.
- This app is meant as a simple tool or template to get started with API-driven Vue + Express apps.




