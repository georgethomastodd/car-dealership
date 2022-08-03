function AutoList(props) {
    console.log(props)

    return (
        <> 
        <h1>Automobile Inventory</h1>
    <table className="table table-striped">
        <thead>
        <tr>
            <th>Model</th>
            <th>Color</th>
            <th>Year</th>
            <th>Vin</th>
            <th>Model Year Picture</th>
        </tr>
        </thead>
        <tbody>
        {props.autos ? props.autos.map(auto => {
            return (
            <tr key={auto.id}>
                <td>{ auto.year}</td>
                <td>{ auto.model.name }</td> 
                <td>{ auto.color}</td>
                <td>{ auto.vin}</td>
                <td><img src ={auto.model.picture_url} width="300"/></td>
            </tr>
            );
        }):null}
        </tbody>
    </table>
        </> 
    );
};

export default AutoList;