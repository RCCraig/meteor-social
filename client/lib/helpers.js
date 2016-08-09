/** Require moment helper library */
const moment = require('moment');

/** Better display of dates, with hours and minutes */
Template.registerHelper('statusDate', (date) => {
  return date ? moment(date).format('DD MMM YYYY@HH:mm') : '';
});

/**
 * Check the status of the relationship, if a request was sent or received, or
 * if a friendship already exists
 */
Template.registerHelper('checkRelationshipStatus', (type, id) => {
  switch (type) {
    case 'requestSent':
      return !!Requests.findOne({ requesterId: Meteor.userId(), targetId: id });
    case 'requestReceived':
      return !!Requests.findOne({ requesterId: id, targetId: Meteor.userId() });
    case 'alreadyFriends':
      return !!Friendships.findOne({ friendship: { $in: [id] } });
    default:
      console.log("Something went wrong");
      break;
  }
});

/** Get the parent template data of a child template */
Template.registerHelper('parentData', () => {
  return Template.parentData(2);
});
