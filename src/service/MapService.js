import MAPApi from "../data/api/MapApi.js";

export default class MapService {
    constructor(logger) {
        this.logger = logger;
        this.map_api = new MAPApi(this.logger);
    }

    LookupAreaName(lat, lang, on_success, on_fail, on_error) {
        try {
            this.logger.log("time", Date.now());
            this.map_api.LookupAreaName(lat, lang, on_success, on_fail, on_error);
        }
        catch (e) {
            this.logger.log("error", e);
        }
    }

}