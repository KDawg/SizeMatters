SM.collection.UserInfo = Backbone.Collection.extend({

	model: SM.model.UserInfo,

	url: 'https://api.twitter.com/1/users/lookup.json'

});