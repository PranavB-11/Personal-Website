const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://pranavsbanwasi:siE7m9Es4lLR94xI@cluster0.t5t4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const clickEventSchema = new mongoose.Schema({
    linkType: String,
    timestamp: String,
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
