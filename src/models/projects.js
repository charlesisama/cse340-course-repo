import db from './db.js'

export async function getAllProjects() {
    const sql = `
        SELECT 
            service_projects.project_id,
            service_projects.title,
            service_projects.project_date,
            organization.name AS organization_name
        FROM service_projects
        JOIN organization
            ON service_projects.organization_id = organization.organization_id
        ORDER BY service_projects.project_date;
    `;

    const result = await db.query(sql);
    return result.rows;
}
