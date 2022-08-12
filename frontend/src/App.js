import React from 'react';
import axios from 'axios';
import UserList from './components/UserList';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    // componentDidMount() {
    //     const users = [
    //         {
    //             username: 'tkvitko',
    //             first_name: 'taras',
    //             last_name: 'kvitko',
    //             email: 'tkvitko@gmail.com',
    //         },
    //         {
    //             username: 'admin',
    //             first_name: '',
    //             last_name: '',
    //             email: 'tkvitko@bcc.ru',
    //         },
    //         {
    //             username: 'test_added',
    //             first_name: '',
    //             last_name: '',
    //             email: 'some@some.com',
    //         },
    //         {
    //             username: 'test2',
    //             first_name: '',
    //             last_name: '',
    //             email: 'test@tet.tet',
    //         },
    //         {
    //             username: 'test3',
    //             first_name: '',
    //             last_name: '',
    //             email: 'test@t.2',
    //         },
    //
    //     ];
    //     this.setState(
    //         {
    //             users,
    //         },
    //     );
    // }

    componentDidMount() {
        axios.get('http://localhost:8000/api/users')
            .then((response) => {
                const users = response.data.results;
                this.setState(
                    {
                        users,
                    },
                );
            });
            // .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users} />
            </div>
        );
    }
}

export default App;
