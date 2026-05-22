import { getAllCategories } from '../models/categories.js';
import { getCategoryDetails } from '../models/categories.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/categories.js';



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
// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };