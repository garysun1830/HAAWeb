import AdminApi from "../data/api/AdminApi.js";

export default class AdminService {
    // the service that calls the API to admin the HAA Map API

    constructor(logger) {
        this.logger = logger;
        this.admin_api = new AdminApi(this.logger);
    }

    get_request_count(api_name, on_success, on_fail, on_error) {
        try {
            this.admin_api.get_request_count(api_name, on_success, on_fail, on_error);
        }
        catch (e) {
            this.logger.log("error", e);
        }
    }

}