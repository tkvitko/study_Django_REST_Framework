import React from 'react';

const UserItem = ({ user }) => (
    <tr>
        <td>
            {user.first_name}
        </td>
        <td>
            {user.last_name}
        </td>
        <td>
            {user.username}
        </td>
        <td>
            {user.email}
        </td>
    </tr>);

const UserList = ({ users }) => (
    <table>
        <th>
            First name
        </th>
        <th>
            Last Name
        </th>
        <th>
            Username
        </th>
        <th>
            E-mail
        </th>
        {users.map(user => <UserItem user={user} />)}
    </table>
    );
export default UserList;
