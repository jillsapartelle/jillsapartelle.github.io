//  dependencies
//    js/enums.js


(function(){

    let d = document;

    let els = {
         carousel: d.getElementById('calendarCarousel')
        ,calIconCheckIn: d.getElementById('calIconCheckIn')
        ,checkInSelect: d.getElementById('checkInSelect')
        ,calIconCheckOut: d.getElementById('calIconCheckOut')
        ,checkOutSelect: d.getElementById('checkOutSelect')
        ,overlay: d.getElementById('overlay')
    };

    function addEventListeners() {
        els.carousel.addEventListener('startDateSelected', onStartDateSelected);
        els.carousel.addEventListener('endDateSelected', onEndDateSelected);
        els.carousel.addEventListener('closeCarousel', onCarouselClose);
        
        els.checkInSelect.addEventListener('click', onClickCheckInSelect);
        els.checkOutSelect.addEventListener('click', onClickCheckOutSelect);
    }

    function dateString(dte) {
        return `${DAY_STRING[dte.getDay()]}, ${MONTH_STRING[dte.getMonth()]} ${dte.getDate()} ${dte.getFullYear()}`;
    }

    function showCarousel(){
        els.carousel.classList.remove('hidden');
    }

    function hideCarousel(){
        els.carousel.classList.add('hidden');
    }

    //----- event listeners

    function onCarouselClose(evt) {
        hideCarousel();
    }

    function onClickCheckInSelect(evt) {
        els.carousel.startDate = null;
        els.calIconCheckIn.value = null;
        els.calIconCheckOut.value = null;
        els.carousel.visibleCalendar = (new Date()).startOfMonth();
        setDateDisplay(els.checkOutSelect, null);
        setDateDisplay(els.checkInSelect, null);
        showCarousel();
    }

    function onClickCheckOutSelect(evt) {
        els.carousel.endDate = null;
        els.calIconCheckOut.value = null;
        setDateDisplay(els.checkOutSelect, null);
        showCarousel();
    }

    function onStartDateSelected(evt) {
        els.calIconCheckIn.value = evt.detail;
        els.calIconCheckOut.value = null;

        setDateDisplay(els.checkInSelect, evt.detail);
    }

    function onEndDateSelected(evt) {
        els.calIconCheckOut.value = evt.detail;
        setDateDisplay(els.checkOutSelect, evt.detail);
    }

    function setDateDisplay(el, dte) {
        if(el === els.checkInSelect) {
            el.innerText = dte ? dateString(dte) : "Check In";
        } else {
            el.innerText = dte ? dateString(dte) : "Check Out";
        }

        dte ? el.classList.add('withSelectedDate') : el.classList.remove('withSelectedDate');
    }


    function init() {
        addEventListeners();
    }

    init();

})();
