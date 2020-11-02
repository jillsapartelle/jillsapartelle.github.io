(function(){

    let d = document;
    let els = {
         calendarModal: d.getElementById('calendarModal')
        ,bookingInfoComponent: d.getElementById('bookingInfoComponent')
        ,guestsModal: d.getElementById('guestsModal')
        ,roomsModal: d.getElementById('roomsModal')
        ,roomsComponent: d.getElementById('roomsComponent')
    };

    function addEventListeners() {
        els.bookingInfoComponent.addEventListener('selectDatesClicked', onSelectDatesClicked);
        els.bookingInfoComponent.addEventListener('selectGuestCountClicked', onSelectGuestCountClicked);
        els.calendarModal.addEventListener('onOk', onCalendarOk);
        els.guestsModal.addEventListener('onOk', onGuestsModalOk);

        els.roomsComponent.addEventListener('selectRoomClicked', onSelectRoom);
    }

    function onCalendarOk(evt) {
        els.calendarModal.classList.add('hidden');
        els.bookingInfoComponent.selectedDates = evt.detail;

    }

    function onSelectDatesClicked(evt) {
        els.calendarModal.classList.remove('hidden');
    }

    function onSelectGuestCountClicked(evt) {
        els.guestsModal.classList.remove('hidden');
        
    }

    function onSelectRoom(evt) {
        els.roomsModal.updateAvailableRooms();
        els.roomsModal.classList.remove('hidden');
    }

    function onGuestsModalOk(evt) {
        els.guestsModal.classList.add('hidden');
        els.bookingInfoComponent.guestCount = {adults:evt.detail.adults, children:evt.detail.children};
    }

    function init() {
        addEventListeners();
    }

    init();

})();