
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.helpers({         //used to pass data into template

  tasks() {
    return Tasks.find({}, {sort: {createdAt: -1 } });
  },

});

Template.body.events({      //watch of any of the events in whole body tag

  'submit .new-task'(event) {     //key value pair of event
                                  //{submit: value Entered in form}
    event.preventDefault();       //prevents default browser form submit??

    const text = event.target.text.value;   //get value from form - event

    Tasks.insert({                  //insert into collection
      text,
      createdAt: new Date(),
    });

    // console.log(event);            // see the values available in event

    event.target.text.value = '';       //clear form
  },


});