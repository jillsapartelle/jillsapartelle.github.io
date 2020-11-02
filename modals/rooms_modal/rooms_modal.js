(function(){

    const template = document.createElement('template');
    template.innerHTML = `
        <div class="overlay">
            <div class="rooms-section modal-content panel">

                <section class="ok-container">
                    <button class="button-ok modal-button">Ok</button>
                </section>
            </div>

        </div>
    `;

    class Rooms extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            this._els = {
                 roomsSection: this.querySelector('.rooms-section')
                ,okContainer: this.querySelector('.ok-container')
            };
        }

        disconnectedCallback() {

        }

        //----- private methods
        _getRoomNode(room) {
            template.innerHTML = `
                <div class="room">
                    <img src="img/${room.Room}.jpg" class="bottom-margin">
                    <div class="room-properties">
                        <span>${room.Description}</span>
                        <div class="with-icon">
                            <img src="icons/group-24px.svg">
                            <span>${room.Occupancy}</span>
                        </div>

                        <div class="with-icon">
                            <img src="icons/settings_overscan-24px.svg">
                            <span>${room.Size}</span>
                        </div>
                    </div>
                </div>
            `;

            return template.content.cloneNode(true);
        }

        //----- public methods
        async updateAvailableRooms() {
            let rooms = await window.api.rooms.doGet();
            rooms.forEach(room => {
                //this._els.roomsSection.appendChild(this._getRoomNode(room));
                this._els.roomsSection.insertBefore(this._getRoomNode(room), this._els.okContainer);
            });
            
        }
    }

    window.customElements.define('rooms-modal', Rooms);

})();