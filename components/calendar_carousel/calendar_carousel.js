// dependencies: 
//    components/calendar

(function(){

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="close-container"><button class="close"><img src="icons/cancel-24px.svg"></button></div>
            <div class="prev-next-container">
                <div class="prev-next">
                    <button class="prev"></button>
                </div>
                <div class="prev-next">
                    <button class="next"></button>
                </div>
            </div>
            <div class="calendars">
                <calendar-component></calendar-component>
                <calendar-component></calendar-component>
            </div>`;

        

        class CalendarCarousel extends HTMLElement {

            constructor() {
                super();
                
                this._state = {
                     startDate: null
                    ,endDate: null
                    ,visibleCalendar: null
                };

            }

            connectedCallback() {

                this.appendChild(template.content.cloneNode(true));

                if( ! this._state.visibleCalendar){
                    this._state.visibleCalendar = new Date();
                }

                this._els = {
                     calendars: this.querySelector('.calendars') 
                    ,close: this.querySelector('.close')
                    ,prev: this.querySelector('.prev')
                    ,next: this.querySelector('.next')
                };

                this._els['firstCal'] = this._els.calendars.firstElementChild;
                this._els['secondCal'] = this._els.calendars.lastElementChild;

                this._render();
                this._addEventListeners();
            }

            disconnectedCallback() {
                this._removeEventListeners();
            }

            //----- private methods

            _addEventListeners() {
                this._onPrevClickBound = this._onPrevClick.bind(this);
                this._els.prev.addEventListener('click', this._onPrevClickBound);

                this._onNextClickBound = this._onNextClick.bind(this);
                this._els.next.addEventListener('click', this._onNextClickBound);

                this._onDateSelectedBound = this._onDateSelected.bind(this);
                this._els.firstCal.addEventListener('dateSelected', this._onDateSelectedBound);
                this._els.secondCal.addEventListener('dateSelected', this._onDateSelectedBound);

                this._els.close.addEventListener('click', this._onClose.bind(this));

            }

            _onClose(evt){
                this.dispatchEvent(new CustomEvent('closeCarousel'));
            }

            _onPrevClick(evt) {
                this._previous();
            }

            _onNextClick(evt) {
                this._next();
            }

            _onDateSelected(evt) {
                let dte = evt.detail;

                if( (!this._state.startDate) || this._state.startDate > dte) {
                    this._setStartDate(dte);
                } else {
                    this._setEndDate(dte);
                }

                this._updateCalendarDates();

            }

            _updateCalendarDates() {
                // update calendars
                this._els.firstCal.setDates({startDate: this._state.startDate, endDate: this._state.endDate});
                this._els.secondCal.setDates({startDate: this._state.startDate, endDate: this._state.endDate});
            }

            _setStartDate(dte) {
                this._state.startDate = dte;
                this._state.endDate = null;
                this.dispatchEvent(new CustomEvent('startDateSelected', {detail:dte}));
            }

            _setEndDate(dte) {
                this._state.endDate = dte;
                this.dispatchEvent(new CustomEvent('endDateSelected', {detail:dte}));
            }

            _removeEventListeners() {
                this._els.prev.removeEventListener(this._onPrevClickBound);
                this._els.next.removeEventListener(this._onNextClickBound);
            }

            _render() {
                this._state.visibleCalendar.isCurrentMonth() ?
                this._els.prev.classList.add('invisible')
                : this._els.prev.classList.remove('invisible');
                //this._els.prev.disabled = this._state.visibleCalendar.isCurrentMonth();
                
                this._els.calendars.children[0].value = this._state.visibleCalendar;
                this._els.calendars.children[1].value = this._state.visibleCalendar.nextMonth();               
            }

            _previous() {
                if(this._state.visibleCalendar.isCurrentMonth()) { return; }
                this._state.visibleCalendar = this._state.visibleCalendar.previousMonth();
                this._render();

            }

            _next() {
                this._state.visibleCalendar = this._state.visibleCalendar.nextMonth();
                this._render();
            }

            //----- public methods

            //----- getters and setters

            /**
             * @param {Date} val
             */
            set startDate(val) {
                this._state.startDate = val;
                this._state.endDate = null;
                this._updateCalendarDates();
            }

            /**
             * @param {Date} val
             */
            set endDate(val) {
                this._state.endDate = val;
                this._updateCalendarDates();
            }

            set visibleCalendar(val) {
                this._state.visibleCalendar = val;
                this._render();
            }
        }

        window.customElements.define('calendar-carousel-component', CalendarCarousel);
})()