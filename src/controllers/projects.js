import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

// Number of projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Show upcoming projects page
const showProjectsPage = async (req, res) => {

    const projects = await getUpcomingProjects(
        NUMBER_OF_UPCOMING_PROJECTS
    );

    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

// Show single project details page
const showProjectDetailsPage = async (req, res) => {

    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const title = project.title;

    res.render('project', { title, project });
};

export {
    showProjectsPage,
    showProjectDetailsPage
};