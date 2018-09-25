var ipcRenderer = require('electron').ipcRenderer;

angular.module('firstApp', [])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .controller('FirstController', ['$scope', '$timeout', function($scope, $timeout) {

    // recieve message
    $scope.message = '';
    ipcRenderer.on('message', (event, message: string) => {
      $scope.message = message;
      $timeout(() => { $scope.$apply(); });
    });

  }]);
