import React from 'react'

class ModelForm extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        name: '',
        picture_url: '',
        manufacturers: [],
        manufacturer: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

async handleSubmit(event) {
    event.preventDefault()
    const data = { ...this.state }
    data.manufacturer_id = data.manufacturer
    delete data.manufacturer
    delete data.manufacturers
    console.log(data)

    const modelUrl = 'http://localhost:8100/api/models/'
    const fetchConfig = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    },
    }
    const response = await fetch(modelUrl, fetchConfig)
    if (response.ok) {
    const newModel = await response.json()
    console.log(newModel)

    // window.location.reload()
    //needed to clear date/time

    const cleared = {
        name: '',
        picture_url: '',
        manufacturer: ''
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
    const url = 'http://localhost:8100/api/manufacturers/'

    const response = await fetch(url)

    if (response.ok) {
    const data = await response.json()
    this.setState({ manufacturers: data.manufacturers })
    }
}

render() {
    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add a Model</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleChange} placeholder="name" required type="text" id="name" name="name" className="form-control" />
                <label htmlFor="name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
                <input value={this.state.picture_url} onChange={this.handleChange} placeholder="picture url" required type="url" id="picture_url" name="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
                <select value={this.state.manufacturer} onChange={this.handleChange} required id="manufacturer" name="manufacturer" className="form-select">
                <option value="">Choose a Manufacturer</option>
                {this.state.manufacturers.map(manufacturer => {
                    return (
                    <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
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

export default ModelForm