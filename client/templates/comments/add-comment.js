Template.addComment.onCreated(function () {
  /** Initialize template reactive variable */ 
  this.commentError = new ReactiveVar(false);
});

Template.addComment.events({
  'submit form' (event, template) {
    event.preventDefault();
    let comment  = event.target.comment.value;
    let statusId = this._id;
    
    if (!_.isEmpty(comment)) {
      Meteor.call('comments.add', statusId, comment);
      event.target.comment.value = '';
      template.commentError.set(false);
    } else {
      template.commentError.set('The comment cannot be blank');
    }
  }
});

Template.addComment.helpers({
  'haveErrors' () {
    if (Template.instance().commentError.get()) {
      return Template.instance().commentError.get();
    }
  }
});
