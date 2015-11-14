/*global React ReactMeteorData */
//"use strict";


Stage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData: function () {
        const stage = this.props.params.stageId;
        const raceId = this.props.params.raceId;
        //debugger
        var selector = {raceId:raceId, stage:stage};
        selector = {}
//        var handle = Meteor.subscribe('scores', selector);
// Autopublish right?  Where is my scores?
        var scores = Scores.find(selector).fetch();
        //debugger
        return { scores:scores }
    },

    render : function(){
        //debugger
        return (
            <StageTable  scores={this.data.scores} />
        )
    }
});

StageTest = React.createClass({
    testitems:
        [ {
            _id: 'meh',
            raceId: 'xxxxraceid',
            stage: 1,
            car: '1',
            name:'bill',
            time: 1.1,
            flags: 0,
        }, {
            _id: 'meh2',
            raceId: 'xxxxraceid',
            stage: 1,
            car: '2',
            name:'bob',
            time: 1.2,
            flags: 1,
        }, {
            _id: 'meh3',
            raceId: 'xxxxraceid',
            stage: 1,
            car: '3',
            time: 'WD',
            flags: 2,
        }, ] ,

    render : function(){
        return (
            <StageTable scores={this.testitems} />
        )
    }
});

StageTable = React.createClass({


    render: function () {
        // So this should probably be a component!
        // the stage is the edit fields, that can probably
        // live at this level OK.
        // on submit of the form does Meteor change...
        // other components have subscription that changes
        return (
            <div className="row">
                <ScoreForm />
                Finished {this.props.scores.length} of ?
                <table className=".table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>car</th>
                            <th>time</th>
                            <th>flags</th>
                            <th>edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.scores.map( (it) => {
                            return (
                                <StageResultRow
                                    key={it.car}
                                    car={it.car}
                                    name={it.name}
                                    time={it.time}
                                    flags={it.flags}
                                />);
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    },
});


StageResultRow = React.createClass({
    render : function(){
        return (
            <tr>
                <td><a><i className="icon-wrench edit"></i></a></td>
                <td><EntrantLabel car={this.props.car} name={this.props.name} /></td>
                <td>{this.props.time}</td>
                <td>{this.props.flags}F</td>
            </tr>
        )
    },
});

EntrantLabel = React.createClass({
    // not sure if this should take an entrant, or just the 2 fields.
    // a bit overkill of course.
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        car: React.PropTypes.string.isRequired,
        name: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            car: '',
            name: ''
        }
    },

    // note whitespace is eaten by css somehow (extra spaces are size 0)
    render() {
        // (car, name)
        const car = this.props.car;
        const name = this.props.name;
        return (
            // no inverse in bootstrap
            <div key={car}>
                <span className="label label-default">
                    {car} {name}
                </span>
            </div>
        );
    },
});


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
              value="WD"
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
