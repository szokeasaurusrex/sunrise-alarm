function Alarm(hour, minute, days, active) {
  this.hour = hour;
  this.minute = minute;
  this.days = days;
  this.active = active;
  this.time = "";
  this.editing = false;
}
(function() {
  this.toggle = function() {
    this.active = !(this.active);
    console.log(this.active);
    this.pushChanges("toggle");
  };
  this.updateStartTime = function() {
    if (this.minute < 30) {
      this.start_minute = this.minute + 30;
      this.start_hour = (this.hour === 0) ? 23 : this.hour - 1;
    } else {
      this.start_minute = this.minute - 30;
      this.start_hour = this.hour;
    }
  };
  this.updateDaysTf = function () {
    this.days_tf = [];
    var j = 0;
    for (var i = 0; i < 7; i++) {
      if (this.days[j] - 1 === i) {
        this.days_tf[i] = true;
        j++;
      } else {
        this.days_tf[i] = false;
      }
    }
  };
  this.updateDays = function () {
    this.days = [];
    for (var i = 0; i < 7; i++) {
      if (this.days_tf[i] === true) {
        this.days.push(i + 1);
      }
    }
  }
  this.edit = function() {
    this.updateDaysTf();
    this.old_alarm = {
      hour: this.hour,
      minute: this.minute,
      days: this.days
    };
    this.time = this.hour + ":" + this.minute + ":00";
    this.editing = true;
  };
  this.saveEdits = function() {
    var hhmmss = this.time.toTimeString().split(":");
    this.hour = parseInt(hhmmss[0]);
    this.minute = parseInt(hhmmss[1]);
    this.updateDays();
    if (isNaN(this.hour) || this.hour < 0 || this.hour > 23) {
      alert("Error. The alarm hour must be a number between 0 and 23.");
    } else if (isNaN(this.minute) || this.minute < 0 || this.minute > 59) {
      alert("Error. The alarm minute must be a number between 0 and 59.");
    } else if (this.days == []) {
      alert("Error. No days were selected.");
    } else {
      this.editing = false;
      this.active = true;
      this.updateStartTime();
      console.log(this);
      this.pushChanges("edit");
    }
  };
  this.cancelEdits = function() {
    this.editing = false;
    this.hour = this.oldAlarm.hour;
    this.minute = this.oldAlarm.minute;
    this.days = this.oldAlarm.days;
  };
  this.delete = function() {
    this.old_alarm = {
      hour: this.hour,
      minute: this.minute,
      days: this.days
    };
    this.pushChanges("delete");
    return this;
  }
  this.pushChanges = function(type) {
    var data = {
      type: type,
      alarm: JSON.stringify(this),
      authkey: authkey
    };
    $.post("saveAlarm.php", data, function (response) {
      if (response == "OK") {
        alert("The alarm was successfully updated.");
      } else {
        alert("FAIL " + response);
      }
    });
  }
}).call(Alarm.prototype);
