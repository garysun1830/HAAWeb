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
          :closable="false"
          class="result-band"
          v-if="show_success"
        >
          {{ area_name }}
        </b-message>
        <b-message
          title="Error"
          type="is-danger"
          :closable="false"
          class="result-band"
          v-if="show_error"
        >
          {{ api_error }}
        </b-message>
        <div class="buttons test-band" v-if="test_mode">
          <b-button type="is-primary" @click="test_submit_success()"
            >Test Submit Good</b-button
          >
          <b-button type="is-primary" @click="test_submit_fail()"
            >Test Submit Bad</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapService from "../service/MapService.js";
import Testor from "../test/test_project.js";
import Logger from "../log/logger.js";

export default {
  name: "WebMain",
  data() {
    return {
      lat: null,
      lang: null,
      lat_type: "",
      lat_message: "",
      lang_type: "",
      lang_message: "",
      area_name: "N/A",
      api_error: "",
      test_mode: false,
      show_success: false,
      show_error: false,
      map_service: null,
      logger: null,
    };
  },
  components: {},
  created() {
    this.logger = new Logger("haa_lookup_name_log");
    this.map_service = new MapService(this.logger);
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    this.test_mode = urlParams.has("test") && urlParams.get("test") == 1830;
  },
  methods: {
    lookup_area_name(lat, lang) {
      this.map_service.LookupAreaName(
        lat,
        lang,
        (area_name) => this.show_area_name(area_name),
        (message) => this.show_lookup_error(message),
        (error) => this.show_lookup_error(error)
      );
    },
    submit() {
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
      this.lookup_area_name(this.lat, this.lang);
    },
    show_area_name(area_name) {
      this.area_name = area_name;
      this.show_error = false;
      this.show_success = true;
    },
    show_lookup_error(message) {
      this.api_error = message;
      this.show_success = false;
      this.show_error = true;
    },
    success_alert(message) {
      this.$buefy.dialog.alert(message);
    },
    fail_alert(message) {
      this.$buefy.dialog.alert({
        title: "Error",
        message: message,
        type: "is-danger",
        hasIcon: true,
        icon: "times-circle",
        iconPack: "fa",
        ariaRole: "alertdialog",
        ariaModal: true,
      });
    },
    test_submit_success() {
      let testor = new Testor(this.logger);
      testor.test_for_success(
        this.show_area_name,
        this.show_lookup_error,
        this.success_alert,
        this.fail_alert
      );
    },
    test_submit_fail() {
      let testor = new Testor(this.logger);
      testor.test_for_fail(
        this.show_area_name,
        this.show_lookup_error,
        this.success_alert,
        this.fail_alert
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
.test-band {
  margin-top: 40px;
}
</style>
