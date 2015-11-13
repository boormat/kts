/*global Races */

Meteor.startup(function(){
  // Create a demo user
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({'username': 'lccc', 'password': 'lccc'});
    Accounts.createUser({'username': 'admin', 'password': 'lcccadmin111'});
  }
  
    // Create a demo race
  if (Races.find().count() === 0) {
    Races.insert({'name': 'khana1', 'tests': 5, entrants:[{number:'1', name:'mat', group:''}] });
  }

});