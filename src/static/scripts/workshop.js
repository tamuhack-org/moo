      /**
      * Adds time to a date. Modelled after MySQL DATE_ADD function.
      * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
      * https://stackoverflow.com/a/1214753/18511
      * 
      * @param date  Date to start with
      * @param interval  One of: year, quarter, month, week, day, hour, minute, second
      * @param units  Number of units of the given interval to add.
      */
      function dateAdd(date, interval, units) {
        var ret = new Date(date); //don't change original date
        var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
        switch(interval.toLowerCase()) {
          case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
          case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
          case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
          case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
          case 'day'    :  ret.setDate(ret.getDate() + units);  break;
          case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
          case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
          case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
          default       :  ret = undefined;  break;
        }
        return ret;
      }
      /* parsing the dates, checking for dst at the time and adding current timezone for an accurate time is such a pain */
      $(document).ready(function(){
        Date.prototype.stdTimezoneOffset = function () {
          var jan = new Date(this.getFullYear(), 0, 1);
          var jul = new Date(this.getFullYear(), 6, 1);
          return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }  

        Date.prototype.isDstObserved = function () {
          return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }
        var today = new Date();
        if (today.isDstObserved) {
          console.log("eightants");
        }
        function parseDateLocal(s) {
          var b = s.split(/\D/);
          return new Date(b[0], b[1]-1, b[2], b[3], b[4], b[5]);
        }
        /* gets event info from api and parses it to populate card*/
        /* month and week abbreviations for display */
        const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const cardsCon = document.querySelector(".workshopdiv");
        // time_filter=current_future to only show future events
        $.get("https://www.eventbriteapi.com/v3/users/me/events/?time_filter=all&token=LEJRQSQVIQNZ7Q4BM67C", function(data){
          /* sorts array of events from api */
          var cardsArr = [];
          var currEve = data.events;
          currEve.sort(function compare(a, b) {
            var dateA = new Date(a.start.local);
            var dateB = new Date(b.start.local);
            return dateA - dateB;
          });
          var counter = 0;
          for (var i = 0; i < currEve.length; i++) {
            /* somehow right after this line, i = 8 for everything */
            $.get("https://www.eventbriteapi.com/v3/events/"+ currEve[i].id + "/?token=LEJRQSQVIQNZ7Q4BM67C", function(data){
              // console.log(data);
              var event = data;
              // data is the current event
              // gets location object for the event
              $.get("https://www.eventbriteapi.com/v3/venues/"+ event.venue_id + "/?token=LEJRQSQVIQNZ7Q4BM67C", function(data){
                var venue = data;
                /* parse start date */
                var date = parseDateLocal(event.start.local);
                if (date.isDstObserved()) {
                  date = dateAdd(date, "minute", -300);
                } else {
                  date = dateAdd(date, "minute", -360);
                }
                var dateHourStart = date.getHours();
                var timeTextStart = "am";
                if (date.getHours() > 12) {
                  dateHourStart = date.getHours() - 12;
                  timeTextStart = "pm";
                } else if (date.getHours() == 0) {
                  dateHourStart = 12;
                }
                var dateMinStart = date.getMinutes();
                if (date.getMinutes() < 10) {
                  a = "00";
                  dateMinStart = a.concat(date.getMinutes());
                  dateMinStart = dateMinStart.slice(-2);
                }
                /* parse end date */
                var dateEnd = parseDateLocal(event.end.local);
                if (dateEnd.isDstObserved()) {
                  dateEnd = dateAdd(dateEnd, "minute", -300);
                } else {
                  dateEnd = dateAdd(dateEnd, "minute", -360);
                }
                var dateHourEnd = dateEnd.getHours();
                var timeTextEnd = "am";
                if (dateEnd.getHours() > 12) {
                  dateHourEnd = dateEnd.getHours() - 12;
                  timeTextEnd = "pm";
                } else if (dateEnd.getHours() == 0) {
                  dateHourEnd = 12;
                }
                var dateMinEnd = dateEnd.getMinutes();
                if (dateEnd.getMinutes() < 10) {
                  a = "00";
                  dateMinEnd = a.concat(dateEnd.getMinutes());
                  dateMinEnd = dateMinEnd.slice(-2);
                }
                var blob = new Object();
                blob.text =         '<!-- Individual card -->\
          <div class="" style="">\
            <div class="toprow" style="">\
              <!-- Left Date -->\
              <div class="largedate" style="">\
                <p style="font-size: 36px; padding-bottom: 0px; margin-bottom: 5px;">' + date.getDate() + '</p>\
                <p>' + MONTHS[date.getMonth()] + '</p>\
              </div>\
              <!-- Meta Information -->\
              <div class="smallinfo" style="">\
                <div class="workshoptitle" style="">' + event.name.text + '</div>\
                <div class="location" style="">' + WEEK[date.getDay()] + ', ' + dateHourStart + ':' + dateMinStart + timeTextStart + ' - ' + dateHourEnd+ ':' + dateMinEnd + timeTextEnd + '<br />' + venue.name  +'</div>\
              </div>\
            </div>\
            <div class="bottomrow" style="">\
              <a href="' + event.url + '"><div class="rsvp" style="">\
                <img src="./static/assets/rsvp.svg" width="30" height="30" style="display: block; margin: auto;" alt=""/>\
                <div style="margin-top: 16px; color: #3782F2;">\
                RSVP\
                </div></a>\
              </div>\
              <div class="workshopdesc" style="">' + event.summary + '...' + '</div>\
            </div>\
          </div>';
                blob.date = date.getTime();
                cardsArr.push(blob);
                counter += 1;
                if (counter == 8) {
                  /* sorts array of card node objects, somehow sorting it before iterating still leads to randomness */
                  cardsArr.sort(function compare(a, b) {
                    var dateA = a.date;
                    var dateB = b.date;
                    return dateA - dateB;
                  });
                  for (var k = 0; k < cardsArr.length; k++) {
                    // creates card node with all the information and adds it to the card container
                    var card = document.createElement("div");
                    card.className = "card ";
                    card.innerHTML = cardsArr[k].text;
                    cardsCon.appendChild(card);
                  }
                }
              });
            });
          } 
        });
      })