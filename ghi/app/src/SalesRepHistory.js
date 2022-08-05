import React from "react";

class SalesByRep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales_reps: [],
            sales_records: [],
        };

        this.handleSalesRepsChange = this.handleSalesRepsChange.bind(this);
        this.handleSalesRecordsChange = this.handleSalesRecordsChange.bind(this);
    }

    async componentDidMount() {
        const salesRecordUrl = 'http://localhost:8090/api/salesrecord/';
        const repUrl = 'http://localhost:8090/api/salesreps/';

        const salesResponse = await fetch(salesRecordUrl);
        const repResponse = await fetch(repUrl);


        if (salesResponse.ok && repResponse.ok) {
            const salesData = await salesResponse.json();
            const repData = await repResponse.json();

            // get all of the records for both the sales_reps and sales_records
            this.setState({ sales_records: salesData.all_sales_records });
            this.setState({ sales_reps: repData.sales_reps });


            console.log("$$$$$$$$$ data.sales_records $$$$$$$$$$$$", salesData.all_sales_records)
            console.log("------ data.sales_reps ---------", repData.sales_reps)
        }
    }

    async handleSalesRepsChange(event) {
        const value = event.target.value;
        this.setState({ sales_rep: value })
        const response = await fetch('http://localhost:8090/api/salesrecord/')

        if (response.ok) {
            const data = await response.json()
            let filtered = data.all_sales_records.filter(employee => value == employee.sales_rep.id)
            this.setState({sales_records: filtered})
        }
    }

    handleSalesRecordsChange(event) {
        const value = event.target.value;
        this.setState({ sales_records: value })
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="shadow p-4 mt-4">
                        <h1>Sales History by Representative</h1>

                        <div className="form-floating mb-3">
                            <select onChange={this.handleSalesRepsChange} value={this.state.sales_rep} required name="sales_rep" id="sales_rep" className="form-select">
                                <option value="">Select a sales representative</option>
                                {this.state.sales_reps.map(employee => {
                                    return (
                                        <option key={employee.id} value={employee.id}>{employee.name}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Sales Representative</th>
                                    <th>Customer</th>
                                    <th>Automobile VIN</th>
                                    <th>Sales Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sales_records.map(sale => {
                                    return (
                                        <tr key={sale.id}>
                                            <td>{sale.sales_rep.name}</td>
                                            <td>{sale.customer}</td>
                                            <td>{sale.automobile.vin}</td>
                                            <td>${sale.price}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default SalesByRep;