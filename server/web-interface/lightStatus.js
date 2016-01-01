app.controller("lightStatus", function($scope) {
  $scope.status = "off";
  if ($scope.status == "off") {
    $scope.btn_action = "on";
  } else {
    $scope.btn_action = "off";
  }
  $scope.toggle = function() {
    if ($scope.status == "off") {
      $scope.status = "on";
      $scope.btn_action = "off";
    } else {
      $scope.status = "off";
      $scope.btn_action = "on";
    }
  }
});
