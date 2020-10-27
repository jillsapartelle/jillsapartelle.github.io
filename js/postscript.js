// This script will be executed at the very last, after the document has been parsed and loaded
'use strict';

(function(){

    function doGet() {
        const bookingsApi = 'https://script.google.com/macros/s/AKfycbwRysi8MRUhDclWkI9xRlZQGPfiiwkOaZW8Y3tLvMR9UEH4Un0/exec';
        fetch(bookingsApi)
        .then(d => d.json())
        .then(d => console.log(d[0].status));
    }

    function doPost() {
        const bookingsApi = 'https://script.google.com/macros/s/AKfycbwRysi8MRUhDclWkI9xRlZQGPfiiwkOaZW8Y3tLvMR9UEH4Un0/exec';
        let row = {
            bookingId:'100',
            bookingDate:'20201027',
            plannedCheckInDate:'20201101',
            plannedCheckoutDate:'20201102',
            adultCount:'1',
            childrenCount:'2', 
            firstname:'juan',
            middlename:'dela',
            lastname:'cruz',
            email:'test@mail.com',
            contact:'09173709271'          
        };
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

    doGet();

    document.getElementById('btnSend').addEventListener('click', function(){
        doPost();
    });
         
})();

