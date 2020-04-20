import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td className={props.todo.todo_completed ? 'link_completed' : ''}>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>&nbsp;|&nbsp;
            <Link to={"/delete/"+props.todo._id}>Delete</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    fetchData = () => {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.path !== prevProps.location.pathname) {
            this.fetchData();
        }
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-bordered table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}