import { shallowMount } from '@vue/test-utils'
import BtButton from 'UI/BtButton'

describe('BtButton.vue', () => {
    it('Should contain button', () => {
        const wrapper = shallowMount(BtButton)
        expect(wrapper.find('button').text()).to.equal('!! Button Text Missing !!');
    })
})