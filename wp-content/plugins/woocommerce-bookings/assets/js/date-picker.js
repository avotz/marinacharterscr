/* globals: jQuery, wc_bookings_booking_form, booking_form_params */

// globally accessible for tests
wc_bookings_date_picker = {};

jQuery( function( $ ) {
	var wc_bookings_locale              = window.navigator.userLanguage || window.navigator.language,
		wc_bookings_timeout             = 0,
		wc_bookings_date_picker_object  = {
		init: function() {
			$( 'body' ).on( 'click', '.wc-bookings-date-picker legend small.wc-bookings-date-picker-choose-date', this.toggle_calendar );
			$( 'body' ).on( 'click', '.booking_date_year, .booking_date_month, .booking_date_day', this.open_calendar );
			$( 'body' ).on( 'input', '.booking_date_year, .booking_date_month, .booking_date_day', this.input_date_trigger );
			$( 'body' ).on( 'keypress', '.booking_date_year, .booking_date_month, .booking_date_day', this.input_date_keypress );
			$( 'body' ).on( 'keypress', '.booking_to_date_year, .booking_to_date_month, .booking_to_date_day', this.input_date_keypress );
			$( 'body' ).on( 'change', '.booking_to_date_year, .booking_to_date_month, .booking_to_date_day', this.input_date_trigger );
			$( '.wc-bookings-date-picker legend small.wc-bookings-date-picker-choose-date' ).show();
			$( '.wc-bookings-date-picker' ).each( function() {
				var form     = $( this ).closest( 'form' ),
					picker   = form.find( '.picker' ),
					fieldset = $( this ).closest( 'fieldset' );

				wc_bookings_date_picker.date_picker_init( picker );

				if ( picker.data( 'display' ) == 'always_visible' ) {
					$( '.wc-bookings-date-picker-date-fields', fieldset ).hide();
					$( '.wc-bookings-date-picker-choose-date', fieldset ).hide();
				} else {
					picker.hide();
				}

				if ( picker.data( 'is_range_picker_enabled' ) ) {
					form.find( 'p.wc_bookings_field_duration' ).hide();
					form.find( '.wc_bookings_field_start_date legend span.label' ).text( 'always_visible' !== picker.data( 'display' ) ? booking_form_params.i18n_dates : booking_form_params.i18n_start_date );
				}
			} );
		},
		calc_duration: function( picker ) {
			var form     = picker.closest('form'),
				fieldSet = picker.closest('fieldset'),
				unit     = picker.data( 'duration-unit' );

			setTimeout( function() {
				var days    = 1,
					e_year  = parseInt( fieldSet.find( 'input.booking_to_date_year' ).val(), 10 ),
					e_month = parseInt( fieldSet.find( 'input.booking_to_date_month' ).val(), 10 ),
					e_day   = parseInt( fieldSet.find( 'input.booking_to_date_day' ).val(), 10 ),
					s_year  = parseInt( fieldSet.find( 'input.booking_date_year' ).val(), 10 ),
					s_month = parseInt( fieldSet.find( 'input.booking_date_month' ).val(), 10 ),
					s_day   = parseInt( fieldSet.find( 'input.booking_date_day' ).val(), 10 );

				if ( e_year && e_month >= 0 && e_day && s_year && s_month >= 0 && s_day ) {
					var s_date = new Date( Date.UTC( s_year, s_month - 1, s_day ) ),
						e_date = new Date( Date.UTC( e_year, e_month - 1, e_day ) );

					days = Math.floor( ( e_date.getTime() - s_date.getTime() ) / ( 1000*60*60*24 ) );
					if ( 'day' === unit ) {
						days = days + 1;
					}
				}

				form.find( '#wc_bookings_field_duration' ).val( days ).change();
			} );

		},
		open_calendar: function() {
			$picker = $( this ).closest( 'fieldset' ).find( '.picker:eq(0)' );
			wc_bookings_date_picker.date_picker_init( $picker );
			$picker.slideDown();
		},
		toggle_calendar: function() {
			$picker = $( this ).closest( 'fieldset' ).find( '.picker:eq(0)' );
			wc_bookings_date_picker.date_picker_init( $picker );
			$picker.slideToggle();
		},
		input_date_keypress: function() {
			var $fieldset = $(this).closest( 'fieldset' ),
				$picker   = $fieldset.find( '.picker:eq(0)' );

			if ( $picker.data( 'is_range_picker_enabled' ) ) {
				clearTimeout( wc_bookings_timeout );

				wc_bookings_timeout = setTimeout( wc_bookings_date_picker.calc_duration( $picker ), 800 );
			}
		},
		input_date_trigger: function() {
			var $fieldset = $(this).closest('fieldset'),
				$picker   = $fieldset.find( '.picker:eq(0)' ),
				$form     = $(this).closest('form'),
				year      = parseInt( $fieldset.find( 'input.booking_date_year' ).val(), 10 ),
				month     = parseInt( $fieldset.find( 'input.booking_date_month' ).val(), 10 ),
				day       = parseInt( $fieldset.find( 'input.booking_date_day' ).val(), 10 );

			if ( year && month && day ) {
				var date = new Date( year, month - 1, day );
				$picker.datepicker( "setDate", date );

				if ( $picker.data( 'is_range_picker_enabled' ) ) {
					var to_year      = parseInt( $fieldset.find( 'input.booking_to_date_year' ).val(), 10 ),
						to_month     = parseInt( $fieldset.find( 'input.booking_to_date_month' ).val(), 10 ),
						to_day       = parseInt( $fieldset.find( 'input.booking_to_date_day' ).val(), 10 );

					var to_date = new Date( to_year, to_month - 1, to_day );

					if ( ! to_date || to_date < date ) {
						$fieldset.find( 'input.booking_to_date_year' ).val( '' ).addClass( 'error' );
						$fieldset.find( 'input.booking_to_date_month' ).val( '' ).addClass( 'error' );
						$fieldset.find( 'input.booking_to_date_day' ).val( '' ).addClass( 'error' );
					} else {
						$fieldset.find( 'input' ).removeClass( 'error' );
					}
				}
				$fieldset.triggerHandler( 'date-selected', date );
			}
		},
		select_date_trigger: function( date ) {
			var fieldset          = $( this ).closest('fieldset'),
				picker            = fieldset.find( '.picker:eq(0)' ),
				form              = $( this ).closest( 'form' ),
				parsed_date       = date.split( '-' ),
				start_or_end_date = picker.data( 'start_or_end_date' );

			if ( ! picker.data( 'is_range_picker_enabled' ) || ! start_or_end_date ) {
				start_or_end_date = 'start';
			}

			// End date selected
			if ( start_or_end_date === 'end' ) {

				// Set min date to default
				picker.data( 'min_date', picker.data( 'o_min_date' ) );

				// Set fields
				fieldset.find( 'input.booking_to_date_year' ).val( parsed_date[0] );
				fieldset.find( 'input.booking_to_date_month' ).val( parsed_date[1] );
				fieldset.find( 'input.booking_to_date_day' ).val( parsed_date[2] ).change();

				// Calc duration
				if ( picker.data( 'is_range_picker_enabled' ) ) {
					wc_bookings_date_picker.calc_duration( picker );
				}

				// Next click will be start date
				picker.data( 'start_or_end_date', 'start' );

				if ( picker.data( 'is_range_picker_enabled' ) ) {
					form.find( '.wc_bookings_field_start_date legend span.label' ).text( 'always_visible' !== picker.data( 'display' ) ? booking_form_params.i18n_dates : booking_form_params.i18n_clear_date_selection );
				}

				if ( 'always_visible' !== picker.data( 'display' ) ) {
					$( this ).hide();
				}

			// Start date selected
			} else {
				// Set min date to today
				if ( picker.data( 'is_range_picker_enabled' ) ) {
					picker.data( 'o_min_date', picker.data( 'min_date' ) );
					picker.data( 'min_date', date );
				}

				// Set fields
				fieldset.find( 'input.booking_to_date_year' ).val( '' );
				fieldset.find( 'input.booking_to_date_month' ).val( '' );
				fieldset.find( 'input.booking_to_date_day' ).val( '' );

				fieldset.find( 'input.booking_date_year' ).val( parsed_date[0] );
				fieldset.find( 'input.booking_date_month' ).val( parsed_date[1] );
				fieldset.find( 'input.booking_date_day' ).val( parsed_date[2] ).change();

				// Calc duration
				if ( picker.data( 'is_range_picker_enabled' ) ) {
					wc_bookings_date_picker.calc_duration( picker );
				}

				// Next click will be end date
				picker.data( 'start_or_end_date', 'end' );

				if ( picker.data( 'is_range_picker_enabled' ) ) {
					form.find( '.wc_bookings_field_start_date legend span.label' ).text( booking_form_params.i18n_end_date );
				}

				if ( 'always_visible' !== picker.data( 'display' ) && ! picker.data( 'is_range_picker_enabled' ) ) {
					$( this ).hide();
				}
			}

			fieldset.triggerHandler( 'date-selected', date, start_or_end_date );
		},

		date_picker_init: function( element ) {

			var WC_DatePicker = new WC_Bookings_DatePicker( element );

			WC_DatePicker.set_default_params({
				onSelect: wc_bookings_date_picker.select_date_trigger,
				minDate: WC_DatePicker.get_data_attr( 'min_date' ),
				maxDate: WC_DatePicker.get_data_attr( 'max_date' ),
				defaultDate: WC_DatePicker.get_data_attr( 'default_date' ),
				closeText: WC_DatePicker.get_custom_data( 'closeText' ),
				currentText: WC_DatePicker.get_custom_data( 'currentText' ),
				prevText: WC_DatePicker.get_custom_data( 'prevText' ),
				nextText: WC_DatePicker.get_custom_data( 'nextText' ),
				monthNames: WC_DatePicker.get_custom_data( 'monthNames' ),
				monthNamesShort: WC_DatePicker.get_custom_data( 'monthNamesShort' ),
				dayNames: WC_DatePicker.get_custom_data( 'dayNames' ),
				dayNamesShort: WC_DatePicker.get_custom_data( 'dayNamesShort' ),
				dayNamesMin: WC_DatePicker.get_custom_data( 'dayNamesMin' ),
				firstDay: booking_form_params.client_firstday ? moment().localeData().firstDayOfWeek() : WC_DatePicker.get_custom_data( 'firstDay' ),
				isRTL: WC_DatePicker.get_custom_data( 'isRTL' ),
				beforeShowDay: WC_DatePicker.maybe_load_from_cache.bind( WC_DatePicker ),
				onChangeMonthYear: function( year, month ) {

					this.get_data( year, month )
						.done( this.applyStylesToDates );

				}.bind( WC_DatePicker ),
			});

			WC_DatePicker.create();

		},

		refresh_datepicker: function() {
			var $picker = $( '.wc-bookings-date-picker' ).find('.picker:eq(0)');
			$picker.datepicker( 'refresh' );
		},

		get_input_date: function( fieldset, where ) {
			var year  = fieldset.find( 'input.booking_' + where + 'date_year' ),
				month = fieldset.find( 'input.booking_' + where + 'date_month' ),
				day   = fieldset.find( 'input.booking_' + where + 'date_day' );

			if ( 0 !== year.val().length && 0 !== month.val().length && 0 !== day.val().length ) {
				return year.val() + '-' + month.val() + '-' + day.val();
			} else {
				return '';
			}
		},

		get_number_of_days: function( defaultNumberOfDays, $form, $picker, wc_bookings_booking_form ){
			var number_of_days = defaultNumberOfDays;
			var wcbf = wc_bookings_booking_form;
			if ( $form.find('#wc_bookings_field_duration').length > 0
				&& wcbf.duration_unit != 'minute'
				&& wcbf.duration_unit != 'hour'
				&& ! $picker.data( 'is_range_picker_enabled' ) )
			{
				var user_duration = $form.find('#wc_bookings_field_duration').val();
				number_of_days   = number_of_days * user_duration;
			}

			if ( number_of_days < 1 || wcbf.check_availability_against === 'start' ) {
				number_of_days = 1;
			}
			return number_of_days;
		},

		is_blocks_bookable: function( args ) {
			var bookable = args.default_availability;

			// Loop all the days we need to check for this block.
			for ( var i = 0; i < args.number_of_days; i++ ) {
				var the_date     = new Date( args.start_date );
				the_date.setDate( the_date.getDate() + i );

				var year        = the_date.getFullYear(),
					month       = the_date.getMonth() + 1,
					day         = the_date.getDate(),
					day_of_week = the_date.getDay(),
					week        = $.datepicker.iso8601Week( the_date );

				// Sunday is 0, Monday is 1, and so on.
				if ( day_of_week === 0 ) {
					day_of_week = 7;
				}

				// Is resource available in current date?
				// Note: resource_id = 0 is product's availability rules.
				// Each resource rules also contains product's rules.
				var resource_args = {
					date: the_date,
					default_availability: args.default_availability
				};
				var resource_rules = args.availability[ args.resource_id ];
				bookable = wc_bookings_date_picker.is_resource_available_on_date( resource_args, resource_rules );

				// In case of automatic assignment we want to make sure at least
				// one resource is available.
				if ( 'automatic' === args.resources_assignment ) {
					var automatic_resource_args = $.extend(
						{
							availability: args.availability,
							fully_booked_days: args.fully_booked_days
						},
						resource_args
					);

					bookable = wc_bookings_date_picker.has_available_resource( automatic_resource_args );
				}

				// Fully booked in entire block?
				var ymdIndex = year + '-' + month + '-' + day;
				if ( args.fully_booked_days[ ymdIndex ] ) {
					if ( args.fully_booked_days[ ymdIndex ][0] || args.fully_booked_days[ ymdIndex ][ args.resource_id ] ) {
						bookable = false;
					}
				}

				if ( ! bookable ) {
					break;
				}
			}

			return bookable;

		},

		/**
		 * Goes through all the rules and applies then to them to see if booking is available
		 * for the given date.
		 *
		 * Rules are recursively applied. Rules later array will override rules earlier in the array if
		 * applicable to the block being checked.
		 *
		 * @param args
		 * @param rules array of rules in order from lowest override power to highest.
		 *
		 * @returns boolean
		 */
		is_resource_available_on_date: function( args, rules ) {

			if ( 'object'!== typeof args || 'object' !== typeof rules ) {
				return false;
			}

			var defaultAvailability = args.default_availability,
				year         = args.date.getFullYear(),
				month        = args.date.getMonth() + 1, // months start at 0
				day          = args.date.getDate(),
				day_of_week  = args.date.getDay();

			var	firstOfJanuary = new Date( year, 0, 1 );
			var week =  Math.ceil( ( ( (args.date - firstOfJanuary ) / 86400000) + firstOfJanuary.getDay() + 1 ) / 7 );

			// Sunday is 0, Monday is 1, and so on.
			if ( day_of_week === 0 ) {
				day_of_week = 7;
			}

			// `args.fully_booked_days` and `args.resource_id` only available
			// when checking 'automatic' resource assignment.
			if ( args.fully_booked_days && args.fully_booked_days[ year + '-' + month + '-' + day ] && args.fully_booked_days[ year + '-' + month + '-' + day ][ args.resource_id ] ) {
				return false;
			}

			var minutesAvailableForDay    = [];
			var minutesForADay = _.range( 1, 1440 ,1 );
			// Ensure that the minutes are set when the all slots are available by default.
			if ( defaultAvailability ){
				minutesAvailableForDay = minutesForADay;
			}

			$.each( rules, function( index, rule ) {
				var type  = rule['type'];
				var range = rule['range'];
				try {
					switch ( type ) {
						case 'months':
							if ( typeof range[ month ] != 'undefined' ) {

								if ( range[ month ] ) {
									minutesAvailableForDay = minutesForADay;
								} else{
									minutesAvailableForDay = [];
								}
								return true; // go to the next rule
							}
							break;
						case 'weeks':
							if ( typeof range[ week ] != 'undefined' ) {
								if( range[ week ] ){
									minutesAvailableForDay = minutesForADay;
								} else{
									minutesAvailableForDay = [];
								}
								return true; // go to the next rule
							}
							break;
						case 'days':
							if ( typeof range[ day_of_week ] != 'undefined' ) {
								if( range[ day_of_week ] ){
									minutesAvailableForDay = minutesForADay;
								} else{
									minutesAvailableForDay = [];
								}
								return true; // go to the next rule
							}
							break;
						case 'custom':
							if ( typeof range[ year ][ month ][ day ] != 'undefined' ) {
								if( range[ year ][ month ][ day ]){
									minutesAvailableForDay = minutesForADay;
								} else{
									minutesAvailableForDay = [];
								}
								return true; // go to the next rule
							}
							break;
						case 'time':
						case 'time:1':
						case 'time:2':
						case 'time:3':
						case 'time:4':
						case 'time:5':
						case 'time:6':
						case 'time:7':
							if ( day_of_week === range.day || 0 === range.day ) {

								var fromHour = parseInt( range.from.split(':')[0] );
								var fromMinute = parseInt( range.from.split(':')[1] );
								var toHour = parseInt( range.to.split(':')[0] );
								var toMinute = parseInt( range.to.split(':')[1] );

								// each minute in the day gets a number from 1 to 1440
								var fromMinuteNumber = fromMinute + ( fromHour * 60 );
								var toMinuteNumber = toMinute + ( toHour * 60 );
								var minutesAvailableForTime = _.range(fromMinuteNumber, toMinuteNumber, 1);

								if ( range.rule ) {
									minutesAvailableForDay = _.union(minutesAvailableForDay, minutesAvailableForTime);
								} else {
									minutesAvailableForDay = _.difference(minutesAvailableForDay, minutesAvailableForTime);
								}

								return true;
							}
							break;
						case 'time:range':
							range = range[year][month][day];
							var fromHour = parseInt( range.from.split(':')[0] );
							var fromMinute = parseInt( range.from.split(':')[1] );
							var toHour = parseInt( range.to.split(':')[0] );
							var toMinute = parseInt( range.to.split(':')[1] );

							// each minute in the day gets a number from 1 to 1440
							var fromMinuteNumber = fromMinute + ( fromHour * 60 );
							var toMinuteNumber = toMinute + ( toHour * 60 );
							var minutesAvailableForTime = _.range(fromMinuteNumber, toMinuteNumber, 1);

							if ( range.rule ) {
								minutesAvailableForDay = _.union(minutesAvailableForDay, minutesAvailableForTime);
							} else {
								minutesAvailableForDay = _.difference(minutesAvailableForDay, minutesAvailableForTime);
							}
							break;
					}
				} catch( err ) {
					return true; // go to the next rule
				}
			});

			return ! _.isEmpty( minutesAvailableForDay );

		},
		get_week_number: function( date ){
			var January1 = new Date( date.getFullYear(), 0, 1 );
			var week     = Math.ceil( ( ( ( date - January1 ) / 86400000) + January1.getDay() + 1 ) / 7 );
			return week;
		},
		has_available_resource: function( args ) {
			for ( var resource_id in args.availability ) {
				resource_id = parseInt( resource_id, 10 );

				// Skip resource_id '0' that has been performed before.
				if ( 0 === resource_id ) {
					continue;
				}

				var resource_rules = args.availability[ resource_id ];
				args.resource_id = resource_id;
				if ( wc_bookings_date_picker.is_resource_available_on_date( args, resource_rules ) ) {
					return true;
				}
			}

			return false;
		}
	};

	/**
	 * Represents a jQuery UI DatePicker.
	 *
	 * @constructor
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {object} element - jQuery object for the picker that was initialized.
	 * @param   {object} opts - Optional arguments.
	 */
	var WC_Bookings_DatePicker = function WC_Bookings_DatePicker( element ) {

		this.$picker    = $( element );
		this.$form      = this.$picker.closest( 'form' );
		this.customData = {};
		this.opts       = {
			cache: false
		};
		this.cache      = {
			data       : {},
			attributes : {}
		};

		$.each( wc_bookings_booking_form, function( key, val ) {
			this.customData[ key ] = val;
		}.bind( this ) );

		$.each( booking_form_params, function( key, val ) {
			this.customData[ key ] = val;
		}.bind( this ) );

		if ( this.customData.cache_ajax_requests && ( 'true' == this.customData.cache_ajax_requests.toLowerCase() || 'false' == this.customData.cache_ajax_requests.toLowerCase() ) ) {
			this.opts.cache = 'true' == this.customData.cache_ajax_requests.toLowerCase();
		}

		if ( ! this.$picker.length ) {
			return;
		}

	}

	/**
	 * Creates the DatePicker referenced by initializing the first data call.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 */
	WC_Bookings_DatePicker.prototype.create = function create() {

		var year  		= parseInt( this.$form.find( 'input.booking_date_year' ).val(), 10 );
		var month 		= parseInt( this.$form.find( 'input.booking_date_month' ).val(), 10 );
		var day   		= parseInt( this.$form.find( 'input.booking_date_day' ).val(), 10 );

		this.$picker
			.empty()
			.removeClass( 'hasDatepicker' )
			.datepicker( this.get_default_params() );

		$( '.ui-datepicker-current-day' ).removeClass( 'ui-datepicker-current-day' );

		if ( year && month && day ) {
			this.$picker.datepicker( 'setDate', new Date( year, month - 1, day ) );
		}

		var picker_month = this.$picker.datepicker('getDate').getMonth() + 1;
		var picker_year = this.$picker.datepicker('getDate').getFullYear();

		this.get_data( picker_year, picker_month )
			.done( this.applyStylesToDates );

	}

	/**
	 * Applys attributes to the dates on the datepicker. This is necessary since we cant
	 * defer beforeShowDay until after our data is loaded.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {object} dateRange - Date range for attributes to be applied to.
	 */
	WC_Bookings_DatePicker.prototype.applyStylesToDates = function applyStylesToDates( dateRange ) {
		/*
		 * Offset for dates to avoid comparing them at midnight. Browsers are inconsistent with how they
		 * handle midnight time right before a DST time change.
		 */
		var HOUR_OFFSET = 12;

		dateRange.startDate.setHours( HOUR_OFFSET );
		dateRange.endDate.setHours( HOUR_OFFSET );
		var checkDate = dateRange.startDate;

		while ( checkDate < dateRange.endDate ) {

			var cacheKey = checkDate.getTime();

			if ( ! this.cache.attributes[ cacheKey ] ) {

				var attributes	= this.getDateElementAttributes( checkDate );
				var selector	= $( 'td[data-month="' + checkDate.getMonth() + '"] a', this.$picker ).filter(function() {
					return $(this).text() == checkDate.getDate();
				}).parent();

				if ( ! attributes.selectable ) {
					attributes.class.push( 'ui-datepicker-unselectable' );
					attributes.class.push( 'ui-state-disabled' );
				}

				if ( checkDate.setHours( HOUR_OFFSET, 0, 0, 0 ) === new Date().setHours( HOUR_OFFSET, 0, 0, 0 ) ) {
					attributes.class.push( 'ui-datepicker-today' );
				}

				$.each( attributes, function( key, val ) {

					selector.attr( key, ( $.isArray( val ) ) ? val.join( ' ' ) : val );

				});

				if ( this.opts.cache ) {
					this.cache.attributes[ cacheKey ] = attributes;
				}

			}

			checkDate.setDate( checkDate.getDate() + 1 );

		}

	}

	/**
	 * If caching is being requested beforeShowDay will use this method to load styles from cache if available.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {object} date - Date to apply attributes to.
	 */
	WC_Bookings_DatePicker.prototype.maybe_load_from_cache = function maybe_load_from_cache( date ) {

		var cacheKey = date.getTime();

		var defaultClass		= ( '1' === this.customData.default_availability ) ? 'bookable' : 'not-bookable' ;
		var attributes			= [ true, defaultClass, '' ];
		var cachedAttributes	= this.cache.attributes[ cacheKey ];

		if ( cachedAttributes ) {
			cachedAttributes = [ cachedAttributes.selectable, cachedAttributes.class.join( ' ' ), cachedAttributes.title ];
		} else if ( this.bookingsData ) {
			var attrs = this.getDateElementAttributes( date );
			attributes = [ attrs.selectable, attrs.class.join(' '), attrs.title ];
		}

		return cachedAttributes || attributes;

	}

	/**
	 * Returns the default parameters.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 */
	WC_Bookings_DatePicker.prototype.get_default_params = function get_default_params() {

		return this.defaultParams || {};

	}

	/**
	 * Set and override the default parameters.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {object} params - Parameters to be set or overridden.
	 */
	WC_Bookings_DatePicker.prototype.set_default_params = function set_default_params( params ) {

		var _defaultParams = {
			showWeek			: false,
			showOn				: false,
			numberOfMonths		: 1,
			showButtonPanel		: false,
			showOtherMonths		: true,
			selectOtherMonths	: true,
			gotoCurrent			: true,
			dateFormat			: $.datepicker.ISO_8601,
		}

		if ( typeof params !== 'object' ) {
			throw new Error( 'Cannot set params with typeof ' + typeof params );
			return;
		}

		this.defaultParams = $.extend( _defaultParams, params ) || {};

	}

	/**
	 * Get the data from the server for a block of time.
	 *
	 * @since   1.10.11
	 * @param   {string} year - Year being requested.
	 * @param   {string} month - Month being requested.
	 * @returns {object} Deferred object to be resolved after the http request
	 */
	WC_Bookings_DatePicker.prototype.get_data = function get_data( year, month ) {
		/**
		 * Overlay styles when jQuery.block is called to block the DOM.
		 */
		var blockUIOverlayCSS = {
			background: '#fff',
			opacity: 0.6,
		};

		/**
		 * Get a date range based on the start date.
		 *
		 * @since   1.10.11
		 * @param   {string} startDate - Optional start date to get the date range from.
		 * @returns {object} Object referencing the start date and end date for the range calculated.
		 */
		var get_date_range = function get_date_range( startDate ) {

			if ( ! startDate ) {
				startDate = new Date( [ year, month, '01' ].join( '/' ) );
			}

			var range = this.get_number_of_days_in_month( month );
			return this.get_padded_date_range( startDate, range );

		}.bind(this);

		var deferred	= $.Deferred();
		var dateRange   = get_date_range();

		var cacheKey	= dateRange.startDate.getTime() + '-' + dateRange.endDate.getTime();

		if ( this.opts.cache && this.cache.data[ cacheKey ] ) {

			deferred.resolveWith( this, [ dateRange, this.cache.data[ cacheKey ] ] );

		} else {

			var params = {
				'product_id': this.get_custom_data( 'product_id' ),
				'wc-ajax'	: 'wc_bookings_find_booked_day_blocks',
				'security'	: this.$form.data( 'nonce' ),
			}

			this.$picker.block( {
				message: null,
				overlayCSS: blockUIOverlayCSS,
			} );

			if ( booking_form_params.timezone_conversion ) {
				params.timezone_offset = get_client_server_timezone_offset_hrs( dateRange.startDate );
			}

			params.min_date = moment( dateRange.startDate ).format( 'YYYY-MM-DD' );
			params.max_date = moment( dateRange.endDate ).format( 'YYYY-MM-DD' );

			$.ajax({
				context: this,
				url: wc_bookings_date_picker_args.ajax_url,
				method: 'GET',
				data: params,
			})
			.done( function( data ) {

				this.bookingsData = this.bookingsDate || {};

				$.each( data, function( key, val ) {

					if ( $.isArray( val ) || typeof val === 'object' ) {

						var emptyType = ( $.isArray( val ) ) ? [] : {};

						this.bookingsData[ key ] = this.bookingsData[ key ] || emptyType;

						$.extend( this.bookingsData[ key ], val );

					} else {

						this.bookingsData[ key ] = val;

					}

				}.bind( this ) );

				this.cache.data[ cacheKey ] = data;

				if ( ! year && ! month && this.bookingsData.min_date ) {
					dateRange = get_date_range( this.get_default_date( this.bookingsData.min_date ) );
				}

				deferred.resolveWith( this, [ dateRange, data ] );

				this.$picker.unblock();

			}.bind( this ) );

		}

		return deferred;

	}

	/**
	 * Gets the default date
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @returns {Date}  Default date
	 */
	WC_Bookings_DatePicker.prototype.get_default_date = function get_default_date( minBookableDate ) {

		var defaultDate;
		var defaultDateFromData = this.$picker.data( 'default_date' ).split('-');
		// We change the day to be 31, as default_date defaults to the current day,
		// but we want to go as far as to the end of the current month.
		defaultDateFromData[2] = '31';
		var modifier            = 1;

		// If for some reason the default_date didn't get or set incorrectly we should
		// try to fix it even though it may be indicative somewith else has gone wrong
		// on the backend.
		defaultDate = ( defaultDateFromData.length !== 3 ) ? new Date() : new Date( defaultDateFromData );

		// The server will sometimes return a min_bookable_date with the data request
		// If that happens we need to modify the default date to start from this
		// modified date.
		if ( minBookableDate ) {

			switch( minBookableDate.unit ) {
				case 'month' :
					modifier = 30;
					break;
				case 'week' :
					modifier = 7;
					break;
			}

			modifier = modifier * minBookableDate.value;

			defaultDate.setDate( defaultDate.getDate() + modifier );

		}

		return defaultDate;

	}

	/**
	 * Get number of days in a month
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {number} [ month = currentMonth ] - The month in a 1 based index to get the number of days for.
	 * @returns {number} Number of days in the month.
	 */
	WC_Bookings_DatePicker.prototype.get_number_of_days_in_month = function get_number_of_days_in_month( month ) {

			var currentDate = this.get_default_date();

			month = month || currentDate.getMonth() + 1;

			return new Date( currentDate.getFullYear(), month, 0 ).getDate();

		}

	/**
	 * Get custom data that was set by the server prior to rendering the client.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {string} key - Custom data attribute to get.
	 */
	WC_Bookings_DatePicker.prototype.get_custom_data = function get_custom_data( key ) {

		if ( ! key ) {
			return;
		}

		return this.customData[ key ] || null;

	}

	/**
	 * Get data attribute set on the $picker element.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {string} attr - Data attribute to get.
	 */
	WC_Bookings_DatePicker.prototype.get_data_attr = function get_data_attr( attr ) {

		if ( ! attr ) {
			return;
		}

		return this.$picker.data( attr );

	}

	/**
	 * Gets a date range with a padding in days on either side of the range.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {Date}   date - Date to start from.
	 * @param   {number} rangeInDays - Number of days to build for the range.
	 * @param   {number} padInDays - Number of days to pad on either side of the range.
	 */
	WC_Bookings_DatePicker.prototype.get_padded_date_range = function get_padded_date_range( date, rangeInDays, padInDays ) {

		date					= date || this.get_default_date();
		rangeInDays				= rangeInDays || 30;
		padInDays				= padInDays || 7;

		var currentDate 		= new Date();
		var isCurrentDayToday 	= ( date < currentDate );
		var startDate			= new Date( date.setDate( ( isCurrentDayToday ) ? currentDate.getDate() : '01' ) ); // We dont go back further than today
		var endDate				= new Date( startDate.getTime() );

		startDate.setDate( startDate.getDate() - ( ( isCurrentDayToday ) ? 0 : padInDays ) ); // No reason to pad the left if the date is today
		endDate.setDate( endDate.getDate() + ( rangeInDays + padInDays ) );

		return {
			startDate	: startDate,
			endDate		: endDate
		}

	}

	/**
	 * Gets the date element attributes. This was formerly called is_bookable but changed names to more accurately reflect its new purpose.
	 *
	 * @version 1.10.11
	 * @since   1.10.11
	 * @param   {Date}   key - Date to get the element attributes for.
	 * @returns {object} Attributes computed for the date.
	 */
	WC_Bookings_DatePicker.prototype.getDateElementAttributes = function getDateElementAttributes( date ) {

		var attributes = {
			class		: [],
			title		: '',
			selectable	: true,
		}

		var resource_id = ( this.$form.find( 'select#wc_bookings_field_resource' ).val() > 0 ) ? this.$form.find( 'select#wc_bookings_field_resource' ).val() : 0;
		var year        = date.getFullYear();
		var month       = date.getMonth() + 1;
		var day         = date.getDate();
		var day_of_week = date.getDay();
		var ymdIndex    = year + '-' + month + '-' + day;
		var today		= new Date();

		// Unavailable days?
		if ( this.bookingsData.unavailable_days && this.bookingsData.unavailable_days[ ymdIndex ] && this.bookingsData.unavailable_days[ ymdIndex ][ resource_id ] ) {

			attributes.title 		= booking_form_params.i18n_date_unavailable;
			attributes.selectable 	= false;
			attributes.class.push( 'not_bookable' );

		}

		// Buffer days?
		if ( this.bookingsData.buffer_days && this.bookingsData.buffer_days[ ymdIndex ] ) {

			attributes.title 		= booking_form_params.i18n_date_unavailable;
			attributes.selectable 	= false;
			attributes.class.push( 'not_bookable' );

		}

		// Restricted days?
		if ( this.bookingsData.restricted_days && undefined === this.bookingsData.restricted_days[ day_of_week ] ) {

			attributes.title 		= booking_form_params.i18n_date_unavailable;
			attributes.selectable 	= false;
			attributes.class.push( 'not_bookable' );

		}

		if ( '' + year + month + day < wc_bookings_booking_form.current_time ) {

			attributes.title 		= booking_form_params.i18n_date_unavailable;
			attributes.selectable 	= false;
			attributes.class.push( 'not_bookable' );

		}

		// Fully booked?
		if ( this.bookingsData.fully_booked_days[ ymdIndex ] ) {
			if ( this.bookingsData.fully_booked_days[ ymdIndex ][0] || this.bookingsData.fully_booked_days[ ymdIndex ][ resource_id ] ) {

				attributes.title 		= booking_form_params.i18n_date_fully_booked;
				attributes.selectable 	= false;
				attributes.class        = [ 'fully_booked' ];

				return attributes;

			} else if ( 'automatic' === this.customData.resources_assignment ) {

				attributes.class        = [ 'partial_booked' ];

			}
		}

		// Apply partially booked CSS class.
		if ( this.bookingsData.partially_booked_days && this.bookingsData.partially_booked_days[ ymdIndex ] ) {
			if ( 'automatic' === this.customData.resources_assignment || this.bookingsData.partially_booked_days[ ymdIndex ][0] || this.bookingsData.partially_booked_days[ ymdIndex ][ resource_id ] ) {
				attributes.class        = [ 'partial_booked' ];
			}
		}

		var number_of_days = wc_bookings_date_picker.get_number_of_days( this.customData.booking_duration, this.$form, this.$picker, wc_bookings_booking_form );
		var block_args = {
			start_date          : date,
			number_of_days      : number_of_days,
			fully_booked_days   : this.bookingsData.fully_booked_days,
			availability        : this.bookingsData.availability_rules,
			default_availability: this.customData.default_availability,
			resource_id         : resource_id,
			resources_assignment: this.customData.resources_assignment
		};

		var bookable = wc_bookings_date_picker.is_blocks_bookable( block_args );

		if ( ! bookable ) {

			attributes.title 		= booking_form_params.i18n_date_unavailable;
			attributes.selectable 	= bookable;
			attributes.class        = [ this.bookingsData.fully_booked_days[ ymdIndex ] ? 'fully_booked' : 'not_bookable' ];

		} else {

			if ( attributes.class.indexOf( 'partial_booked' ) > -1 ) {
				attributes.title = booking_form_params.i18n_date_partially_booked;
			} else {
				attributes.title = booking_form_params.i18n_date_available;
			}
			var fieldset   = this.$picker.closest( 'fieldset' );
			var start_date = $.datepicker.parseDate( $.datepicker.ISO_8601, wc_bookings_date_picker.get_input_date( fieldset, '' ) );
			var end_date;

			if ( this.$picker.data( 'is_range_picker_enabled' ) ) {
				end_date = $.datepicker.parseDate( $.datepicker.ISO_8601, wc_bookings_date_picker.get_input_date( fieldset, 'to_' ) );
			} else if ( start_date && number_of_days > 1 ) {
				// We only want to do this for days, and number_of_days will
				// be 1 if the duration day is something different
				end_date = new Date( start_date );
				end_date.setDate( end_date.getDate() + ( number_of_days - 1 ) );
			}

			// Add bookable-range CSS to all days in the range
			if ( start_date && ( ( date.getTime() === start_date.getTime() ) || ( end_date && date >= start_date && date <= end_date ) ) ) {

				attributes.class.push( 'bookable-range' );

				// Add either selection-start-date or selection-end-date CSS to the first/last day only
				if ( date.getTime() === start_date.getTime() ) {

					attributes.class.push( 'selection-start-date' );

				} else if ( date.getTime() === end_date.getTime() ) {

					attributes.class.push( 'selection-end-date' );

				}
			} else {

				attributes.class.push( 'bookable' );

			}

		}

		return attributes;

	}

	moment.locale( wc_bookings_locale );

	// export globally
	wc_bookings_date_picker = wc_bookings_date_picker_object;
	wc_bookings_date_picker.init();
});
