const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
});

const clickEventSchema = new mongoose.Schema({
    linkType: String,
    timestamp: String,
});

const ClickEvent = mongoose.model('ClickEvent', clickEventSchema);

app.post('/track-click', async (req, res) => {
    try {
        const { linkType, timestamp } = req.body;

        const newEvent = new ClickEvent({ linkType, timestamp });
        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/', (req, res) => {
    res.send('Backend is running and ready to track clicks!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
