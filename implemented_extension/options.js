function saveOptions(e) {
  browser.storage.sync.set({
    extension_settings_data: {
      window_date: {
        main_checkbox: document.querySelector("#window_date_main_checkbox").checked,
        time_round_precision: document.querySelector("#window_date_time_round_precision").value
      },
      window_performance_now: {
        main_checkbox: document.querySelector("#performance_now_main_checkbox").checked,
        value_round_precision: document.querySelector("#performance_now_value_round_precision").value
      },
      window_html_canvas_element: {
        main_checkbox: document.querySelector("#htmlcanvaselement_main_checkbox").checked,
        type_of_restriction: document.querySelector("#htmlcanvaselement_type_of_restriction").value
      },
      navigator_geolocation: {
        main_checkbox: document.querySelector("#navigator_geolocation_main_checkbox").checked,
        type_of_restriction: document.querySelector("#navigator_geolocation_type_of_restriction").value,
        gps_a: document.querySelector("#navigator_geolocation_rounding_precision_of_item_a").value,
        gps_b: document.querySelector("#navigator_geolocation_rounding_precision_of_item_b").value,
        gps_c: document.querySelector("#navigator_geolocation_rounding_precision_of_item_c").value,
        gps_d: document.querySelector("#navigator_geolocation_rounding_precision_of_item_d").value,
        gps_e: document.querySelector("#navigator_geolocation_rounding_precision_of_item_e").value,
        gps_f: document.querySelector("#navigator_geolocation_rounding_precision_of_item_f").value,
        gps_g: document.querySelector("#navigator_geolocation_rounding_precision_of_item_g").value
      },
      window_xmlhttprequest: {
        main_checkbox: document.querySelector("#xmlhttprequest_main_checkbox").checked,
        type_of_restriction: document.querySelector("#xmlhttprequest_type_of_restriction").value
      }
    }
  });
  e.preventDefault();
}

function restoreOptions() {
  var allExtensionsData = browser.storage.sync.get('extension_settings_data');
  allExtensionsData.then((res) => {
    document.querySelector("#window_date_main_checkbox").checked = res.extension_settings_data.window_date.main_checkbox;
    document.querySelector("#window_date_time_round_precision").value = res.extension_settings_data.window_date.time_round_precision;
    document.querySelector("#performance_now_main_checkbox").checked = res.extension_settings_data.window_performance_now.main_checkbox;
    document.querySelector("#performance_now_value_round_precision").value = res.extension_settings_data.window_performance_now.value_round_precision;
    document.querySelector("#htmlcanvaselement_main_checkbox").checked = res.extension_settings_data.window_html_canvas_element.main_checkbox;
    document.querySelector("#htmlcanvaselement_type_of_restriction").value = res.extension_settings_data.window_html_canvas_element.type_of_restriction;
    document.querySelector("#navigator_geolocation_main_checkbox").checked = res.extension_settings_data.navigator_geolocation.main_checkbox;
    document.querySelector("#navigator_geolocation_type_of_restriction").value = res.extension_settings_data.navigator_geolocation.type_of_restriction;
    document.querySelector("#navigator_geolocation_rounding_precision_of_item_a").value = res.extension_settings_data.navigator_geolocation.gps_a;
    document.querySelector("#navigator_geolocation_rounding_precision_of_item_b").value = res.extension_settings_data.navigator_geolocation.gps_b;
    document.querySelector("#navigator_geolocation_rounding_precision_of_item_c").value = res.extension_settings_data.navigator_geolocation.gps_c;
    document.querySelector("#navigator_geolocation_rounding_precision_of_item_d").value = res.extension_settings_data.navigator_geolocation.gps_d;
    document.querySelector("#navigator_geolocation_rounding_precision_of_item_e").value = res.extension_settings_data.navigator_geolocation.gps_e;
    document.querySelector("#navigator_geolocation_rounding_precision_of_item_f").value = res.extension_settings_data.navigator_geolocation.gps_f;
    document.querySelector("#navigator_geolocation_rounding_precision_of_item_g").value = res.extension_settings_data.navigator_geolocation.gps_g;
    document.querySelector("#xmlhttprequest_main_checkbox").checked = res.extension_settings_data.window_xmlhttprequest.main_checkbox;
    document.querySelector("#xmlhttprequest_type_of_restriction").value = res.extension_settings_data.window_xmlhttprequest.type_of_restriction;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
