// dependencies: 
//    components/calendar

(function(){

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="close-container"><button class="close">x</button></div>
            <div class="prev-next-container"><div class="prev-next"><button class="prev"></button><button class="next"></button></div></div>
            <div class="calendars"></div>`;

        

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
                let c = this._els.calendars;
                c.appendChild(this._newCalendar(dte));

                this._state.visibleCalendar = dte;

                // add the next 2 month's calendar
                for(let i = 0; i < 2; i++) {
                    dte = dte.nextMonth();
                    c.appendChild(this._newCalendar(dte));
                }
            }

            _previous() {
                if(this._state.visibleCalendar.isCurrentMonth()) return;

                let c = this._els.calendars;

                // add a calendar at the start of the carousel
                if(c.children.length > 0) {
                    c.insertBefore(this._newCalendar(this._state.visibleCalendar.previousMonth()), c.firstChild);
                }

                // remove the last child
                if(c.lastChild) {
                    c.lastChild.remove();
                }

                this._state.visibleCalendar = this._state.visibleCalendar.previousMonth();
            }

            _next() {
                
                let c = this._els.calendars;

                // add a calendar to the end of the carousel
                let lastCalendar = c.lastChild;
                if( ! lastCalendar) {
                    return;
                }

                c.appendChild(this._newCalendar(lastCalendar.value.nextMonth()));

                // remove the first calendar
                if(c.firstChild) {
                    c.firstChild.remove();
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