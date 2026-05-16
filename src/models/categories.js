// src/models/categories.js

import db from './db.js';

export async function getAllCategories() {

    const sql = `
        SELECT *
        FROM categories
        ORDER BY name;
    `;

    const result = await db.query(sql);

    return result.rows;
}