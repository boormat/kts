/*global React ReactMeteorData */
//"use strict";


Stage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData: function () {
        const stage = this.props.params.stageId;
        const raceId = this.props.params.raceId;
        //debugger
        var selector = {raceId:raceId, stage:stage};

//        var handle = Meteor.subscribe('scores', selector);
// Autopublish right?  Where is my scores?
        var scores = Scores.find(selector).fetch();

        var race = Races.findOne(raceId);
        // filter entrants who have run already...

        var queue = [];
        race && race.entrants && race.entrants.forEach(function (e) {
            if ( ! Scores.find( { raceId:raceId, stage:stage, car:e.car}).count() )
                queue.push(e);
        });

        //debugger
        return { scores:scores , entrants:queue}
    },

    addScore: function (car, time, flags) {
        console.log('addScore time');
        const stage = this.props.params.stageId;
        const raceId = this.props.params.raceId;
        Meteor.call('addScore', raceId, stage, car, time, flags);
    },

    render : function(){
        //debugger
        return (
            <StageTable
                scores={this.data.scores}
                entrants={this.data.entrants}
                addScore={this.addScore} />
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
                <ScoreForm entrants={this.props.entrants} addScore={this.props.addScore} />
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
    // OnClick callback will pass the car as argument.
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        car: React.PropTypes.string.isRequired,
        name: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            car: '',
            name: '',
            onClick: ()=>{},
        }
    },

    // note whitespace is eaten by css somehow (extra spaces are size 0)
    render() {
        // (car, name)
        const car = this.props.car;
        const name = this.props.name;
        return (
            // no inverse in bootstrap
            <span  key={car} className="label label-default"
            onClick={this.props.onClick.bind(null,car)}>
                {car} {name}
            </span>
        );
    },
});

