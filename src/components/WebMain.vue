<template>
  <div class="page">
    <div class="header">
      <h1 class="head-title">Community Health Service Area Name Look Up</h1>
    </div>
    <div class="main">
      <div class="lat-input">
        <table style="width: 100%">
          <tr>
            <td>
              <b-field label="Latitude" :message="lat_message" :type="lat_type">
                <b-input v-model="lat"></b-input>
              </b-field>
            </td>
            <td style="width: 20px"></td>
            <td>
              <b-field
                label="Longitude"
                :message="lang_message"
                :type="lang_type"
              >
                <b-input v-model="lang"></b-input>
              </b-field>
            </td>
          </tr>
        </table>
      </div>
      <div class="buttons">
        <b-button class="submit-button" type="is-info" @click="submit()"
          >Submit
        </b-button>
      </div>
      <b-notification type="is-info" aria-close-label="Close notification"
        >{{ api_info }}
      </b-notification>
    </div>
  </div>
</template>

<script>
import api from "@/api";
// import config from "../../vue.config";
import axios from "axios";

export default {
  name: "WebMain",
  data() {
    return {
      lat: "",
      lang: "",
      lat_type: "",
      lat_message: "",
      lang_type: "",
      lang_message: "",
      api_info: "12343",
    };
  },
  mounted() {
    // axios
    //   .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    //   .then((response) => {
    //     this.api_info = response.data.disclaimer;
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
    axios
      .get("https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pub%3AWHSE_ADMIN_BOUNDARIES.BCHA_CMNTY_HEALTH_SERV_AREA_SP&srsname=EPSG%3A4326&cql_filter=INTERSECTS(SHAPE%2CSRID%3D4326%3BPOINT(-123.3646335+48.4251378))&propertyName=CMNTY_HLTH_SERV_AREA_CODE%2CCMNTY_HLTH_SERV_AREA_NAME&outputFormat=application%2Fjson")
      .then((response) => {
        this.api_info = response.data.features[0].properties.CMNTY_HLTH_SERV_AREA_NAME;
      })
      .catch((error) => {
        alert(error);
      });
  },
  components: {},
  methods: {
    submit() {
      // const OFI_Url = config.pluginOptions.API_GET_NAME;
      // alert(OFI_Url);
      var valid = true;
      if (!this.lat || isNaN(this.lat)) {
        this.lat_type = "is-danger";
        this.lat_message = "Please enter a number.";
        valid = false;
      } else {
        this.lat_type = "";
        this.lat_message = "";
      }
      if (!this.lang || isNaN(this.lang)) {
        this.lang_type = "is-danger";
        this.lang_message = "Please enter a number.";
        valid = false;
      } else {
        this.lang_type = "";
        this.lang_message = "";
      }
      if (!valid) return;
      // var resp = api.call_api(this.lat, this.lang);
      api.call_api();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 30px;
  color: #e7e7e7;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.page {
  background-color: #fff;
  margin: auto 100px;
  border: 1px solid #c7cab9;
}
.main {
  padding: 0px 20px;
  margin: 12px 8px 8px 8px;
  min-height: 400px;
  width: 700px;
}
.header {
  position: relative;
  margin: 0px;
  padding: 0px;
  background: #4b6c9e;
  width: 100%;
  height: 60px;
}
.head-title {
  padding-top: 8px;
}
.lat-input {
  margin-top: 40px;
  text-align: left;
}
.submit-button {
  margin-top: 40px;
  text-align: left;
}
.error-band {
  width: 300px;
}
</style>
