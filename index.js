const express = require('express');
const app = express();
const port = 3000;

const questionsRouter = require('./routes/questions');
const typesRouter = require('./routes/types');
const submitPlayResultRouter = require('./routes/submit_play_result');

app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/types', typesRouter);
app.use('/api/submit_play_result', submitPlayResultRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
