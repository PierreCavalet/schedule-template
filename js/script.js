$.getJSON("./schedule.json", function(schedule){

  // ---------------- BIG --------------------

  // get the rows number
  var scheduleEnd;
  var scheduleStart;
  schedule.forEach(function (element) {
    if(typeof scheduleStart === 'undefined' || element.start < scheduleStart) {
      scheduleStart = element.start;
    }
    if(typeof scheduleEnd === 'undefined' || element.end > scheduleEnd) {
      scheduleEnd = element.end;
    }
  });
  rowsNumber = (scheduleEnd - scheduleStart) * 4;

  var str;
  // fill the left column + empty boxes
  for(var i = 0; i < rowsNumber; i++) {
    str = "";
    str += "<tr><td>" + (Math.floor(scheduleStart + i*0.25)) + "h"
    + (((i * 15) % 60) || "00") + "</td>"
    + "<td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    $(".big-timetable > tbody").append(str);
  }

  var scheduleParsed = [];
  schedule.forEach(function (element) {
    // keeping track of the elements to handle intersection
    var intersection = false;
    scheduleParsed.forEach(function(elementCompared) {
      if (element.day == elementCompared.day) {
        if (element.start > elementCompared.start
          && element.start < elementCompared.end
          && element.end > elementCompared.end) {
            elementCompared.end = element.end;
            elementCompared.content += "<h3>" + element.title + "</h3>"
              + "<span>"
              + Math.floor(element.start) + ":"
              + (((element.start - Math.floor(element.start)) * 60) || "00")
              + "</span><br />"
              + "<span>"
              + Math.floor(element.end) + ":"
              + (((element.end - Math.floor(element.end)) * 60) || "00")
              + "</span><br />";
            intersection = true;
        }


        if (element.start < elementCompared.start
          && element.end < elementCompared.end
          && element.end > elementCompared.start) {
            elementCompared.start = element.start;
            // if there is a color, always pick the first
            if (element.color) {
              elementCompared.color = element.color;
            }
            elementCompared.content = "<h3>" + element.title + "</h3>"
              + "<span>"
              + Math.floor(element.start) + ":"
              + (((element.start - Math.floor(element.start)) * 60) || "00")
              + "</span><br />"
              + "<span>"
              + Math.floor(element.end) + ":"
              + (((element.end - Math.floor(element.end)) * 60) || "00")
              + "</span><br />" + elementCompared.content;
            intersection = true;
        }

        if (element.start < elementCompared.start
          && element.end > elementCompared.end) {
            intersection = true;
            elementCompared.start = element.start;
            elementCompared.end = element.end;
            // if there is a color, always pick the first
            if (element.color) {
              elementCompared.color = element.color;
            }
            elementCompared.content = "<h3>" + element.title + "</h3>"
              + "<span>"
              + Math.floor(element.start) + ":"
              + (((element.start - Math.floor(element.start)) * 60) || "00")
              + "</span><br />"
              + "<span>"
              + Math.floor(element.end) + ":"
              + (((element.end - Math.floor(element.end)) * 60) || "00")
              + "</span><br />" + elementCompared.content;
        }

        if (element.start > elementCompared.start
          && element.end < elementCompared.end) {
            elementCompared.content += "<h3>" + element.title + "</h3>"
              + "<span>"
              + Math.floor(element.start) + ":"
              + (((element.start - Math.floor(element.start)) * 60) || "00")
              + "</span><br />"
              + "<span>"
              + Math.floor(element.end) + ":"
              + (((element.end - Math.floor(element.end)) * 60) || "00")
              + "</span><br />";
            intersection = true;
        }
      }
    });

    if (!intersection) {
      element.content = "<h3>" + element.title + "</h3>"
        + "<span>"
        + Math.floor(element.start) + ":"
        + (((element.start - Math.floor(element.start)) * 60) || "00")
        + "</span><br />"
        + "<span>"
        + Math.floor(element.end) + ":"
        + (((element.end - Math.floor(element.end)) * 60) || "00")
        + "</span><br />";
      scheduleParsed.push(element);
    }
  });

  scheduleParsed.forEach(function (element) {
    // fill the box
    var line = $(".big-timetable > tbody > tr")[(element.start - scheduleStart) * 4];
    var box = line.getElementsByTagName('td')[element.day];
    // HERE GOES THE CONTENT
    box.innerHTML = element.content;
    // size of the box
    $(box).attr("rowspan", (element.end - element.start) * 4);
    $(box).css("background-color", element.color);
    // remove the box which are below an element so it can extends
    for(var i = 1; i < (((element.end - element.start) * 4)); i++) {
      var lineToCut = $(".big-timetable > tbody > tr")[((element.start - scheduleStart) * 4) + i];
      var boxToCut = lineToCut.getElementsByTagName('td')[element.day];
      $(boxToCut).hide();
    }
  });

  // ------------- SMALL ---------------
  schedule.forEach(function (element) {
    // set the day visible only if there is an element in it
    $($(".small-timetable > h3")[element.day - 1]).css("display", "block");
    // retrieve the the list of the element day
    var ul = $(".small-timetable > ul")[element.day - 1];
    ul.innerHTML += "<li>"
    + element.title
    + "<span class=\"sc-right\">"
    + Math.floor(element.start) + ":"
    + (((element.start - Math.floor(element.start)) * 60) || "00")
    + " - "
    + Math.floor(element.end) + ":"
    + (((element.end - Math.floor(element.end)) * 60) || "00")
    + "</span></li>"
  });
});
