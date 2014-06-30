var request = require('request');
var parseString = require('xml2js').parseString;
var _ = require('underscore');
var util = require('util');
var sprintf=require("sprintf-js").sprintf;


request(url_to_request, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var xml = body;
    parseString(xml, function (err, result) {
        var projects = [];
        var r = result.projects.project;
        _.each(r, function(o, k ) {
            var d = _.pick(o, 'name', 'budget', 'sum_hours');
            var name = d.name[0];
            var budget = d.budget[0]._;
            var sum_hours = d.sum_hours[0]._;
            var obj = {
              name: name,
              budget: budget,
              sum_hour: sum_hours
            }
            console.log(obj); 
            projects.push(obj);
        
            //var str = sprintf("%10s %5d %5d %10.2f", name, budget, sum_hours, (sum_hours/budget*100).toFixed(2)); 
            //console.log(str);
            //var str = sprintf("%5s %5d",  name, budget);
            //console.log(str);
        }); 
    });
  }
})
