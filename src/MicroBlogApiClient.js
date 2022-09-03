const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class MicroBlogApiClient {
    //define base url in the constructor
    constructor(){
        this.base_url = BASE_API_URL + '/api';
    }

    // declare request method asyncronously with customzied options as argument
    // The method and url keys are set by the type of helper method from input arguments
    // Body is set by post and put methods
    // Additional options are accepted as a last argument on the four helper methods
    async request(options) {
        // define and declare query key to check
        // mostly on GET requests
        let query = new URLSearchParams(options.query || {}).toString();

        if (query !== '') {
            query = '?' + query;
        }

        let response;
        // send requests over the network and provide for server errors
        // common options are automatically added
        // eg JSON content type which is need for POST and PUT requests that have a body
        // Body argument is automatically rendered as a JSON object
        try{
            response = await fetch(this.base_url + options.url + query, {
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: options.body ? JSON.stringify(options.body): null,
            });
        }
        catch(error){
            response = {
                ok:false,
                status: 500,
                json: async () => { return {
                    code:500,
                    message: 'The server is unresponsive',
                    description: error.toString()
                };}
            };
        }

        return {
            ok: response.ok,
            status: response.status,
            body: response.status !==204 ? await response.json(): null
        };
    }

    async get(url, query, options) {
        return this.request({method: 'GET', url, query, ...options});
    }

    async post(url, body, options) {
        return this.request({method: 'POST', url, body, ...options});
    }

    async put(url, body, options) {
        return this.request({method: 'PUT', url, body, ...options})
    }

    async delete(url, options) {
        return this.request({method: 'DELETE', url, ...options})
    }
}