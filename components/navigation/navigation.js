(function(){
    const template = document.createElement('template');
    template.innerHTML = `<div class="nav-container">
        <div class="nav-icon"></div>
        <div class="nav-entries"></div>
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