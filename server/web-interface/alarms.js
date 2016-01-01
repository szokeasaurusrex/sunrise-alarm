app.controller("alarm-cont", function($scope) {
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

  $scope.alarms = [
    {
      hours: 7,
      minutes: 0,
      days: [1, 2, 3, 4, 5]
    },
    {
      hours: 5,
      minutes: 30,
      days: [6,7]
    }
  ];
});
