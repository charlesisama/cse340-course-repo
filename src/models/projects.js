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

// create new project
const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_projects (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};


// Update a service project
const updateProject = async (
    id,
    title,
    description,
    location,
    projectDate,
    organizationId
) => {

    const query = `
        UPDATE service_projects
        SET
            title = $1,
            description = $2,
            location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        projectDate,
        organizationId,
        id
    ];

    const result =
        await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error(
            'Failed to update project'
        );
    }

    return result.rows[0].project_id;
};

// Add a volunteer to a project
const addVolunteer = async (userId, projectId) => {
    const sql = `
        INSERT INTO project_volunteers
        (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *
    `
    const queryParams = [userId, projectId];
    const result = await db.query(sql, queryParams);
    return result.rows[0];
};


// Remove a volunteer from a project
const removeVolunteer = async (userId, projectId) => {
    const sql = `
        DELETE FROM project_volunteers
        WHERE user_id = $1
        AND project_id = $2
    `

    const queryParams = [userId, projectId];
    const result = await db.query(sql, queryParams);

    return result.rows[0];
};

// Check if a user is a volunteer for a project
const isVolunteer = async (userId, projectId) => {
    const sql = `
        SELECT *
        FROM project_volunteers
        WHERE user_id = $1
        AND project_id = $2
    `

    const result = await db.query(sql, [userId, projectId])

    return result.rows.length > 0
};

// Get all projects a user is volunteering for
const getVolunteerProjects = async (userId) => {
    const sql = `
        SELECT
            sp.project_id,
            sp.title,
            sp.location,
            sp.project_date
        FROM project_volunteers pv
        JOIN service_projects sp
            ON pv.project_id = sp.project_id
        WHERE pv.user_id = $1
        ORDER BY sp.project_date
    `

    const result = await db.query(sql, [userId])

    return result.rows
}


export {
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId,
    createProject,
    updateProject,
    addVolunteer, removeVolunteer,
    isVolunteer, getVolunteerProjects
};