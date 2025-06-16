const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/music_survey';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const instrumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Instrument = mongoose.model('Instrument', instrumentSchema);

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Genre = mongoose.model('Genre', genreSchema);

const votingSchema = new mongoose.Schema({
  instrument: { type: mongoose.Schema.Types.ObjectId, ref: 'Instrument', required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  value: { type: Number, required: true },
});
const Voting = mongoose.model('Voting', votingSchema);

app.get('/instrument', async (req, res) => {
  try {
    const instruments = await Instrument.find();
    res.json(instruments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/instrument', async (req, res) => {
  try {
    const instrument = new Instrument(req.body);
    await instrument.save();
    res.status(201).json(instrument);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/genre', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/genre', async (req, res) => {
  try {
    const genre = new Genre(req.body);
    await genre.save();
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/voting', async (req, res) => {
  try {
    const votes = await Voting.find().populate('instrument').populate('genre');
    res.json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/voting', async (req, res) => {
  try {
    const vote = new Voting(req.body);
    await vote.save();
    const populated = await vote.populate('instrument').populate('genre');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
