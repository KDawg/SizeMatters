SM.view.Application = Backbone.View.extend({

	el: 'body',

	initialize: function() {

	},

	events: {
		'click #name-header': 'onNameSort',
		'click #follower-header': 'onFollowerSort',
		'click #friend-header': 'onFriendSort',
		'click #tweet-header': 'onTweetSort',
		'click #location-header': 'onLocationSort'
	},

	onNameSort: function() {
		alert('sort list by name');
	},

	onFollowerSort: function() {
		alert('sort list by follower');
	},

	onFriendSort: function() {
		alert('sort list by friend');
	},

	onTweetSort: function() {
		alert('sort list by tweet');
	},

	onLocationSort: function() {
		alert('sort list by location');
	}

});