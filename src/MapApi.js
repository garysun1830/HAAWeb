import axios from "axios";
import config from "../vue.config";


export default class MAPApi {

    constructor() {
        this.api_root_url = config.pluginOptions.API_ROOT;;
    }

    convert_lat_lang(value) {
        return value >= 0 ? "+" + value : value;
    }

    LookupAreaName(lat, lang, on_success, on_fail, on_error) {
        var api_url = this.api_root_url + config.pluginOptions.API_LOOKUP_AREA_NAME;
        api_url = api_url.replace("{lat_lang}", this.convert_lat_lang(lat) + this.convert_lat_lang(lang));
        axios.get(api_url)
            .then((response) => {
                if (response.status == 200) {
                    on_success(response);
                } else {
                    on_fail(error);
                }
            })
            .catch((error) => {
                on_error(error);
            });
    }


}