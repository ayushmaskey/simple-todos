
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({         //used to pass data into template

  tasks() {
    const instance = Template.instance();

    if (instance.state.get('hideCompleted')) {
      return Tasks.find( { checked: { $ne: true}} , {sort: { createdAt: -1 }});
    }
    return Tasks.find({}, {sort: {createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find( { checked: { $ne: true} }).count();
  },

});

Template.body.events({      //watch of any of the events in whole body tag

  'submit .new-task'(event) {     //key value pair of event
                                  //{submit: value Entered in form}
    event.preventDefault();       //prevents default browser form submit??

    const text = event.target.text.value;   //get value from form - event

    // Tasks.insert({                  //insert into collection
    //   text,
    //   createdAt: new Date(),
    //   owner: Meteor.userId(),
    //   username: Meteor.user().username,
    // });

    //Tasks.insert (above) replaced by tasks.insert (below) after adding Meteor method in api/tasks.js - make sure right user is inserting and deleting todos
    Meteor.call('tasks.insert', text);

    // console.log(event);            // see the values available in event

    event.target.text.value = '';       //clear form
  },

  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },


});