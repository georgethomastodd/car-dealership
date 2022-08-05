import React from "react";

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales_records: [] 
        };
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8090/api/salesrecord/')
        if (response.ok) {
            const data = await response.json()
            // console.log("!!!!!!!!!!!!!!!!!!!!", data)
            this.setState({ sales_records: data.all_sales_records });
        }
    }

    render() {
        return (
            <>
                <h1>List of All Sales</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Representative</th>
                            <th>Employee Number</th>
                            <th>Customer</th>
                            <th>Automobile VIN</th>
                            <th>Sales Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* ternary below: if this.state.sales_records exists then it shows everything that follows after the question mark up to the colon. and if it doesn't exist, it shows null (nothing) */}
                        {this.state.sales_records ? this.state.sales_records.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_rep.name}</td>
                                    <td>{sale.sales_rep.employee_number}</td>
                                    <td>{sale.customer}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            );
                        }):null}
                    </tbody>
                </table>
            </>
        )
    }
}

export default SalesList;