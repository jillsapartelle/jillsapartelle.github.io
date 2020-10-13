
//	dependencies:
//		js/enums.js
//		js/date_extension.js

(function(){

	const template = document.createElement('template');
	template.innerHTML = `
		<div class="month panel">
			<div class="month-title">
				<span>September</span> <span>2020</span>
			</div>
			<div class="month-table">
				<table>
					<thead>
						<tr> <th>Su</th> <th>Mo</th> <th>Tu</th> <th>We</th> <th>Th</th> <th>Fr</th> <th>Sa</th> </tr>
					</thead>
					<tbody>
						<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
						<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
						<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
						<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
						<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
						<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
					</tbody>
				</table>
			</div>
		</div>`;

	class Calendar extends HTMLElement{
	

		constructor(){
			super();
			
			// common values
			this._css = {
				 SELECTED_START_DATE: 'selected-start-date'
				,SELECTED_END_DATE: 'selected-end-date'
				,CURRENT_DATE: 'current-date'
				,AVAILABLE_CELL: 'available-cell'
				,INCLUDED_DATE: 'included-date'
			};

			this._state = {
				 startDate: null
				,endDate: null
				,value: null // Date: corresponds to the year and month of the calendar
			};
		}
		
		connectedCallback(){
			this.appendChild(template.content.cloneNode(true));
			this._addEventListeners();
			this._render();
		}
		
		disconnectedCallback(){
			this._removeEventListeners();
		}
		
		
		//----- private methods -----

		_render() {

			let today = new Date();
			
			if(!this._state.value){
				this._state.value = today.startOfMonth();
			}

			let i = 0; // cell index
			let firstDay = this._state.value.getFirstDayOfMonth();
			let lastDay = this._state.value.getDaysCount();
			let dte = 1;

			// remove css for current date
			let el = this.querySelector(`.${this._css.CURRENT_DATE}`);
			if(el) {el.classList.remove(this._css.CURRENT_DATE);}

			this.querySelector('table').querySelectorAll('td').forEach(cell => {

				if(i < firstDay ) { // clear all the days before the start of the month

					this._clearCell(cell);

				} else if(dte <= lastDay) { // these are the available dates

					cell.data = {date:new Date(this._state.value.getFullYear(), this._state.value.getMonth(), dte, 0, 0, 0, 0)};
					cell.innerText = dte;
					cell.classList.add(this._css.AVAILABLE_CELL);

					if(this._isSameDay(cell.data.date, today)) { cell.classList.add(this._css.CURRENT_DATE);}

					dte++;

				} else { // clear all the days after the last day of the month

					this._clearCell(cell);
				}
				i++;
			});

			this._updateCss();

			this._updateMonthTitle();
		}

		_clearCell(cell){
			cell.removeAttribute('class');
			if(cell.data) { cell.data = null; }
			cell.innerText = '';			
		}

		_isSameDay(dte1, dte2){
			if(!dte1 || !dte2) {return false;}
			return dte1.getFullYear() === dte2.getFullYear() && dte1.getMonth() === dte2.getMonth() && dte1.getDate() === dte2.getDate();
		}

		_clearCss(){

			// clear all css
			let el = this.querySelector(`.${this._css.SELECTED_START_DATE}`);
			if(el) {el.classList.remove(this._css.SELECTED_START_DATE);}

			el = this.querySelector(`.${this._css.SELECTED_END_DATE}`);
			if(el) {el.classList.remove(this._css.SELECTED_END_DATE);}

			this.querySelectorAll(`.${this._css.INCLUDED_DATE}`).forEach(cell => cell.classList.remove(this._css.INCLUDED_DATE));
		}

		_updateCss() {

			this._clearCss();

			this.querySelector('table').querySelectorAll('td').forEach(cell => {
				if(cell.data && cell.data.date) {
					if(this._isSameDay(cell.data.date, this._state.startDate)) {
						cell.classList.add(this._css.SELECTED_START_DATE);
					} else if(this._isSameDay(cell.data.date, this._state.endDate)) {
						cell.classList.add(this._css.SELECTED_END_DATE);
					} else if(cell.data.date > this._state.startDate && cell.data.date < this._state.endDate) {
						cell.classList.add(this._css.INCLUDED_DATE);
					}
				}
			});
		}
		
		_addEventListeners(){
			this._boundOnClick = this._onClick.bind(this);
			let tbody = this.querySelector('tbody');
			if(tbody) {
				tbody.addEventListener('click', this._boundOnClick);
			}
			
		}
		
		_updateMonthTitle(){
			let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			let monthTitle = this.querySelector('.month-title');
			if(monthTitle) {
				monthTitle.children[0].innerText = monthName[this._state.value.getMonth()];
				monthTitle.children[1].innerText = this._state.value.getFullYear();
			}
		}
		
		_onClick(evt){
			if(evt.target.data){
				this._selectDate(evt.target.data.date);
			}
		}
		
		_removeEventListeners(){
			let tbody = this.querySelector('tbody');
			if(tbody) {
				tbody.removeEventListener('click', this._boundOnClick);
			}
		}
		
		_selectDate(dte){
			if( (!this._state.startDate) || this._state.startDate > dte) {
				this._state.startDate = dte;
				this._state.endDate = null;
			} else {
				this._state.endDate = dte;
			}

			this._updateCss();			
			this.dispatchEvent(new CustomEvent('dateSelected', {detail:dte}));
		}
		
		//----- public methods

		// param: {startDate, endDate}
		setDates(param){
			this._state.startDate = param.startDate;
			this._state.endDate = param.endDate;
			this._updateCss();
		}
		
		//----- getters and setters
				
		set value(val){
			this._state.value = val.startOfMonth();
			this._render();
		}
	
		get startDate(){
			return this._state.startDate;
		}
		
		get endDate(){
			return this._state.endDate;
		}

		get value() {
			return this._state.value.clone();
		}
		
	}
	
	window.customElements.define('calendar-component', Calendar);
})();