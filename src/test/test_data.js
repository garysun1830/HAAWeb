export default class TestData {

    constructor() {
        this.good_data = [
            {
                "pos": [-123.3646335, 48.4251378], "name": "Downtown Victoria/Vic West"
            },
            {
                "pos": [-123.318038, 48.481532], "name": "Gordon Head/Shelbourne"
            },
            {
                "pos": [-123.403437, 48.468152], "name": "Interurban/Tillicum3"
            },
        ];
        this.bad_data = [
            {
                "pos": [-123.3646335, 148.4251378], "name": ""
            },
        ];
    }

}