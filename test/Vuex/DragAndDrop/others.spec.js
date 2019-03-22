import "core-js/shim";
import "regenerator-runtime/runtime";
import store from "Store";

describe("Drag and drop store | Other functionalities", () => {
  
    it("Should have global drag state", () => {
        expect(store.getters["dragAndDrop/getGlobalDragState"]).to.equal(false);
        store.dispatch("dragAndDrop/toggleGlobalDragState");
        expect(store.getters["dragAndDrop/getGlobalDragState"]).to.equal(true);
    });

});
