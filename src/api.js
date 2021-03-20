import axios from "axios";
import config from "../vue.config";

var api = {
    convert_lat_lang(value) {
        return value >= 0 ? "+" + value : value;
    },
    call_api(lat, lang, on_good) {
        var api_url = config.pluginOptions.API_URL;
        api_url = api_url.replace("{lat_lang}", this.convert_lat_lang(lat) + this.convert_lat_lang(lang));
        axios.get(api_url)
            .then((response) => on_good(response))
            .catch((error) => {
                alert(error);
            });

    }
}
export default api