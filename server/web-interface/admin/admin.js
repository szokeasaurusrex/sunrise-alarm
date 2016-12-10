app.controller("admin", function($scope) {
  function main() {
    if (localStorage.authkey) {
      var authkey = JSON.stringify(localStorage.authkey);
    } else {
      var name = "";
      while (name == "") {
        name = prompt("Please name this new device");
      }
      var authkey = {
        device: name,
        key: ""
      };
    }
    $scope.device_name = name;

    $.getJSON("getDevices.php", authkey, function(device_info) {
      if (device_info == "unauthorized") {
        $scope.authorized = false;
      } else if (device_info == "nodevice") {
        localStorage.removeItem("authkey");
        main();
      } else {
        $scope.authorized = true;
        $scope.devices = [];
        for (var i = 0; i < device_info.length; i++) {
          $scope.devices[i] = new Device(device_info[i].name, device_info[i].authorized, device_info[i].current);
        }
        $scope.$apply();
      }
    });
  }
});
