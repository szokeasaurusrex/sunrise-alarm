app.controller("lightStatus", function($scope) {
  $scope.status = "off";
  $scope.status_confirmed = false;
  $scope.updateButton = function() {
    if ($scope.status == "on") {
      $scope.btn_action = "off";
    } else {
      $scope.btn_action = "on";
    }
  };
  $scope.toggle = function() {
    if ($scope.status_confirmed) {
      if ($scope.status == "off") {
        $scope.status = "on";
      } else {
        $scope.status = "off";
      }
      $scope.updateButton();
    }
  };
  $scope.getStatus = function () {
    $.get("getStatus.php", "", function (response) {
      $scope.status = response;
      $scope.status_confirmed = true;
      $scope.updateButton();
      $scope.$apply();
    }, "string")
  };
  $scope.updateButton();
  $scope.getStatus();
});
