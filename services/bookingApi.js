(function(){

    if(!window.api) {
        window.api = {};
    }

    const bookingApi = 'https://script.google.com/macros/s/AKfycbwRysi8MRUhDclWkI9xRlZQGPfiiwkOaZW8Y3tLvMR9UEH4Un0/exec';
    window.api.bookings = {

        doGet: function() {
            fetch(bookingsApi)
            .then(d => d.json())
            .then(d => console.log(d[0].status));
        },
    
        doPost: function(row) {
            /*****
            let row = {
                plannedCheckInDate:'20201101',
                plannedCheckoutDate:'20201102',
                room: '1A',
                adultCount:'1',
                childrenCount:'2', 
                firstname:'juan',
                middlename:'dela',
                lastname:'cruz',
                email:'test@mail.com',
                contact:'09173709271'          
            };
            *****/

            fetch(bookingsApi,{
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type' : 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(row)
            });
        }
    }
})();