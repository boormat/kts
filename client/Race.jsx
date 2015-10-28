const {
  Link,
} = ReactRouter;

Race = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function () {

    //var disctinctValues = _.pluck(distinctArray, 'foo');
    // let tlist = Array(this.data.race.tests).fill(1);;
    return {
      race: RaceCollection.findOne({}) || {
        /* test data */
        _id:'xxx1', 
        name: 'dummy',
        tests: 3
      },
    };
  },
  getInitialState: function () {
    return {};
  },
  render: function () {
    const race = this.data.race;
    var createTest = function(el, i){
      let t = i + 1;
      let meh = "/stage/" + race._id + "/" + t;
      return <li key={t}><Link to={meh}>Test {t}</Link></li>;
    };
    const testarray = Array(this.data.race.tests).fill(1);
    return (
      <div className="row">
      tests
        <ul>
        {testarray.map(createTest)}
        </ul>
        
        <div className="col-xs-8 col-sm-6 col-md-4">
          <form onSubmit={this.addItem}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Item" ref="input"/>
            </div>
            <button className="btn btn-primary" type="submit">Add Item</button>
          </form>
        </div>
      </div>
    );
  }
});
