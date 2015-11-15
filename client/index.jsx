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
          <ResultTest/>
        </div>
      </div>
    );
  }
});
