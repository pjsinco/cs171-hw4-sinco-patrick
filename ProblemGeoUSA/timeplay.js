var data = {
    "690150": [
        {
            "date": "Feb 1, 2003 1:00:00 AM",
            "value": 0.0
        },
        {
            "date": "Feb 1, 2003 2:00:00 AM",
            "value": 0.0
        }

    ]
}
var timeParser = d3.time.format("%b %-d, %Y %X %p");
  //var timeParser = d3.time.format("%b %-d, %Y %H:%-M:%S %p");
//var timeParser = d3.time.format("%b %-d, %Y %X %p");
console.log(timeParser.parse(data['690150'][0].date));
