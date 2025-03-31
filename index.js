const express = require('express');
const app = express();
const port = 3000;

// 라우터 불러오기
const questionsRouter = require('./routes/questions');
const typesRouter = require('./routes/types');

app.use('/api/questions', questionsRouter);
app.use('/api/types', typesRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}!!!`);
});
