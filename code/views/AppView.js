SM.view.Application = Backbone.View.extend({

	el:'body',

	initialize:function () {

	},

	events:{
		'click #hotel-search-button':'onSearchSelect'
	},

	onSearchSelect:function (tgtEvt) {
		///SM.app.onHotelSearch();
	}

});