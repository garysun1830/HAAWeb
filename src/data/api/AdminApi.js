import axios from "axios";
import config from "../../../vue.config";


export default class AdminApi {
    // the caller that calls the API to admin the HAA Map API

    constructor(logger) {
        this.api_root_url = config.pluginOptions.ADMIN_API_ROOT;
        this.logger = logger;
    }

    get_request_count(api_name, on_success, on_fail, on_error) {
        //calling the API to get the count of the LookupName API called from the web clients
        let root = config.pluginOptions.HAA_API_ROOT.replaceAll("://", "_").replaceAll("/", "_").replaceAll(".", "_");
        var api_url = this.api_root_url + config.pluginOptions.ADMIN_API_GET_REQUEST_COUNT;
        api_url = api_url.replace("{0}", root).replace("{1}", api_name)
        axios.get(api_url)
            .then((response) => {
                if (response.status == 200) {
                    on_success(response.data.RequestCount);
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