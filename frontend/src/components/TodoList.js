import React from 'react';

const TodoItem = ({ todo }) => (
    <tr>
        <td>
            {todo.project}
        </td>
        <td>
            {todo.text}
        </td>
        <td>
            {todo.author}
        </td>
        <td>
            {todo.is_closed}
        </td>
    </tr>);

const TodoList = ({ todos }) => (
    <table>
        <th>
            Project
        </th>
        <th>
            Text
        </th>
        <th>
            Author
        </th>
        <th>
            Closed
        </th>
        {todos.map(todo => <TodoItem todo={todo} />)}
    </table>
    );
export default TodoList;
