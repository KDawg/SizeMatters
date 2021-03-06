SM.collection.Friends = Backbone.Collection.extend({

	// SEE: https://dev.twitter.com/docs/api/1/get/friends/ids

	url: 'https://api.twitter.com/1/friends/ids.json',

	parse: function(response) {
		var allUserModels = [];
		var aUser;

		response.ids.forEach(function(value, index, all) {
			aUser = new Backbone.Model({
				uid: value
			});
			allUserModels.push(aUser);
		});

		return allUserModels;
	}

});