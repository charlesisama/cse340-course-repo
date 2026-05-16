// src/models/projects.js

import pool from '../db/pool.js';

async function getAllProjects() {
    const sql = `
        SELECT 
            service_projects.project_id,
            service_projects.title,
            service_projects.project_date,
            organizations.name AS organization_name
        FROM service_projects
        JOIN organizations
            ON service_projects.organization_id = organizations.organization_id
        ORDER BY service_projects.project_date;
    `;

    const result = await pool.query(sql);
    return result.rows;
}

export default {
    getAllProjects
};