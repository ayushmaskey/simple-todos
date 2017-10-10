
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({        //watch for event in task template only

  'click .toggled-checked'() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },

  'click .delete'() {
    Tasks.remove(this._id);
  },

});