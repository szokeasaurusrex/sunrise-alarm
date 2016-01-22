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
    this.oldAlarm = {
      hour: this.hour,
      minute: this.minute,
      days: this.days
    };
    this.editing = true;
    console.log(this);
  };
  this.saveEdits = function() {
    this.hour = parseInt(this.hour);
    this.minute = parseInt(this.minute);
    this.updateDays();
    if (this.hour < 0 || this.hour > 23 || this.hour === NaN) {
      alert("Error. The alarm hour must be a number between 0 and 23.");
    } else if (this.minute < 0 || this.minute > 59 || this.minute = NaN) {
      alert("Error. The alarm minute must be a number between 0 and 59.");
    } else if (this.days == []) {
      alert("Error. No days were selected.");
    } else {
      this.editing = false;
      this.updateStartTime();
      console.log(this)
      $.post("saveAlarm.php", {type: "edit", alarm: JSON.stringify(this)}, function (response) {
        if (response == "OK") {
          alert("The alarm was successfully updated.");
        } else {
          alert("FAIL " + response);
        }
      });
    }
  }
}).call(Alarm.prototype);
