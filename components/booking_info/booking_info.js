(function(){

    const template = document.createElement('template');
    template.innerHTML = `
        <section class="dates-guests">
            <div class="select-dates with-icon clickable">
                <img src="icons/date_range-24px.svg">
                <span>Select dates</span>
            </div>
            <div class="select-guest-count with-icon clickable">
                <img src="icons/portrait-24px.svg">
                <span>Number of guests</span>
            </div>
        </section>`;

    class BookingInfo extends HTMLElement {

        constructor() {
            super();
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            this._els = {
                 selectDates: this.querySelector('.select-dates')
                ,selectGuestCount: this.querySelector('.select-guest-count > span')
                ,selectDatesDisplay: this.querySelector('.select-dates > span')
            };

            this._addEventListeners();

            this._state = {};
        }

        disconnectedCallback() {

        }

        _addEventListeners() {
            this._els.selectDates.addEventListener('click', this._onSelectDatesClicked.bind(this));
            this._els.selectGuestCount.addEventListener('click', this._onSelectGuestCountClicked.bind(this));
        }

        _onSelectDatesClicked() {
            this.dispatchEvent(new Event('selectDatesClicked'));

        }

        _onSelectGuestCountClicked() {
            this.dispatchEvent(new Event('selectGuestCountClicked'));
        }

        set selectedDates(val) {
            if(val && val.startDate && val.endDate) {
                this._els.selectDatesDisplay.innerText = `${val.startDate.toCustomString()} - ${val.endDate.toCustomString()}`;
                this._state.selectedDates = val;
            }
        }

        set guestCount(val) {
            this._els.selectGuestCount.innerText = `${val.adults} Adults, ${val.children} Children`;
            this._state.guestCount = val;
        }

        get selectedDates() {
            return this._state.selectDates;
        }

        get guestCount() {
            return this._state.guestCount;
        }
    }

    window.customElements.define('booking-info-component', BookingInfo)

})();