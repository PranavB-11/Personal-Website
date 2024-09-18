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
.catch(err => console.error('MongoDB connection error:', err));

const clickEventSchema = new mongoose.Schema({
    linkType: String,
    timestamp: String,s
});

const ClickEvent = mongoose.model('ClickEvent', clickEventSchema);

app.post('/track-click', async (req, res) => {
    try {
        const { linkType, timestamp } = req.body;

        const newEvent = new ClickEvent({ linkType, timestamp });
        await newEvent.save();

        res.status(201).send('Click event saved');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
