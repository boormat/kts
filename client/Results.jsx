/*global React ReactMeteorData */



Results = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData: function () {
        const raceId = this.props.params.raceId;
        //debugger
        var selector = {
            raceId: raceId
        };

        //        var handle = Meteor.subscribe('scores', selector);
        // Autopublish right?  Where is my scores?
        var scores = Scores.find(selector).fetch();
        var race = Races.findOne(raceId);

        // Calculate results Here?
        // As is client side, is OK to create the Local collection, and
        // maintain it here (more sensible than trying to incrementally
        // maintain it I guess.)
        return {
            scores: scores,
            race: race
        }
    },

    render: function () {
        //debugger
        return (
            <ResultTable
                scores={this.data.scores}
                race={this.data.race}
                />
        )
    }
});

ResultTest = React.createClass({
    testitems: {
        _id: 'xxxxraceid',
        name: 'dogs Khana',
        tests: [1, 2, 3, 4, 5],
        entrants: [{
            name: 'bill',
            car: '1',
            group: '',
            overall: {
                time: 7.3,
                pos: 1
            },
            scores: [{
                time: '1.1',
                flags: 0,
                cumulative: 1.1,
                pos: '=1'
            }, {
                time: '1.2',
                flags: 1,
                cumulative: 6.3,
                pos: '2'
            }, {
                time: '1.0',
                flags: 0,
                cumulative: 7.3,
                pos: '1'
            }, ]
        }, {
            name: 'ben',
            car: '2',
            group: '',
            overall: {
                time: 13.1,
                pos: 2
            },
            scores: [{
                time: '1.1',
                flags: 0,
                cumulative: 1.1,
                pos: '=1'
            }, {
                time: '1.0',
                flags: 0,
                cumulative: 2.1,
                pos: '1'
            }, {
                time: '1.0',
                flags: 2,
                cumulative: 13.1,
                pos: '2'
            }, ]
        }, {
            name: 'silly',
            car: '3',
            group: '',
            overall: {
                time: 13.1,
                pos: 3
            },
            scores: [{
                time: 'WD',
                flags: 0,
                cumulative: 1.1,
                pos: '3'
            }, {
                time: '1.0',
                flags: 0,
                cumulative: 2.1,
                pos: '3'
            }, {
                time: '1.0',
                flags: 2,
                cumulative: 13.1,
                pos: '3'
            }, ]
        }, ]
    },

    render: function () {
        return (
            <ResultTable results={this.testitems} />
        )
    }
});

ResultTable = React.createClass({
    render: function () {
        // So this should probably be a component!
        // the stage is the edit fields, that can probably
        // live at this level OK.
        // on submit of the form does Meteor change...
        // other components have subscription that changes
        return (
            <div className="row">
                <table className=".table-striped">
                    <thead>
                        <tr>
                            <th align="left">car</th>
                            { this.props.results.tests.map( (it,i) => {
                                return [<th  key={i}>Test{i+1}</th>,
                                    <th align="left">flags</th>,
                                    <th align="left">pos</th>,
                                ] } ) }
                            <th align="left">pos</th>
                            <th align="left">time</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.results.entrants.map( (it,i) => {
                            return (<ResultRow key={i} {...it} />) } ) }
                    </tbody>
                </table>
            </div>
        );
    },
});



ResultRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td><EntrantLabel car={this.props.car} name={this.props.name} /></td>
                { this.props.scores.map( (it,i) => {
                    return [
                        <td>{it.time}</td>,
                        <td>{it.flags}F</td>,
                        <td>{it.pos}</td>,
                        ]
                         } ) }
                <td>{this.props.overall.time}</td>
                <td>{this.props.overall.pos}</td>
            </tr>
        )
    },
});
