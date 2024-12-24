# mailerLite-express

This project sets up an API using Node.js and Express to manage subscribers with MailerLite. The API allows adding subscribers and assigning them to a specific group.

## Requirements
- Node.js (v12 or later)
- MailerLite API Key
- ```.env``` file for environment variables.
## Installation
Clone the repository:
```bash
git clone https://github.com/kenneth-hendrix/mailerLite-express.git
cd mailerLite-express
```
Install dependencies:
```bash
npm install
```
Create a .env file in the project root and add the following variables:
```javascript
PORT=3000
MAILERLITE_API_KEY=<your-mailerlite-api-key>
GROUP_ID=<your-mailerlite-group-id>
```
Start the server:
```bash
npm run start
```
or start the test server:
```bash
npm run test
```
The server will run on http://localhost:3000.
## Endpoints
**POST** ```/api/subscriber```\
Add or update a subscriber and assign them to a group.\
Request Body:
```json
{
  "email": "subscriber@example.com"
}
```
**Response**
- Success (200): Subscriber added or updated and assigned to the group.
- Error (4xx/5xx): Returns an error message with the corresponding HTTP status.

## Usage Example
Send a POST request to /api/subscriber using a tool like Postman or curl:

```bash 
curl -X POST http://localhost:3000/api/subscriber -H "Content-Type: application/json" -d '{"email": "subscriber@example.com"}'
```
## Dependencies

- dotenv: Loads environment variables from a .env file.
- @mailerlite/mailerlite-nodejs: MailerLite API client. 
- express: Web framework for Node.js. 
- body-parser: Middleware for parsing request bodies. 
- cors: Enables Cross-Origin Resource Sharing.

