(function(){
    const template = document.createElement('template');
    template.innerHTML = `<div class="navi-container">
    </div>`;

    class Navigation extends HTMLElement {
        
        constructor() {
            super();
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
        }

        disconnectedCallback() {

        }
    }

    window.customElements.define('navigation-component', Navigation);
})();