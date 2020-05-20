(function() {
    // Horizontal Timeline - by CodyHouse.co
    // find the original at https://codyhouse.co/demo/horizontal-timeline/index.html

    // timeline obj
    var HorizontalTimeline = function(element) {
        this.element = element;
        this.datesContainer = this.element.getElementsByClassName('cd-h-timeline__dates')[0];
        this.line = this.datesContainer.getElementsByClassName('cd-h-timeline__line')[0]; // black line in the top timeline section
        this.date = this.line.getElementsByClassName('cd-h-timeline__date'); // elements in the timeline
        this.selectedDate = this.line.getElementsByClassName('cd-h-timeline__date--selected')[0]; // chosen element
        this.navigation = this.element.getElementsByClassName('cd-h-timeline__navigation');
        this.contentWrapper = this.element.getElementsByClassName('cd-h-timeline__events')[0];
        this.content = this.contentWrapper.getElementsByClassName('cd-h-timeline__event');

        // 360 = 3 on desktop-tablet, 190 = 5 on desktop and 3 on tablet, ALL have 1 on mobile
        this.eventsDistance = 190; // distance between events
        this.isDesktop = false;
        this.view = window.matchMedia("(min-width: 1024px)");
        if (this.view.matches) {
            this.isDesktop = true;
        }

        this.translate = 0; // this will be used to store the translate value of this.line
        this.lineLength = 0; //total length of this.line

        // store index of selected and previous selected dates
        this.oldDateIndex = Util.getIndexInArray(this.date, this.selectedDate);
        this.newDateIndex = this.oldDateIndex;

        initTimeline(this);
        initEvents(this);

    };

    function initTimeline(timeline) {
        // set dates left position
        // first element offset
        // 5 is arbitrary, just needed enough left and right padding to translate timeline well
        var left = timeline.eventsDistance * 5;

        for (var i = 0; i < timeline.date.length; i++) {
            left += timeline.eventsDistance;
            // set offset inbetw each element
            timeline.date[i].setAttribute('style', 'left:' + left + 'px');
        }
        // set line/filling line dimensions
        // eventsDistance * 5 for overflow on x to fill the whole line
        timeline.line.style.width = (left + timeline.eventsDistance * 5) + 'px';
        timeline.lineLength = left;
        // reveal timeline
        Util.addClass(timeline.element, 'cd-h-timeline--loaded');
        selectNewDate(timeline, timeline.selectedDate);
        resetTimelinePosition(timeline, 'next');
    };

    function initEvents(timeline) {
        var self = timeline;
        // click on arrow navigation
        self.navigation[0].addEventListener('click', function(event) {
            event.preventDefault();
            // translateTimeline(self, 'prev'); // this was used to navigate without selecting new element
            // select new element on right arrow click
            var selectedIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
            if (selectedIndex != 0) {
                // left bounds check
                selectNewDate(self, self.date[selectedIndex - 1]);
            }
        });
        self.navigation[1].addEventListener('click', function(event) {
            event.preventDefault();
            // translateTimeline(self, 'next');
            // select new element on left arrow click
            var selectedIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
            if (selectedIndex != self.date.length - 1) {
                // right bounds check
                selectNewDate(self, self.date[selectedIndex + 1]);
            }
        });

        //swipe on timeline
        new SwipeContent(self.datesContainer);
        self.datesContainer.addEventListener('swipeLeft', function(event) {
            // translateTimeline(self, 'next');
            // select new element on right arrow click
            var selectedIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
            if (selectedIndex != 0) {
                // left bounds check
                selectNewDate(self, self.date[selectedIndex - 1]);
            }
        });
        self.datesContainer.addEventListener('swipeRight', function(event) {
            // translateTimeline(self, 'prev');
            var selectedIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
            if (selectedIndex != self.date.length - 1) {
                // right bounds check
                selectNewDate(self, self.date[selectedIndex + 1]);
            }
        });

        //select a new event
        for (var i = 0; i < self.date.length; i++) {
            (function(i) {
                self.date[i].addEventListener('click', function(event) {
                    event.preventDefault();
                    selectNewDate(self, event.target);
                });

                self.content[i].addEventListener('animationend', function(event) {
                    if (i == self.newDateIndex && self.newDateIndex != self.oldDateIndex) resetAnimation(self);
                });
            })(i);
        }
    };

    // translate timeline (and date elements)
    function translateTimeline(timeline, direction) {
        // var containerWidth = timeline.datesContainer.offsetWidth;

        var before = timeline.translate

        if (direction == 'next') {
            timeline.translate -= timeline.eventsDistance
        } else if (direction == 'prev') {
            timeline.translate += timeline.eventsDistance
        }

        // console.log("called", timeline.translate, timeline.lineLength)

        if (timeline.isDesktop) {
            // desktop js
            // Right Bound
            if (timeline.translate < 0) {
                if (timeline.translate * -1 + timeline.eventsDistance > timeline.lineLength) {
                    // don't let last element extend left of middle of the screen
                    timeline.translate = before;
                    // console.log(timeline.translate);
                } else {
                    // console.log(timeline.translate);
                    timeline.line.style.transform = 'translateX(' + timeline.translate + 'px)';

                    // OLD WAY, keeping for potential reference in future
                    // new way found in selectNewDate() function
                    // update the navigation items status (toggle inactive class)
                    // handle left side nav arrow status
                    // (timeline.translate * -1 < timeline.eventsDistance) ? Util.addClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive'): Util.removeClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive');

                    // handle right side nav arrow status
                    // OLD WAY, keeping for potential reference in future
                    // (timeline.translate * -1 + timeline.eventsDistance > timeline.date.length * timeline.eventsDistance) ? Util.addClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive'): Util.removeClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive');
                }
            } else {
                timeline.translate = before;
            }
        } else {
            // tablet and mobile js
            // Right Bound
            if (timeline.translate < 0) {
                if (timeline.translate * -1 > timeline.lineLength) {
                    // don't go past last element
                    timeline.translate = before;
                } else if (timeline.translate + timeline.eventsDistance > 0) {
                    // left bound
                    timeline.translate = before;
                } else {
                    // console.log(timeline.translate);
                    timeline.line.style.transform = 'translateX(' + timeline.translate + 'px)';
                }
            } else {
                timeline.translate = before;
            }
        }

    };

    // new date has been selected -> update timeline
    function selectNewDate(timeline, target) {
        timeline.newDateIndex = Util.getIndexInArray(timeline.date, target);
        timeline.oldDateIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
        Util.removeClass(timeline.selectedDate, 'cd-h-timeline__date--selected');
        Util.addClass(timeline.date[timeline.newDateIndex], 'cd-h-timeline__date--selected');
        timeline.selectedDate = timeline.date[timeline.newDateIndex];
        updateVisibleContent(timeline);

        // toggle left and right navigation
        // handle left side nav arrow status
        timeline.newDateIndex === 0 ? Util.addClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive') : Util.removeClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive');

        // handle right side nav arrow status
        (timeline.newDateIndex === timeline.date.length - 1) ? Util.addClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive'): Util.removeClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive');

        // determine distance to translate
        var newDate = timeline.newDateIndex + 1;
        var oldDate = timeline.oldDateIndex + 1;
        var amountToTranslate = Math.abs(newDate - oldDate);
        if (timeline.newDateIndex > timeline.oldDateIndex) {
            // moving to the right
            if (amountToTranslate === 1) {
                translateTimeline(timeline, "next");
            } else {
                for (var i = 0; i < amountToTranslate; i++) {
                    translateTimeline(timeline, "next");
                }
            }
        } else {
            // moving to the left
            if (amountToTranslate === 1) {
                translateTimeline(timeline, "prev");
            } else {
                for (var i = 0; i < amountToTranslate; i++) {
                    translateTimeline(timeline, "prev");
                }
            }
        }
    };

    // show content of new selected date
    function updateVisibleContent(timeline) {
        if (timeline.newDateIndex > timeline.oldDateIndex) {
            var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-right',
                classLeaving = 'cd-h-timeline__event--leave-left';
        } else if (timeline.newDateIndex < timeline.oldDateIndex) {
            var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-left',
                classLeaving = 'cd-h-timeline__event--leave-right';
        } else {
            var classEntering = 'cd-h-timeline__event--selected',
                classLeaving = '';
        }

        Util.addClass(timeline.content[timeline.newDateIndex], classEntering);
        if (timeline.newDateIndex != timeline.oldDateIndex) {
            Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--selected');
            Util.addClass(timeline.content[timeline.oldDateIndex], classLeaving);
            timeline.contentWrapper.style.height = timeline.content[timeline.newDateIndex].offsetHeight + 'px';
        }
    };

    // reset content classes when entering animation is over
    function resetAnimation(timeline) {
        timeline.contentWrapper.style.height = null;
        Util.removeClass(timeline.content[timeline.newDateIndex], 'cd-h-timeline__event--enter-right cd-h-timeline__event--enter-left');
        Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--leave-right cd-h-timeline__event--leave-left');
    };

    // javascript stops animating when moving too fast with keynavigatetimeline
    // navigate the timeline using the keyboard
    function keyNavigateTimeline(timeline, direction) {
        var newIndex = (direction == 'next') ? timeline.newDateIndex + 1 : timeline.newDateIndex - 1;
        if (newIndex < 0 || newIndex >= timeline.date.length) return;
        // console.log(newIndex);
        selectNewDate(timeline, timeline.date[newIndex]);
        resetTimelinePosition(timeline, direction);
    };

    //translate timeline according to new selected event position
    function resetTimelinePosition(timeline, direction) {
        var eventStyle = window.getComputedStyle(timeline.selectedDate, null),
            eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
            timelineWidth = timeline.datesContainer.offsetWidth;

        if ((direction == 'next' && eventLeft >= timelineWidth - timeline.translate) || (direction == 'prev' && eventLeft <= -timeline.translate)) {
            timeline.translate = timelineWidth / 2 - eventLeft;
            translateTimeline(timeline, false);
        }
    };

    window.HorizontalTimeline = HorizontalTimeline;
    // init timeline
    generateTimeline();

    // to regenerate timeline on window resize
    window.addEventListener("resize", generateTimeline);

    var horizontalTimeline;
    var horizontalTimelineTimelineArray;

    // create the timeline
    function generateTimeline() {
        horizontalTimeline = document.getElementsByClassName('js-cd-h-timeline');
        horizontalTimelineTimelineArray = [];
        if (horizontalTimeline.length > 0) {
            for (var i = 0; i < horizontalTimeline.length; i++) {
                horizontalTimelineTimelineArray.push(new HorizontalTimeline(horizontalTimeline[i]));
            }
        };
    }

    // navigate the timeline when inside the viewport using the keyboard
    document.addEventListener('keydown', function(event) {
        if ((event.keyCode && event.keyCode == 39) || (event.key && event.key.toLowerCase() == 'arrowright')) {
            updateHorizontalTimeline('next'); // move to next event
        } else if ((event.keyCode && event.keyCode == 37) || (event.key && event.key.toLowerCase() == 'arrowleft')) {
            updateHorizontalTimeline('prev'); // move to prev event
        }
    });

    function updateHorizontalTimeline(direction) {
        for (var i = 0; i < horizontalTimelineTimelineArray.length; i++) {
            if (elementInViewport(horizontalTimeline[i])) keyNavigateTimeline(horizontalTimelineTimelineArray[i], direction);
        }
    };

    /*
    	  How to tell if a DOM element is visible in the current viewport?
    	  http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
      */
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }
}());