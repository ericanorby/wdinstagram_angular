"use strict";

(function(){
  angular
    .module("wdinstagram", [
      "ui.router",
      "ngResource"
    ])
    .config([
      "$stateProvider",
      RouterFunction
    ])
    .factory("InstaFactory", [
      "$resource",
      InstaFactoryFunction
    ])
    .controller("InstaIndexController", [
      "InstaFactory",
      InstaIndexControllerFunction
    ])
    .controller("InstaShowController", [
      "InstaFactory",
      "$stateParams",
      InstaShowControllerFunction
    ])

    function RouterFunction($stateProvider){
      $stateProvider
      .state("instaIndex", {
        url: "/wdinstagrams",
        templateUrl: "js/ng-views/index.html",
        controller: "InstaIndexController",
        controllerAs: "vm"
      })
      .state("instaShow", {
        url: "/wdinstagrams/:id",
        templateUrl: "js/ng-views/show.html",
        controller: "InstaShowController",
        controllerAs: "vm"
      })
    }

    function InstaFactoryFunction($resource){
      return $resource("http://localhost:3000/entries/:id")
    }

    function InstaIndexControllerFunction(InstaFactory){
      this.instas = InstaFactory.query()
    }

    function InstaShowControllerFunction(InstaFactory, $stateParams){
      this.insta = InstaFactory.get({id: $stateParams.id})
      console.log(this.insta)
    }

})();
