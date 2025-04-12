async function updateUserTypeCounts(pool, user_id, type_counts) {
    const columns = Object.keys(type_counts);
    const updates = [];

    const checkUser = await pool.query(
        'SELECT * FROM user_type_counts WHERE user_id = $1',
        [user_id]
    );

    if (checkUser.rows.length === 0) {
        const insertColumns = ['user_id', ...columns];
        const insertValues = [user_id, ...columns.map(k => type_counts[k])];

        const colNames = insertColumns.map(col => `"${col}"`).join(', ');
        const valParams = insertValues.map((_, i) => `$${i + 1}`).join(', ');

        await pool.query(
            `INSERT INTO user_type_counts (${colNames}) VALUES (${valParams})`,
            insertValues
        );
    } else {
        for (const [type, count] of Object.entries(type_counts)) {
            updates.push(
                pool.query(
                    `UPDATE user_type_counts SET "${type}" = "${type}" + $1 WHERE user_id = $2`,
                    [count, user_id]
                )
            );
        }
        await Promise.all(updates);
    }
}

module.exports = updateUserTypeCounts;
