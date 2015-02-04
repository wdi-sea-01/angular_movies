var moviesApp = angular.module('MoviesApp', ['ui.bootstrap'])


moviesApp.controller('SearchController', ['$scope','$http', function($scope, $http) {


  $scope.movies = {};
  $scope.searchTerm = window.localStorage.searchTerm || "";
  $scope.loading = false;

  try {
    $scope.searchTerms = JSON.parse(window.localStorage.searchTerms) || [];
  } catch(e){
    console.log('error',e);
    $scope.searchTerms = [];
  }

  $scope.search = function() {

    if ($scope.searchTerm.length < 2) {
      $scope.movies.Error = "Must provide more than one character.";
      return;
    }

    $scope.loading = true;

    var req = {
      url: "http://www.omdbapi.com",
      params: {
        s: $scope.searchTerm,
        type: $scope.searchType
      }
    }

    $http(req).success(function(data) {

      if ($scope.searchTerms.indexOf($scope.searchTerm) == -1) {
        $scope.searchTerms.push($scope.searchTerm);
        window.localStorage.searchTerms = JSON.stringify($scope.searchTerms);
      }

      window.localStorage.searchTerm = $scope.searchTerm;

      $scope.movies = data;
      $scope.loading = false;
    });

  }


  if ($scope.searchTerm) {
    $scope.search();
  }

}]);