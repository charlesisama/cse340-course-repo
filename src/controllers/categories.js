import { getAllCategories, getCategoryDetails, getCategoriesByProjectId, createCategory, updateCategory } from '../models/categories.js';
import { getProjectsByCategoryId, assignCategoryToProject, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult }
    from 'express-validator';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};


//function to show Category Details
const showCategoryDetailsPage = async (req, res) => {

    const categoryId = req.params.id;

    // Get category information
    const category =
        await getCategoryDetails(categoryId);

    // Get projects in this category
    const projects =
        await getProjectsByCategoryId(categoryId);

    const title = category.name;

    res.render('category', {
        title,
        category,
        projects
    });
};

// Function to show the form for assigning categories to a project
const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

// Function to process the form submission for assigning categories to a project
const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};


const categoryValidation = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({min: 3, max: 100})
        .withMessage('Category name must be between 3 and 100 characters.')
];

// Function to create a new category
const showNewCategoryForm =
    async (req, res) => {

        const title = 'Create New Category';

        res.render('new-category',
            {
                title,
                name: '',
                errors: [] });
    };


// Function to process the form submission for creating a new category
const processNewCategoryForm =
    async (req, res) => {

        const errors =validationResult(req);

        const { name } = req.body;

        if (!errors.isEmpty()) {

            return res.render('new-category', {title:'Create New Category', errors:errors.array(), name});
        }

        await createCategory(name);

        req.flash('success', 'Category created successfully.');

        res.redirect('/categories');
    };

    // Function to show the form for editing a category
const showEditCategoryForm =
    async (req, res) => {

        const categoryId =
            req.params.id;

        const category = await getCategoryDetails(categoryId);

        const title = 'Edit Category';

        res.render(
            'edit-category',
            {
                title,
                category
            }
        );
    };

    // Function to process the form submission for editing a category
const processEditCategoryForm =
    async (req, res) => {

        const categoryId = req.params.id;

        const title = 'Edit Category';

        const errors = validationResult(req);

        const { name } = req.body;

        if (!errors.isEmpty()) {

            return res.render('edit-category', {title, errors: errors.array(), category: {category_id: categoryId, name}});
        }

        await updateCategory(categoryId, name);

        req.flash(
            'success',
            'Category updated successfully.'
        );

        res.redirect(
            `/category/${categoryId}`
        );
    };

// Export any controller functions
export {
    showCategoriesPage, showCategoryDetailsPage,
    showAssignCategoriesForm, processAssignCategoriesForm, 
    categoryValidation, showNewCategoryForm, createCategory, updateCategory,
    showEditCategoryForm, processEditCategoryForm, processNewCategoryForm
};