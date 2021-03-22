import MAPApiIIS from "../data/api/MapApiIIS.js";

export default class MapService {
    // the service that calls the HAA Map API


    constructor(logger) {
        this.logger = logger;
        this.map_api = new MAPApiIIS(this.logger);
    }

    lookup_area_name(lat, lang, on_success, on_fail, on_error) {
        try {
            this.logger.log("time", Date.now());
            this.map_api.lookup_area_name(lat, lang, on_success, on_fail, on_error);
        }
        catch (e) {
            this.logger.log("error", e);
        }
    }

    validate_pos(pos_val) {
        var result = { valid: false };
        if (!pos_val || isNaN(pos_val)) {
            result.message = "Please enter a number.";
            return result;
        }
        if (pos_val < -180 || pos_val > 180) {
            result.message = "Please enter a valid map position.";
            return result;
        }
        return { valid: true };
    }
}