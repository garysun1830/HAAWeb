import MapService from "../service/MapService.js";
import TestData from "./test_data.js";

export default class Testor {

    constructor(logger) {
        this.map_service = new MapService(logger);
        this.test_data = new TestData();
        this.loop_id = 0;
        this.failed = false;
    }

    test_for_success_single(show_area_name, show_lookup_error, success_alert, fail_alert) {
        //recirsively test the array of data
        if (this.failed) return;
        if (this.loop_id >= this.test_data.good_data.length) {
            if (!this.failed) {
                //looping end, if not fail, display "passed".
                show_area_name("All names retrieved successfully.")
                success_alert("Passed!");
                return;
            }
        }
        let good_data = this.test_data.good_data[this.loop_id++];
        this.map_service.LookupAreaName(
            good_data.pos[0],
            good_data.pos[1],
            (name) => {
                let good_name = good_data.name;
                if (name === good_name) {
                    //test for the next data
                    this.test_for_success_single(show_area_name, show_lookup_error, success_alert, fail_alert);
                } else {
                    this.failed = true;
                    show_lookup_error(`Excepted name: ${good_name}, Result: ${name}.`);
                    fail_alert("Failed!");
                }
            },
            (message) => {
                this.failed = true;
                show_lookup_error(message);
                fail_alert("Failed!");
            },
            (error) => {
                this.failed = true;
                show_lookup_error(error);
                fail_alert("Failed!");
            });
    }

    test_for_success(show_area_name, show_lookup_error, success_alert, fail_alert) {
        this.test_for_success_single(show_area_name, show_lookup_error, success_alert, fail_alert);
    }

    test_for_fail(show_area_name, show_lookup_error, success_alert, fail_alert) {
        this.map_service.LookupAreaName(
            this.test_data.bad_data[0].pos[0],
            this.test_data.bad_data[0].pos[1],
            (name) => {
                show_lookup_error(`Excepted name: Invlid, Result: ${name}.`);
                fail_alert("Failed!");
            },
            (message) => {
                show_lookup_error(message);
                success_alert("Passed!");
            },
            (error) => {
                show_lookup_error(error);
                fail_alert("Failed!");
            }
        );
    }
}