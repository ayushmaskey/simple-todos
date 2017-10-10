
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import './body.html';

Template.body.helpers({
  tasks() {
    return Tasks.find({}, {sort: {createdAt: -1 } });
  },
});

Template.body.events({

  //key value pair of event {submit: value Entered in form}
  'submit .new-task'(event) {
    //prevents default browser form submit??
    event.preventDefault();

    //get value from form - event
    const text = event.target.text.value;

    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    // console.log(event); // see the values available in event

    //clear form
    event.target.text.value = '';
  }
})