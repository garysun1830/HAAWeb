import axios from "axios";
import config from "../../../vue.config";


export default class MAPApi {

    constructor(logger) {
        this.api_root_url = config.pluginOptions.API_ROOT;
        this.logger = logger;
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
                    try {
                        if (response.data.features.length === 0) {
                            on_fail("Invalid B.C. location. Please confirm your map position is within the B.C. Province.");
                        }
                        else {
                            let area_name = response.data.features[0].properties.CMNTY_HLTH_SERV_AREA_NAME;
                            on_success(area_name);
                        }
                    }
                    catch (error) {
                        this.logger.log("error", error.message);
                        on_error("Oops. Something Went Wrong. Please try again later.");
                    }
                } else {
                    this.logger.log("error", response);
                    on_fail(response);
                }
            })
            .catch((error) => {
                this.logger.log("error", error.message);
                on_error("Oops. Something Went Wrong. Please try again later.");
            });
    }


}