const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

let totalViews = 0;

app.use(express.json());

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    totalViews++;

    // Check if the 'totalViews' cookie exists
    const viewsCookie = req.cookies.totalViews || 0;

    const updatedViews = parseInt(viewsCookie) + 1;

    res.cookie('totalViews', updatedViews, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // Cookie lasts for 1 year

    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(path.join(__dirname)));

app.post('/logData', (req, res) => {
    const { page, duration, linksClicked } = req.body;
    
    console.log(`Received log data for ${page}:`);
    console.log(`Duration: ${duration} seconds`);
    console.log('Links Clicked:', linksClicked);

    res.sendStatus(200);
});

app.post('/logDurationP', (req, res) => {
    const { page, duration } = req.body;
    console.log(`User viewed ${page} for ${duration} seconds`);
    
    res.sendStatus(200);
});

app.post('/logDurationR', (req, res) => {
    const { duration, downloadButtonClicks } = req.body;

    console.log(`Total Resume Duration: ${duration} seconds`);
    console.log(`Total Resume Download Clicks: ${downloadButtonClicks}`);

    res.sendStatus(200);
});

app.post('/logClicks', (req, res) => {
    const { linkedinClicked, instagramClicked, githubClicked } = req.body;
    console.log(`LinkedIn clicked: ${linkedinClicked}, Instagram clicked: ${instagramClicked}, Github clicked: ${githubClicked}`);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
