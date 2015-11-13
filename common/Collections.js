/*global RaceCollection ScoresCollection ItemsCollection */

<<<<<<< Updated upstream
ItemsCollection = new Mongo.Collection("Items");

ScoresCollection = new Mongo.Collection("Scores");
/* id_ : automatic
=======

Items = new Mongo.Collection("Itemsdb");

Scores = new Mongo.Collection("Scoresdb");
/* id_ : automatic
   race_id: id of race
>>>>>>> Stashed changes
   stage : stage/test number
   car : car number, = Entrant.id_ for lookup of name. (or not bother, and make it a single doc???)
   rawtime : raw time taken OR DNF/DNS/WD  as appropriate
   time : score with penalties.
   flags : # flags/cones hit  5X count
   gates : Garage penalties.  String? anything = 10 sec?
*/

<<<<<<< Updated upstream
RaceCollection = new Meteor.Collection("Races");
/*
  entrants : [{number, name, group, }]
  tests : number of tests.
=======
Races = new Meteor.Collection("Races");
/*
  entrants : [{number, name, group, }]
  tests : number of tests.id_:
>>>>>>> Stashed changes
*/



// Helper to genate a enumeration object from a list of names.
// Freezes object to help avoid aliasing errors.
function MakeEnum(names){
	var anum = _.object(names, names);
	return Object.freeze(anum);
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
SSCode = MakeEnum([	
                "WD", 
                "DNS",
                "DNF"]);

<<<<<<< Updated upstream
=======



Meteor.methods({
    addScore: function(raceId, stage, car, time , flags)
    {
		// avg time
		var t = this.time;
		t = Math.round(t * 100) / 100; // round to 100ths (So always consistent)
		console.log("onScoreSave", raceId, stage, car, time , flags);
        var now = Date.now();
        // Hmmm could use a Natural Key,
        // or search by IDs?
        Scores.upsert({
        	raceId:raceId,
        	stage:stage,
        	car:car,
        }, { $set: {
                time:time,
        		flags:flags,
        		when: now,
        	}
        });
    }
})
>>>>>>> Stashed changes
