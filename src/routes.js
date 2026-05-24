import express from 'express';

import { showOrganizationDetailsPage, showOrganizationsPage, showNewOrganizationForm, processNewOrganizationForm } from './controllers/organizations.js';
import { showHomePage } from './controllers/index.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

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
router.post('/new-organization', processNewOrganizationForm);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;