Meteor.publish("messages", function () {
    return Messages.find({}, {fields: {text: 1, email: 1, username: 1, createdAt: 1}});
});

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});