import BPopover from "~/bootstrap-vue/es/components/popover/popover";
import BtColorPicker from "UI/BtColorPicker";
import Vue from "vue";

export default {
  function(resolve, reject) {
    setTimeout(function() {
      resolve({
        props: {
          cardReady: {
            default: false
          },
          id: ""
        },
        components: {
          BPopover,
          BtColorPicker
        },
        methods: {
          applyColor: function() {}
        },
        watch: {
          cardReady: function(newVal, oldVal) {
            if (newVal === true) {
              console.log("Card is now ready!");
            }
          }
        },
        created: async function() {
          // this.waitForCardRedaySync();
        }
      });
    }, 1000);
  }
};

// export default {
//   name: "KanbanCardModal",
//   props: {
//     cardReady: {
//       default: false,
//     },
//     id: ''
//   },
//   components: {
//     BPopover,
//     BtColorPicker,
//   },
//   methods: {
//     applyColor: function () {

//     },
//   },
//   watch: {
//     cardReady: function (newVal, oldVal) {
//       if(newVal === true) {
//         console.log('Card is now ready!');
//       }
//     }
//   },
//   created: async function() {
//     // this.waitForCardRedaySync();
//   }
// };
