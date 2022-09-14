import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project': '',
            'text': '',
            'author': '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAuthorSelect(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'author': ''
            })
            return;
        }

        let author = ''

        for(let option of event.target.selectedOptions) {
            author.push(option.value)
        }

        this.setState({
            'author': author
        })
    }

    handleProjectSelect(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'project': ''
            })
            return;
        }

        let project = ''

        for(let option of event.target.selectedOptions) {
            project.push(option.value)
        }

        this.setState({
            'project': project
        })
    }

    handleSubmit(event) {
        this.props.createProject(this.state.project, this.state.text, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <select onChange={(event) => this.handleProjectSelect(event)} >
                        {this.props.project.map((project) => <option value={project.id}>{project.name}</option> )}
                    </select>
                    <input type="text" name="text" placeholder="todo text" value={this.state.repo} onChange={(event) => this.handleChange(event)} />
                    <select onChange={(event) => this.handleAuthorSelect(event)} >
                        {this.props.author.map((author) => <option value={user.id}>{user.username}</option> )}
                    </select>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default TodoForm;
