import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {        
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {                
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this item?"))
        {
            axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id)
                .then(res => console.log(res.data));        
            this.props.history.push('/');
        }        
    }

    render() {
        return (
            <div className="container">                
                <h3 align="center">Delete Todo</h3>
                <hr />
                <div className="offset-3">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row"> 
                            <label className="col-sm-2 col-form-label">Description: </label>
                            <span className="col-sm-10 form-control-plaintext">
                                {this.state.todo_description}
                            </span>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Responsible: </label>
                            <span className="col-sm-10 form-control-plaintext">
                                {this.state.todo_responsible}
                            </span>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Priority: </label>
                            <span className="col-sm-10 form-control-plaintext">
                                {this.state.todo_priority}
                            </span>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Completed: </label>
                            <span className="col-sm-10 form-control-plaintext">
                            {this.state.todo_completed ? '\u2714' : '\u274C'}
                            </span>
                        </div>
                        <div className="form-group row">
                            <input 
                                type="submit"
                                value="Delete Todo"
                                className="offset-sm-2 btn btn-danger" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}