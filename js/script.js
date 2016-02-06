$.getJSON("../schedule.json", function(schedule){

  // ---------------- BIG --------------------

  rowsNumber = (schedule.end - schedule.start) * 4;
  var str;
  // fill the left column + empty boxes
  for(var i = 0; i < rowsNumber; i++) {
    str = "";
    str += "<tr><td>" + (Math.floor(schedule.start + i*0.25)) + "h"
    + (((i * 15) % 60) || "00") + "</td>"
    + "<td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    $(".big-timetable > tbody").append(str);
  }

  schedule.schedules.forEach(function (element, index, array) {
    // fill the box
    var line = $(".big-timetable > tbody > tr")[(element.start - schedule.start) * 4];
    var box = line.getElementsByTagName('td')[element.day];
    // HERE GOES THE CONTENT
    box.innerHTML = "<h3>" + element.title + "</h3>"
                  + "<span>"
                  + Math.floor(element.start) + ":" + (((element.start - Math.floor(element.start)) * 60) || "00")
                  + "</span><br />"
                  + "<span>"
                  + Math.floor(element.end) + ":" + (((element.end - Math.floor(element.end)) * 60) || "00")
                  + "</span><br />";
    // size of the box
    $(box).attr("rowspan", (element.end - element.start) * 4);
    $(box).css("background-color", element.color);
    // remove the box which are below an element so it can extends
    for(var i = 1; i < (((element.end - element.start) * 4)); i++) {
      var lineToCut = $(".big-timetable > tbody > tr")[((element.start - schedule.start) * 4) + i];
      var boxToCut = lineToCut.getElementsByTagName('td')[element.day];
      $(boxToCut).remove();
    }
  });

  // ------------- SMALL ---------------
  schedule.schedules.forEach(function (element, index, array) {
    // set the day visible only if there is an element in it
    $($(".small-timetable > h3")[element.day - 1]).css("display", "block");
    // retrieve the the list of the element day
    var ul = $(".small-timetable > ul")[element.day - 1];
    ul.innerHTML += "<li>"
    + element.title
    + "<span class=\"sc-right\">"
    + Math.floor(element.start) + ":" + (((element.start - Math.floor(element.start)) * 60) || "00")
    + " - "
    + Math.floor(element.end) + ":" + (((element.end - Math.floor(element.end)) * 60) || "00")
    + "</span></li>"
  });
});
