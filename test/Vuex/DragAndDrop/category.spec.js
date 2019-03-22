import "core-js/shim";
import "regenerator-runtime/runtime";
import store from 'Store';

describe('Drag and drop store | Category functionalities', () => {
    
    it('Should have default category', () => {
        expect(store.getters["dragAndDrop/getCategoryByID"](1)).to.not.equal(undefined);
    })

    it('Should have default cargory and default container in category', () => {
        //Test for default category && default container in category
        var conainter = store.getters["dragAndDrop/getCategoriesDefaultContainer"](1);
        expect(conainter).to.not.equal(undefined);
        expect(conainter.isDefault).to.equal(true);
    })

    it('Should have default container in new category', async () => {
        //Test for new category
        await store.dispatch('dragAndDrop/addCategory', {categoryName: 'newCategory'});
        var category = store.getters["dragAndDrop/getCategoryByName"]('newCategory');

        expect(category).to.not.equal(undefined);
        expect(category.itemID).to.equal(2);

        var conainter = store.getters["dragAndDrop/getCategoriesDefaultContainer"](2);
        expect(conainter).to.not.equal(undefined);
        expect(conainter.isDefault).to.equal(true);
    })
})