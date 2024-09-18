function logClick(event, linkType) {
    const timestamp = new Date().toISOString();

    fetch('https://personal-website-bnl4.onrender.com/track-click', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            linkType: linkType, 
            timestamp: timestamp, 
        }),
    })
    .then(response => response.text())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}
