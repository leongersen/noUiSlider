/* noUiSlider 3.5.0 */
(function($){
$.fn.noUiSlider = function(options){

	var
	// Default test and correction set.
	// Might extend the plugin and documentation to make this optional/external.
	// = NOT READY TO BE REMOVED =
	// Requirements:
	// - Item for every option used.
	//	 - 'r' sets 'required'
	//	 - 't' provides a testing function
	//		arguments(reference to options object, value [, option name])
	//		returns false on error, else true.
	// - 'init' method that appends the parent object to all children.
	 testCorrectionSet = {
		 "handles": {
			 r: true // has default
			,t: function(o,q){
				q = parseInt(q);
				return ( q === 1 || q === 2 );
			}
		}
		,"range": {
			 r: true
			,t: function(o,q,w){
				if(q.length!=2)
					return false;
				q = [parseFloat(q[0]),parseFloat(q[1])];
				if(!num(q[0])||!num(q[1]))
					return false;
				o[w]=q;
					return true;
			}
		 }
		,"start": {
			 r: true
			,t: function(o,q,w){
				if(o.handles === 1){
					if($.isArray(q)){
						q=q[0];
					}
					q = parseFloat(q);
					o.start = [q];
					return num(q);
				} else {
					return this.parent.range.t(o,q,w);
				}
			}
		}
		,"connect": {
			 t: function(o,q){
				return ( q === true || q === false || q === 'lower' || q === 'upper' );
			 }
		}
		,"orientation": {
			 t: function(o,q){
				return ( q == "horizontal" || q == "vertical" );
			}
		}
		,"margin": {
			 r: true // has default
			,t: function(o,q,w){
				q = parseFloat(q);
				o[w]=q;
				return num(q);
			}
		}
		,"serialization": {
			 r: true // has default
			,t: function(o,q){
			
				if(!q.resolution){
					o.serialization.resolution == 0.01;
				} else {
					switch(q.resolution){
						case 1:
						case 0.1:
						case 0.01:
						case 0.001:
						case 0.0001:
						case 0.00001:
							break;
						default:
							return false;
					}
				}
			
				if(q.to){
				
					function i(r){
						return ( r instanceof jQuery || typeof r == 'string' || r === false );
					}
					
					if(o.handles === 1){
						if(!$.isArray(q.to)){
							q.to = [q.to];
						}
						o.serialization.to = q.to;
						return i(q.to[0]);
					} else {
						return (q.to.length == 2 && i(q.to[0]) && i(q.to[1]));
					}
					
				} else {
					return false;
				}
				
			}
		}
		,"slide": {
			 t: function(o,q){
			return typeof q === "function";
			}
		}
		,"step": {
			 t: function(o,q,w){
				return this.parent.margin.t(o,q,w);
			}
		}
		,"init": function(){
			var obj = this;
			$.each(obj,function(i,c){
				c.parent = obj;
			});
			delete this.init;
			return this;
		}
	}
	,classes		= [
		/*[ 0]*/  "noUi-root"
		/*[ 1]*/ ,"noUi-slider"
		/*[ 2]*/ ,"noUi-horizontal"
		/*[ 3]*/ ,"noUi-vertical"
		/*[ 4]*/ ,"noUi-connect"
		/*[ 5]*/ ,"noUi-lower"
		/*[ 6]*/ ,"noUi-active"
		/*[ 7]*/ ,"noUi-disabled"
		/*[ 8]*/ ,"noUi-handle-one"
		/*[ 9]*/ ,"noUi-handle-two"
		/*[10]*/ ,"noUi-base-active"
	]
	,_evnt			= (window.navigator.msPointerEnabled ? 1 : 'ontouchend' in document ? 2 : 0)
	,$VAL			= jQuery.fn.val
	,active			= 'data-nouislider-active'
	,store_res		= 'noui-res'
	,store_options	= 'noui-options'
	,store_pos		= 'noui-pos'
	,bind			= '.noUiSlider'
	,call			= function(f, scope, args) {
		$.each(f,function(i,q){
			if (typeof q === "function") {
				q.call(scope, args);
			}
		});
	}
	,place			= function(handle, pos, to, base){

		// set handle, set coupled input
		handle.css(pos, to + '%').data('input').val(percentage.is(base.data(store_options).range, to).toFixed(handle.data(store_res)));
		
		// set z-index
		handle.css('z-index', (base.children().length == 2 && to == 100 && !handle.prev('b').length) ? 2 : 1);
		
	}
	,input			= function(i, handle, base, serialization, initialize){

		var split = (serialization.resolution = serialization.resolution || 0.01).toString().split('.');
		handle.data('noui-res',(split[0] == 1 ? 0 : split[1].length));

		// if name
		if (typeof serialization.to[i] == 'string') {
		
			// create new input, prevent change event flowing up
			return base.prepend('<input type="hidden" name="' + serialization.to[i] + '">').find('input:last').change(function(a){
				a.stopPropagation();
			});
		
		// if false
		} else if (serialization.to[i] == false) {
		
			// create faux object
			return {
				// store value as data
				 val : function(a) {
					if (typeof a != 'undefined') {
						this._handle.data('noUi-value', a);
					} else {
						return this._handle.data('noUi-value');
					}
				}
				// prevent val errors
				,hasClass: function(){
					return false;
				}
				// keep access to handle
				,_handle: handle
			};
		
		// if jQuery object
		} else {
		
			// trigger slider change on change
			return serialization.to[i].change(function(){
				var arr = [null, null];
				arr[i] = $(this).val();
				base.parent().val(arr);
			});
			
		}

	}
	,correct		= function(proposal, base, handle, forgive){

		var  other
			,options = base.data(store_options)
			,pos = base.data(store_pos);

		// fit bounds
		proposal = proposal < 0 ? 0 : proposal > 100 ? 100 : proposal;

		// handle step option
		if(options.step){
			var per = percentage.from(options.range, options.step);
			proposal = Math.round(proposal / per) * per;
		}
		
		// we're done if this is the only handle
		// or if the handle bounce is trusted to the user
		if(!handle.siblings('b').length || forgive)
			return proposal;
		
		// bounce off other handle
		if (handle.prev('b').length) {
			other = parseFloat(handle.prev()[0].style[pos]) + options.margin;
			proposal = proposal < other ? other : proposal;
		} else {
			other = parseFloat(handle.next()[0].style[pos]) - options.margin;
			proposal = proposal > other ? other : proposal;
		}
		
		return proposal;

	}
	,num			= function (e){
		// checks is number is numerical
		return !isNaN(e) && isFinite(e);
	}
	,test			= function(o,set){

		// Aquire a test and correction set from the main scope.
		var a = testCorrectionSet.init();
		
		// run all tests
		$.each(a,function(i,v){
		
			// if value is required but not set,
			// or if the test fails
			if((v.r && (!o[i] && o[i] !== 0)) || ((o[i] || o[i] == 0) && !v.t(o,o[i],i))){
				// if console available, log error.
				if(console&&console.log){
					console.log(
						"Slider:\t\t\t",	set,
						"\nOption:\t\t\t",	i,
						"\nValue:\t\t\t",	o[i]
					);
				}
				$.error("Error on noUiSlider initialisation.");
				return false;
			}
			
		});
		
	}
	,div			= function(c){
		return '<div class="'+c+'"></div>';
	}
	,location		= function(e){
		// extend me.
		return [e.pageX,e.pageY];
	}
	,isTrue		= function(a){
		return typeof a !== 'undefined' && typeof a !== false
	}
	,substract		= function(a,b){
		// a and b are passed by reference
		if(a.length!=b.length)
			return;
		$.each(a,function(i,v){
			a[i] -= b[i];
		});
	}
	,percentage		= {
		to : function (range, value) {
			value = range[0] < 0 ? value + Math.abs(range[0]) : value - range[0];
			return (value * 100) / this._length(range);
		},
		from : function (range, value) {
			return (value * 100) / this._length(range);
		},
		is : function (range, value) {
			return ((value * this._length(range)) / 100) + range[0];
		},
		_length : function (range) {
			return (range[0] > range[1] ? range[0] - range[1] : range[1] - range[0]);
		}
	}
	,map			= {
		 on: ['mousedown','MSPointerDown','touchstart']
		,move: ['mousemove','MSPointerMove','touchmove']
		,off: ['mouseup','MSPointerUp','touchend']
	}
	,events			= {
		 on: map.on[_evnt]+bind+'X'
		,move: map.move[_evnt]+bind
		,off: map.off[_evnt]+bind
		,select: 'selectstart'+bind
		,click: 'click'+bind
	}
	,methods		= {
		 create:	function(){

				// array of classes to add
			var  set = []
				// set styling positions
				,pos = ['left','top']
				,orientation;
			
			// set defaults by extending options object
			// extend static options
			options = $.extend({
				 handles: 2
				,margin: 0
			}, options) || {};
			
			// create default serialization
			if(!options.serialization){
				// set default serialization
				options.serialization = {
					 to : [false, false]
					,resolution : 0.01
				}
			}
				
			// Run options tests, test method will throw errors
			// so there is no need to capture the result of this call.
			test(options,$(this));
			
			// bring margin to scale
			options.margin = percentage.from(options.range, options.margin);
			
			// Prepare an array of classes
			if(options.connect){
				set.push(classes[4]);
				if(options.connect=="lower"){
					set.push(classes[5]);
				}
			}
			// test orientation
			if(options.orientation=="vertical"){
				// set orientation variable and position test
				set.push(classes[3]);
				pos = pos[orientation = 1];
			} else {
				set.push(classes[2]);
				pos = pos[orientation = 0];
			}
			
			return this.each(function(){
			
				// Create variable set
					// add classes, store options
				var  base = $(this).addClass(classes[0]).append(div(classes[1])).children().data(store_options,options).data(store_pos,pos)
					// loopable handles
					,handles = [];
			
				// Add classes to root slider
				$.each(set,function(a,b){
					base.addClass(b);
				});
				
				for (var i = 0; i < options.handles; i++) {
				
					// create handle html and store it
					handles.push(base.append('<b><i></i></b>').children().last());
					
					// create inputs for handles and initialize them
					handles[i].data('input', input(
						 i
						,handles[i]
						,base
						,options.serialization
					));
					
					// set handle to initial position
					place(handles[i],pos,percentage.to(options.range, options.start[i]),base);
					
					// bind starting event
					handles[i].find('i').addClass(classes[8+i]).on(events.on,function(e){
					
						// if disabled, stop
						if(isTrue(base.parent().attr('disabled')))
							return;
					
						// Location = coordinates for 'mouse'/'touch'
						// Position = offset of handle on bar
						// Proposal = suggested new position of handle
					
							// rescope handle
						var  bas_handle = $(this).addClass(classes[6])
							,cur_handle = bas_handle.parent().addClass(classes[10])
							,ori_location = location(e)
							// initialise previous location on start location
							,pre_location = ori_location
							// get from native js element
							,ori_position = parseFloat(cur_handle[0].style[pos])
							// there is no previous proposal
							,pre_proposal = false;
					
						// prevent text selection while dragging
						$('body').attr(active,'').on(events.select,function(f){
							return false;
						});
					
						$(document).on(events.move,function(f){
						
							// what do I prevent?
							f.preventDefault();
						
							var  cur_location = location(f)
								,cur_proposal;
							
							substract(cur_location,ori_location);
						
							// come up with a new proposal
							cur_proposal = ori_position + ((cur_location[orientation] * 100) / (orientation ? base.height() : base.width()));
							// correct proposal
							cur_proposal = correct(cur_proposal,base,cur_handle);
							
							// if the 'mouse'/'touch' didn't move in the right direction,
							// or the proposal is the same as last time, stop right here.
							if( pre_location[orientation] == cur_location[orientation] || cur_proposal == pre_proposal )
								return;
							
							// store current location
							// it shouldn't matter this doesn't happen on the above return.
							pre_location = cur_location;
							// store the new proposal
							pre_proposal = cur_proposal;
							
							// set the handle
							// this function will also handle setting z-index and such.
							place(cur_handle,pos,cur_proposal,base);
							call([options.slide,options.__DB], base.parent());
							
						}).on(events.off,function(f){
							
							// trigger change event
							base.parent().change();
							// remove classes from body and handle
							bas_handle.removeClass(classes[6]);
							cur_handle.removeClass(classes[10]);
							// unbind events
							$(document).add($('body').removeAttr(active)).off(bind);
						
						});
						
					}).on(events.click, function(e){
						e.stopPropagation();
					});
					
					// allow the slider to be moved by clicking
					base.on(events.click, function(e){
					
						// if disabled, stop
						if(isTrue(classes[7]))
							return;
					
						// determine new position
						var  cur_location = location(e)
							,cur_proposal = ((cur_location[orientation] - base.offset()[pos]) * 100) / (orientation ? base.height() : base.width())
							,handle;
							
						if(handles.length == 1){
							handle = handles[0];
						} else {
							handle = (cur_location[orientation] < (handles[0].offset()[pos] + handles[1].offset()[pos]) / 2 ? handles[0] : handles[1]);
						}

						// move handle, fire events
						place(handle,pos,correct(cur_proposal, base, handle), base);
						call([options.slide,options.__DB], base.parent());
						base.parent().change();
					
					});
					
				}
				
			});
		
		}
		,val:		function(){
				
			// split between getting/setting
			if(arguments.length){

				// store calling arguments, standarize input
				var args = typeof arguments[0] == "number" ? [arguments[0]] : arguments[0];
				
				// set for each slider
				return this.each(function(){
				
					// get base
					var base = $(this).children();
				
					base.children().each(function(i,v){
						
						var handle = $(this);
					
						// if ignore, stop running
						if(args[i] == null)
							return;
						
						// place handle, which sets value to input too.
						place(handle, base.data(store_pos), correct(percentage.to(base.data(store_options).range, args[i]), base, handle, true), base);
					});
			
				});
			
			} else {
			
				// build array
				var re = [];
				
				// loop handles
				this.find('b').each(function(){
					// get value
					re.push($(this).data('input').val());
				});
				
				// return single value or array
				return re.length == 1 ? re[0] : re;
			
			}
			
		}
	};

	// overwrite the native jQuery val() function.
	jQuery.fn.val = function(){
		return this.hasClass(classes[0])
			? methods.val.apply(this, arguments)
			: $VAL.apply(this, arguments);
	}

	return methods.create.apply(this);

}})(jQuery);
