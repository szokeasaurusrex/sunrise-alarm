function Device(name, authorized, current_name) {
  this.name = name;
  this.authorized = (authorized == 1) ? true : false;
  this.current = (current_name == name);
}
// TODO add functions
