// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require angular
//= require angular-route
//= require angular-rails-templates
//= require lodash
//= require restangular.min
//= require arctext.js
//= require app.js
//= require toastr
//= require underscore
//= require_tree ./angular
//= require_tree ../templates
//= require '_headroom.angular'
//= require_tree .

var profile_settings = {
	action_menu_min_width: 200,
	content_max_width: 600
};

var viewable_sections = {
	sign_up: {
		headingColour: "#15b3b6"
	},
	questions: {
		url: "questions",
		headingText: "Questions",
		headingColour: "#70DED1"
	},
	questions_new: {
		url: "questions/new",
		headingText: "New Question",
		headingColour: "#70DED1"
	},
	questions_show: {
		url: "question/:id",
		headingText: "Answers",
		headingColour: "#70DED1"
	},
	friendships: {
		url: "friendships",
		headingText: "Acquaintances",
		headingColour: "#F788B5"
	},
	edit_profile: {
		url: "editprofile",
		headingText: "Edit Profile",
		headingColour: "#FFA881"
	}
};