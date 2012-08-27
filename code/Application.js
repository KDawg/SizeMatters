// http://dryicons.com/free-icons/preview/coquette-icons-set/

var Application = (function($) {

	var appView;
	var myUserInfo;
	var friends, followers, userInfo;

	function initialize() {
		appView = new SM.view.Application();

		followersRead('312721846');
	}


	function timelineRead() {
		// SEE: https://dev.twitter.com/docs/api/1/get/statuses/home_timeline

		$.ajax({
			url: 'https://twitter.com/statuses/user_timeline/312721846.json',
			dataType: 'jsonp',
			type: 'get',
			success: function(data, textStatus, jqXHR) {
				console.log('user_timeline ajax success', arguments);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('user_timeline ajax error', arguments);
			}
		});
	}


	function followersRead(userId) {
		followers = new SM.collection.Followers();
		followers.fetch({
			data: {
				user_id: userId,
				stringify_ids: true,
				cursor: -1
			},
			dataType: 'jsonp',
			success: function(data, textStatus, jqXHR) {
				friendsRead('312721846')
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('followers ajax error', arguments);
			}
		});
	}


	function friendsRead(userId) {
		friends = new SM.collection.Friends();
		friends.fetch({
			data: {
				user_id: userId,
				stringify_ids: true,
				cursor: -1
			},
			dataType: 'jsonp',
			success: function(data, textStatus, jqXHR) {
				myUserInfoRead();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('friends ajax error', arguments);
			}
		});
	}


	function myUserInfoRead() {
		var userIds = '312721846';

		$.ajax({
			url: 'https://api.twitter.com/1/users/lookup.json',
			data: {
				user_id: userIds,
				stringify_ids: true,
				cursor: -1
			},
			dataType: 'jsonp',
			success: function(data, textStatus, jqXHR) {
				myUserInfo = new Backbone.Model(data[0]);
				debugUserInfoDump(myUserInfo);
				userInfoRead();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('myUserInfoRead ajax error', arguments);
			}
		});
	}


	function debugUserInfoDump(user) {
		console.log('name', user.get('name'),
			'followers', user.get('followers_count'),
			'friends', user.get('friends_count'),
			'location', user.get('location'),
			'tweets', user.get('statuses_count'));
	}


	function userInfoRead() {
		// SEE: https://dev.twitter.com/docs/api/1/get/users/lookup
		var userIds = '';

		followers.each(function(follower, index, allArray) {
			if (index < 50) {
				userIds += follower.get('uid') + ',';
			}
		});
		userIds = userIds.slice(0, -1);

		userInfo = new Backbone.Collection();
		userInfo.fetch({
			url: 'https://api.twitter.com/1/users/lookup.json',
			data: {
				user_id: userIds,
				stringify_ids: true,
				cursor: -1
			},
			dataType: 'jsonp',
			success: function(data, textStatus, jqXHR) {
				userInfo.each(function(user){
					debugUserInfoDump(user);
				});

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('userInfo ajax error', arguments);
			}
		});
	}


	// public interface is returned

	return {
		onInit: function() {
			initialize();
		},

		getUsers: function() {
			return userInfo;
		}

	};


})(jQuery);

SM.app = Application;