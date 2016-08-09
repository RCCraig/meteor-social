Template.findUsers.onCreated(function () {
  this.autorun(() => {
    this.subscribe('requests');
    this.subscribe('friendships');
  });
});

Template.findUsers.helpers({
  /** Return the search index */
  'usersIndex' () { return UsersIndex; },
  /** Add CSS classes to the search input field */
  'inputAttributes' () { return { 'class': 'form-control form-group' }; }
});

Template.findUsers.events({
  /**
   * Call a method to add a new request and send the id and full name of
   * the target user
   */
  'click button[data-action="requestFriendship"]' () {
    Meteor.call('requests.add', this.__originalId, this.profile.fullName);
  },
  
  /**
   * Call a method to remove a request sent by the logged-in user and 
   * pass the id of the target user
   */
  'click button[data-action="cancelFriendRequest"]' () {
    Meteor.call('requests.cancel', 'userHasSent', this.__originalId);
  },
  
  /**
   * Call a method to remove a request received by the logged-in user and 
   * pass the id of the requesting user
   */
  'click button[data-action="rejectRequest"]' () {
    Meteor.call('requests.cancel', 'userHasReceived', this.__originalId);
  },
  
  /**
   * Call a method to confirm a request receivd by the logged-in user and 
   * pass the id and full name of the requesting user
   */
  'click button[data-action="confirmFriendship"]' () {
    Meteor.call('requests.confirm', this.__originalId, this.profile.fullName);
  },
  
  /**
   * Call a method to cancel a friendship and send the id of the friend
   */
  'click button[data-action="cancelFriendship"]' () {
    Meteor.call('friendships.cancel', this.__originalId);
  }
});
