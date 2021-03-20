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
            <td style="width: 20px"></td>
            <td>
              <div class="buttons">
                <b-button class="submit-button" type="is-info" @click="submit()"
                  >Submit
                </b-button>
              </div>
            </td>
          </tr>
        </table>
        <b-message
          title="Health Authority Area"
          type="is-success"
          closable="false"
          class="result-band"
        >
          {{ api_info }}
        </b-message>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "WebMain",
  data() {
    return {
      lat: -123.3646335,
      lang: 48.4251378,
      lat_type: "",
      lat_message: "",
      lang_type: "",
      lang_message: "",
      api_info: "N/A",
    };
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
      // this.api_info = api.call_api(this.lat, this.lang);
      this.api_info = api.call_api(
        this.lat,
        this.lang,
        (response) =>
          (this.api_info =
            response.data.features[0].properties.CMNTY_HLTH_SERV_AREA_NAME)
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 24px;
  color: #e7e7e7;
}
.page {
  background-color: #fff;
  margin: auto;
  border: 1px solid #c7cab9;
  width: 700px;
}
.main {
  padding: 0px 20px;
  margin: 12px 8px 8px 8px;
  min-height: 400px;
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
  padding-top: 12px;
}
.lat-input {
  margin-top: 40px;
  text-align: left;
}
.submit-button {
  margin-top: 40px;
  width: 100px;
}
.error-band {
  width: 300px;
}
.result-band {
  margin-top: 40px;
}
.buttons {
  margin-top: -8px;
}
</style>
