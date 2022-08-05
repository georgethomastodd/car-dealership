import React from "react";

function handleDate(appt){
    let date = new Date (appt.appt_datetime)
    return (date.getMonth()+1 + '-'+date.getDate() + "-" + date.getFullYear())
}

function handleTime(appt){
    let time = new Date (appt.appt_datetime)
    return (time.toLocaleTimeString())
}

class ApptList extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        appointments: [],
    }

    this.deleteAppt = this.deleteAppt.bind(this);
}

async componentDidMount() {
    const response = await fetch('http://localhost:8080/api/appts/')
    if (response.ok) {
    const data = await response.json()
    this.setState({ appointments: data.appointments })
    }
}

async deleteAppt(appt) {
    const deleteUrl = `http://localhost:8080/api/appts/${appt.id}`
    const fetchConfig = {
    method: "delete"
    }
    await fetch(deleteUrl, fetchConfig)

    const idx = this.state.appointments.indexOf(appt)
    const updated_appointments = [...this.state.appointments]
    updated_appointments.splice(idx, 1)
    this.setState({ appointments: updated_appointments })
}

async finishAppt(appt) {
    const editUrl = `http://localhost:8080/api/appts/${appt.id}/`
    const fetchConfig = {
        method: "put",
        body: JSON.stringify({"completed":"True"}),
        headers: {
        'Content-Type': 'application/json',
        },
    }
    await fetch(editUrl, fetchConfig)

    const idx = this.state.appointments.indexOf(appt)
    const updated_appointments = [...this.state.appointments]
    updated_appointments.splice(idx, 1)
    this.setState({ appointments: updated_appointments })

}


render() {




    return (
    
    <> 
    <table className="table table-striped">
    <thead>
        <tr>
        <th>Vin</th>
        <th>Customer Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Technician</th>
        <th>Reason</th>
        <th>VIP</th>
        </tr>
    </thead>
    <tbody>
        {this.state.appointments.map(appt => {
            return (
                (appt.completed===false) ?
                    <tr key={appt.id}>
                        <td>{ appt.vin }</td>
                        <td>{ appt.owner }</td>
                        <td>{ handleDate(appt) }</td>
                        <td>{ handleTime(appt) }</td>
                        <td>{ appt.technician.name }</td>
                        <td>{ appt.reason }</td>
                        <td>{ String(appt.vip) }</td>
                        <td><button className="btn btn-danger" onClick={() => this.deleteAppt(appt)}>Cancel</button></td>
                        <td><button className="btn btn-success" onClick={() => this.finishAppt(appt)}>Finished</button></td>
                        
                    </tr>
                    : null
            )
        })}
    </tbody>
    </table>
    </> 
    )
}
}

export default ApptList




