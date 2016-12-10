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
      var data = {
        new_status: $scope.btn_action,
        authkey: authkey
      }
      $.post("toggle.php", data, function(response) {
        if (response == "OK") {
          $scope.status = $scope.btn_action;
          $scope.updateButton();
          $scope.status_confirmed = true;
          $scope.$apply();
        } else {
          alert("FAIL " + response);
        }
      }, "text");
    }
  };
  $scope.getStatus = function () {
    $.post("getStatus.php", authkey, function (response) {
      if (response == "unauthorized") {
        alert("This device is not authorized to use this website.")
      } else {
        $scope.status = response;
        $scope.status_confirmed = true;
        $scope.updateButton();
        $scope.$apply();
      }
    }, "text");
  };
  $scope.getStatus();
});
