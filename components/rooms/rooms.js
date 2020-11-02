(function(){

    const template = document.createElement('template');
    template.innerHTML = `
        <section class="rooms bottom-margin">
            <div class="select-room with-icon">
                <img src="icons/night_shelter-24px.svg">
                <span>Available Rooms</span>
            </div>
        </section>    
    `;

    class Rooms extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            this._state = {
                 adultCount: 0
                ,childCount: 0
            };

            this._els = {
                selectRoom: this.querySelector('.select-room')
            };

           this._addEventListeners();

        }

        disconnectedCallback() {

        }

        _addEventListeners() {
            this._els.selectRoom.addEventListener('click', this._onSelectRoomClicked.bind(this));
        }

        _onSelectRoomClicked(evt) {
            this.dispatchEvent(new Event('selectRoomClicked'));
        }

        set adultCount(val) {
            this._state.adultCount = val;
        }

        set childCount(val) {
            this._state.childCount = val;
        }
    }

    window.customElements.define('rooms-component', Rooms);

})();