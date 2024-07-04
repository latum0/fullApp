const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory database (array)
let users = [];

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Handle the POST request and save data to in-memory database
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Save the received data into the users array
    users.push({ name, email });

    // Respond with a success message and the current user list
    res.send(`
        <p>Received the data - Name: ${name}, Email: ${email}</p>
        <p><strong>Current Users:</strong></p>
        <ul>
            ${users.map(user => `<li>Name: ${user.name}, Email: ${user.email}</li>`).join('')}
        </ul>
        <a href="/">Go Back</a>
    `);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
