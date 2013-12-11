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

Ex2 = Ember.Application.create({
    rootElement: '#'+rootElement,
    Resolver: Ember.DefaultResolver.extend({
        resolveTemplate: function(parsedName) {
            console.log("Resolver", parsedName.fullNameWithoutType);
            parsedName.fullNameWithoutType = "Ex2-"+parsedName.fullNameWithoutType;
            return this._super(parsedName);
        }
    })
});

loadTemplateSync(scriptHost+'/main.hb');

Ex2.ApplicationController = Ember.Controller.extend({
    appName: 'Ex2'
});

Ex2.IndexController = Ember.Controller.extend({
    typeAlert: false,
    sizeClicked: false
});

Ex2.HeaderText = Ember.View.extend({
    tagName: 'div',
    classNames: ['well'],
    classNameBindings: ['sizeClicked:well-lg:well-sm'],
    sizeClicked: function() {
	return this.get('controller').get('sizeClicked');
    }.property('controller.sizeClicked'),
});

Ex2.AlertText = Ember.View.extend({
    tagName: 'div',
    classNames: ['alert'],
    classNameBindings: ['typeAlert:alert-danger:alert-success'],
    typeAlert: function() {
	return this.get('controller').get('typeAlert');
    }.property('controller.typeAlert'),
});

Ex2.ButtonView = Ember.View.extend({
    tagName: 'a',
    classNames: ['btn btn-primary'],
    href: 'javascript:void(0);',
});

Ex2.SizeButton = Ex2.ButtonView.extend({
    click: function(event) {
	this.get('controller').set('sizeClicked', true);
    }
});

Ex2.TypeButton = Ex2.ButtonView.extend({
    click: function(event) {
	console.log(this.get('controller').get('typeAlert'));
	this.get('controller').set('typeAlert', true);
	console.log(this.get('controller').get('typeAlert'));
    }
});

Ex2.ResetButton = Ex2.ButtonView.extend({
    tagName: 'a',
    classNames: ['btn btn-primary'],
    href: 'javascript:void(0);',
    click: function(event) {
	this.get('controller').set('sizeClicked', false);
	this.get('controller').set('typeAlert', false);
    }
});