# Music Survey Backend

This repository provides a basic Node.js backend using Express and MongoDB for a music survey application.

## Setup

1. Install the dependencies (requires internet access):
   ```bash
   npm install
   ```

2. Set the MongoDB connection string in the `MONGODB_URI` environment variable if it is not running locally on the default port.

3. Start the server:
   ```bash
   npm start
   ```

The server listens on port `3000` by default. You can override this with the `PORT` environment variable.

## API Endpoints

- `GET /instrument` – List all instruments.
- `POST /instrument` – Create a new instrument with JSON body `{ "name": "Guitar" }`.
- `GET /genre` – List all genres.
- `POST /genre` – Create a new genre with JSON body `{ "name": "Rock" }`.
- `GET /voting` – List all votes with populated instrument and genre.
- `POST /voting` – Create a vote with JSON body `{ "instrument": "<instrumentId>", "genre": "<genreId>", "value": 1 }`.
