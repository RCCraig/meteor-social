AccountsTemplates.configure({
  postSignUpHook: (userId, info) => {
    let fullName = `${info.profile.firstName} ${info.profile.lastName}`;
    let dob      = new Date(info.profile.yearOfBirth, info.profile.monthOfBirth - 1, info.profile.dayOfBirth);
    let user     = Meteor.users.findOne({ _id: userId });
    
    Meteor.users.update({ _id: userId }, {
      $set: {
        "profile.birthday": dob,
        "profile.fullName": fullName,
        "profile.meta.primaryEmail": user.emails[0].address
      }
    });
  }
});
