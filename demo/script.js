(function() {

	Vue.config.ignoredElements = [/^a-/];

	let VColorInput = {
		model: {
			prop: 'modelValue',
			event: 'update:modelValue',
		},
		props: {
			label: {},
			modelValue: {},
			noAlpha: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				menu: false,
			};
		},
		computed: {
			color() {
				let {value} = this;
				return chroma(value).css();
			},
			value: {
				get() {
					let {
						modelValue,
						noAlpha,
					} = this;
					let [r, g, b, a] = chroma(modelValue).rgba();
					a = (a > 0) ? a : Number.EPSILON; // vuetify bug
					return noAlpha ? {r, g, b} : {r, g, b, a};
				},
				set(value) {
					let [r, g, b, a] = chroma(value).rgba();
					a = (a > Number.EPSILON) ? a : 0; // vuetify bug
					this.$emit('update:modelValue', chroma({r, g, b, a}).css());
				},
			},
		},
		template: '#VColorInput',
	};

	let VCustomSlider = {
		model: {
			prop: 'modelValue',
			event: 'update:modelValue',
		},
		props: {
			label: {},
			max: {},
			min: {},
			modelValue: {},
		},
		computed: {
			value: {
				get() {
					return this.modelValue;
				},
				set(value) {
					this.$emit('update:modelValue', value);
				},
			},
		},
		template: '#VCustomSlider',
	};

	let VIndexSlider = {
		components: {VCustomSlider},
		model: {
			prop: 'modelValue',
			event: 'update:modelValue',
		},
		props: {
			items: {},
			label: {},
			modelValue: {},
		},
		computed: {
			item() {
				return this.items[this.itemIndex];
			},
			itemIndex: {
				get() {
					return this.modelValue;
				},
				set(value) {
					this.$emit('update:modelValue', value);
				},
			},
			itemLabel() {
				let {item} = this;
				return item.label ?? item;
			},
			itemValue() {
				let {item} = this;
				return item.value ?? item;
			},
		},
		template: '#VIndexSlider',
	};

	new Vue({
		el: '#app',
		vuetify: new Vuetify(),
		data() {
			let text = [
				`The curfew tolls the knell of parting day,`,
				`The lowing herd wind slowly o'er the lea,`,
				`The plowman homeward plods his weary way,`,
				`And leaves the world to darkness and to me.`,
			].join('\n');
			let fontFamilyValues = [
				'Arizonia',
				'Berkshire Swash',
				'Cookie',
				'Great Vibes',
				'Just Another Hand',
				'Leckerli One',
				'Lobster Two',
				'Merienda One',
				'Oleo Script',
				'Pacifico',
			];
			return {
				alignmentIndex: 0,
				alignmentValues: ['left', 'center', 'right'],
				backgroundColor: chroma('#073b4c').alpha(1/3).css(),
				color: '#ffd166',
				drawer: true,
				fontFamily: JustMyLuck.pick(fontFamilyValues),
				fontFamilyValues,
				fontSizeIndex: 1,
				fontSizeValues: [1, 2, 3],
				lineGapIndex: 1,
				lineGapValues: [0, 0.25, 0.5, 1],
				paddingIndex: 1,
				paddingValues: [0, 0.5, 1],
				strokeColor: '#ef476f',
				strokeWidthIndex: 1,
				strokeWidthValues: [0, 0.02, 0.04],
				text,
			};
		},
		computed: {
			alignment() {
				return this.alignmentValues[this.alignmentIndex];
			},
			fontSize() {
				return this.fontSizeValues[this.fontSizeIndex];
			},
			fontSizeDisplayString() {
				return Number(this.fontSize).toLocaleString('en', {maximumFractionDigits: 2});
			},
			lineGap() {
				return this.lineGapValues[this.lineGapIndex];
			},
			lineGapDisplayString() {
				return Number(this.lineGap).toLocaleString('en', {style: 'percent'});
			},
			padding() {
				return this.paddingValues[this.paddingIndex];
			},
			paddingDisplayString() {
				return Number(this.padding).toLocaleString('en', {style: 'percent'});
			},
			strokeWidth() {
				return this.strokeWidthValues[this.strokeWidthIndex];
			},
			strokeWidthDisplayString() {
				return Number(this.strokeWidth).toLocaleString('en', {style: 'percent'});
			},
		},
		components: {
			myScene: {
				props: [
					'alignment',
					'backgroundColor',
					'color',
					'fontFamily',
					'fontSize',
					'lineGap',
					'padding',
					'strokeColor',
					'strokeWidth',
					'text',
				],
				render(h) {
					let {
						alignment,
						backgroundColor,
						color,
						fontFamily,
						fontSize,
						lineGap,
						padding,
						strokeColor,
						strokeWidth,
						text,
					} = this;
					return h(
						'a-scene',
						{
							attrs: {
								'embedded': true,
								'vr-mode-ui': AFRAME.utils.styleParser.stringify({
									enabled: false,
								}),
							},
						},
						[
							h(
								'a-sky',
								{
									attrs: {
										'src': './demo/sky.jpg',
									},
								},
							),
							h(
								'a-entity',
								{
									attrs: {
										'camera': AFRAME.utils.styleParser.stringify({
											fov: 60,
										}),
										'orbit-controls': AFRAME.utils.styleParser.stringify({
											dampingFactor: 1/16,
											enableKeys: false,
											initialPosition: (([x, y, z]) => AFRAME.utils.coordinates.stringify({x, y, z}))([0, 0, 32]),
											maxDistance: 128,
											minDistance: 2,
											panSpeed: 1,
											rotateSpeed: 1/6,
											zoomSpeed: 1/2,
										}),
										'look-controls': AFRAME.utils.styleParser.stringify({
											enabled: false,
										}),
									},
									key: 'pkztceqjwmzw',
								},
							),
							h(
								'a-entity',
								{
									attrs: {
										'text-plane': AFRAME.utils.styleParser.stringify({
											alignment,
											backgroundColor,
											color,
											fontFamily,
											fontSize,
											lineGap,
											padding,
											strokeColor,
											strokeWidth,
											text,
										}),
									},
									key: 'pjuqezmebnjt',
								},
							),
						],
					);
				},
			},
			VColorInput,
			VIndexSlider,
		},
	});
})();
