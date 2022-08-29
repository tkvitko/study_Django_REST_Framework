import React from 'react';

const ProjectItem = ({ project }) => (
    <tr>
        <td>
            {project.name}
        </td>
        <td>
            {project.repo}
        </td>
        <td>
            {project.users}
        </td>
    </tr>);

const ProjectList = ({ projects }) => (
    <table>
        <th>
            Name
        </th>
        <th>
            Repo
        </th>
        <th>
            Users
        </th>
        {projects.map(project => <ProjectItem project={project} />)}
    </table>
    );
export default ProjectList;
