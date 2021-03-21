import MAPApi from "@/MAPApi";

export default class MapService {
    constructor() {
        this.map_api = new MAPApi();
    }

    LookupAreaName(lat, lang, on_success, on_fail, on_error) {
        this.map_api.LookupAreaName(lat, lang, on_success, on_fail, on_error);
    }

}