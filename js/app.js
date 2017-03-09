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
    .controller("InstaNewController", [
      "InstaFactory",
      InstaNewControllerFunction
    ])
    .controller("InstaShowController", [
      "InstaFactory",
      "$stateParams",
      InstaShowControllerFunction
    ])
    .controller("InstaEditController", [
      "InstaFactory",
      "$stateParams",
      InstaEditControllerFunction
    ])

    function RouterFunction($stateProvider){
      $stateProvider
      .state("instaIndex", {
        url: "/wdinstagrams",
        templateUrl: "js/ng-views/index.html",
        controller: "InstaIndexController",
        controllerAs: "vm"
      })
      .state("instaNew", {
        url: "/wdinstagrams/new",
        templateUrl: "js/ng-views/new.html",
        controller: "InstaNewController",
        controllerAs: "vm"
      })
      .state("instaShow", {
        url: "/wdinstagrams/:id",
        templateUrl: "js/ng-views/show.html",
        controller: "InstaShowController",
        controllerAs: "vm"
      })
      .state("instaEdit", {
        url: "/wdinstagrams/:id/edit",
        templateUrl: "js/ng-views/edit.html",
        controller: "InstaEditController",
        controllerAs: "vm"
      })
    }

    function InstaFactoryFunction($resource){
      return $resource("http://localhost:3000/entries/:id", {}, {
        update: {method: "PUT"}
      })
    }

    function InstaIndexControllerFunction(InstaFactory){
      this.instas = InstaFactory.query()
    }

    function InstaNewControllerFunction(InstaFactory){
      this.insta = new InstaFactory()
      this.create = function(){
        this.insta.$save()
      }
    }

    function InstaShowControllerFunction(InstaFactory, $stateParams){
      this.insta = InstaFactory.get({id: $stateParams.id})
    }

    function InstaEditControllerFunction(InstaFactory, $stateParams){
      this.insta = InstaFactory.get({id: $stateParams.id})
      this.update = function(){
        this.insta.$update({id: $stateParams.id})
      }
      this.destroy = function(){
        this.insta.$delete({id: $stateParams.id})
      }
    }

})();
