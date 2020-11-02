(function(){

    const template = document.createElement('template');
    template.innerHTML = `
        <section class="guest-details">
        <div class="with-icon">
            <img src="icons/perm_identity-24px.svg">
            <span>Please enter your details</span>
        </div>
        
            <div class="detail">
                <div class="detail-input">
                    <label for="firstname">First name</label>
                    <input name="firstname" type="text" placeholder="First name">
                </div>
                <div class="detail-input">
                    <label for="lastname">Last name</label>
                    <input name="lastname" type="text" placeholder="Last name">
                </div>

            </div>

            <div class="detail">
                <div class="detail-input">	
                    <label for="phone">Phone</label>
                    <input name="phone" type="text" placeholder="Phone/Mobile number">
                </div>
                <div class="detail-input">	
                    <label for="email">Email</label>
                    <input name="email" type="email" placeholder="Email">
                </div>
            </div>
        </section>    
    `;

    class GuestDetails extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
        }

        disconnectedCallback() {

        }
    }

    window.customElements.define('guest-details-component', GuestDetails);

})();