app.controller("admin", function($scope) {
  function main() {
    if (localStorage.authkey) {
      var authkey = JSON.parse(localStorage.authkey);
    } else {
      var name = "";
      while (name == "") {
        name = prompt("Please name this new device");
      }
      while (name.length > 50) {
        name = prompt("Error: Name must be 50 characters or less. Please enter a different name");
      }
      var authkey = {
        device: name,
        key: ""
      };
    }
    $scope.authorized = false;
    $scope.device_name = name;

// response object contains msg and device_info
// device_info is array if msg "OK", if "newdevice" it is an object for one device
    $.getJSON("getDevices.php", authkey, function(response) {
      if (response.msg == "OK") {
        $scope.authorized = true;
        $scope.devices = [];
        for (var i = 0; i < response.device_info.length; i++) {
          $scope.devices[i] = new Device(response.device_info[i].name, response.device_info[i].authorized, $scope.device_name);
        }
      } else if (response.msg == "nodevice") {
        alert("This device no longer exists in the database.");
        localStorage.removeItem("authkey");
        main();
      } else if (response.msg == "newdevice") {
        $scope.authorized = false;
        localStorage.authkey = JSON.stringify(response.device_info)
      } else if (response.msg == "duplicatename") {
        alert("Sorry. The device name you picked exists in the database already. Pick another one.");
        main();
      } else {
        alert(response.msg);
      }
      $scope.$apply();
    });
  }
});
