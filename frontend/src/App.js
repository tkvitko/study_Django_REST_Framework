import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import UserList from './components/UserList';
import TodoList from './components/TodoList';
import ProjectList from './components/ProjectList';
// import ProjectTodoList from './components/ProjectTodoList';


const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <div>
            Page {pathname} not found
        </div>
    );
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            todos: [],
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then((response) => {
                const users = response.data.results;
                this.setState(
                    {
                        users,
                    },
                );
            });
            // .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then((response) => {
                const projects = response.data.results;
                this.setState(
                    {
                        projects,
                    },
                );
            });

        axios.get('http://127.0.0.1:8000/api/todos/')
            .then((response) => {
                const todos = response.data.results;
                this.setState(
                    {
                        todos,
                    },
                );
            });
    }

    render() {
        return (
            // <div>
            //     <UserList users={this.state.users} />
            // </div>
            <div>
                <BrowserRouter>
                    <nav>
                        <li> <Link to="/projects">Projects</Link> </li>
                        <li> <Link to="/todos">Todos</Link> </li>
                        <li> <Link to="/users">Users</Link> </li>
                    </nav>

                    <Routes>
                        <Route exact path="/" element={<Navigate to="/projects" />} />
                        <Route exact path="/users" element={<UserList users={this.state.users} />} />
                        <Route exact path="/todos" element={<TodoList toods={this.state.todos} />} />
                        <Route exact path="/projects" element={<ProjectList projects={this.state.projects} />} />
                        {/* <Route path="/projects"> */}
                        {/*     <Route index element={<ProjectList projects={this.state.projects} />} /> */}
                        {/*     <Route path=":projectId" element={<ProjectTodoList todos={this.state.todos} />} /> */}
                        {/* </Route> */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
