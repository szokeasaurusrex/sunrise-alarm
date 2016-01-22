function Alarm(hour, minute, days, active) {
  this.hour = hour;
  this.minute = minute;
  this.days = days;
  this.active = active;
  this.editing = false;
  // this.applyEdits = function(hour, minute, days) {
  //   this.editing = false;
  //   var oldAlarm = this;
  //   this.time = genStartTime(hour, minute);
  //   this.days = days;
  //   pushChanges():
  // };

}
(function() {
  this.toggle = function() {
    this.active = !(this.active);
    pushChanges();
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
    this.daysTf = [];
    var j = 0;
    for (var i = 0; i < 7; i++) {
      if (this.days[j] - 1 === i) {
        this.daysTf[i] = true;
        j++;
      } else {
        this.daysTf[i] = false;
      }
    }
  };
  this.updateDays = function () {
    this.days = [];
    for (var i = 0; i < 7; i++) {
      if (this.daysTf[i] === true) {
        this.days.push(i + 1);
      }
    }
  }
  this.edit = function() {
    this.updateDaysTf();
    this.oldAlarm = this;
    this.editing = true;
  };
  this.saveEdits = function() {
    this.editing = false;
    this.updateDays();
    this.updateStartTime();
    $.post("saveAlarm.php", {type: "edit", alarm: JSON.stringify(this)}, function (response) {
      if (response == "OK") {
        alert("The alarm was successfully updated.");
      } else {
        alert("FAIL " + response);
      }
    });
  }
}).call(Alarm.prototype);
