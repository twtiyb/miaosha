/**
 * Created by User on 14-3-30.
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.printName = function () {
    alert(this.name);
}
Person.prototype.setName = function (name) {
    this.name = name;
}
$(document).ready(function () {
    var person = new Person('xanxus', 10);
    $(window).scroll(function(){
        $('div#mylrc').scrollTop($(this).scrollTop());
    })
})