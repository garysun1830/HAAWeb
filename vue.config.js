// vue.config.js
module.exports = {
    pluginOptions: {
        HAA_API_ROOT: "https://openmaps.gov.bc.ca/geo/pub/ows",
        HAA_API_LOOKUP_AREA_NAME: "?service=WFS&version=1.0.0&request=GetFeature&typeName=pub%3AWHSE_ADMIN_BOUNDARIES.BCHA_CMNTY_HEALTH_SERV_AREA_SP&srsname=EPSG%3A4326&cql_filter=INTERSECTS(SHAPE%2CSRID%3D4326%3BPOINT({lat_lang}))&propertyName=CMNTY_HLTH_SERV_AREA_CODE%2CCMNTY_HLTH_SERV_AREA_NAME&outputFormat=application%2Fjson",
        ADMIN_API_ROOT: "http://144233.ddns.net/dev.HAAApi/api/haa/",
        ADMIN_API_GET_REQUEST_COUNT: "RequestCount/{0}/{1}",
        MAP_API_ROOT: "http://144233.ddns.net/dev.HAAApi/api/haa/",
        MAP_API_LOOKUP_AREA_NAME: "LookupName/{0}/{1}/",
    }
}