// dependencies: 
//    components/calendar

(function(){

        const template = document.createElement('template');
        template.innerHTML = `<div class="calendar-carousel"></div>`;

        

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

                if( ! this._state.visibleCalendar){
                    this._state.visibleCalendar = new Date();
                }


                this._reset();
                this._addEventListeners();
            }

            disconnectedCallback() {
                this._removeEventListeners();
            }

            //----- private methods

            _addEventListeners() {

            }

            _removeEventListeners() {

            }

            _render() {
                
            }

            _reset() {
                // add the current month's calendar
                let dte = new Date();
                this.appendChild(this._newCalendar(dte));

                this._state.visibleCalendar = dte;

                // add the next 2 month's calendar
                for(let i = 0; i < 2; i++) {
                    dte = dte.nextMonth();
                    this.appendChild(this._newCalendar(dte));
                }
            }

            _previous() {
                if(this._state.visibleCalendar.isCurrentMonth()) return;

                // add a calendar at the start of the carousel
                if(this.children.length > 0) {
                    this.insertBefore(this._newCalendar(this._state.visibleCalendar.previousMonth()), this.firstChild);
                }

                // remove the last child
                if(this.lastChild) {
                    this.lastChild.remove();
                }

                this._state.visibleCalendar = this._state.visibleCalendar.previousMonth();
            }

            _next() {
                
                // add a calendar to the end of the carousel
                let lastCalendar = this.lastChild;
                if( ! lastCalendar) {
                    return;
                }

                this.appendChild(this._newCalendar(lastCalendar.value.nextMonth()));

                // remove the first calendar
                if(this.firstChild) {
                    this.firstChild.remove();
                }

                this._state.visibleCalendar = this._state.visibleCalendar.nextMonth();
            }

            _newCalendar(dte) {
                let cal = document.createElement('calendar-component');
                cal.init({year:dte.getFullYear(), month: dte.getMonth()});
                return cal;
            }


            //----- public methods

            //----- getters and setters

            /**
             * @param {Date} val
             */
            set startDate(val) {

            }

            /**
             * @param {Date} val
             */
            set endDate(val) {

            }

            set visibleCalendar(val) {
                this._setVisibleCalendar(val);
            }
        }

        window.customElements.define('calendar-carousel-component', CalendarCarousel);
})()