import React from 'react'

class AutoForm extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    vin: '',
    color: '',
    year: '',
    model: '',
    models: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

async handleSubmit(event) {
    event.preventDefault()
    const data = { ...this.state }
    data.model_id = data.model
    delete data.model
    delete data.models
    console.log(data)

    const autoUrl = '	http://localhost:8100/api/automobiles/'
    const fetchConfig = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    },
    }
    const response = await fetch(autoUrl, fetchConfig)
    if (response.ok) {
    const newAuto = await response.json()
    console.log(newAuto)

    window.location.reload()
    //needed to clear year state

    const cleared = {
        vin: '',
        color: '',
        year: '',
        model: '',
        models: []
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
    const url = 'http://localhost:8100/api/models/'

    const response = await fetch(url)

    if (response.ok) {
    const data = await response.json()
    this.setState({ models: data.models })
    }
}

render() {
    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add Automobile</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleChange} placeholder="vin" required type="text" id="vin" name="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
                <input value={this.state.color} onChange={this.handleChange} placeholder="color" required type="text" id="color" name="color" className="form-control" />
                <label htmlFor="color">Color</label>
            </div>
            <div value={this.state.year} onChange={this.handleChange} className="form-floating mb-3">
                <input placeholder="year" required type="text" id="year" name="year" className="form-control" />
                <label htmlFor="year">Year</label>
            </div>
            <div className="mb-3">
                <select value={this.state.model} onChange={this.handleChange} required id="model" name="model" className="form-select">
                <option value="">Choose a model</option>
                {this.state.models.map(model => {
                    return (
                    <option key={model.id} value={model.id}>
                        {model.name}
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

export default AutoForm