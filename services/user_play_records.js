async function saveUserPlayRecord(pool, user_id, category, selected_answers) {
    await pool.query(
        'INSERT INTO user_play_records (user_id, category, selected_answers, created_at) VALUES ($1, $2, $3, NOW())',
        [user_id, category, selected_answers]
    );
}

module.exports = saveUserPlayRecord;
