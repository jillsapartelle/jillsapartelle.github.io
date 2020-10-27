(function(){

    const template = document.createElement('template');
    template.innerHTML = `
        <div class="banner-container">
            <div class="banner">
                <img src="img/mountain_sunrise.png" height="20">
                <span>Jill's Apartelle</span>
            </div>
            <div class="location">
                <span>Tagaytay</span>
            </div>
        </div>
        <div class="address">
            <div>
                <span>G. Tionloc, Padua Street Brgy Neogan</span>
                <span>E. Aguinaldo Highway</span>
                <span>Tagaytay Batangas, 4123 Cavite</span>
            </div>
        </div>`;

    class Banner extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
        }

        disconnectedCallback() {

        }
    }

    window.customElements.define('banner-component', Banner);

})();