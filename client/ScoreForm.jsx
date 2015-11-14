/*global React ReactMeteorData */

ScoreForm = React.createClass({
    // props = stage,
    getDefaultProps: function () {
        return {
            raceId: 'raceIdSadfsdf',
            stage: 1,
        }
    },

    getInitialState: function () {
        return {
            car: '',
            time: '',
            flags: 0,
        };
    },


    // Add action should probably propagate up.  Maybe?
    // or simply do it here :-)
    // Also add input if EDITING an existing score.  (assuming we
    // do that this way.)
    addScore: function (e) {
        e.preventDefault();
        // var num = React.findDOMNode(this.refs.number).value;
        // var time  = React.findDOMNode(this.refs.time).value;
        console.log('addScore time');
        Meteor.call('addScore', this.props.raceId, //'raceIdSadfsdf',
            this.props.stage, // stage number .. props
            this.state.car,
            this.state.time,
            this.state.flags);

        this.setState({
            car: '',
            time: '',
            flags: ''
        });
        this.myCarInput.focus();
    },

    setTime: function (val) {
        this.setState({
            time: val
        });
        this.myTimeInput.focus();
    },
    setTimeDone: function (val) {
        this.setState({
            time: val
        });
        this.myCarInput.focus();
    },

    // Add interaction callbacks here. e.g. a WD button that
    // just sets the rawscore to 'WD', etc.
    render() {
        return (
            <form onSubmit={this.addScore}>
            <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="Car"
                value={this.state.car}
                onChange={ e => this.setState({car: e.target.value}) }
                ref={  ref => this.myCarInput = ref }
            />

            <input type="text"
                className="form-control"
                placeholder="Time"
                value={this.state.time}
                onChange= { e => this.setTime(e.target.value) }
                ref={  ref => this.myTimeInput = ref }
            />

            <input
              type="button"
              value="X"
              className="btn btn-primary"
              onClick= { e => this.setTime('') }
            />
            <input
              type="button"
              value="Slowest time or double fastest, time whichever is the least, plus 5 penalty"
              className="btn btn-primary"
              onClick= { e => this.setTimeDone('WD') }
            />
            <input
              type="button"
              value="DNS"
              className="btn btn-primary"
              onClick={ e => this.setTimeDone('DNS')}
            />

            <input type="number"
                className="form-control"
                placeholder="flags"
                value={this.state.flags}
                onChange={ e => this.setState({flags: e.target.value}) }
                ref="flags"
                />
            </div>
            <button className="btn btn-primary"
                type="submit"
                disabled={this.state.time.length === 0 || this.state.car.length === 0 }
            >Add Item</button>
            </form>
        );
    },
});
