const express = require('express');
const app = express();
const port = 3000;

const questionsRouter = require('./routes/questions');
const typesRouter = require('./routes/types');
const submitPlayResultRouter = require('./routes/submit_play_result');
const userTypeCountsRouter = require('./routes/user_type_counts');
const userPlayRecordsRouter = require('./routes/user_play_records');
const deleteUserDataRouter = require('./routes/delete_user_data');

app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/types', typesRouter);
app.use('/api/submit_play_result', submitPlayResultRouter);
app.use('/api/user_type_counts', userTypeCountsRouter);
app.use('/api/user_play_records', userPlayRecordsRouter);
app.use('/api/delete_user_data', deleteUserDataRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
