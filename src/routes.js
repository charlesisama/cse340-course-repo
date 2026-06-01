import express from 'express';

import {
    showOrganizationDetailsPage, showOrganizationsPage, showNewOrganizationForm,
    processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm
} from './controllers/organizations.js';

import { showHomePage } from './controllers/index.js';

import {
    showProjectsPage, showProjectDetailsPage, processNewProjectForm, showNewProjectForm,
    projectValidation, showEditProjectForm, processEditProjectForm
} from './controllers/projects.js';
    
import {
    showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm,
    processAssignCategoriesForm, showEditCategoryForm, processEditCategoryForm, processNewCategoryForm,
    categoryValidation, showNewCategoryForm, createCategory, updateCategory
}from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';
import { validationResult } from 'express-validator';

const router = express.Router();

router.get('/', showHomePage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/organizations', showOrganizationsPage);

//show projectDetailsPage route
router.get('/project/:id', showProjectDetailsPage);
router.get('/projects', showProjectsPage);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);


// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route for edit organization page
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Edit project routes
router.get('/edit-project/:id',showEditProjectForm);

router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// New category routes
router.get('/new-category', showNewCategoryForm);

router.post('/new-category', categoryValidation, processNewCategoryForm);


// Edit category routes
router.get('/edit-category/:id', showEditCategoryForm);

router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);


export default router;