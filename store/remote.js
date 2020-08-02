const { get } = require('request');
const request = require('request');

const createRemoteDB = (host, port) => {
    const URL = `http://${host}:${port}`;

    function list(table){
        return req('GET', table);


        function req(method, table, data){
            let url = URL + '/' + table;
            body;

            return new Promise((resolve, reject)=>{
                
            })
        }
    }
}