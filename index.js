const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to restrict access to working hours (Monday to Friday, from 9 to 17)
const workingHoursMiddleware = (req, res, next) => {
    const currentDateTime = new Date();
    const day = currentDateTime.getDay();
    const hour = currentDateTime.getHours();
    const isWorkingDay = day >= 1 && day <= 5;
    const isWorkingHour = hour >= 9 && hour < 17;

    if (isWorkingDay && isWorkingHour) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public/pages/closed.html'));
    }
};

app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/home.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/contact.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
