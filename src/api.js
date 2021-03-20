import axios from "axios";
// import config from "../vue.config";

var api = {
    // call_api(lat, lang) {
    call_api() {
        // const API_ROOT = config.pluginOptions.API_FULL;
        // alert(OFI_Url);
        var result = {};
        const url="https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pub%3AWHSE_ADMIN_BOUNDARIES.BCHA_CMNTY_HEALTH_SERV_AREA_SP&srsname=EPSG%3A4326&cql_filter=INTERSECTS(SHAPE%2CSRID%3D4326%3BPOINT(-123.3646335+48.4251378))&propertyName=CMNTY_HLTH_SERV_AREA_CODE%2CCMNTY_HLTH_SERV_AREA_NAME&outputFormat=application%2Fjson";
        axios({
            method: "get",
            url: url,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((response) => {
                if (response.status == 200) {
                    alert("aaa");
                } else {
                    result.ResponseError =
                        "Calling API Failed. Status Code: " + response.status;
                    result.APIFail = true;
                }
            })
            .catch((error) => {
                result.ResponseError = error.message;
                result.APIFail = true;
            });
    }
}
export default api