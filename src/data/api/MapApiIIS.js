import axios from "axios";
import config from "../../../vue.config";


export default class MAPApiIIS {
    // the API caller that calls the HAA Map API

    constructor(logger) {
        this.api_root_url = config.pluginOptions.MAP_API_ROOT;
        this.logger = logger;
        this.fail_message = "Invalid B.C. location. Please confirm your map position is within the B.C. Province.";
    }

    lookup_area_name(lat, lang, on_success, on_fail, on_error) {
        var api_url = this.api_root_url + config.pluginOptions.MAP_API_LOOKUP_AREA_NAME;
        api_url = api_url.replace("{0}", lat).replace("{1}", lang);
        axios.get(api_url)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data === undefined) {
                        this.logger.log("error", response);
                        on_fail(this.fail_message);
                    } else if (response.data.HAAName === undefined) {
                        this.logger.log("error", response.data);
                        on_fail(this.fail_message);
                    }
                    else {
                        on_success(response.data.HAAName);
                    }
                } else {
                    this.logger.log("error", response);
                    on_fail(this.fail_message);
                }
            })
            .catch((error) => {
                this.logger.log("error", error.message);
                on_error("Oops. Something Went Wrong. Please try again later.");
            });
    }


}