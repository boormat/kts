Index = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <ScoreForm/>
          <EntrantLabel car='1' name='bill'/>
          <EntrantLabel car='2' name='ben'/>
          <EntrantLabel car='3'/>
          <EntrantLabel name='numberless'/>
          <StageTest />
        </div>
      </div>
    );
  }
});
