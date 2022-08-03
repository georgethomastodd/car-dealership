import React from "react";

function handleDate(appt){
    let date = new Date (appt.appt_datetime)
    return (date.getMonth()+1 + '-'+date.getDate() + "-" + date.getFullYear())
}

function handleTime(appt){
    let time = new Date (appt.appt_datetime)
    return (time.toLocaleTimeString())
}


class VinList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
            vin : ""
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
        [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
    
        const byVinURL = `http://localhost:8080/api/byvin/${this.state.vin}/`
        const fetchConfig = {
        method: 'GET'
        }
        const response = await fetch(byVinURL, fetchConfig)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            this.setState({ 
                appointments: data.appointments,
                vin: ''
            })
            }
    }

    render(){
        let apptClass = "table table-striped d-none"
        if (this.state.appointments.length > 0){
            apptClass = "table table-striped"
        }

        return (
            <>
            <h1 className="mb-4 mt-4">Search by vin</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-floating mb-3">
                    <input placeholder="VIN#" type="text" className="form-control" id="vin" name="vin" value={this.state.vin} onChange={this.handleChange} />
                    <label htmlFor="vinsearch">Enter Vin Here</label>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>
            <table className={apptClass}>
                <thead>
                    <tr>
                    <th>Vin</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>VIP</th>
                    <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.appointments.map(appt => {
                    return (
                        <tr key={appt.id}>
                        <td>{ appt.vin }</td>
                        <td>{ appt.owner }</td>
                        <td>{ handleDate(appt) }</td>
                        <td>{ handleTime(appt) }</td>
                        <td>{ appt.technician.name }</td>
                        <td>{ appt.reason }</td>
                        <td>{ String(appt.vip) }</td>
                        <td>{ String(appt.completed) }</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
            </>
        )
}
}




// render() {
//     return (
//     <> 
//     <table className="table table-striped">
//     <thead>
//         <tr>
//         <th>Vin</th>
//         <th>Customer Name</th>
//         <th>Date</th>
//         <th>Time</th>
//         <th>Technician</th>
//         <th>Reason</th>
//         <th>VIP</th>
//         </tr>
//     </thead>
//     <tbody>
//         {this.state.appointments.map(appt => {
//         return (
//             <tr key={appt.id}>
//             <td>{ appt.vin.vin }</td>
//             <td>{ appt.owner }</td>
//             <td>{ handleDate(appt) }</td>
//             <td>{ handleTime(appt) }</td>
//             <td>{ appt.technician.name }</td>
//             <td>{ appt.reason }</td>
//             <td>{ appt.vip }</td>
//             <td><button className="btn btn-danger" onClick={() => this.deleteAppt(appt)}>Cancel</button></td>
//             </tr>
//         );
//         })}
//     </tbody>
//     </table>
//     </> 
//     )
// }

/* <td>
{(appt.completed === true) ? <td>Completed</td>
:<td><button className="btn btn-success" onClick={() => this.finishAppt(appt)}>Finished</button></td>}
</td> */


export default VinList