function ManuList(props) {

    return (
        <> 
    <table className="table table-striped">
        <thead>
        <tr>
            <th>Manufacturers</th>
        </tr>
        </thead>
        <tbody>
        {props.manufacturers ? props.manufacturers.map(manu => {
            return (
            <tr key={manu.id}>
                <td>{ manu.name }</td>
            </tr>
            );
        }):null}
        </tbody>
    </table>
        </> 
    );
};

export default ManuList;
//ternary needed to get rid of undefined error due to delay loading props