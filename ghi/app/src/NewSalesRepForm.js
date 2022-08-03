import React from 'react';

class NewSalesRepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employee_number: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;
        console.log(data)

        const employeeUrl = 'http://localhost:8090/api/salesreps/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(employeeUrl, fetchConfig)
        if (response.ok) {
            const newSalesRep = await response.json()
            console.log(newSalesRep)

            const cleared = {
                name: '',
                employee_number: '',
            };
            this.setState(cleared);
        }
    }

    // async componentDidMount() {
    //     const url = 'http://localhost:8100/api/automobiles/';
    //     const response = await fetch(url);
    //     if (response.ok) {
    //     const data = await response.json();
    //     this.setState({ customer: data.name });
    //     }
    // }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a New Sales Representative</h1>
                        <form onSubmit={this.handleSubmit} id="create-new-sales-rep-form">

                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Employee Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.employeeNumber} placeholder="Employee number" required type="text" name="employee_number" id="Employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee ID Number</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewSalesRepForm;