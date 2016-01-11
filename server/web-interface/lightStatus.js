app.controller("lightStatus", function($scope) {
  $scope.status = "off";
  $scope.status_confirmed = false;
  $scope.updateButton = function() {
    if ($scope.status.indexOf("on") > -1) {
      $scope.btn_action = "off";
    } else {
      $scope.btn_action = "on";
    }
  };
  $scope.toggle = function() {
    if ($scope.status_confirmed) {
      $scope.status_confirmed = false;
      $.get("toggle.php", {new_status: $scope.btn_action}, function(response) {
        if (response == "OK") {
          $scope.status = $scope.btn_action;
          $scope.updateButton();
          $scope.status_confirmed = true;
          $scope.$apply();
        } else {
          alert("FAIL " + response);
        }
      });
    }
  };
  $scope.getStatus = function () {
    $.get("getStatus.php", function (response) {
      console.log(response);
      $scope.status = response;
      $scope.status_confirmed = true;
      $scope.updateButton();
      $scope.$apply();
    });
  };
  $scope.updateButton();
  $scope.getStatus();
});
