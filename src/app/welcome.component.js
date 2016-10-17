(function() {
'use strict';

    // Usage:
    // 
    // Creates: 
    // 
 
    angular
        .module('app')
        .component('welcome', {
            templateUrl: 'app/welcome.html',
            controller: ControllerController,
            bindings: {
                Binding: '=', 
            }, 

        });

    ControllerController.$inject = [];
    function ControllerController() {
        var $ctrl = this;
        $ctrl.welcome = "Olá Mundo 2!";

        ////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestory = function() { };
    }  
})(); 