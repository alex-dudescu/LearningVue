import { shallowMount } from '@vue/test-utils'
import BtButton from 'UI/BtButton'

describe('BtButton.vue', () => {
    it('Should contain button', () => {
        var wrapper = shallowMount(BtButton);
        wrapper.setProps({ 
            brand: 'primary',
            name: 'buttonName'
         });
        
        expect(wrapper.find('button').text()).to.equal('buttonName');
    })
})