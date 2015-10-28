Stage = React.createClass({
    mixins: [ReactMeteorData],
    
    getMeteorData: function () {
        const stageId = this.props.params.stageId;
        const raceId = this.props.params.raceId;
        return {
            items:
            //ScoresCollection.find({stage:stageId}).fetch()
                [{
                _id: 'meh',
                stage: 1,
                car: 1,
                rawtime: 1.1,
                time: 1.1,
                flags: 0,
                gates: 0
            }]
        };
    },
    
    getInitialState: function () {
        return {};
    },
    
    //   addItem: function(e) {
    //     e.preventDefault();
    //     var item = React.findDOMNode(this.refs.input).value;

    //     ScoresCollection.insert({'content': item});
    //     React.findDOMNode(this.refs.input).value = "";
    //   },
    
    render: function () {
        
        var entrant = function(car, name){
            return (
                // no inverse in bootstrap
                <div key={car}>
                    <span className="label label-default">
                		{{car}}</span> 
                	<span className="number label label-default">
                        {{name}}</span>
                </div>
            )
        };

        var row = function (score, i) {
            // return <li key={item._id}>{item.stage}</li>;
		    return (
		        <tr key={i}>
            		<td><a><i className="icon-wrench edit"></i></a></td>
            		<td>{score.car}</td>
            		<td>get name</td>
            		<td><span className="number badge">{score.code}</span></td>
            		<td>{score.flags}</td>
            		<td>{score.code}</td>
        		</tr>
    		)
        };

        return (
            <div className="row"> 
                race={this.props.params.raceId}
                <form onSubmit={this.addItem}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Item" ref="input"/>
                    </div>
                    <button className="btn btn-primary" type="submit">Add Item</button>
                </form>
                <table className=".table-striped">
                    <tr>
                        <th>ID</th>
                        <th>car</th>
                        <th>class</th>
                        <th>cones</th>
                        <th>edit</th>
                    </tr>
                    <tr>
                        <td>?</td>
                        <td>1</td>
                        <td>class</td>
                        <td>cones</td>
                        <td>edit</td>
                    </tr>                    
                    {this.data.items.map(row)}
                </table>
            </div>
        );
    },
});
