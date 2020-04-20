import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }        
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Complete: ${this.state.todo_completed}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container mx-auto" style={{marginTop: 10}}>
                <h3 className="text-center">Create New Todo</h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                            Description: 
                        </label>
                        <input type="text"
                               className="form-control col-sm-10"
                               value={this.state.todo_description}
                               onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                            Responsible: 
                        </label>
                        <input 
                            type="text"
                            className="form-control col-sm-10"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <fieldset className="form-group">
                        <div className="row">
                            <legend className="col-form-label col-sm-2 pt-0">
                                Priority:
                            </legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="priorityOptions" 
                                            id="priorityLow" 
                                            value="Low"
                                            checked={this.state.todo_priority==='Low'} 
                                            onChange={this.onChangeTodoPriority}
                                            />
                                    <label className="form-check-label" for="priorityLow">Low</label>
                                </div>
                                <div className="form-check">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="priorityOptions" 
                                            id="priorityMedium" 
                                            value="Medium" 
                                            checked={this.state.todo_priority==='Medium'} 
                                            onChange={this.onChangeTodoPriority}
                                            />
                                    <label className="form-check-label" for="priorityMedium">Medium</label>
                                </div>
                                <div className="form-check">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="priorityOptions" 
                                            id="priorityHigh" 
                                            value="High" 
                                            checked={this.state.todo_priority==='High'} 
                                            onChange={this.onChangeTodoPriority}
                                            />
                                    <label className="form-check-label">High</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="form-group">
                        <button type="submit"
                                className="btn btn-primary">
                            Create Todo
                        </button>
                        <Link to="/" className="btn btn-link">Back</Link>
                    </div>
                </form>
            </div>
        )
    }
}