UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['profile.firstName', 'profile.lastName'],
  engine: new EasySearch.MongoDB({
    selector: function (searchObject, options, aggregation) {
      let selector = this
        .defaultConfiguration()
        .selector(searchObject, options, aggregation);
      let userFilter = {};
      
      /**
       * Add a new property to our selector to check the _id of the document 
       * to not match the currently logged-in user's id
       */
      userFilter.$ne = options.search.userId;
      selector._id   = userFilter;
      
      return selector;
    }
  })
});
