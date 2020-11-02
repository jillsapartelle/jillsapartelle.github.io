(function(){

    if(!window.api) {
        window.api = {};
    }

    const roomsApi = 'https://script.google.com/macros/s/AKfycbxXW_BMd9CwyY5w0zOOgsZ0jnxo84lK27dbbXu3ZYFIyAJks1W8/exec';
    window.api.rooms = {
        doGet: async function () {

            const r = await fetch(roomsApi);
            return await r.json();
            
        }
    };

})();