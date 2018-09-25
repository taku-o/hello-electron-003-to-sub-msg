var ipcRenderer = require('electron').ipcRenderer;

angular.module('mainApp', [])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .controller('MainController', ['$scope', function($scope) {

    $scope.show1stWindow = function() {
      ipcRenderer.send('show1stWindow', 'nandemo yoi');
    };
    $scope.show2ndWindow = function() {
      ipcRenderer.send('show2ndWindow', 'tekito');
    };

    $scope.sendMsgTo1stWindow = function() {
      // !!!!
      // remoteは参照そのものではなく、呼んだ瞬間のコピーっぽい
      const firstWindow = require('electron').remote.getGlobal('firstWindow');
      firstWindow.webContents.send('message', 'message from main.');
    };
    $scope.sendMsgTo2ndWindow = function() {
      const secondWindow = require('electron').remote.getGlobal('secondWindow');
      secondWindow.webContents.send('message', 'message from main.');
    };

  }]);
