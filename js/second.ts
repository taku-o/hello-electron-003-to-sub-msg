var ipcRenderer = require('electron').ipcRenderer;

angular.module('secondApp', [])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .controller('SecondController', ['$scope', '$timeout', function($scope, $timeout) {

    // recieve message
    $scope.message = '';
    ipcRenderer.on('message', (event, message: string) => {
      $scope.message = message;
      $timeout(() => { $scope.$apply(); });
    });

  }]);
