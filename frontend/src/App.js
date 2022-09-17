import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import UserList from './components/UserList';
import TodoList from './components/TodoList';
import ProjectList from './components/ProjectList';
import LoginForm from './components/LoginForm';
import ProjectForm from './components/ProjectForm';
import TodoForm from './components/TodoForm';
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
            token: '',
        };
    }

    createProject(name, repo, users) {
        const headers = this.getHeaders();

        axios
            .post('http://127.0.0.1:8000/api/projects/', { name, repo, users }, { headers })
            .then((response) => {
                this.setState({
                    redirect: '/projects',
                }, this.getData);
            });
    }

    deleteProject(projectId) {
        const headers = this.getHeaders();

        axios
            .delete(`http://127.0.0.1:8000/api/projects/${projectId}`, { headers })
            .then((response) => {
                this.setState({
                    projects: this.state.projects.filter(project => project.id !== projectId),
                });
            });
    }

    createTodo(project, text, author) {
        const headers = this.getHeaders();

        axios
            .post('http://127.0.0.1:8000/api/todos/', { project, text, author }, { headers })
            .then((response) => {
                this.setState({
                    redirect: '/todos',
                }, this.getData);
            });
    }

    deleteTodo(todoId) {
        const headers = this.getHeaders();

        axios
            .delete(`http://127.0.0.1:8000/api/todos/${todoId}`, { headers })
            .then((response) => {
                this.setState({
                    todos: this.state.todos.filter(todo => todo.id !== todoId),
                });
            });
    }

    obtainAuthToken(login, password) {
        axios
            .post('http://127.0.0.1:8002/api-auth-token/', {
                username: login,
                password,
            })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                this.setState({
                    token,
                }, this.getData);
            });
    }

    isAuth() {
        return !!this.state.token;
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({
            token,
        }, this.getData);
    }

    getHeaders() {
        if (this.isAuth()) {
            return {
                Authorization: `Token ${this.state.token}`,
            };
        }
        return {};
    }

    getData() {
        const headers = this.getHeaders();
        axios.get('http://127.0.0.1:8000/api/users/', { headers })
            .then((response) => {
                const users = response.data.results;
                this.setState(
                    {
                        users,
                    },
                );
            });
            // .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/projects/', { headers })
            .then((response) => {
                const projects = response.data.results;
                this.setState(
                    {
                        projects,
                    },
                );
            });

        axios.get('http://127.0.0.1:8000/api/todos/', { headers })
            .then((response) => {
                const todos = response.data.results;
                this.setState(
                    {
                        todos,
                    },
                );
            });
    }

    logOut() {
        localStorage.setItem('token', '');
        this.setState({
            token: '',
        }, this.getData);
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
                        <li>
                            {this.isAuth() ? <button onClick={() => this.logOut()}>Logout</button> : <Link to="/login">Login</Link> }
                        </li>
                    </nav>

                    <Routes>
                        <Route exact path="/" element={<Navigate to="/projects" />} />
                        <Route exact path="/users" element={<UserList users={this.state.users} />} />
                        <Route exact path="/todos" element={<TodoList toods={this.state.todos} deleteTodo={todoId => this.deleteSTodo(todoId)} />} />
                        <Route exact path="/create_todo" element={<TodoForm author={this.state.author} project={this.state.project} createTodo={(project, text, author) => this.createTodo(project, text, author)} />} />
                        <Route exact path="/projects" element={<ProjectList projects={this.state.projects} deleteProject={projectId => this.deleteProject(projectId)} />} />
                        <Route exact path="/create_project" element={<ProjectForm users={this.state.users} createProject={(name, repo, users) => this.createProject(name, repo, users)} />} />
                        {/* <Route path="/projects"> */}
                        {/*     <Route index element={<ProjectList projects={this.state.projects} />} /> */}
                        {/*     <Route path=":projectId" element={<ProjectTodoList todos={this.state.todos} />} /> */}
                        {/* </Route> */}
                        <Route exact path="/login" element={<LoginForm obtainAuthToken={(login, password) => this.obtainAuthToken(login, password)} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
