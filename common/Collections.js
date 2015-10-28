/*global RaceCollection ScoresCollection ItemsCollection */

ItemsCollection = new Mongo.Collection("Items");

ScoresCollection = new Mongo.Collection("Scores");
/* id_ : automatic
   stage : stage/test number
   car : car number, = Entrant.id_ for lookup of name. (or not bother, and make it a single doc???)
   rawtime : raw time taken OR DNF/DNS/WD  as appropriate
   time : score with penalties.
   flags : # flags/cones hit  5X count
   gates : Garage penalties.  String? anything = 10 sec?
*/

RaceCollection = new Meteor.Collection("Races");
/*
  entrants : [{number, name, group, }]
  tests : number of tests.
*/



// Helper to genate a enumeration object from a list of names.
// Freezes object to help avoid aliasing errors.
function MakeEnum(names){
	var anum = _.object(names, names);
	return Object.freeze(anum);
}

SSCode = MakeEnum([	
                "WD", 
                "DNS",
                "DNF"]);

