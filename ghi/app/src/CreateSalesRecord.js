import React from 'react';

class CreateSalesRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesReps: [],
            customers: [],
            automobiles: [],
            price: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state} ;
        delete data.salesReps;
        delete data.customers;
        delete data.automobiles;
        console.log("handle submit", data)

        const salesRecordUrl = 'http://localhost:8090/api/salesrecord/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(salesRecordUrl, fetchConfig)
        if (response.ok) {
            const newSalesRecord = await response.json()
            console.log("newsalesrecord", newSalesRecord)

            const cleared = {
                price: "",
                salesRep: "",
                customer: "",
                automobile: "",
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const customerUrl = 'http://localhost:8090/api/customers/';
        const repUrl = 'http://localhost:8090/api/salesreps/';
        
        const autoResponse = await fetch(autoUrl);
        const customerResponse = await fetch(customerUrl);
        const repResponse = await fetch(repUrl);


        if (autoResponse.ok && customerResponse.ok && repResponse.ok) {
        const autoData = await autoResponse.json();
        const customerData = await customerResponse.json();
        const repData = await repResponse.json();

        // autos is defined in inventory\api\inventory_rest\views.py
        this.setState({ automobiles: autoData.autos });
        this.setState({ customers: customerData.customers });
        this.setState({ salesReps: repData.sales_reps });
        
        
        console.log("data.automobiles", autoData.autos)
        console.log("data.customers", customerData.customers)
        // console.log("data", data)
        // salesReps should match constructor
        // we're setting the state to salesReps
        console.log("------ data.sales_reps ---------", repData.sales_reps)
        }
    } 


    
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
                        <h1>Record a New Sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-new-sales-record-form">

                            <div className="mb-3">
                                <select onChange={this.handleChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                    <option value="">Choose an automobile</option>
                                    we assume this.state.automobile is an array
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.vin} value={automobile.vin}>
                                                {automobile.vin}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="mb-3">
                            {/* name matches sales_rep_employee_number = content["sales_rep"] from views.py */}
                                <select onChange={this.handleChange} value={this.state.salesRep} required name="sales_rep" id="sales_reps" className="form-select">
                                    <option value="">Choose a sales rep</option>
                                    {this.state.salesReps.map(salesRep => {
                                        return <option key={salesRep.id} value={salesRep.id}>{salesRep.name}</option>
                                    })}
                                </select>
                            </div>

                            <div className="mb-3">
                                <select onChange={this.handleChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return <option key={customer.id} value={customer.id}>{customer.name}</option>
                                    })}
                                </select>
                            </div>

                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                                <label htmlFor="price">Sales Price</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateSalesRecord;