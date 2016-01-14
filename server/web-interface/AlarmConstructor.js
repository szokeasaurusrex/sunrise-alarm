function Alarm(hour, minute, days) {
  this.hour = hour;
  this.minute = minute;
  this.days = days;
  this.active = true;
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
      if (this.days[j] === i) {
        this.daysTf[i] = true;
      } else {
        this.daysTf[i] = false;
      }
    }
    return this.daysTf;
  };
}).call(Alarm.prototype);
