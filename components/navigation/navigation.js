(function(){
    const template = document.createElement('template');
    template.innerHTML = `
        <section class="nav-container bottom-margin">
            <div class="nav-icon"></div>
            <div class="nav-entries"></div>
        </section>`;

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