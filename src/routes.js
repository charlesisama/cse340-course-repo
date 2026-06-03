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
    categoryValidation, showNewCategoryForm, createCategory, updateCategory}
    from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';
import { validationResult } from 'express-validator';

import {
    showUserRegistrationForm, processUserRegistrationForm, showLoginForm,
    processLoginForm, processLogout, requireLogin, showDashboard, requireRole
}
    from './controllers/users.js';

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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route for edit organization page
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Edit project routes
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// New category routes
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);


// Edit category routes
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);


// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);


// error-handling routes
router.get('/test-error', testErrorPage);


export default router;