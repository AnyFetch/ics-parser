'use strict';

require('should');

var fs = require('fs');

var ics = require('../lib');

describe('Check parsing results', function() {
  it('should load 9 events', function(done) {
    fs.readFile("./test/samples/calendar.ics", function(err, data) {
      if(err) {
        done(err);
      }

      var events = ics(data.toString());
      events.should.have.lengthOf(9);
      done();
    });
  });

  it('should have good properties value', function(done) {
    fs.readFile("./test/samples/calendar.ics", function(err, data) {
      if(err) {
        done(err);
      }

      var events = ics(data.toString());
      events[0].should.have.property('type', 'VEVENT');
      events[0].should.have.property('name', 'Dyncon 2011');
      events[0].should.have.property('location', 'Stockholm, Sweden');
      events[0].should.have.property('url', 'http://lanyrd.com/2011/dyncon/');
      events[0].should.have.property('uid', 'd4c826dfb701f611416d69b4df81caf9ff80b03a');
      events[0].should.have.property('startDate', new Date(Date.UTC(2011, 2, 12, 20)));
      done();
    });
  });

  it('should read long description', function(done) {
    fs.readFile("./test/samples/longdescription.ics", function(err, data) {
      if(err) {
        done(err);
      }

      var event = ics(data.toString())[0];
      event.description.should.containDeep("\n");
      done();
    });
  });
});
