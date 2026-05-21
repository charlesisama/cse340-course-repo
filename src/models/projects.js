import db from './db.js'

 async function getAllProjects() {
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
};

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



// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };