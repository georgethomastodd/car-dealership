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
            // console.log("newsalesrecord", newSalesRecord)

            window.location.reload()

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
        const salesRecordsUrl = 'http://localhost:8090/api/salesrecord/';
        
        const autoResponse = await fetch(autoUrl);
        const customerResponse = await fetch(customerUrl);
        const repResponse = await fetch(repUrl);
        const salesRecordsResponse = await fetch(salesRecordsUrl)

        if (autoResponse.ok && customerResponse.ok && repResponse.ok && salesRecordsResponse.ok) {
        const autoData = await autoResponse.json();
        const customerData = await customerResponse.json();
        const repData = await repResponse.json();
        const salesRecordsData = await salesRecordsResponse.json();

        // autos is defined in inventory\api\inventory_rest\views.py
        // get all the automobiles
        this.setState({ automobiles: autoData.autos });
        this.setState({ customers: customerData.customers });
        this.setState({ salesReps: repData.sales_reps });

        const auto_vin_only = []
        
        for (let auto of autoData.autos){
            // we specifically want to find the vin
            // auto.vin has a list of all autos sold or not sold
            auto_vin_only.push(auto.vin)
        }

        console.log("!!!!!!!!!!!!! vin only", auto_vin_only)

        const sales_records_vins = []

        for (let sale of salesRecordsData.all_sales_records){
            sales_records_vins.push(sale.automobile.vin)
        }
        
        console.log("%%%%%%%%%%%%%%%%%%%%%", sales_records_vins)

        // list of vins only
        const unsold_autos_lst = []
        for (let vin of auto_vin_only){
            if (!sales_records_vins.includes(vin)){
                unsold_autos_lst.push(vin)
            }
        }

        // we want to get the actual objects not just the vin
        const result_list = []
        for (let auto of autoData.autos){
            if (unsold_autos_lst.includes(auto.vin)){
                result_list.push(auto)
            }
        }

        this.setState({ automobiles: result_list });

        // console.log("data.automobiles", autoData.autos)
        // console.log("data.customers", customerData.customers)
        // salesReps should match constructor
        // we're setting the state to salesReps
        // console.log("------ data.sales_reps ---------", repData.sales_reps)
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
                                    {/* we assume this.state.automobile is an array */}
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