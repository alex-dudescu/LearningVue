export default {
	name: 'BtColorPicker',
	data: function() {
		return {
			colors: []
		}
	},
	methods: {
		populateColors: function() {
			this.colors = [
				{
					'id' : 1, 
					'className' : 'color-turquoise',
				},
				{
					'id' : 2, 
					'className' : 'color-emerald',
				},
				{
					'id' : 3, 
					'className' : 'color-peter-river',
				},
				{
					'id' : 4, 
					'className' : 'color-amethyst',
				},
				{
					'id' : 5, 
					'className' : 'color-carrot',
				},
			]
		},
		onColorChosen: function(color){
			this.$emit('colorChanged', color);
		}
	},
	created: function() {
		this.populateColors();
	}
}