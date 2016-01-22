Meteor.publish("messages", function () {
    return Messages.find();
});

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});