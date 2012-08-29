// http://dryicons.com/free-icons/preview/coquette-icons-set/

var Application = (function($) {

	var localUserId = 312721846;
	var appView;
	var myUserInfo;
	var friends, followers, followerUserInfo;
	var followerView;


	function initialize() {
		appView = new SM.view.Application();

		followersRead(localUserId);
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
				friendsRead(localUserId);
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
		$.ajax({
			url: 'https://api.twitter.com/1/users/lookup.json',
			data: {
				user_id: localUserId,
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


	function userInfoRead() {
		followerUserInfo = new Backbone.Collection();
		followerUserInfo.add(myUserInfo);
		userSetRead(0);
	}


	function userSetRead(startIndex) {
		// SEE: https://dev.twitter.com/docs/api/1/get/users/lookup

		var MAX_USERS = 50;
		var tempUserInfo, index, follower;
		var userIds = '';

		for (index = startIndex; index < startIndex + MAX_USERS; index += 1) {
			follower = followers.at(index);
			if (follower === undefined) {
				break;
			}
			userIds += follower.get('uid') + ',';
		}
		userIds = userIds.slice(0, -1);

		tempUserInfo = new Backbone.Collection();
		tempUserInfo.fetch({
			url: 'https://api.twitter.com/1/users/lookup.json',
			data: {
				user_id: userIds,
				stringify_ids: true,
				cursor: -1
			},
			dataType: 'jsonp',
			success: function(data, textStatus, jqXHR) {
				followerUserInfo.add(tempUserInfo.models);
				if (startIndex + MAX_USERS < followers.length) {
					userSetRead(startIndex + MAX_USERS);
				} else {
					debugFollowersInfoDump();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('userSetRead ajax error', arguments);
			}
		});
	}


	function debugFollowersInfoDump() {
		followerView = new SM.view.UserInfo({collection: followerUserInfo});
		followerView.render();
	}


	function debugUserInfoDump(user) {
		console.log('name', user.get('name'),
			'followers', user.get('followers_count'),
			'friends', user.get('friends_count'),
			'location', user.get('location'),
			'tweets', user.get('statuses_count'));
	}


	// public interface is returned

	return {
		onInit: function() {
			initialize();
		},

		onSortBy: function(keyName) {
			var sortedArray = followerUserInfo.sortBy(function(userModel) {
				return userModel.get(keyName);
			});
			followerUserInfo.reset(sortedArray);
		},

		followers: function() {
			return followerUserInfo;
		},

		localUser: function() {
			return localUserId;
		}
	};


})(jQuery);

SM.app = Application;