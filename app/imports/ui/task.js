

import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});


Template.task.events({        //watch for event in task template only

  'click .toggled-checked'() {
    // Tasks.update(this._id, {
    //   $set: { checked: ! this.checked },
    // });
//Tasks.insert (above) replaced by tasks.insert (below) after adding Meteor method in api/tasks.js - make sure right user is inserting and deleting todos

    Meteor.call('tasks.setChecked', this._id, !this.checked);

  },

  'click .delete'() {
    // Tasks.remove(this._id);
    //Tasks.insert (above) replaced by tasks.insert (below) after adding Meteor method in api/tasks.js - make sure right user is inserting and deleting todos

    Meteor.call('tasks.remove', this._id);

  },

  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },

});