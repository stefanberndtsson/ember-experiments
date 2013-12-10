Ember.FEATURES["query-params"] = true;

function loadScriptSync(url) {
    console.log("loadScriptSync: ", url);
    $.ajaxSetup({async: false});
    $.getScript(url).fail(function(x,y,z) {
        console.log("error: ", x, y, z);
    });
    $.ajaxSetup({async: true});
}

function loadTemplateSync(url) {
    console.log("loadTemplateSync: ", url);
    $.ajaxSetup({async: false});
    $.get(url).done(function(templateText) {
        Ember.Handlebars.bootstrap('<div>'+templateText+'</div>');
    });
    $.ajaxSetup({async: true});
}

var scripts = document.getElementsByTagName( 'script' );
var thisScriptTag = scripts[ scripts.length - 1 ];
var rootElement = thisScriptTag.dataset.rootElement;
var scriptHost = thisScriptTag.dataset.srcDir;

Ex1 = Ember.Application.create({
    apiUrlBase: 'http://nmdb-api.nocrew.org',
    rootElement: '#'+rootElement,
    Resolver: Ember.DefaultResolver.extend({
        resolveTemplate: function(parsedName) {
            console.log("Resolver", parsedName.fullNameWithoutType);
            parsedName.fullNameWithoutType = "Ex1-"+parsedName.fullNameWithoutType;
            return this._super(parsedName);
        }
    })
});

loadTemplateSync(scriptHost+'/main.hb');

Ex1.Router.map(function() {
    this.resource('index', {path: '/', queryParams: ['query', 'from', 'to']});
});

Ex1.ApplicationController = Ember.Controller.extend({
    appName: 'Ex1'
});

Ex1.IndexRoute = Ember.Route.extend({
    apiUrl: Ex1.apiUrlBase+"/searches",
    setupController: function(controller, context, queryParams) {
	var query = "";
	var from = null;
	var to = null;
	if(queryParams && queryParams.query) {
	    query = queryParams.query;
	    controller.set('queryString', query);
	}
	if(queryParams && queryParams.from) {
	    from = queryParams.from;
	    controller.set('fromYear', from);
	}
	if(queryParams && queryParams.to) {
	    to = queryParams.to;
	    controller.set('toYear', to);
	}
	$.ajax({
	    url: this.get('apiUrl')+'/movies?'+$.param({
		query: query,
		from_year: from,
		to_year: to
	    }),
	    cache: false,
	    dataType: 'json',
	    contentType: 'application/json',
	    success: function(data) {
		controller.set('model', data);
	    }
	});
    },
    actions: {
	search: function(queryString) {
	    var controller = this.controller;
	    this.transitionTo('index', {
		queryParams: {
		    query: queryString,
		    from: controller.get('fromYear'),
		    to: controller.get('toYear')
		}
	    });
	}
    }
});

Ex1.IndexController = Ember.Controller.extend({
    fromYear: 1970,
    toYear: 1990
});

Ex1.IndexView = Ember.View.extend({
    didInsertElement: function() {
	var controller = this.controller;
	$( "#slider-range" ).slider({
	    range: true,
	    min: 1900,
	    max: 2020,
	    values: [ controller.get('fromYear'), controller.get('toYear') ],
	    slide: function(event, ui) {
		controller.set('fromYear', ui.values[0]);
		controller.set('toYear', ui.values[1]);
	    },
	    stop: function(event, ui) {
		controller.transitionToRoute('index', {
		    queryParams: {
			query: controller.get('queryString'),
			from: controller.get('fromYear'),
			to: controller.get('toYear')
		    }
		});
	    }
	});
    },
});