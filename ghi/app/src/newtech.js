import React from 'react';

class NewTechForm extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    name: '',
    emp_id: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}


handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
}

async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state }
    console.log(data)

    const shoeURL = 'http://localhost:8080/api/techs/'
    const fetchConfig = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    }
    }
    const response = await fetch(shoeURL, fetchConfig)
    if (response.ok) {
    const newTech = await response.json()
    console.log(newTech)
    const cleared = {
        name: '',
        emp_id: '',
    }
    this.setState(cleared)
    }
}
render() {
    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Enter a technician</h1>
            <form onSubmit={this.handleSubmit}>
            <div className="form-floating mb-3">
                <input placeholder="Tech Name" type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                <label htmlFor="name">Tech Name</label>
            </div>
            <div className="form-floating mb-3">
                <input placeholder="Employee Id" type="text" className="form-control" id="emp_id" name="emp_id" value={this.state.emp_id} onChange={this.handleChange} />
                <label htmlFor="emp_id">Employee Id</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    </div>

    )
}
}

export default NewTechForm;