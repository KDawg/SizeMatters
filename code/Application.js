// http://dryicons.com/free-icons/preview/coquette-icons-set/

var Application = (function($) {

	var appView;

	function initialize() {
		appView = new SM.view.Application();

		///timelineRead();

		followersRead();

		friendsRead();

		userInfoRead('312721846');
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


	function followersRead() {
		// SEE: https://dev.twitter.com/docs/api/1/get/followers/ids

		$.ajax({
			url: 'https://api.twitter.com/1/followers/ids.json',
			dataType: 'jsonp',
			type: 'get',
			data: {
				user_id: '312721846',
				stringify_ids: true,
				cursor: -1
			},
			success: function(data, textStatus, jqXHR) {
				console.log('followers ajax success', arguments);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('followers ajax error', arguments);
			}
		});
	}


	function friendsRead() {
		// SEE: https://dev.twitter.com/docs/api/1/get/friends/ids

		$.ajax({
			url: 'https://api.twitter.com/1/friends/ids.json',
			dataType: 'jsonp',
			type: 'get',
			data: {
				user_id: '312721846',
				stringify_ids: true,
				cursor: -1
			},
			success: function(data, textStatus, jqXHR) {
				console.log('friends ajax success', arguments);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('friends ajax error', arguments);
			}
		});
	}


	function userInfoRead(userIds) {
		// SEE: https://dev.twitter.com/docs/api/1/get/users/lookup

		$.ajax({
			url: 'https://api.twitter.com/1/users/lookup.json',
			dataType: 'jsonp',
			type: 'get',
			data: {
				user_id: userIds,
				stringify_ids: true,
				cursor: -1
			},
			success: function(data, textStatus, jqXHR) {
				console.log('userInfo ajax success', arguments);
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
		}

	};


})(jQuery);

SM.app = Application;