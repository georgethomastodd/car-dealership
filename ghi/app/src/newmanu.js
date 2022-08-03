import React from 'react'

class ManuForm extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

async handleSubmit(event) {
    event.preventDefault()
    const data = { ...this.state }
    console.log(data)

    const conferenceUrl = 'http://localhost:8100/api/manufacturers/'
    const fetchConfig = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    },
    }
    const response = await fetch(conferenceUrl, fetchConfig)
    if (response.ok) {
    const newManu = await response.json()
    console.log(newManu)

    // window.location.reload()
    //needed to clear date/time

    const cleared = {
        name: ''
    }
    this.setState(cleared)
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
            <h1>Add a manufacturer</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleChange} placeholder="name" required type="text" id="name" name="name" className="form-control" />
                <label htmlFor="name">Manufacturer Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
    )
}
}

export default ManuForm