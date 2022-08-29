import { useParams } from 'react-router-dom';


const TodoItem = ({ todo }) => (
    <tr>
        <td>
            {todo.text}
        </td>
        <td>
            {todo.author}
        </td>
    </tr>
    );

const ProjectTodoList = ({ todos }) => {
    const { projectId } = useParams();
    const filteredTodos = todos.filter(todo => todo.project.equals(parseInt(projectId)));

    return (
        <table>
            <th>
                Text
            </th>
            <th>
                Author
            </th>
            {filteredTodos.map(todo => <TodoItem todo={todo} />)}
        </table>
    );
};

export default ProjectTodoList;
