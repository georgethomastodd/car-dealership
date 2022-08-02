import React from 'react'

class ApptForm extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    vin: '',
    owner: '',
    appt_datetime: '',
    reason: '',
    technicians: [],
    technician: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

async handleSubmit(event) {
    event.preventDefault()
    const data = { ...this.state }
    delete data.technicians
    console.log(data)

    const conferenceUrl = 'http://localhost:8080/api/appts/'
    const fetchConfig = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    },
    }
    const response = await fetch(conferenceUrl, fetchConfig)
    if (response.ok) {
    const newAppt = await response.json()
    console.log(newAppt)

    window.location.reload()
    //needed to clear date/time

    const cleared = {
        vin: '',
        owner: '',
        appt_datetime: '',
        reason: '',
        technician: ""
    }
    this.setState(cleared)
    }
}

handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
}

async componentDidMount() {
    const url = 'http://localhost:8080/api/techs/'

    const response = await fetch(url)

    if (response.ok) {
    const data = await response.json()
    this.setState({ technicians: data.technicians })
    }
}

render() {
    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a new appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleChange} placeholder="vin" required type="text" id="vin" name="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
                <input value={this.state.owner} onChange={this.handleChange} placeholder="owner" required type="text" id="owner" name="owner" className="form-control" />
                <label htmlFor="owner">Owner's Name</label>
            </div>
            <div value={this.state.appt_datetime} onChange={this.handleChange} className="form-floating mb-3">
                <input placeholder="Date/Time" required type="datetime-local" id="appt_datetime" name="appt_datetime" className="form-control" />
                <label htmlFor="apptdatetime">Appointment Date/Time</label>
            </div>
            <div className="mb-3">
                <textarea value={this.state.reason} onChange={this.handleChange} placeholder="reason" required id="reason" name="reason" className="form-control"></textarea>
            </div>
            <div className="mb-3">
                <select value={this.state.technician} onChange={this.handleChange} required id="technician" name="technician" className="form-select">
                <option value="">Choose a Technician</option>
                {this.state.technicians.map(technician => {
                    return (
                    <option key={technician.id} value={technician.name}>
                        {technician.name}
                    </option>
                    )
                })}
                </select>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
    )
}
}

export default ApptForm