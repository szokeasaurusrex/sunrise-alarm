app.controller("lightStatus", function($scope) {
  $scope.status = "off";
  $scope.status_confirmed = false;
  $scope.updateButton = function(status) {
    if (status == "on" || status == "on ") {
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
      $scope.updateButton($scope.status);
    }
  };
  $scope.getStatus = function () {
    $.get("getStatus.php", function (response) {
      console.log(response);
      $scope.status = response;
      $scope.status_confirmed = true;
      $scope.updateButton(response);
      $scope.$apply();
    });
  };
  $scope.updateButton();
  $scope.getStatus();
});
