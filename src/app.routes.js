angular.module('app')
  .config(routesConfig)
  .run(requireLoginRun);



function requireLoginRun($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // seus erros de rota aqui 

  });
}
requireLoginRun.$inject = ["$rootScope", "$location"];

function routesConfig($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider
    .otherwise("/welcome")
    .when('/welcome', {
      template: '<welcome></welcome>'
    })

}
routesConfig.$inject = ["$routeProvider", "$locationProvider"];