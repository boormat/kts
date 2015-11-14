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

