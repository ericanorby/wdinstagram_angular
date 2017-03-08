"use strict";

(function(){
  angular
    .module("wdinstagram", [
      "ui.router"
    ])
    .config([
      "$stateProvider",
      RouterFunction
    ])
    .controller("InstaIndexController", [
      InstaIndexControllerFunction
    ])

    function RouterFunction($stateProvider){
      $stateProvider
      .state("instaIndex", {
        url: "/wdinstagrams",
        templateUrl: "js/ng-views/index.html",
        controller: "InstaIndexController",
        controllerAs: "vm"
      })
    }

    function InstaIndexControllerFunction(){
      this.instas = instaData
    }

})();
