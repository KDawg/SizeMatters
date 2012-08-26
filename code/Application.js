// http://dryicons.com/free-icons/preview/coquette-icons-set/

(function($) {

	///timelineRead();

	followersRead();

	friendsRead();


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


	// SEE: https://dev.twitter.com/docs/api/1/get/followers/ids

	function followersRead() {
		// SEE: https://dev.twitter.com/docs/api/1/get/statuses/home_timeline

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


})(jQuery);