Spine.View = Spine.Class.sub({

	init : function() {
		that = this;
		that.options = arguments[0];
		$.ajax({
			url : that.options.template,
			async : false,
			success : function(content, textStatus, jqXHR) {
				that.content = $.convertTemplate(content);
			},
			error : function(content, textStatus, jqXHR) {
				throw "Unable to load template. Please check the path and name of the template"
			}
		});
	},
	render : function(target, data) {
		if(!this.id) {
			this.id = 'view-' + (new Date()).getTime();
		}
		this.target = target;
		$.templates('_template', this.content);
		if(!document.getElementById(this.id)) {
			$(target).append('<div class="view-container" id="' + this.id + '"></div>');
		}
		$('#' + this.id).html($.render._template(data));
	},
	bind : function(target, data) {
		if(!this.id) {
			this.id = 'view-' + (new Date()).getTime();
		}
		this.target = target;
		$.templates('_template', this.content);
		if(!document.getElementById(this.id)) {
			$(target).append('<div class="view-container" id="' + this.id + '"></div>');
		}
		$.link._template('#' + this.id, data);
	},
	destroy : function() {
		$('#' + this.id).remove();
		for(var key in this) {
			delete this[key];
		}
		delete this;
	}
});
