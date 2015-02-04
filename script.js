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
    $scope.loading = true;

    if ($scope.searchTerm.length < 1) {
      $scope.movies.Error = "Must provide more than one character.";
      return;
    };

    var req = {
      url: "http://www.omdbapi.com",
      params: {
        s: $scope.searchTerm,
        type: $scope.searchType
      }
    }


    // window.localStroage.searchTerms = JSON.stringify($scope.searchTerms);

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

  // $scope.$watch("searchTerm", function(newVal, oldVal){
  //   console.log(oldVal,newVal);

  //   if (newVal) {
  //     window.localStorage.searchTerm = $scope.searchTerm;
  //   }
  // })

  if ($scope.searchTerm) {
    // $scope.search();
  }

}])