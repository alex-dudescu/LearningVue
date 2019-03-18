export default {
  name: "BtButton",
  data: function() {
    return {
      BtBrand: ["primary", "secondary", "success", "warning", "danger"]
    };
  },
  props: {
    // Button name
    name: {
      type: String,
      required: true,
      default: "!! Button Text Missing !!"
    },

    // Bootstrap button
    brand: {
      type: String,
      required: true,
      default: "primary"
      //TODO: implement validator
      // validator: function (value) {
      //     console.log(BtBrand);

      //     if(this.BtBrand.find((element) => {
      //         return element === value
      //     }) === undefined)
      //         return false;
      //     return true;
      // },
    },

    // Button type
    isOutline: {
      type: Boolean,
      default: false
    }
  }
};
