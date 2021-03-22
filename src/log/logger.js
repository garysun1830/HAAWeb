
export default class Logger {
    //log message to the local storage
    
    constructor(log_key) {
        this.log_key = log_key;
    }

    log(caption, data) {
        let text ="time: " + Date.now() + ", " + caption + ": " + JSON.stringify(data) + "\n";
        let history = window.localStorage.getItem(this.log_key);
        text += history;
        window.localStorage.setItem(this.log_key, text);
    }
}