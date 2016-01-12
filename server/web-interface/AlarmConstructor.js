function Alarm(hour, minute, days) {
  function genStartTime() {
    if (this.minute < 30) {
      this.start_minute = this.minute + 30;
      this.start_hour = (this.hour == 0) ? 23 : this.hour - 1;
    } else {
      this.start_minute = this.minute - 30;
      this.start_hour = this.hour;
    }
  }
  this.hour = hour;
  this.minute = minute;
  this.days = days;
  this.active = true;
  this.toggle = function() {
    this.active = !(this.active);
    pushChanges();
  };
  this.edit = function(hour, minute, days) {
    var oldAlarm = this;
    this.time = genStartTime(hour, minute);
    this.days = days;
    pushChanges():
  };
}
