Template.listComments.helpers({
  /** Get all comments associated with a status in descending order */
  'comments' (statusId) {
    return Comments.find({ statusId }, { sort: { createdAt: -1 } });
  },
  
  /**
   * Check to see if the logged-in user is the owner of a comment, or the 
   * owner of the status
   */
  'isOwnerOfCommentOrStatus' (statusOwner) {
    return this.owner === Meteor.userId() || statusOwner === Meteor.userId() ? true : false;
  }
});

Template.listComments.events({
  /** Call a method to remove a comment and pass the comment id */
  'click button[data-action="removeComment"]' () {
    Meteor.call('comments.remove', this._id);
  }
});
