var schedule = {
  "start": 8.00,
  "end": 18.00,
  "schedules": [
    {
      "title": "test",
      "day": 1,
      "start": 8.25,
      "end": 9.00
    },
    {
      "title": "test",
      "day": 1,
      "start": 9.25,
      "end": 10.00
    },
    {
      "title": "test",
      "day": 1,
      "start": 10.00,
      "end": 10.25
    },
    {
      "title": "test",
      "day": 4,
      "start": 8.00,
      "end": 11.00
    },
    {
      "title": "test",
      "day": 3,
      "start": 8.00,
      "end": 9.25
    }
  ]
}

rowsNumber = (schedule.end - schedule.start) * 4;
var str;
for(var i = 0; i < rowsNumber; i++) {
  str = "";
  console.log(i);
  str += "<tr><td>" + (Math.floor(schedule.start + i*0.25)) + "h";

  if (((i * 15) % 60) == 0) {
    str += "00";
  } else {
    str += (i * 15) % 60;
  }

  str += "</td>"
  + "<td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
  $(".responsive-timetable > tbody").append(str);
}

schedule.schedules.forEach(function (element, index, array) {
  // fill the box
  var line = $(".responsive-timetable > tbody > tr")[(element.start - schedule.start) * 4];
  var box = line.getElementsByTagName('td')[element.day];
  box.innerHTML = "contenu de la box";
  // size of the box
  $(box).attr("rowspan", (element.end - element.start) * 4);
  // remove the box which are below an element so it can extends
  for(var i = 1; i < (((element.end - element.start) * 4)); i++) {
    var lineToCut = $(".responsive-timetable > tbody > tr")[((element.start - schedule.start) * 4) + i];
    var boxToCut = lineToCut.getElementsByTagName('td')[element.day];
    $(boxToCut).remove();
  }
});
