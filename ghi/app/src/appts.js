import React from "react";

class ApptList extends React.Component {
constructor(props) {
    super(props)
    this.state = {appts: []}

    this.deleteAppt = this.deleteAppt.bind(this);
}

async componentDidMount() {
    const response = await fetch('http://localhost:8080/api/appts/')
    if (response.ok) {
    const data = await response.json()
    this.setState({ appts: data.hats })
    }
}

async deleteAppt(appt) {
    const deleteUrl = `http://localhost:8080/api/appts/${appt.id}`
    const fetchConfig = {
    method: "delete"
    }
    await fetch(deleteUrl, fetchConfig)

    const idx = this.state.appts.indexOf(appt)
    const updated_appts = [...this.state.appts]
    updated_appts.splice(idx, 1)
    this.setState({ appts: updated_appts })
}

render() {
    return (
    <> 
    <table className="table table-striped">
    <thead>
        <tr>
        <th>Vin</th>
        <th>Customer Name</th>
        <th>Date/Time</th>
        <th>Technician</th>
        <th>Reason</th>
        <th>VIP</th>
        </tr>
    </thead>
    <tbody>
        {this.state.appts.map(appt => {
        return (
            <tr key={appt.id}>
            <td>{ appt.vin }</td>
            <td>{ appt.owner }</td>
            <td>{ appt.datetime }</td>
            <td>{ appt.technician.name }</td>
            <td>{ appt.reason }</td>
            <td>{ appt.vip }</td>
            <td><button className="btn btn-danger" onClick={() => this.deleteAppt(appt)}>Cancel</button></td>
            </tr>
        );
        })}
    </tbody>
    </table>
    </> 
    )
}
}

export default ApptList