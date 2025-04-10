const express = require('express');
const app = express();
const port = 3000;

const questionsRouter = require('./routes/questions');
const typesRouter = require('./routes/types');
const userPlayRecordsRouter = require('./routes/user_play_records');

app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/types', typesRouter);
app.use('/api/user_play_records', userPlayRecordsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}!!!`);
});
