Index = React.createClass({
  getInitialState: function() {
    return {};
  },
  click: function(a) {
    console.log('You clicked', a);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <ScoreForm/>
          <EntrantLabel car='1' name='bill'/>
          <EntrantLabel car='2' name='ben'/>
          <EntrantLabel car='3'  onClick={ e =>{console.log('clicky', e)}} />
          <EntrantLabel name='numberless'  onClick={this.click}/>
          <StageTest />
        </div>
      </div>
    );
  }
});
