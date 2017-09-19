app.controller("alarm-cont", function($scope) {
  function sortAlarms(a, b) {
    if (a.hour != b.hour) {
      return a.hour - b.hour;
    } else {
      return a.minute - b.minute;
    }
  }
  function getAlarms() {
    $.post("getAlarms.php", authkey, function(alarm_info) {
      $scope.alarms = [];
      for (var i = 0; i < alarm_info.length; i++) {
        var alarm = alarm_info[i];
        $scope.alarms[i] = new Alarm(alarm.hour, alarm.minute, alarm.days, alarm.active, alarm.dimtime);
      }
      $scope.alarms.sort(sortAlarms);
      $scope.$apply();
    }, "json");
  }
  $scope.stringifyTime = function(hours, minutes) {
    if (hours < 10) {
      hours_string = "0" + hours;
    } else {
      hours_string = "" + hours;
    }
    if (minutes < 10) {
      minutes_string = "0" + minutes;
    } else {
      minutes_string = "" + minutes;
    }
    return hours_string + ":" + minutes_string;
  };

  $scope.stringifyDays = function(day_list) {
    var day_string = "";
    for (i = 0; i < day_list.length; i++) {
      var day;
      switch (day_list[i]) {
        case 1:
          day_string += "Monday";
          break;
        case 2:
          day_string += "Tuesday";
          break;
        case 3:
          day_string += "Wednesday";
          break;
        case 4:
          day_string += "Thursday";
          break;
        case 5:
          day_string += "Friday";
          break;
        case 6:
          day_string += "Saturday";
          break;
        case 7:
          day_string += "Sunday";
          break;
      }
      if (i + 1 < day_list.length) {
        day_string += ", ";
      }
    }
    return day_string;
  };
  $scope.addAlarm = function() {
    var alarm_id = $scope.alarms.push(new Alarm(0, 0, [], true, 20)) - 1;
    $scope.alarms[alarm_id].edit();
    $scope.$apply();
  };
  $scope.deleteAlarm = function(alarm) {
    if (confirm("Press OK to delete this alarm.") === true) {
      alarm = alarm.delete();
      $scope.alarms.splice($scope.alarms.indexOf(alarm), 1);
    }
  };
  $scope.saveEdits = function(alarm) {
    alarm.saveEdits();
    $scope.alarms.sort(sortAlarms);
  };
  getAlarms();
});
