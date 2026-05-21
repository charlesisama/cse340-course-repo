import db from './db.js';

// Get upcoming service projects
const getUpcomingProjects = async (number_of_projects) => {

    const query = `
        SELECT
            service_projects.project_id,
            service_projects.title,
            service_projects.description,
            service_projects.project_date,
            service_projects.location,
            service_projects.organization_id,
            organization.name AS organization_name
        FROM service_projects
        JOIN organization
            ON service_projects.organization_id =
                organization.organization_id
        WHERE service_projects.project_date >= CURRENT_DATE
        ORDER BY service_projects.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Get single project details
const getProjectDetails = async (id) => {

    const query = `
        SELECT
            service_projects.project_id,
            service_projects.title,
            service_projects.description,
            service_projects.project_date,
            service_projects.location,
            service_projects.organization_id,
            organization.name AS organization_name
        FROM service_projects
        JOIN organization
            ON service_projects.organization_id =
                organization.organization_id
        WHERE service_projects.project_id = $1;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};

// Get projects belonging to one organization
const getProjectsByOrganizationId = async (organizationId) => {

    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

export {
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId
};