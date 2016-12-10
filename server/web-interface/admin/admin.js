var app = angular.module("adminApp", []);
app.controller("admin", function($scope) {
  function main() {
    if (localStorage.authkey) {
      $scope.authkey = JSON.parse(localStorage.authkey);
    } else {
      var name = "";
      while (name == "") {
        name = prompt("Please name this new device");
      }
      while (name.length > 50) {
        name = prompt("Error: Name must be 50 characters or less. Please enter a different name");
      }
      $scope.authkey = {
        name: name,
        key: ""
      };
    }
    $scope.authorized = false;
    $scope.device_name = $scope.authkey.name;

// response object contains msg and device_info
// device_info is array if msg "OK", if "newdevice" it is an object for one device
    $.post("getDevices.php", $scope.authkey, function(response) {
      if (response.msg == "OK") {
        $scope.authorized = true;
        $scope.devices = [];
        for (var i = 0; i < response.device_info.length; i++) {
          var device = response.device_info[i];
          $scope.devices.push({
            name: device.name,
            authorized: (device.authorized == 1) ? true : false,
            current: (device.name == $scope.device_name)
          });
        }
      } else if (response.msg == "nodevice") {
        alert("This device no longer exists in the database.");
        localStorage.removeItem("authkey");
        main();
      } else if (response.msg == "newdevice") {
        $scope.authorized = false;
        $scope.authkey = response.device_info;
        localStorage.authkey = JSON.stringify($scope.authkey);
      } else if (response.msg == "duplicatename") {
        alert("Sorry. The device name you picked exists in the database already. Pick another one.");
        main();
      } else if (response.msg != "unauthorized") {
        alert(response.msg);
      }
      $scope.$apply();
    }, "json");
  }

  $scope.approve = function(index) {
    var confirmation = prompt("Are you sure you want to approve " + $scope.devices[index].name + "?");
    if (confirmation) {
      data = {
        authkey: $scope.authkey,
        device: $scope.devices[index].name
      }
      $.post("approveDevice.php", data, function(response) {
        if (response == "OK") {
          $scope.devices[index].authorized = true;
          $scope.$apply();
          alert("Success!");
        } else {
          alert(response);
        }
      }, "text");
    }
  }

  main();
});
