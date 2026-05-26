// src/models/categories.js

import db from './db.js';

 async function getAllCategories() {

    const sql = `
        SELECT *
        FROM categories
        ORDER BY name;
    `;

    const result = await db.query(sql);

    return result.rows;
};

const getCategoryDetails = async (id) => {

    const query = `
        SELECT
            category_id,
            name
        FROM categories
        WHERE category_id = $1;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            categories.category_id,
            categories.name
        FROM categories
        JOIN project_categories
            ON categories.category_id =
                project_categories.category_id
        WHERE project_categories.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            service_projects.project_id,
            service_projects.title,
            service_projects.project_date,
            service_projects.location
        FROM service_projects
        JOIN project_categories
            ON service_projects.project_id =
                project_categories.project_id
        WHERE project_categories.category_id = $1
        ORDER BY service_projects.project_date;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Helper function to assign a category to a project
const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    assignCategoryToProject
};