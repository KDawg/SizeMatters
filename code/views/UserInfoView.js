SM.view.UserInfo = Backbone.View.extend({

	className: 'subject-panel',

	el: $('#user-list'),

	template: '<li>' +
		'name[<%= name %>] ' +
		'followers[<%= followers_count %>)] ' +
		'friends[<%= friends_count %>] ' +
		'location[<%= location %>] ' +
		'tweets[<%= statuses_count %>] ' +
		'</li>',

	events: {
		'click': 'onSelectChoice'
	},

	initialize: function() {
		_.bindAll(this);

		this.collection.bind('change', this.render);
	},

	render: function() {
		var compiledTemplate = _.template(this.template);
		var dataContext, html;
		var self = this;

		this.collection.each(function(item) {
			dataContext = item.toJSON();
			html = compiledTemplate(dataContext);
			self.$el.append(html);
		});

		return this;
	},

	onSelectChoice: function(event) {
		alert('booga');
		console.log(event.target);
	}
});