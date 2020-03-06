import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    };

    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users);
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users:res.data});
    };

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users',{
            username: this.state.username
        });
        this.setState({username: ''});
        this.getUsers();
    };

    deleteUsers = async (id) => {
        await axios.delete('http://localhost:4000/api/users/'+ id);
        this.getUsers();
    };

    render() {
        return (
            <div className="flex mb-4 mt-4 ml-4 mr-4">
                <div className="w-1/3 mr-4">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Create a new User</div>
                            <div className="text-gray-700 text-base">
                                <div className="w-full max-w-xs">
                                    <form className="bg-white rounded pt-6 pb-8 mb-2" onSubmit={this.onSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="username">
                                                Username
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Username" onChange={this.onChangeUsername} value={this.state.username}/>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="submit">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                    <p className="text-center text-gray-500 text-xs">
                                        &copy;2020 Acme Corp. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/3">
                    <ul className="list-none">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action shadow-md h-12 rounded px-2 mb-1"
                                    key={user._id}
                                    onDoubleClick={() => this.deleteUsers(user._id)}>
                                    {user.username}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
