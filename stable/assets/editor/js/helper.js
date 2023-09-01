import {watchEffect, computed, ref, watch, onMounted, getCurrentInstance} from 'vue';
import Loading from "@/commons/Loading";
import ParseD3Config from "@/commons/ParseD3Config";
import ParseSpecifications from "@/commons/ParseSpecifications";
import wNumb from "wnumb";
import AddToCartFlow from "./commons/AddToCartFlow"
import { getTextColor } from  "./commons/textLayer"

var advancedFormat = require('dayjs/plugin/advancedFormat')
window.dayjs.extend(advancedFormat)

import PricingParse from "@/commons/PricingParse";

export const AppHelper = (device) => {
	var appContext = getCurrentInstance();
	const store = appContext.appContext.config.globalProperties.store;
	const LANG = appContext.appContext.config.globalProperties.LANG;

	const selectedOptions = ref({});

	const posterLayout = computed(() => {
		if (!selectedOptions.value.poster_style) return [];
		return selectedOptions.value.poster_style.layouts;
	});

	const posterSize = computed(() => {
		if (!selectedOptions.value.poster_layout
			|| !selectedOptions.value.poster_style.sizes
		) return {};

		var name = selectedOptions.value.poster_layout.value;

		return Object.values(selectedOptions.value.poster_style.sizes).filter((size) => {
			return size.layout === name;
		});
	});
	
	const getSection = (settings, settingName, sectionName) => {
		const productSetting = settings.find(setting => setting.name === settingName);
		if (!productSetting) return null;
		const posterFrameSection = productSetting.sections.find(section => section.name === sectionName);
		return posterFrameSection
	}

	const getRadioOption = (section) => {
		//Get item match with selected
		var item = section.options.find((i,index) => {
			if (i.name === 'star_map_color') {
				return index === revert.value.star_map_color
			}
			return selectedOptions.value[i.name] && selectedOptions.value[i.name].value === i.value;
		});
		//Get item match with default selected
		if (!item) {
			item = section.options.find(opt => {
				return nseConfig.selected_value[opt.name] && nseConfig.selected_value[opt.name] === opt.value;
			});
		}
		// Else set item = the first element option
		if (!item) {
			item = section.options[0]
		}

		return item
	}

	const getRadioDefaultOption = (section) => {
		//Get item match with selected
		var item = section.options.find(i => {
			return selectedOptions.value[i.name] && selectedOptions.value[i.name].value === i.value;
		});

		//Get item match with default selected
		if (!item) {
			item = section.options.find((opt,index)=> {
				if (opt.name === 'star_map_color') {
					return index === revert.value.star_map_color
				}
				return nseConfig.selected_value[opt.name] && nseConfig.selected_value[opt.name] === opt.value;
			});
		}
		// Else set item = the first element option
		if (!item) {
			item = section.options[0]
		}

		return item
	}

	const getRadioChangedOption = (section) => {
		//Get item match with selected
		var item = section.options.find(i => {
			return selectedOptions.value[i.name] && selectedOptions.value[i.name].value === i.value;
		});

		if (item) {
			return;
		} else {
			//Get item match with default selected
			item = section.options.find(opt => {
				return nseConfig.selected_value[opt.name] && nseConfig.selected_value[opt.name] === opt.value;
			});
		}

		// Else set item = the first element option
		if (!item) {
			item = section.options[0]
		}

		return item
	}

	const getDefaultBackgroundColor = (starMapColor) => {
		if (nseConfig.selected_value.background_color) {
			var bgC = nseConfig.selected_value.background_color;
			if (bgC != '#ffffff') bgC = starMapColor;
			return {
				value: bgC,
				name: 'background_color',
				title: LANG.SETTING_BACKGROUND_COLOR
			};
		} else {
			return {
				value: starMapColor,
				name: 'background_color',
				title: LANG.SETTING_BACKGROUND_COLOR
			};
		}
	}

	const getBackgroundColor = (starMapColor) => {
		let bgC = selectedOptions.value.background_color.value;

		if (revert.value.background_color){
			bgC = '#ffffff';
			revert.value.background_color = false
		}
		if (bgC != '#ffffff') {
			bgC = starMapColor;
		} else {
			if (!selectedOptions.value.poster_style.has_background) {
				bgC = starMapColor
				revert.value.background_color = true
			}
		}
		return {
			value: bgC,
			name: 'background_color',
			title: LANG.SETTING_BACKGROUND_COLOR
		};
	}
	
	const additionSettings = computed(() => {
		if (!selectedOptions.value.poster_style) { return []}
		const settings = selectedOptions.value.poster_style.settings;
		const posterFrameSection = getSection(settings, 'product', 'poster_frame');
		if (!posterFrameSection) { return []}

		posterFrameSection.options.forEach((frameOption) => {
			if (selectedOptions.value.poster_size && selectedOptions.value.poster_size.frames[frameOption.value]) {
				frameOption.price = selectedOptions.value.poster_size.frames[frameOption.value].price;
			}
		})

		if (selectedOptions.value.product_finish
			&& selectedOptions.value.product_finish.value != 'poster') {
			posterFrameSection.show = 'hidden';
		} else {
			posterFrameSection.show = '';
		}

		return settings
	});

	var nseConfig = window.nse_config;

	const revert = ref({
		star_map_color: nseConfig.selected_value.revert.star_map_color,
		background_color: !!nseConfig.selected_value.revert.background_color
	})

	const excludeFieldRevertToDefault = [
		"text_title",
		"text_messages",
		"text_date",
		"text_location",
		"text_coordinates_title",
		"text_city",
		"text_country",
	];

	const onMountDataSelected = () => {
		var tmpSelected2 = {};
		additionSettings.value.map((setting) => {
			if (setting.sections && setting.sections.length > 0) {
				setting.sections.map((section) => {
					if (section.type === "image-select-radio" || section.type === "color-select-radio" || section.type === "font-select-radio") {
						tmpSelected2[section.name] = getRadioDefaultOption(section);
					}

					if (section.type === "image-select-checkbox") {
						if (nseConfig.selected_value[section.name]) {
							tmpSelected2[section.name] = Object.assign({}, section, {
								options: [],
								value: nseConfig.selected_value[section.name]
							})
						}
					}

					if (!section.type || section.type === "") {
						section.options.map(opt => {
							var vlCurrent = '';
							if (selectedOptions.value[opt.name]) {
								vlCurrent = selectedOptions.value[opt.name].value;

							} else if (nseConfig.selected_value[opt.name]) {
								vlCurrent = nseConfig.selected_value[opt.name];
							}
							tmpSelected2[opt.name] = Object.assign({}, opt, {
								value: vlCurrent
							});
						})
					}

					excludeFieldRevertToDefault.forEach(field => {
						if (!tmpSelected2[field]) {
							tmpSelected2[field] = {
								name: field,
								value: nseConfig.selected_value[field]
							}
						}
					});
				})
			}
		});

		tmpSelected2.background_color = getDefaultBackgroundColor(tmpSelected2.star_map_color.value)
		Object.assign(selectedOptions.value, tmpSelected2);
	};

	const onChangeStyle = () => {
		var tmpSelected2 = {};
		
		additionSettings.value.map((setting) => {
			if (setting.sections && setting.sections.length > 0) {
				setting.sections.map((section) => {
					if (section.type === "image-select-radio" || section.type === "color-select-radio" || section.type === 'font-select-radio') {
						tmpSelected2[section.name] = getRadioOption(section);
					}

					if (!section.type || section.type === "") {
						section.options.map(opt => {
							if (!selectedOptions.value[opt.name] || !selectedOptions.value[opt.name].value) {
								if (nseConfig.selected_value[opt.name]) {
									tmpSelected2[opt.name] = Object.assign({}, opt, {
										value: nseConfig.selected_value[opt.name]
									});
								}
							}
						})
					}
				})
			}
		});
		tmpSelected2.background_color = getBackgroundColor(tmpSelected2.star_map_color.value)
		Object.assign(selectedOptions.value, tmpSelected2);
	};

	//Binding data selected
	if (nseConfig.selected_value) {
		//PosterStyle
		if (
			nseConfig.selected_value.poster_style
			&& nseConfig.styles[nseConfig.selected_value.poster_style]
		) {
			selectedOptions.value.poster_style = nseConfig.styles[nseConfig.selected_value.poster_style];
		}

		//PosterLayout
		if (nseConfig.selected_value.poster_layout && posterLayout.value.length > 0) {
			selectedOptions.value.poster_layout = posterLayout.value.find((item) => {
				return item.value === nseConfig.selected_value.poster_layout;
			});
		}

		//PosterSize
		if (nseConfig.selected_value.poster_size && posterSize.value.length > 0) {
			selectedOptions.value.poster_size = posterSize.value.find((item) => {
				return item.value === nseConfig.selected_value.poster_size;
			});
		}
		//
		onMountDataSelected();
	}


	const windowWith = ref(window.innerWidth)
	const windowHeight = ref(window.innerHeight);

	window.addEventListener('resize', () => {
		windowWith.value = window.innerWidth;
		windowHeight.value = window.innerHeight;
	});

	const previewDimension = computed(() => {
		var psize = selectedOptions.value.poster_size;

		var width, height
		if (device != 'desktop') {
			width = (windowWith.value) - 60;
			height = (windowHeight.value) - 200;
		} else {
			width = (windowWith.value - window.nse_app.right_panel_width) * 0.8;
			height = (windowHeight.value) * 0.8;
		}

		var ratio = psize.poster_width / psize.poster_height;
		var w, h;
		if (ratio === 1) {
			w = h = Math.min(width, height);
		} else {
			w = width;
			h = width / ratio;

			if (h > height) {
				h = height;
				w = height * ratio
			}
		}

		return {
			width: w,
			height: h
		}
	});

	const spec = computed(() => {
		if (selectedOptions.value) {
			return ParseSpecifications.parse(selectedOptions.value.poster_size, previewDimension.value)
		}
		return {};
	});

	//Handle Add Cart
	const showPopup = ref(false);
	const cartContext = ref({})
	var onClosePopupReviewMethod = () => {
		showPopup.value = false
	}

	var timeout = false;
	const exportStarMap = () => {
		Celestial.addCallback((r) => {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				Celestial.exportSVG((svg) => {
					StarMapImage.value = svg;
				});
			}, 200);
		});
	}

	const StarMapImage = ref('');
	window.nse_app.StarMap = StarMapImage;

	onMounted(() => {
		var d3Config = ParseD3Config.parse(
			selectedOptions.value,
			spec.value,
			window.nse_app.star_map_width_desktop
		)
		Celestial.display(d3Config);

		let d = new Date(+selectedOptions.value.date.value.year, +selectedOptions.value.date.value.month-1, +selectedOptions.value.date.value.day);
		if (selectedOptions.value.time) {
			d.setHours(selectedOptions.value.time.value.hours);
			d.setMinutes(selectedOptions.value.time.value.minutes);
		}

		Celestial.skyview({
			date: d,
			location: [
				(+selectedOptions.value.coordinates.value.lat),
				(+selectedOptions.value.coordinates.value.lng)
			]
		});
		exportStarMap();

		window.onbeforeunload = function (event) {
			if (!window.nse_app.redirect_to_add_cart && !debug)
				return confirm("Changes you made may not be saved.");
		};

	});

	watch(() => selectedOptions.value.poster_style, () => {
		onChangeStyle();
	});

	watch(() => selectedOptions.value.poster_addon, () => {
		var d3Config = ParseD3Config.parse(
			selectedOptions.value,
			spec.value,
			window.nse_app.star_map_width_desktop
		);

		Celestial.reload(d3Config);
	});

	watch(() => selectedOptions.value.coordinates, async (nvl) => {
		if (!Celestial) return;
		try {
			Celestial.location([
				(+nvl.value.lat),
				(+nvl.value.lng)
			])
		} catch (e) {
		}
	});


	const ReloadStarMapByDateTime = () => {
		if (!Celestial || typeof Celestial.skyview != 'function') return;

		try {
			let d = new Date(+selectedOptions.value.date.value.year, +selectedOptions.value.date.value.month-1, +selectedOptions.value.date.value.day);
			if (selectedOptions.value.time) {
				d.setHours(selectedOptions.value.time.value.hours);
				d.setMinutes(selectedOptions.value.time.value.minutes);
			}

			const location = Celestial.location();
			Celestial.skyview({
				date: d,
				location: location
			});

		} catch (e) {
		}
	}

	watch(() => selectedOptions.value.date, () => {
		ReloadStarMapByDateTime();
	});

	watch(() => selectedOptions.value.time, () => {
		ReloadStarMapByDateTime();
	});

	watch(() => selectedOptions.value.final_product, (size) => {
		try {
			var d3Config = ParseD3Config.parse(
				selectedOptions.value,
				spec.value,
				window.nse_app.star_map_width_desktop
			);

			Celestial.apply({
				mw: d3Config.mw
			});

		} catch (e) {
		}
	});


	const posterStyles = computed(() => {
		return Object.values(window.nse_config.styles)
	})


	const posterSizes = computed(() => {
		if (!selectedOptions.value.poster_layout) return [];

		const filteredPosterSizes = Object.values(selectedOptions.value.poster_style.sizes).filter((item) => {
			return item.layout === selectedOptions.value.poster_layout.value
		})
		
		const selectedSizeImage = filteredPosterSizes.find(size => {
			return size.image && size.image == selectedOptions.value.poster_size.image
		})
		if (!selectedSizeImage) {
			selectedOptions.value.poster_size = filteredPosterSizes[1];
		} else {
			selectedOptions.value.poster_size = selectedSizeImage
		}
		
		return filteredPosterSizes
	})

	const selectStyleMethod = function (style) {
		selectedOptions.value.poster_style = style;

		selectedOptions.value.poster_layout = posterLayout.value.find(layout => {
			return layout.value === selectedOptions.value.poster_layout.value
		});

		selectedOptions.value.poster_size = posterSizes.value.find(size => {
			return size.value === selectedOptions.value.poster_size.value
		});

		if (style.settings) {
			window.nse_setting_avaliable = [];
			if (style.has_background) {
				window.nse_setting_avaliable.push('background_color');
			}
			style.settings.map(setting => {
				if (setting.sections) {
					setting.sections.map(section => {
						if (section.name) {
							window.nse_setting_avaliable.push(section.name)
						} else if (section.options) {
							section.options.map(opt => {
								window.nse_setting_avaliable.push(opt.name)
							})
						}
					})
				}
			});
		}
	};
	selectStyleMethod(selectedOptions.value.poster_style);


	const selectLayoutMethod = function (style) {
		selectedOptions.value.poster_layout = style;
	};
	const selectSizeMethod = function (style) {
		selectedOptions.value.poster_size = style;
	};


	const generalTextCoordinates = (setting) => {
		if (!(store.value['text_coordinates_title'])) {

			var textLat = Number(Math.abs(setting.lat)).toFixed(4);
			var textLng = Number(Math.abs(setting.lng)).toFixed(4);

			textLat = `${textLat}°${(setting.lat > 0 ? ' N' : ' S')}`;
			textLng = `${textLng}°${(setting.lng > 0 ? ' E' : ' W')}`;

			selectedOptions.value.text_coordinates_title = {
				name: "text_coordinates_title",
				value: `${textLat}, ${textLng}`
			}
		}
	};

	let pickSettingMethod = (setting,starMapColorIndex) => {
		if (!setting.name) return;

		if (excludeFieldRevertToDefault.includes(setting.name)){
			nse_config.selected_value[setting.name] = setting.value
		}

		selectedOptions.value[setting.name] = setting;
		if (setting.name === 'place') {

			if (!(store.value['editable_text_location'])) {
				selectedOptions.value.text_location = {
					value: setting.value,
					name: "text_location"
				}
			}

			if (!(store.value['editable_text_city'])) {
				selectedOptions.value.text_city = {
					value: setting.city,
					name: "text_city"
				}
			}
			if (!(store.value['editable_text_country'])) {
				selectedOptions.value.text_country = {
					value: setting.country,
					name: "text_country"
				}
			}

			selectedOptions.value.coordinates = {
				name: "coordinates",
				value: {
					lat: setting.lat,
					lng: setting.lng
				}
			}

			generalTextCoordinates(setting)

		} else if (setting.name === 'coordinates') {
			generalTextCoordinates(setting.value);

		} else if (setting.name === 'date' || setting.name === 'time') {

			var dateCurrent = {};
			if (setting.name == 'date') {
				dateCurrent = setting.value;
			} else {
				dateCurrent = selectedOptions.value.date.value;
			}

			var timeCurrent = {};
			if (setting.name == 'time') {
				timeCurrent = setting.value;
			} else {
				timeCurrent = selectedOptions.value.time.value;
			}

			let dateSelected = new Date(+dateCurrent.year, +dateCurrent.month-1, +dateCurrent.day);

			if (!(store.value['editable_text_date'])) {
				var timeText = '';
				if (store.value.editable_time) {
					try {
						var minutes = timeCurrent.minutes;
						var hours = timeCurrent.hours;

						dateSelected.setHours(hours);
						dateSelected.setMinutes(minutes)

						timeText = ` - ${nse_config.timejs_format}`;
					} catch (e) {
					}
				}

				let dayjsObj = window.dayjs(dateSelected);

				selectedOptions.value.text_date = {
					value: dayjsObj.format(nse_config.dayjs_format + timeText),
					name: "text_date"
				};
			}
		} else if (setting.name === 'star_map_color') {
			revert.value.star_map_color = starMapColorIndex
			if (selectedOptions.value.background_color && selectedOptions.value.background_color.value !== '#ffffff') {
				selectedOptions.value.background_color = {
					value: setting.value,
					name: 'background_color',
					title: LANG.SETTING_BACKGROUND_COLOR
				};
			}
		}
	};

	const {
		getPrice,
		getPriceIngredient
	} = PricingParse(selectedOptions.value);

	const priceFinal = computed(() => {
		return getPrice.value.total;
	});

	const loadComponentPreview = computed(() => {
		return `style-${selectedOptions.value.poster_style.value}-preview`;
	});

	const jsonSave = computed(() => {
		var d = { revert: revert.value };
		if (!selectedOptions.value.poster_style) return d;
		Object.keys(selectedOptions.value).map((keyName) => {
			if (window.nse_setting_avaliable.indexOf(keyName) >= 0) {
				d[keyName] = selectedOptions.value[keyName].value;
			}
		});

		const textSaved = [
			'text_city',
			'text_country',
			'text_messages',
			'text_location',
			'text_title'
		]

		textSaved.forEach(text => {
			if (selectedOptions.value[text]) {
				d[text] = selectedOptions.value[text].value
			}
		})

		d.poster_size = selectedOptions.value.poster_size.value;
		d.poster_style = selectedOptions.value.poster_style.value;
		d.poster_layout = selectedOptions.value.poster_layout.value;

		if (d.product_finish
			&& d.product_finish != 'poster') {
			d.poster_frame = 'none';
		}

		return d;
	});

	watch(selectedOptions.value, (newVl, old) => {
		if (localStorage) {
			localStorage.setItem('nse_store', JSON.stringify(jsonSave.value))
		}
	});

	watch(store.value, (newVl, old) => {
		if (localStorage) {
			localStorage.setItem('edittoggle', JSON.stringify(store.value))
		}
	});


	const sourceSvg = function () {
		var svg = document.getElementById(window.nse_app.starMapPreviewId);
		var serializer = new XMLSerializer();
		var source = serializer.serializeToString(svg);
		if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}
		source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
		return source;
	}

	const addToCartSubmit = async () => {
		showPopup.value = true;
		cartContext.value = {};
		Loading.lock_screen();

		const textColor = getTextColor(selectedOptions.value)
		const addToCartFlow = new AddToCartFlow(jsonSave.value, selectedOptions.value.poster_size, sourceSvg(), store.value, textColor, revert.value);
		const {
			addToCartPromise,
			uploadFinalTextLayerPromise,
		} = addToCartFlow.beginAddToCartFlow();

		addToCartPromise.then(res => {
			cartContext.value = {
				preview_url: res.preview_url,
				cart_url: res.cart_url
			}

			nse_config.product_info.cart_item_key = res.cart_item_key;

			if (res.cart_url) {
			} else {
				alert("Exception error.")
			}
		}).catch((error) => {
			console.log(error);
			Loading.remove_lock_screen();
		})

		uploadFinalTextLayerPromise.then(() => {
			Loading.remove_lock_screen();
		}).catch((error) => {
			console.log(error);
			Loading.remove_lock_screen();
		})
	}

	///Submit Email
	const sendEmailMethod = (email, cb) => {

		const textColor = getTextColor(selectedOptions.value)
		const addToCartFlow = new AddToCartFlow(jsonSave.value, selectedOptions.value.poster_size, sourceSvg(), store.value, textColor, revert.value);
		const {
			addToCartPromise,
		} = addToCartFlow.beginSendEmailFlow(email);

		addToCartPromise.then(res => {
			if (res.cart_item_key) {
				nse_config.product_info.cart_item_key = res.cart_item_key;
			}
			if (typeof cb === 'function') cb(res);
		}).catch((error) => {
			console.log(error);
			if (typeof cb === 'function') cb(error);
		})
	}

	return {
		jsonSave,

		selectedOptions,
		posterLayout,
		posterStyles,
		posterSizes,
		additionSettings,
		loadComponentPreview,
		priceFinal,
		getPriceIngredient,
		showPopup,
		cartContext,
		StarMapImage,

		addToCartSubmit,
		selectStyleMethod,
		selectLayoutMethod,
		selectSizeMethod,
		pickSettingMethod,
		onClosePopupReviewMethod,

		sendEmailMethod,
		previewDimension,
		spec
	}
}
