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
      if ($scope.status == "off") {
        var new_status = "on";
      } else {
        var new_status = "off"
      }
      $scope.status_confirmed = false;
      $.get("toggle.php", {new_status: new_status}, function(response) {
        if (response == "OK") {
          $scope.status = new_status;
          $scope.updateButton();
          $scope.status_confirmed = true;
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
