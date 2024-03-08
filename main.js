const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

function getCookie(cookieString, name) {
    let cookie = cookieString.split(';').find(cookie => cookie.trim().startsWith('views='));
    if (cookie) {
      return cookie.split('=')[1];
    }
    return 0;
  }

app.get('/', (req, res) => {
    let totalViews = getCookie(req.headers.cookie, 'views');
    totalViews++;
  
    let html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    res.setHeader('Set-Cookie', `views=${totalViews}`);

    res.send(html);
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
