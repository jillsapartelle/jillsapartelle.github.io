(function(){
    let d = document;
    const template = d.createElement('template');
    template.innerHTML = `
        <div class="overlay">

            <div class="calendar-container">
        
                <section class="start-end-calendar-container" >

                    <div id="checkInContainer">
                        <calendar-icon-component id="calIconCheckIn" class="calendar-icon"></calendar-icon-component>
                        <span id="checkInSelect" class="noSelectedDate">Check In</span>
                    </div>

                    <div id="checkOutContainer">
                        <calendar-icon-component id="calIconCheckOut" class="calendar-icon"></calendar-icon-component>
                        <span id="checkOutSelect" class="noSelectedDate">Check Out</span>
                    </div>
                    
                </section>

                <section class="carousel-container">
                    <calendar-carousel-component id="calendarCarousel"></calendar-carousel-component>
                </section>
                
                <section class="ok-container">
                    <button class="button-ok modal-button">Ok</button>
                </section>
            </div>
        </div> 
    `;

    class CalendarModal extends HTMLElement {

        constructor() {
            super();
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            this._els = this._getElements();
            this._addEventListeners();
        }

        disconnectedCallback() {

        }

        _getElements() {
            return {
                carousel: d.getElementById('calendarCarousel')
               ,calIconCheckIn: d.getElementById('calIconCheckIn')
               ,checkInSelect: d.getElementById('checkInSelect')
               ,calIconCheckOut: d.getElementById('calIconCheckOut')
               ,checkOutSelect: d.getElementById('checkOutSelect')
               ,btnOk: this.querySelector('.button-ok')
           };
        }


        _addEventListeners() {
            this._els.carousel.addEventListener('startDateSelected', this._onStartDateSelected.bind(this));
            this._els.carousel.addEventListener('endDateSelected', this._onEndDateSelected.bind(this));
            
            this._els.checkInSelect.addEventListener('click', this._onClickCheckInSelect.bind(this));
            this._els.checkOutSelect.addEventListener('click', this._onClickCheckOutSelect.bind(this));

            this._els.btnOk.addEventListener('click', this._onClickBtnOk.bind(this));
        }

        _dateString(dte) {
            return `${DAY_STRING[dte.getDay()]}, ${MONTH_STRING[dte.getMonth()]} ${dte.getDate()} ${dte.getFullYear()}`;
        }

        _onClickBtnOk(evt) {
            let data = {
                startDate: this._els.carousel.startDate,
                endDate: this._els.carousel.endDate
            };
            this.dispatchEvent(new CustomEvent('onOk', {detail:data}));
        }

        _onClickCheckInSelect(evt) {
            this._els.carousel.startDate = null;
            this._els.calIconCheckIn.value = null;
            this._els.calIconCheckOut.value = null;
            this._els.carousel.visibleCalendar = (new Date()).startOfMonth();
            this._setDateDisplay(this._els.checkOutSelect, null);
            this._setDateDisplay(this._els.checkInSelect, null);
        }
    
        _onClickCheckOutSelect(evt) {
            this._els.carousel.endDate = null;
            this._els.calIconCheckOut.value = null;
            this._setDateDisplay(this._els.checkOutSelect, null);
        }
    
        _onStartDateSelected(evt) {
            this._els.calIconCheckIn.value = evt.detail;
            this._els.calIconCheckOut.value = null;
    
            this._setDateDisplay(this._els.checkInSelect, evt.detail);
        }
    
        _onEndDateSelected(evt) {
            this._els.calIconCheckOut.value = evt.detail;
            this._setDateDisplay(this._els.checkOutSelect, evt.detail);
        }
    
        _setDateDisplay(el, dte) {
            if(el === this._els.checkInSelect) {
                el.innerText = dte ? this._dateString(dte) : "Check In";
            } else {
                el.innerText = dte ? this._dateString(dte) : "Check Out";
            }
    
            dte ? el.classList.add('withSelectedDate') : el.classList.remove('withSelectedDate');
        }        
    }

    window.customElements.define('calendar-modal', CalendarModal);

})();