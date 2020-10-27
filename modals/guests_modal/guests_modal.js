(function(){
    const template = document.createElement('template');
    template.innerHTML = `
        <div class="overlay">
            <section class="guests-container">
                <div class="adults">
                    <label for="adults">Adults</label>
                    <input type="number" name="adults">
                </div>
                <div class="children">
                    <label for="children">Children(0 - 17y/o)</label>
                    <input type="number" name="children">
                </div>
            </section>
            <section class="ok-container">
                <button class="button-ok modal-button">Ok</button>
            </section>
        </div>
    `;

    class Guests extends HTMLElement {
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
                 btnOk: this.querySelector('.button-ok')
                ,children: this.querySelector('.children input')
                ,adults: this.querySelector('.adults input')
            };
        }

        _addEventListeners() {
            this._els.btnOk.addEventListener('click', this._onOk.bind(this));
        }

        _onOk(evt) {
            let data = {
                 adults: this._els.adults.value
                ,children: this._els.children.value
            };
            this.dispatchEvent(new CustomEvent('onOk', {detail:data}));
        }
    }

    window.customElements.define('guests-modal', Guests);
})();