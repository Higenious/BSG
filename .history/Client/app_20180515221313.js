var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'UserController',
		templateUrl: ''
	})
	.when('/home', {
		templateUrl: 'views/home.html'
	})
	.when('/user/add',{
        templateUrl: 'views/uploadcsv.html'
		
	})
	.when('/user/edit',{
        templateUrl: 'views/.html',
        
    })
    .when('/user/delet',{
        templateUrl: 'views/delete_ideas.html',
        controller:'IdeasController'
	})
	.otherwise({
		redirectTo: '/'
    });
  
});