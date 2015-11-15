/*global React ReactMeteorData */

ScoreForm = React.createClass({
    // props = stage,
    getDefaultProps: function () {
        return {
            raceId: null,
            stage: null,
            entrants: [],
            addScore: null
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

        this.props.addScore && this.props.addScore(
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
        // no better place really... even it set.
        this.myCarInput.focus();
    },

    queueCarClick: function( car) {
    this.setState({car:car});
    this.myTimeInput.focus();
  },

    // Add interaction callbacks here. e.g. a WD button that
    // just sets the rawscore to 'WD', etc.
    render() {
        return (
            <form onSubmit={this.addScore}>
                { this.props.entrants.map( (it,i) => {
                    return ( <EntrantLabel
                            key={it.car}
                            car={it.car}
                            name={it.name}
                            onClick={this.queueCarClick}
                        />)
                    } )
                }

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
              value="Fail"
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
