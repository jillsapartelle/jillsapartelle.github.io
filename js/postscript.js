// This script will be executed at the very last, after the document has been parsed and loaded
'use strict';

(function(){

    function doGet() {
        var bookingsApi = 'https://script.google.com/macros/s/AKfycbwRysi8MRUhDclWkI9xRlZQGPfiiwkOaZW8Y3tLvMR9UEH4Un0/exec';
        fetch(bookingsApi)
        .then(d => d.json())
        .then(d => console.log(d[0].status));
    }

    doGet();
         
})();

