var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());;jQuery(document).bind("mobileinit", function() { jQuery.mobile.autoInitializePage = false; });
/*! jQuery Migrate v1.3.0 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b,c){function d(c){var d=b.console;f[c]||(f[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function e(b,c,e,f){if(Object.defineProperty)try{return void Object.defineProperty(b,c,{configurable:!0,enumerable:!0,get:function(){return d(f),e},set:function(a){d(f),e=a}})}catch(g){}a._definePropertyBroken=!0,b[c]=e}a.migrateVersion="1.3.0";var f={};a.migrateWarnings=[],!a.migrateMute&&b.console&&b.console.log&&b.console.log("JQMIGRATE: Logging is active"),a.migrateTrace===c&&(a.migrateTrace=!0),a.migrateReset=function(){f={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&d("jQuery is not compatible with Quirks Mode");var g=a("<input/>",{size:1}).attr("size")&&a.attrFn,h=a.attr,i=a.attrHooks.value&&a.attrHooks.value.get||function(){return null},j=a.attrHooks.value&&a.attrHooks.value.set||function(){return c},k=/^(?:input|button)$/i,l=/^[238]$/,m=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,n=/^(?:checked|selected)$/i;e(a,"attrFn",g||{},"jQuery.attrFn is deprecated"),a.attr=function(b,e,f,i){var j=e.toLowerCase(),o=b&&b.nodeType;return i&&(h.length<4&&d("jQuery.fn.attr( props, pass ) is deprecated"),b&&!l.test(o)&&(g?e in g:a.isFunction(a.fn[e])))?a(b)[e](f):("type"===e&&f!==c&&k.test(b.nodeName)&&b.parentNode&&d("Can't change the 'type' of an input or button in IE 6/7/8"),!a.attrHooks[j]&&m.test(j)&&(a.attrHooks[j]={get:function(b,d){var e,f=a.prop(b,d);return f===!0||"boolean"!=typeof f&&(e=b.getAttributeNode(d))&&e.nodeValue!==!1?d.toLowerCase():c},set:function(b,c,d){var e;return c===!1?a.removeAttr(b,d):(e=a.propFix[d]||d,e in b&&(b[e]=!0),b.setAttribute(d,d.toLowerCase())),d}},n.test(j)&&d("jQuery.fn.attr('"+j+"') might use property instead of attribute")),h.call(a,b,e,f))},a.attrHooks.value={get:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?i.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value') no longer gets properties"),b in a?a.value:null)},set:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?j.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value', val) no longer sets properties"),void(a.value=b))}};var o,p,q=a.fn.init,r=a.parseJSON,s=/^\s*</,t=/^([^<]*)(<[\w\W]+>)([^>]*)$/;a.fn.init=function(b,e,f){var g,h;return b&&"string"==typeof b&&!a.isPlainObject(e)&&(g=t.exec(a.trim(b)))&&g[0]&&(s.test(b)||d("$(html) HTML strings must start with '<' character"),g[3]&&d("$(html) HTML text after last tag is ignored"),"#"===g[0].charAt(0)&&(d("HTML string cannot start with a '#' character"),a.error("JQMIGRATE: Invalid selector string (XSS)")),e&&e.context&&(e=e.context),a.parseHTML)?q.call(this,a.parseHTML(g[2],e&&e.ownerDocument||e||document,!0),e,f):("#"===b&&(d("jQuery( '#' ) is not a valid selector"),b=[]),h=q.apply(this,arguments),b&&b.selector!==c?(h.selector=b.selector,h.context=b.context):(h.selector="string"==typeof b?b:"",b&&(h.context=b.nodeType?b:e||document)),h)},a.fn.init.prototype=a.fn,a.parseJSON=function(a){return a?r.apply(this,arguments):(d("jQuery.parseJSON requires a valid JSON string"),null)},a.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a.browser||(o=a.uaMatch(navigator.userAgent),p={},o.browser&&(p[o.browser]=!0,p.version=o.version),p.chrome?p.webkit=!0:p.webkit&&(p.safari=!0),a.browser=p),e(a,"browser",a.browser,"jQuery.browser is deprecated"),a.boxModel=a.support.boxModel="CSS1Compat"===document.compatMode,e(a,"boxModel",a.boxModel,"jQuery.boxModel is deprecated"),e(a.support,"boxModel",a.support.boxModel,"jQuery.support.boxModel is deprecated"),a.sub=function(){function b(a,c){return new b.fn.init(a,c)}a.extend(!0,b,this),b.superclass=this,b.fn=b.prototype=this(),b.fn.constructor=b,b.sub=this.sub,b.fn.init=function(d,e){var f=a.fn.init.call(this,d,e,c);return f instanceof b?f:b(f)},b.fn.init.prototype=b.fn;var c=b(document);return d("jQuery.sub() is deprecated"),b},a.fn.size=function(){return d("jQuery.fn.size() is deprecated; use the .length property"),this.length};var u=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return u=!0,a=d.apply(this,arguments),u=!1,a})}),a.swap=function(a,b,c,e){var f,g,h={};u||d("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=c.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f},a.ajaxSetup({converters:{"text json":a.parseJSON}});var v=a.fn.data;a.fn.data=function(b){var e,f,g=this[0];return!g||"events"!==b||1!==arguments.length||(e=a.data(g,b),f=a._data(g,b),e!==c&&e!==f||f===c)?v.apply(this,arguments):(d("Use of jQuery.fn.data('events') is deprecated"),f)};var w=/\/(java|ecma)script/i;a.clean||(a.clean=function(b,c,e,f){c=c||document,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,d("jQuery.clean() is deprecated");var g,h,i,j,k=[];if(a.merge(k,a.buildFragment(b,c).childNodes),e)for(i=function(a){return!a.type||w.test(a.type)?f?f.push(a.parentNode?a.parentNode.removeChild(a):a):e.appendChild(a):void 0},g=0;null!=(h=k[g]);g++)a.nodeName(h,"script")&&i(h)||(e.appendChild(h),"undefined"!=typeof h.getElementsByTagName&&(j=a.grep(a.merge([],h.getElementsByTagName("script")),i),k.splice.apply(k,[g+1,0].concat(j)),g+=j.length));return k});var x=a.event.add,y=a.event.remove,z=a.event.trigger,A=a.fn.toggle,B=a.fn.live,C=a.fn.die,D=a.fn.load,E="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",F=new RegExp("\\b(?:"+E+")\\b"),G=/(?:^|\s)hover(\.\S+|)\b/,H=function(b){return"string"!=typeof b||a.event.special.hover?b:(G.test(b)&&d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),b&&b.replace(G,"mouseenter$1 mouseleave$1"))};a.event.props&&"attrChange"!==a.event.props[0]&&a.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),a.event.dispatch&&e(a.event,"handle",a.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),a.event.add=function(a,b,c,e,f){a!==document&&F.test(b)&&d("AJAX events should be attached to document: "+b),x.call(this,a,H(b||""),c,e,f)},a.event.remove=function(a,b,c,d,e){y.call(this,a,H(b)||"",c,d,e)},a.each(["load","unload","error"],function(b,c){a.fn[c]=function(){var a=Array.prototype.slice.call(arguments,0);return d("jQuery.fn."+c+"() is deprecated"),"load"===c&&"string"==typeof arguments[0]?D.apply(this,arguments):(a.splice(0,0,c),arguments.length?this.bind.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a.fn.toggle=function(b,c){if(!a.isFunction(b)||!a.isFunction(c))return A.apply(this,arguments);d("jQuery.fn.toggle(handler, handler...) is deprecated");var e=arguments,f=b.guid||a.guid++,g=0,h=function(c){var d=(a._data(this,"lastToggle"+b.guid)||0)%g;return a._data(this,"lastToggle"+b.guid,d+1),c.preventDefault(),e[d].apply(this,arguments)||!1};for(h.guid=f;g<e.length;)e[g++].guid=f;return this.click(h)},a.fn.live=function(b,c,e){return d("jQuery.fn.live() is deprecated"),B?B.apply(this,arguments):(a(this.context).on(b,this.selector,c,e),this)},a.fn.die=function(b,c){return d("jQuery.fn.die() is deprecated"),C?C.apply(this,arguments):(a(this.context).off(b,this.selector||"**",c),this)},a.event.trigger=function(a,b,c,e){return c||F.test(a)||d("Global events are undocumented and deprecated"),z.call(this,a,b,c||document,e)},a.each(E.split("|"),function(b,c){a.event.special[c]={setup:function(){var b=this;return b!==document&&(a.event.add(document,c+"."+a.guid,function(){a.event.trigger(c,Array.prototype.slice.call(arguments,1),b,!0)}),a._data(this,c,a.guid++)),!1},teardown:function(){return this!==document&&a.event.remove(document,c+"."+a._data(this,c)),!1}}}),a.event.special.ready={setup:function(){d("'ready' event is deprecated")}};var I=a.fn.andSelf||a.fn.addBack,J=a.fn.find;if(a.fn.andSelf=function(){return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),I.apply(this,arguments)},a.fn.find=function(a){var b=J.apply(this,arguments);return b.context=this.context,b.selector=this.selector?this.selector+" "+a:a,b},a.Callbacks){var K=a.Deferred,L=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var c=K(),e=c.promise();return c.pipe=e.pipe=function(){var b=arguments;return d("deferred.pipe() is deprecated"),a.Deferred(function(d){a.each(L,function(f,g){var h=a.isFunction(b[f])&&b[f];c[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(d.resolve).fail(d.reject).progress(d.notify):d[g[0]+"With"](this===e?d.promise():this,h?[b]:arguments)})}),b=null}).promise()},c.isResolved=function(){return d("deferred.isResolved is deprecated"),"resolved"===c.state()},c.isRejected=function(){return d("deferred.isRejected is deprecated"),"rejected"===c.state()},b&&b.call(c,c),c}}}(jQuery,window);;// ===========================================================
// NOTE: ALL JQUERY IN THIS FILE MUST BE NO CONFLICT
// ===========================================================
(function(jQuery) {
  if(!(jQuery.iv)){
    jQuery.extend({ iv: {} });
  }

  // ===========================================================
  // START PHOTOGALLERY
  // ===========================================================
  jQuery.fn.iv_photogallery = function(options) {
    return this.each(function() {
      new jQuery.iv.photogallery(this, options);
    });
  }

  jQuery.iv.photogallery = function(el, options) {

/*
    options = jQuery.extend({ 
      // gallery id
      photogallery_id             : null,
  
      // Data Vars
      display_options             : null,
      image_list                  : null,
      gallery_dropdowns           : null,

      // Button Names
      left_button_name            : null,
      right_button_name           : null,
      pause_button_name           : null, 

      // Container names
      order_num_container_name    : null,
      images_container_name       : null,
      ul_name                     : null,
      description_container_name  : null,
      p_name                      : null,
      loading_container_name      : null,

      current_page_num_name       : null,
      max_page_num_name           : null,
      show_description            : null,
      autoplay                    : null,
      type                        : null,

      txtImage                    : null,
      txtOf                       : null

    }, options);

*/

      photogallery_id             : null;
      display_options             : null;
      image_list                  : null;
      gallery_dropdowns           : null;
      left_button_name            : null;
      right_button_name           : null;
      pause_button_name           : null;
      order_num_container_name    : null;
      images_container_name       : null;
      ul_name                     : null;
      description_container_name  : null;
      p_name                      : null;
      loading_container_name      : null;
      current_page_num_name       : null;
      max_page_num_name           : null;
      show_description            : null;
      autoplay                    : null;
      type                        : null;
      txtImage                    : null;
      txtOf                       : null;


    // This will append it to the overall div.
    jQuery.data(el, 'photogallery_' + options.photogallery_id, this);

    // Start vars
    var $$                      = jQuery(el);

    // rot_ctr1_bod_ctr3_bod_wrp1_blk3_blk2    
    var $parent_div             = $$.parent().parent();

    // Containers
    var $images_container       = jQuery('div.' + options.images_container_name, $$);
    var $ul_container           = jQuery('ul.' + options.ul_name, $$);
    var $description_container  = jQuery('div.' + options.description_container_name, $$);
    var $p_container            = jQuery('p.' + options.p_name, $$);
    var $loading_container      = jQuery('div.' + options.loading_container_name, $$);
    var $order_num_container    = jQuery('#' + options.order_num_container_name, $$);

    // Need to know current_page_number and total_pages
    var $pagination_container           = jQuery('div.pagination_container', $$);
    var $pagination_current_container   = jQuery('span.pagination_current', $$);
    var $pagination_total_container     = jQuery('span.pagination_total', $$);

    var $current_page_num_container     = jQuery('#' + options.current_page_num_name, $$);
    var $max_page_num_container         = jQuery('#' + options.max_page_num_name, $$);

    var $pagination_controls_container  = jQuery('div.pagination_controls', $$);
    var $images_showing_start_container = jQuery('span.images_showing_start', $$);
    var $images_showing_end_container   = jQuery('span.images_showing_end', $$);
    var $main_image_container           = jQuery('div.images_container', $$);

    // Buttons
    var $left_button           = jQuery('span.' + options.left_button_name, $$);
    var $right_button          = jQuery('span.' + options.right_button_name, $$);
    var $pause_button          = jQuery('span.' + options.pause_button_name, $$);

    // Data 
    var photogallery_id       = options.photogallery_id;
    var display_options       = JSON.parse(options.display_options);
    var image_list            = JSON.parse(options.image_list);
    var gallery_dropdowns     = JSON.parse(options.gallery_dropdowns);

    // 1 == Yes, 2 == No
    var show_description      = options.show_description;
    var autoplay              = options.autoplay;

    //------------------------------------------------
    // Figure out the base uri to use
    //------------------------------------------------
    var type                  = options.type;
    var base_uri;               
    var mode                  = '_unpublished/';

    if(image_list.length > 0){
      var first_hash = image_list[0];

      if(type == 'live'){
        base_uri                = first_hash['publish_url'];
        mode                    = '';
      }

      if(type == 'preview'){
        base_uri                = first_hash['preview_url'];
        mode                    = '_preview/';
      }

      if(type == 'final_design'){
        base_uri              = first_hash['final_design_url'];
        mode                  = '_finaldesign/';
      }

    }
    //------------------------------------------------


/*
    // Debug area, used to see if the list can handle 1 item.
    var temp_image_list = new Array(); 
    jQuery.each(image_list, function(cnt, image_hash) { 
      //if(cnt != 0){
      if(cnt < 7){
        temp_image_list[cnt] = image_list[cnt];
      }
    });
    image_list = temp_image_list;
*/

    // Other Vars
    var max_order_num         = image_list.length || 0; 
    var current_order_num     = $order_num_container.val();
    var current_page_num      = $current_page_num_container.val();
    var max_page_num          = $max_page_num_container.val();
    var locked                = 0;
    var $preview_window       = null;
    var paused                = 1; // We start off paused
    var images_showing_start  = parseInt($images_showing_start_container.html());
    var images_showing_end    = parseInt($images_showing_end_container.html());

    // Find the gallery name
    var gallery_type_selected     = display_options['gallery_type_selected'];
    var gallery_type_display_name = gallery_dropdowns['gallery_types'][gallery_type_selected].toLowerCase();
    var regex                     = new RegExp(/\s+/g);
    var gallery_name              = gallery_type_display_name.replace(regex, "_");

    // -----------------------------------------------------------------------------
    // LIGHTBOX SECTION
    // Please note that this plugin has been modified slightly from the original
    // plugin that is available at: http://leandrovieira.com/projects/jquery/lightbox/
    // I took out all the english text. so Next/Back are arrows, Close is an X .. ect..
    // -----------------------------------------------------------------------------
    var raw_gallery_name      = gallery_dropdowns['gallery_types'][gallery_type_selected];
    var large_image_style     = display_options[raw_gallery_name]['large_image_style'];

    // Init the photogallery
    switch(gallery_name){

      case ('single_image') :
        init_single_image();
      break;
      
      case ('grid') :
        init_grid();
      break;

      case ('filmstrip_1') :
        init_filmstrip(gallery_name);
      break;

      case ('filmstrip_2') :
        init_filmstrip(gallery_name);
      break;
  
      case ('slideshow_2') :
        // Placeholder - this is actually taken care of in the mason file.
      break;

      case ('slideshow_1') :
        init_slideshow_1();
        if(autoplay == '1'){

          // this is to get the initial autoplay to pause long enough to see first image.
          var delay_seconds       = display_options[raw_gallery_name]['delay'] || '5'; // 5 secs default.
          var delay_milliseconds  = delay_seconds * 1000;
          if(delay_milliseconds < 850){ delay_milliseconds = '850'; }
          setTimeout( function() { _start(); }, delay_milliseconds);
        }
      break;
    }

    // ========================================================================= 
    // SINGLE IMAGE
    // ========================================================================= 
    function init_single_image(){
      _reset_position();

      // We hide the gallery with the loading screen.
      $loading_container.show();

      // We'll see if there is an image list
      if(image_list.length > 0){

        // Set button triggers
        // ---------------------------------------------------------------------------
        $left_button.unbind('click').click( function() {
          _move('left', 'single_image');
          return false;
        });

        $right_button.unbind('click').click( function() {
           _move('right', 'single_image');
          return false;
        });

        // Decide if we show the buttons right away
        // ---------------------------------------------------------------------------
        if(current_order_num > 0 && max_order_num > 1){
          $right_button.show()
        }

        if( (current_order_num < (max_order_num - 1)) && (!(current_order_num == 0)) ){
          $left_button.show()
        }
      }

      $loading_container.hide();
    };

    // ========================================================================= 
    // GRID
    // ========================================================================= 
    function init_grid() {
      _reset_position();

      // We hide the gallery with the loading screen.
      //$loading_container.show();

      if(large_image_style == 1){
        // Set the pop-up type
        jQuery("img", $images_container).each(function(cnt) {
          var image_hash = image_list[cnt];
          jQuery(this).click(function() { 
            _preview(image_hash); 
            return false;
          });
        });
      }
      else{
        // This will use animated lightbox.
        jQuery(function() {
        // jQuery('#photogallery_container_<% $photogallery_id %> img[rel*="lightbox"]').lightBox(lightbox_hash); 
          var lightbox_hash = {
            txtImage        : options.txtImage,
            txtOf           : options.txtOf,
            showDescription : show_description,
            parent_div_id   : 'photogallery_' + options.photogallery_id
          };
          jQuery('img[rel*="lightbox"]', $$).lightBox(lightbox_hash);
        });
      }

      // Now we need to know which controls to activate
      var $current_page = jQuery('li.page_selected', $ul_container);

      if($current_page.next().length){
        $right_button.unbind('click').css("color" , "blue").click( function() {
          _move_grid('right');
          return false;
        });
      }
      else{
        $right_button.css("color" , "black");
        $right_button.unbind('click');
      }

      if($current_page.prev().length){
        $left_button.unbind('click').css("color" , "blue").click( function() {
          _move_grid('left');
          return false;
        });
      }
      else{
        $left_button.css("color", "black");
        $left_button.unbind('click');
      }

      $loading_container.hide();
    }

    // ========================================================================= 
    // SLIDESHOW
    // ========================================================================= 
    function init_slideshow_1(){
      _reset_position();

      // We hide the gallery with the loading screen.
      $loading_container.show();

      // We'll see if there is an image list
      if(image_list.length > 0){

        // Set button triggers
        // ---------------------------------------------------------------------------
        $pause_button.unbind('click').click( function() {
          _pause();
          return false;
        });

        $right_button.unbind('click').click( function() {
           _start();
          return false;
        });

/*
        // If we're not on the first image, we'll scroll to it. 
        // ---------------------------------------------------------------------------
        if(current_order_num != 0){
          var find_list_item  = "li:eq(" + current_order_num + ")";
          var $selected_image = jQuery(find_list_item, $ul_container);

          // This is to make sure the images are hidden till 
          // we've scrolled to the selected image.
          var loading_function = function(){
            $loading_container.hide();
          }
          $images_container.scrollTo( $selected_image, 800, loading_function); 
        }
*/
      }

      $loading_container.hide();

    };

    // ========================================================================= 
    // FILMSTRIP 1 & 2
    // ========================================================================= 
    function init_filmstrip(gallery_name) {
      _reset_position();
      $loading_container.show();

      if(image_list.length > 0){

        if(gallery_name == 'filmstrip_1'){

          // Set the pop-up type
          jQuery("img", $images_container).each(function(cnt) {
            var image_hash = image_list[cnt];

            jQuery(this).click(function() { 
              // This will show the large picture on the top frame 
              _filmstrip_1_preview(image_hash); 

              // Move the selected image class to the new image 
              jQuery('li.img_selected', $$).removeClass('img_selected');

              // Set the new img selected  
              jQuery(this).parent().parent().addClass('img_selected');
              $order_num_container.val(cnt);

              return false;
            });
          });
        }
        else if (gallery_name == 'filmstrip_2'){

          // Set the pop-up type
          // Testing purposes, large image style #2 doesn't work yet
          // large_image_style = 1;

          if(large_image_style == 1){

            jQuery("img", $images_container).each(function(cnt) {
              var image_hash = image_list[cnt];
              jQuery(this).click(function() { 

                _filmstrip_2_preview(image_hash); 

                // Move the selected image class to the new image 
                jQuery('li.img_selected', $$).removeClass('img_selected');

                // Set the new img selected  
                jQuery(this).parent().parent().addClass('img_selected');
                $order_num_container.val(cnt);

                return false;
              });
            });

          }
          else{
            // This will use animated lightbox.
            jQuery(function() {
              // jQuery('#photogallery_container_<% $photogallery_id %> img[rel*="lightbox"]').lightBox(lightbox_hash); 
              var lightbox_hash = {
                txtImage        : options.txtImage,
                txtOf           : options.txtOf,
                showDescription : show_description,
                parent_div_id   : 'photogallery_' + options.photogallery_id
              };
  
              jQuery('img[rel*="lightbox"]', $$).lightBox(lightbox_hash); 
            });
          }
        }


        // Now we need to know which controls to activate
        var $current_page = jQuery('li.page_selected', $ul_container);

        // Right Button
        if($current_page.next().length){
          $right_button.unbind('click').click( function() {
            _move_grid('right');
            return false;
          });
        }
        else{
          $right_button.unbind('click');
        }

        // Left Button
        if($current_page.prev().length){
          $left_button.unbind('click').click( function() {
            _move_grid('left');
            return false;
          });
        }
        else{
          $left_button.unbind('click');
        }

        // $pagination_controls_container.show();
      }

      $loading_container.hide();
    }

    // ======================================================================== 
    // FUNCTIONS
    // ========================================================================= 
    function _reset_position(){
      current_page_num = 1;
      $current_page_num_container.val(current_page_num);
      current_order_num = 0;
      $order_num_container.val(current_order_num);
    }

    function _start(){
      // Unbind the start button, to stop start spamming.
      $right_button.unbind('click');

      // Set our flag
      paused = 0;

      // Switch the button icons
      $right_button.hide();
      $pause_button.show();

      // When a user hits the play button, we want to move to the next pic right away.
      // We just have to see if we're at the last image, or not.
      if($order_num_container.val() < max_order_num - 1){
        _move('right', 'slideshow_1');
      }
      else{
        _move_to_first();  
      }

      // This sets the timer for the rotation. 
      var delay_seconds       = display_options[raw_gallery_name]['delay'] || '5'; // 5 secs default.
      var delay_milliseconds  = delay_seconds * 1000;      

      // Bug fix for setting delay to zero
      if(delay_milliseconds < 850){ delay_milliseconds = '850'; }

      setInterval( function() {
        if(paused == 0){
          // We want to make sure they don't click anything while we're in the process of moving
          $pause_button.unbind('click');

          // Decide where to move to 
          if($order_num_container.val() == max_order_num - 1){
            _move_to_first();
          }
          else{
            _move('right', 'slideshow_1');
          }

          // Now that we're out the movement, set the click event again.   
          $pause_button.click( function() {
            _pause();
            return false;
          });        

        };

      }, delay_milliseconds);
    }

    // --------------------------------------------------------------------------
    function _move_to_first(){
      // clear the selected class  
      var current_image = jQuery('li.img_selected', $ul_container);
      current_image.removeClass('img_selected');

      // set the order num back to zero
      $order_num_container.val(0);

      // find the first li container
      var $selected_image = jQuery("li:eq(0)", $ul_container);

      // reassign the selected class to new image 
      $selected_image.addClass('img_selected');

      // Set the image description if there is any.
      var image_hash = image_list[0];

      // Set the description 
      if(image_hash.description){
        $p_container.fadeOut('slow', function() {
          $p_container.html(image_hash.description)
        }).fadeIn('slow');
      }
      else{
        $p_container.fadeOut('slow', function(){
          $p_container.empty();
        });
      }

      var loading_function = function(){
        $loading_container.hide();
      }

      // now we scroll to the first item.
      $loading_container.show();
      $images_container.scrollTo( $selected_image, 800, loading_function);
    }

    // --------------------------------------------------------------------------
    function _pause(){
      // unbind the pause button, to keep from spamming it.
      $pause_button.unbind('click');

      $right_button.unbind('click').click( function() {
         _unpause();
        return false;
      });

      // Set our flag
      paused = 1;
    
      // Switch the button icons 
      $pause_button.hide();
      $right_button.show(); 
    }

    // --------------------------------------------------------------------------
    function _unpause(){
      // unbind the pause button, to keep from spamming it.
      $right_button.unbind('click');

      $pause_button.unbind('click').click( function() {
         _pause();
        return false;
      });

      // Set our flag
      paused = 0;

      // Switch the button icons 
      $pause_button.show();
      $right_button.hide();
    }


    // --------------------------------------------------------------------------
    function _move_grid(dir){
      // alert("locked: " + locked);
      // alert("dir: " + dir);
      // alert("current_page_num / max_page_num: " + current_page_num + "/" + max_page_num);

      // While we're trying to load pictures, we'll need to lock people out of moving around. 
      if( 
          (locked) ||
          ( current_page_num == 1 && dir == 'left') || 
          ( (max_page_num == current_page_num) && dir == 'right') 
        ){
        return(1);
      }

      // Set the lock.
      locked = 1;

      // see what page number we're current on.
      var $next_page   = null;
      var new_page_num = current_page_num;

      // Get the current selected item (with selected class), if none was found, get the first item  
      // var current_page = jQuery('li.page_selected', $ul_container).length ? jQuery('li.selected', $ul_container) : jQuery('li:first', $ul_container);  
      var $current_page = jQuery('li.page_selected', $ul_container);  

      var new_images_showing_start  = 0;
      var new_images_showing_end    = 0;
 
      // use prev and next to determine increment or decrement  
      // because the controls disappear, i don't do checking to see if there is a next or prev.
      if (dir == 'left') {  
        $next_page = $current_page.prev();
        new_page_num--;

        // Find out how many images are showing.
        var img_array = jQuery('img', $next_page);
        new_images_showing_start  = parseInt(images_showing_start) - img_array.length; 
        new_images_showing_end    = parseInt(images_showing_start) - 1;
      } 
      else {  
        $next_page = $current_page.next();  
        new_page_num++;

        var img_array = jQuery('img', $next_page);
        new_images_showing_start  = parseInt(images_showing_end) + 1;
        new_images_showing_end    = parseInt(images_showing_end) + img_array.length;
      }  
 
      // Set the number of images 
      $images_showing_start_container.html(new_images_showing_start);
      images_showing_start = new_images_showing_start;

      $images_showing_end_container.html(new_images_showing_end);
      images_showing_end = new_images_showing_end;
 
      // Set our new array number
      $current_page_num_container.val(new_page_num);
      current_page_num = new_page_num

      //clear the selected class  
      $current_page.removeClass('page_selected'); 

      //reassign the selected class to new image 
      $next_page.addClass('page_selected');  

      // We scroll to the next image, and We use the function to 
      // make sure that the lock isn't set to zero before it's finished scrolling.
      var lock_function = function(){ locked = 0; };
      $images_container.scrollTo($next_page, 800, lock_function);

      // Set the buttons again
      if($next_page.next().length){
        $right_button.unbind('click').css("color" , "blue").click( function() {
          _move_grid('right');
          return false;
        });
      }
      else{
        $right_button.css("color" , "black");
        $right_button.unbind('click');
      }

      if($next_page.prev().length){
        $left_button.unbind('click').css("color" , "blue").click( function() {
          _move_grid('left');
          return false;
        });
      }
      else{
        $left_button.unbind('click').css("color", "black");
      }
    }

    // --------------------------------------------------------------------------
    function _filmstrip_1_preview(image_hash) {

      var src                 = null;
      var publish_url         = image_hash.publish_url;
      var original_image_path = image_hash.original_image_path;

      // console.log(display_options);

      var widget_height       = display_options['Filmstrip 1']['widget_height'];
      var widget_widget       = display_options['Filmstrip 1']['widget_width'];

      var max_image_height    = display_options['Filmstrip 1']['max_image_height'];
      var max_image_width     = display_options['Filmstrip 1']['max_image_width'];
      var bg_color            = display_options['Filmstrip 1']['bg_color'];
      var preexisting         = display_options['preexisting'];
      var regex               = new RegExp(/#/);
      bg_color                = bg_color.replace(regex, "");

      //console.log(display_options);

      var new_image_name      = image_hash.original_image_name;
      var file_extension      = new_image_name.split('.').pop();

      if(preexisting == 1){
       var regx = new RegExp('.' + file_extension);
       new_image_name = new_image_name.replace(regx, ".png");
      }

      if(original_image_path  != ''){
        src = publish_url + mode + original_image_path + '/_imagecache/P=W' + max_image_width + ',H' + max_image_height + ',F,B' + bg_color + '/' + image_hash.original_image_name;
        if(preexisting == 1){
          src = publish_url + mode + original_image_path + '/_imagecache/P=W' + max_image_width + ',H' + max_image_height + ',F,O' + file_extension + '/' + new_image_name;
        }
      }
      else{
        src = publish_url + mode + '_imagecache/P=W' + max_image_width + ',H' + max_image_height + ',F,B' + bg_color + '/' + image_hash.original_image_name;
        if(preexisting == 1){
          src = publish_url + mode + '_imagecache/P=W' + max_image_width + ',H' + max_image_height + ',F,O' + file_extension + '/' + new_image_name;
        }
      }

      if(image_hash.filecabinet_file_id.match(/^l_/)){
        src = publish_url +'_imagecache/P=W' + max_image_width + ',H' + max_image_height + ',L,F,B' + bg_color + '/' + image_hash.original_image_name;
      }
      
      var description     = image_hash.description;
      var image_url_link  = image_hash.image_url_link;

      var image_attributes ={
        id      : "photogallery_image_" + image_hash.filecabinet_file_id,
        src     : src
      };

      // Create the image!  
      var $img  = jQuery('<img style="padding:0px; margin:0px; max-height:' + max_image_height + 'px;max-width:' + max_image_width + 'px" height="' + max_image_height + 'px" width="' + max_image_width + 'px"></img>').attr(image_attributes);

      var $top_main_image_container = jQuery('div.main_image_container', $$);

      // JH - 12/04/2009 - Had to do a quick switcharoo to populate the inner container instead of the main one..
      var $main_image_container  = jQuery('div.sub_image_container', $top_main_image_container);

      // target Links
      if(image_url_link){
        var url_link        = image_url_link;
        var prefix          = '';
        var target          = '_self';

        if(!(image_url_link.match(/http:\/\//) || image_url_link.match(/https:\/\//))){
          prefix = 'http://';
        }

        if(image_hash.click_option == 2){
          target            = '_blank'; 
        }

        var $anchor       = jQuery('<a style="text-decoration:none;" href="' + prefix + url_link + '" target="' + target + '"></a>'); 

        // do a switcharoo
        $anchor.html($img);
        $img = $anchor;
      }
      else{
        //$img.appendTo($align_div);
      }

      $main_image_container.empty();
      $main_image_container.html($img);

      // Set the description if there is one.
      if(description && (show_description == 1)){
        $description_container.empty();
        $description_container.html('<p style="padding:0px; height:30px; overflow-x: hidden; overflow-y: auto; margin:0px;">' + description + '</p>');
      }
      else{
        if(show_description == 1){
          $description_container.html('<p style="padding:0px; margin:0px; height:30px; overflow-x: hidden; overflow-y: auto;"></p>');
        }
        else{
          $description_container.html('<p style="padding:0px; margin:0px; height:30px; overflow-x: hidden; overflow-y: auto; display:none;"></p>');
        }
      }
    }

    // --------------------------------------------------------------------------
    function _filmstrip_2_preview(image_hash) {
      // Fix eventually.
      _preview(image_hash);
    }


    // --------------------------------------------------------------------------
    function _preview(image_hash) {
      // This function creates the pop-up window that shows the full image
      var img_loader    = new Image();

      if(base_uri == null){ base_uri = first_hash['publish_url'] + "_unpublished/"; }

      img_loader.onload = function() { _center_preview(image_hash, img_loader); };

      if(image_hash.original_image_path){
        img_loader.src    = base_uri + image_hash.original_image_path + '/_imagecache/' + image_hash.original_image_name;
      }
      else{
        img_loader.src    = base_uri + '_imagecache/' + image_hash.original_image_name;
      }

      if(image_hash.filecabinet_file_id.match(/^l_/)){
        img_loader.src    = base_uri + '_imagecache/P=L/' + image_hash.original_image_name;
      } 

      jQuery('<div></div>').addClass('photogallery_overlay').addClass('photogallery_thumbnail_overlay').css('z-index', 10100).appendTo('body').unbind('click').click(_close_preview);
    }

    // --------------------------------------------------------------------------
    function _center_preview(image_hash, img_loader) {

      if(base_uri == null){ base_uri = first_hash['publish_url'] + "/_unpublished/"; }

      img_loader.onload = null;

      var image_path    = base_uri + '_imagecache/' + image_hash.original_image_name;

      if(image_hash.original_image_path){
        image_path      = base_uri + image_hash.original_image_path + "/_imagecache/" + image_hash.original_image_name;
      }

      if(image_hash.filecabinet_file_id.match(/^l_/)){
        image_path      = base_uri + '_imagecache/P=L/' + image_hash.original_image_name;
      }

      var description   = image_hash.description;

      // Hack to force preview window to be recreated
      if($preview_window){ $preview_window == null; }

      // If the preview div doesn't exist, lets create it
      if(!$preview_window) {

        $preview_window             = jQuery('<div class="photogallery_preview_window" style="font-size:0px"><img></img></div>').appendTo('body');
        var $preview_close          = jQuery('<div class="photogallery_preview_close"></div>');
        var $description_container  = jQuery('<div class="photogallery_preview_description"></div>');

        // Pull all the global css 
        var d_font          = $parent_div.css('font-family');
        var d_font_color    = $parent_div.css('color');
        var d_font_size     = $parent_div.css('font-size');
        var d_font_weight   = $parent_div.css('font-weight');
        var d_font_style    = $parent_div.css('font-style');
        var d_font_variant  = $parent_div.css('font-variant');
        var d_text_align    = $parent_div.css('text-align');
        var d_text_decor    = $parent_div.css('text-decoration');
        var d_text_trans    = $parent_div.css('text-transform');
        var d_white_space   = $parent_div.css('white-space');
         
        if(d_font)        { $description_container.css('font-family', d_font); }
        if(d_font_color)  { $description_container.css('color', d_font_color);}
        if(d_font_size)   { $description_container.css('font-size', d_font_size);}
        if(d_font_weight) { $description_container.css('font-weight', d_font_weight);}
        if(d_font_style)  { $description_container.css('font-style', d_font_style);}
        if(d_font_variant){ $description_container.css('font-variant', d_font_variant);}
        if(d_text_align)  { $description_container.css('text-align', d_text_align);}
        if(d_text_decor)  { $description_container.css('text-decoration', d_text_decor);}
        if(d_text_trans)  { $description_container.css('text-transform', d_text_trans);}
        if(d_white_space) { $description_container.css('white-space', d_white_space);}

        // assemble the divs
        $preview_close.appendTo($preview_window);
        $description_container.appendTo($preview_window);

        // Assign the close button
        jQuery('div.photogallery_preview_close', $preview_window).unbind('click').click(_close_preview);
      }

      var div_width = img_loader.width - 20;

      // Set the description
      if(description && show_description == 1){
        jQuery('div.photogallery_preview_description', $preview_window).html('<p style="padding:0px; width:' + div_width + 'px; height:auto; margin:0px;">' + description + '</p>');
      }
      else{
        if(show_description == 1){
          jQuery('div.photogallery_preview_description', $preview_window).html('<p style="padding:0px; width:' + div_width + 'px; height:auto; margin:0px;"></p>');
        }
        else{
          jQuery('div.photogallery_preview_description', $preview_window).html('<p style="padding:0px; width:' + div_width + 'px; height:auto; margin:0px; display:none;"></p>');
        }
      }

      var img_x = img_loader.width;
      var img_y = img_loader.height;

      if(img_x == null){ img_x = 400; }
      if(img_y == null){ img_y = 400; }

      var x     = jQuery(window).width();
      var y     = jQuery(window).height();

      if(img_y > y) {
        img_y = y - 40;
      } 

      jQuery('img', $preview_window).attr('src', image_path).unbind('click').click(_close_preview).attr('height', img_y);
      // jQuery('img', $preview_window).attr('src', image_path).unbind('click').click(_close_preview);

      var left = 0 - (parseInt($preview_window.width()) / 2);
      var top  = 0 - (parseInt($preview_window.height()) / 2);

      if(jQuery.browser.msie && (jQuery.browser.version < 7)) {
        top += jQuery(window).scrollTop();
        jQuery('select').hide();
      }

      $preview_window.css({ 'margin-top': top + 'px', 'margin-left': left + 'px' }).show();
    }

    // --------------------------------------------------------------------------
    function _close_preview() {
      if($preview_window){
        $preview_window.hide();
      }
      jQuery('div.photogallery_thumbnail_overlay').remove();
    }

    // function to produce full size images
    // --------------------------------------------------------------------------
    function generate_image(image_hash) {

      // Fix the path
      var src = base_uri + "/" + image_hash.original_image_path + "/" + image_hash.original_image_name;

      var image_hash ={
        id      : "photogallery_image_" + image_hash.filecabinet_file_id,
        // alt     : image_hash.original_image_name,
        src     : src
      };

      // Create the image!
      var $img  = jQuery('<img style="padding:5px;"></img>').attr(image_hash);  

      return($img);
    }

    // function to produce the thumbnails 
    // --------------------------------------------------------------------------
    function generate_thumbnail(image_hash) {

      // Fix the path
      var src         = base_uri + image_hash.thumbnail_thumb_path;
      var image_name  = image_hash.original_image_name;
      var image_desc  = image_hash.description;
      var image_path  = base_uri + image_hash.original_image_path + "/" + image_hash.original_image_name;
      var image_id    = "photogallery_image_" + image_hash.filecabinet_file_id;

      var image_attributes ={
        id      : image_id,
        src     : src
      };

      if(image_desc){
        image_attributes['title'] = image_desc;  
      }
      else{
        image_attributes['title'] = image_name;  
      } 
 
      // altered href to be https
      var $img  = jQuery('<img rel="lightbox[gallery]" href="' + image_path + '"></img>').attr(image_attributes);

      return($img);
    }

    // --------------------------------------------------------------------------
    function _move(dir, gallery_type) {
        //window.console.log("-----------------------------------");
        //window.console.log(dir);
        //window.console.log(locked);
        //window.console.log(gallery_type);
        //window.console.log(current_order_num);
        //window.console.log(max_order_num);
        //window.console.log("-----------------------------------");

      // While we're trying to load pictures, we'll need to lock people out of moving around. 
      if( 
          (locked) ||
          ( current_order_num == 0 && dir == 'left') || 
          ( (max_order_num == current_order_num) && dir == 'right') 
        ){
        //window.console.log("got caught!");
        return(1);
      }

      // Set the lock.
      locked = 1;

      // see what image number we're current on.
      current_order_num = $order_num_container.val();
      var next_image    = null;
      var new_order_num = current_order_num;

      // Get the current selected item (with selected class), if none was found, get the first item  
      // var current_image = jQuery('li.selected', $ul_container).length ? jQuery('li.selected', $ul_container) : jQuery('li:first', $ul_container);  
      var current_image = jQuery('li.img_selected', $ul_container);  
 
      // use prev and next to determine increment or decrement  
      // because the controls disappear, i don't do checking to see if there is a next or prev.
      if (dir == 'left') {  
        next_image = current_image.prev();
        new_order_num--;
        current_order_num--;
      } 
      else {  
        next_image = current_image.next();  
        new_order_num++;
        current_order_num++;
      }  
  
      // Set our new array number
      $order_num_container.val(new_order_num);

      //clear the selected class  
      current_image.removeClass('img_selected'); 

      //reassign the selected class to new image 
      next_image.addClass('img_selected');  

      // We scroll to the next image, and We use the function to 
      // make sure that the lock isn't set to zero before it's finished scrolling.
      var lock_function = function(){ locked = 0; };
      $images_container.scrollTo(next_image, 800, lock_function);

      // Set the image description if there is any.
      var image_hash = image_list[new_order_num];

      // Set the description 
      if(gallery_type != 'grid'){
        if(image_hash.description){
          if(show_description == 1){
            $p_container.fadeOut('slow', function() {
              $p_container.html(image_hash.description)
            }).fadeIn('slow');
          }
        }
        else{
          $p_container.fadeOut('slow', function(){ 
            $p_container.empty(); 
          });
        }
      }

      // Set the buttons again
      if( (gallery_type != 'slideshow_1') && (gallery_type != 'grid') ){
        if(next_image.next().length){
          $right_button.show(); 
        }
        else{
          $right_button.hide();
        }

        if(next_image.prev().length){
          $left_button.show();
        }
        else{
          $left_button.hide();
        }
      }
    }  
  }
  // ==========================================================
  // END PHOTOGALLERY
  // ==========================================================


  // ===========================================================
  // START SOCIALNETWORK
  // ===========================================================
  jQuery.fn.iv_socialnetwork = function(options) {
    return this.each(function() {
      new jQuery.iv.socialnetwork(this, options);
    });
  }

  jQuery.iv.socialnetwork = function(el, options) {

    options = jQuery.extend({
      name              : null,
      id                : null,
      url               : null,
      path              : null,
      title             : null,
      browser           : null,
      ws_name           : null
    }, options);

    // This will append it to the overall div.
    jQuery.data(el, options.name + '_' + options.id, this);

    var $$                = jQuery(el);
    var socialnetwork_id  = options.id;
    var name              = options.name;
    var url               = options.url;
    var path              = options.path;
    var $img              = jQuery('img', $$);
    var div_ident         = options.name + '_' + options.id;
    //var title             = jQuery('title').text();
    var title             = options.title;
    var ws_name           = options.ws_name;


    // this is the list of following social networks:
    //  socialnetwork   : Share on Facebook
    //  socialnetwork5  : Buzz This
    //  socialnetwork3  : Share on Twitter
    //  socialnetwork6  : Share on Plurk


    // SHARE ON FACEBOOK
    if( (name == 'socialnetwork') || (name == 'socialnetwork5') ){

      var target            = '_blank';
      //var target            = 'new';

      if(name == 'socialnetwork'){
        var $anchor = jQuery('<a target="' + target + '" style="text-decoration:none; padding:0px; margin:0px; border:0px; display:block;" href="http://www.facebook.com/share.php?u=' + url  + '"></a>');    
        $anchor.html($img);
        $$.empty();
        $$.html($anchor);
      }
      else{ // Buzz This

        //alert("title: " + title);
        //alert("url:   " + url); 
        //alert("ws_name: " + ws_name);

        // fixes a bug with ie.
        //if(!(title)){
        // title = options.title;
        //  alert("title changed to: " + title);
        //}

        // Remove slash for path.
        var regex = /\//;
        path = path.replace(regex, ""); 

        // Format will be (  websitename - pagename - url+path )
        var append = 'url=' + url;
        append = append + '&srcURL=' + url;

        if(title){
          if(title.match(ws_name)){
            append = append + '&title=' + title;
            append = append + '&srcTitle=' + title;
          }
          else{
            append = append + '&title=' + ws_name + ' - ' + title;
            append = append + '&srcTitle=' + ws_name + ' - ' + title;
          }
        }
        else{
          if(ws_name){
            append = append + '&title=' + ws_name;
            append = append + '&srcTitle=' + ws_name;
          }
          else{
            append = append + '&title=' + url;
            append = append + '&srcTitle=' + url;
          }
        }



        //var $anchor = jQuery('<a target="_blank" style="text-decoration:none; padding:0px; margin:0px; border:0px; display:block;" href="http://www.google.com/reader/link?' + append + '"></a>');
        var $anchor = jQuery('<a target="_blank" style="text-decoration:none; padding:0px; margin:0px; border:0px; display:block;" href="http://www.google.com/buzz/post?' + append + '"></a>');

        $anchor.html($img);
        $$.empty();
        $$.html($anchor);
      }
    }
    else{ 

      url = decodeURI(url);

      // This section contains socialnetworks that require 
      // bitly to shorten thier urls 
      // ----------------------------------------------------
      // Generate the bit.ly url
      //    if you need login into to the account, ask Bryan
      //    you can find the api key by going to: http://bit.ly/account/your_api_key
      // ----------------------------------------------------
      var defaults = {
        version:    '2.0.1',
        login:      'ivenue',
        apiKey:     'R_064320bbb6b53267e152fa2317b0e72b',
        history:    '0',
        longUrl:    url
      };

      // create the url.
      var daurl = "https://api-ssl.bit.ly/shorten?"
        +"version="+defaults.version
        +"&longUrl="+defaults.longUrl
        +"&login="+defaults.login
        +"&apiKey="+defaults.apiKey
        +"&history="+defaults.history
        +"&format=json&callback=?";

      // get the data!
      jQuery.getJSON(daurl, function(data){

        var data_errorCode = data.errorCode;
        var error_message;
        var short_url;

        // Lets see if there are any errors.
        if(data_errorCode > 0){
          var error_message = data.errorMessage;
        } 
        else{
          var results_errorCode = data.results[defaults.longUrl].errorCode;

          if(results_errorCode > 0){
            error_message = data.results[defaults.longUrl].errorMessage; 
          } 
          else{
            short_url = data.results[defaults.longUrl].shortUrl;
          }
        }

        // Now generate the html 
        if(error_message){
          // If for some reason we hit errors, we'll set it as a click function.  :(
          $img.click( function() {
            alert(error_message);
            return false;
          });
        }
        else{
          var target  = '_blank';
          var $anchor = null;
          //var target    = 'new';

          // SHARE ON TWITTER
          if(name == 'socialnetwork3'){
            // If we have no errors, and we get our short url, we'll go ahead and set the anchor.
            var $anchor = jQuery('<a target="' + target + '" style="text-decoration:none; padding:0px; margin:0px; border:0px; display:block;" href="http://twitter.com/home/?status=' + short_url + '"></a>');
          }
          else{
          // SHARE ON PLURK
          // socialnetwork6 
            //var $anchor = jQuery('<a target="' + target + '" style="text-decoration:none; padding:0px; margin:0px; border:0px; display:block;" href="http://www.plurk.com/?qualifier=shares&status=' + short_url + '"></a>');
            var $anchor = jQuery('<a target="' + target + '" style="text-decoration:none; padding:0px; margin:0px; border:0px; display:block;" href="http://www.plurk.com/m?qualifier=shares&content=' + short_url + '"></a>');
          }

          $anchor.html($img);
          $$.empty();
          $$.html($anchor);
        }

      });

    }
  }
  // ===========================================================
  // END SOCIALNETWORK
  // ===========================================================
  jQuery.fn.iv_unselectable = function() {
    return(this.each(function() {
      jQuery(this)
        .css('-moz-user-select', 'none')      // FF
        .css('-khtml-user-select', 'none')    // Safari, Google Chrome
        .css('-o-user-select', 'none')        // Opera
        .css('user-select', 'none');          // CSS 3

      if (jQuery.browser.msie) {                   // IE
        jQuery(this).each(function() {
          this.ondrag        = function() { return(false); };
          this.onselectstart = function() { return(false); };
        });
      }
      else if(jQuery.browser.opera) {
        jQuery(this).attr('unselectable', 'on');
      }
    }));
  };
  //---------------------------------------------------------------------------
  // Sets an initial text to a text input area.  Once the text area receives
  // focus the text will be cleared.
  //---------------------------------------------------------------------------
  // Use placeholder attribute instead
  //---------------------------------------------------------------------------
/*  jQuery.fn.iv_initial_text = function(options) {
    return(this.each(function() {
      new jQuery.iv.initial_text(this, options);
    }));
  } 

  jQuery.iv.initial_text = function(el, options) {
    var options = jQuery.extend({
      initial_text: ''
    }, options);

    var $$ = jQuery(el);

    $$.focus(function() {
      if($$.val() == options.initial_text) { $$.val(''); }
    });

    $$.blur(function() {
      if($$.val() == '') { $$.val(options.initial_text); }
    }).trigger('blur');
  }*/
  //---------------------------------------------------------------------------
})(jQuery);

;(function($) {

  // --------------------------------------------------------------------------
  // Mobile Menu Button
  // --------------------------------------------------------------------------
  $.fn.iv_mobile_menu_button = function(options) {
    return this.each(function() {
      new $.iv.mobile_menu_button(this, options);
    });
  };

  $.iv.mobile_menu_button = function(el, options) {
    var $$ = $(el);
    var $button = $('.mmb_button', $$);
    var $list   = $('.mmb_list', $$);
    
    $button.toggle(
      function() { $list.show(); },
      function() { $list.hide(); }
    );
  };

  // --------------------------------------------------------------------------
  // Mobile Menu Drop Down
  // --------------------------------------------------------------------------
  $.fn.iv_mobile_menu_drop_down = function(options) {
    return this.each(function() {
      new $.iv.mobile_menu_drop_down(this, options);
    });
  };

  $.iv.mobile_menu_drop_down = function(el, options) {
    var $$   = $(el);
    var $dd  = $('select', $$);
    var lang = navigator.language;
    var intl = {
      en_us: "Select Page",
      es_es: "Selecione Pagina",
      zh_cn: "選擇網頁",
      zh_tw: "選擇網頁"
    };

    lang = lang.replace('-', '_').toLowerCase();

    var do_text  = lang in intl ? intl[lang] : intl['en_us'];
    var $def_opt = $('<option value="#" id="mmdd_default">-- '+do_text+' --</option>');

    $dd.prepend($def_opt);

    // Preselect current page
    var options = $('option', $dd);
    var p_uri   = $(location).attr('href');
    var matched = false;
    for(var i = 0; i < options.length; i++) {
      var o = options[i];
      if($(o).val() == p_uri) {
        $(o).attr('selected', 1);
        matched = true;
        break;
      }
    };

    if (!matched) {
      $(options[0]).attr('selected', 1);
    }

    $dd.change(function() {
      if ($('option:selected').attr('id') == 'mmdd_default') { return false; }
      var url = $('option:selected', $(this)).val();
      if (location.href == url) { return false; }
      location.href = url;
    });
  };

})(jQuery);
;
!function(a,b,c){"function"==typeof define&&define.amd?define(["jquery"],function(d){return c(d,a,b),d.mobile}):c(a.jQuery,a,b)}(this,document,function(a,b,c,d){!function(b){"function"==typeof define&&define.amd?define("jquery-ui/version",["jquery"],b):b(a)}(function(a){return a.ui=a.ui||{},a.ui.version="1.12.1"}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/widget",["jquery","./version"],b):b(a)}(function(a){var b=0,c=Array.prototype.slice;return a.cleanData=function(b){return function(c){var d,e,f;for(f=0;null!=(e=c[f]);f++)try{d=a._data(e,"events"),d&&d.remove&&a(e).triggerHandler("remove")}catch(g){}b(c)}}(a.cleanData),a.widget=function(b,c,d){var e,f,g,h={},i=b.split(".")[0];b=b.split(".")[1];var j=i+"-"+b;return d||(d=c,c=a.Widget),a.isArray(d)&&(d=a.extend.apply(null,[{}].concat(d))),a.expr[":"][j.toLowerCase()]=function(b){return!!a.data(b,j)},a[i]=a[i]||{},e=a[i][b],f=a[i][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new f(a,b)},a.extend(f,e,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),g=new c,g.options=a.widget.extend({},g.options),a.each(d,function(b,d){return a.isFunction(d)?void(h[b]=function(){function a(){return c.prototype[b].apply(this,arguments)}function e(a){return c.prototype[b].apply(this,a)}return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(h[b]=d)}),f.prototype=a.widget.extend(g,{widgetEventPrefix:e?g.widgetEventPrefix||b:b},h,{constructor:f,namespace:i,widgetName:b,widgetFullName:j}),e?(a.each(e._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,f,c._proto)}),delete e._childConstructors):c._childConstructors.push(f),a.widget.bridge(b,f),f},a.widget.extend=function(b){for(var e,f,g=c.call(arguments,1),h=0,i=g.length;i>h;h++)for(e in g[h])f=g[h][e],g[h].hasOwnProperty(e)&&f!==d&&(a.isPlainObject(f)?b[e]=a.isPlainObject(b[e])?a.widget.extend({},b[e],f):a.widget.extend({},f):b[e]=f);return b},a.widget.bridge=function(b,e){var f=e.prototype.widgetFullName||b;a.fn[b]=function(g){var h="string"==typeof g,i=c.call(arguments,1),j=this;return h?this.length||"instance"!==g?this.each(function(){var c,e=a.data(this,f);return"instance"===g?(j=e,!1):e?a.isFunction(e[g])&&"_"!==g.charAt(0)?(c=e[g].apply(e,i),c!==e&&c!==d?(j=c&&c.jquery?j.pushStack(c.get()):c,!1):void 0):a.error("no such method '"+g+"' for "+b+" widget instance"):a.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+g+"'")}):j=d:(i.length&&(g=a.widget.extend.apply(null,[g].concat(i))),this.each(function(){var b=a.data(this,f);b?(b.option(g||{}),b._init&&b._init()):a.data(this,f,new e(g,this))})),j}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(c,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=b++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=a(),this.hoverable=a(),this.focusable=a(),this.classesElementLookup={},d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this.options=a.widget.extend({},this.options,this._getCreateOptions(),c),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){var b=this;this._destroy(),a.each(this.classesElementLookup,function(a,c){b._removeClass(c,a)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:a.noop,widget:function(){return this.element},option:function(b,c){var e,f,g,h=b;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof b)if(h={},e=b.split("."),b=e.shift(),e.length){for(f=h[b]=a.widget.extend({},this.options[b]),g=0;g<e.length-1;g++)f[e[g]]=f[e[g]]||{},f=f[e[g]];if(b=e.pop(),1===arguments.length)return f[b]===d?null:f[b];f[b]=c}else{if(1===arguments.length)return this.options[b]===d?null:this.options[b];h[b]=c}return this._setOptions(h),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return"classes"===a&&this._setOptionClasses(b),this.options[a]=b,"disabled"===a&&this._setOptionDisabled(b),this},_setOptionClasses:function(b){var c,d,e;for(c in b)e=this.classesElementLookup[c],b[c]!==this.options.classes[c]&&e&&e.length&&(d=a(e.get()),this._removeClass(e,c),d.addClass(this._classes({element:d,keys:c,classes:b,add:!0})))},_setOptionDisabled:function(a){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!a),a&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(b){function c(c,f){var g,h;for(h=0;h<c.length;h++)g=e.classesElementLookup[c[h]]||a(),g=a(b.add?a.unique(g.get().concat(b.element.get())):g.not(b.element).get()),e.classesElementLookup[c[h]]=g,d.push(c[h]),f&&b.classes[c[h]]&&d.push(b.classes[c[h]])}var d=[],e=this;return b=a.extend({element:this.element,classes:this.options.classes||{}},b),this._on(b.element,{remove:"_untrackClassesElement"}),b.keys&&c(b.keys.match(/\S+/g)||[],!0),b.extra&&c(b.extra.match(/\S+/g)||[]),d.join(" ")},_untrackClassesElement:function(b){var c=this;a.each(c.classesElementLookup,function(d,e){-1!==a.inArray(b.target,e)&&(c.classesElementLookup[d]=a(e.not(b.target).get()))})},_removeClass:function(a,b,c){return this._toggleClass(a,b,c,!1)},_addClass:function(a,b,c){return this._toggleClass(a,b,c,!0)},_toggleClass:function(a,b,c,d){d="boolean"==typeof d?d:c;var e="string"==typeof a||null===a,f={extra:e?b:c,keys:e?a:b,element:e?this.element:a,add:d};return f.element.toggleClass(this._classes(f),d),this},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){return b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled")?("string"==typeof g?f[g]:g).apply(f,arguments):void 0}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^([\w:-]*)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.on(j,k,h):c.on(j,h)})},_off:function(b,c){c=(c||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,b.off(c).off(c),this.bindings=a(this.bindings.not(b).get()),this.focusable=a(this.focusable.not(b).get()),this.hoverable=a(this.hoverable.not(b).get())},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){this._addClass(a(b.currentTarget),null,"ui-state-hover")},mouseleave:function(b){this._removeClass(a(b.currentTarget),null,"ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){this._addClass(a(b.currentTarget),null,"ui-state-focus")},focusout:function(b){this._removeClass(a(b.currentTarget),null,"ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}}),a.widget}),function(b){"function"==typeof define&&define.amd?define("ns",["jquery"],b):b(a)}(function(a){return a.mobile={version:"@VERSION"},a.mobile}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/keycode",["jquery","./version"],b):b(a)}(function(a){return a.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),function(b){"function"==typeof define&&define.amd?define("helpers",["jquery","./ns","jquery-ui/keycode"],b):b(a)}(function(a){var d=function(b,c){var d=b.parent(),e=[],f=function(){var b=a(this),c=a.mobile.toolbar&&b.data("mobile-toolbar")?b.toolbar("option"):{position:b.attr("data-"+a.mobile.ns+"position"),updatePagePadding:b.attr("data-"+a.mobile.ns+"update-page-padding")!==!1};return!("fixed"===c.position&&c.updatePagePadding===!0)},g=d.children(":jqmData(type='header')").filter(f),h=b.children(":jqmData(type='header')"),i=d.children(":jqmData(type='footer')").filter(f),j=b.children(":jqmData(type='footer')");return 0===h.length&&g.length>0&&(e=e.concat(g.toArray())),0===j.length&&i.length>0&&(e=e.concat(i.toArray())),a.each(e,function(b,d){c-=a(d).outerHeight()}),Math.max(0,c)};return a.extend(a.mobile,{window:a(b),document:a(c),keyCode:a.ui.keyCode,behaviors:{},focusPage:function(a){var b=a.find("[autofocus]");b.length||(b=a.find(".ui-title").eq(0)),b.length||(b=a),b.focus()},silentScroll:function(c){a.mobile.window.scrollTop()>0||("number"!==a.type(c)&&(c=a.mobile.defaultHomeScroll),a.event.special.scrollstart.enabled=!1,setTimeout(function(){b.scrollTo(0,c),a.mobile.document.trigger("silentscroll",{x:0,y:c})},20),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150))},getClosestBaseUrl:function(b){var c=a(b).closest(".ui-page").jqmData("url"),d=a.mobile.path.documentBase.hrefNoHash;return a.mobile.base.dynamicBaseEnabled&&c&&a.mobile.path.isPath(c)||(c=d),a.mobile.path.makeUrlAbsolute(c,d)},removeActiveLinkClass:function(b){!a.mobile.activeClickedLink||a.mobile.activeClickedLink.closest(".ui-page-active").length&&!b||a.mobile.activeClickedLink.removeClass("ui-button-active"),a.mobile.activeClickedLink=null},enhanceable:function(a){return this.haveParents(a,"enhance")},hijackable:function(a){return this.haveParents(a,"ajax")},haveParents:function(b,c){if(!a.mobile.ignoreContentEnabled)return b;var d,e,f,g,h,i=b.length,j=a();for(g=0;i>g;g++){for(e=b.eq(g),f=!1,d=b[g];d;){if(h=d.getAttribute?d.getAttribute("data-"+a.mobile.ns+c):"","false"===h){f=!0;break}d=d.parentNode}f||(j=j.add(e))}return j},getScreenHeight:function(){return b.innerHeight||a.mobile.window.height()},resetActivePageHeight:function(c){var e=a(".ui-page-active"),f=e.height(),g=e.outerHeight(!0);c=d(e,"number"==typeof c?c:a(b).height()),e.css("min-height",""),e.height()<c&&e.css("min-height",c-(g-f))},loading:function(){var b=this.loading._widget||a.mobile.loader().element,c=b.loader.apply(b,arguments);return this.loading._widget=b,c},isElementCurrentlyVisible:function(d){if(d="string"==typeof d?a(d)[0]:d[0],!d)return!0;var e=d.getBoundingClientRect();return e.bottom>0&&e.right>0&&e.top<(b.innerHeight||c.documentElement.clientHeight)&&e.left<(b.innerWidth||c.documentElement.clientWidth)}}),a.addDependents=function(b,c){var d=a(b),e=d.jqmData("dependents")||a();d.jqmData("dependents",a(e).add(c))},a.fn.extend({removeWithDependents:function(){a.removeWithDependents(this)},addDependents:function(b){a.addDependents(this,b)},getEncodedText:function(){return a("<a>").text(this.text()).html()},jqmEnhanceable:function(){return a.mobile.enhanceable(this)},jqmHijackable:function(){return a.mobile.hijackable(this)}}),a.removeWithDependents=function(b){var c=a(b);(c.jqmData("dependents")||a()).remove(),c.remove()},a.addDependents=function(b,c){var d=a(b),e=d.jqmData("dependents")||a();d.jqmData("dependents",a(e).add(c))},a.find.matches=function(b,c){return a.find(b,null,null,c)},a.find.matchesSelector=function(b,c){return a.find(c,null,null,[b]).length>0},a.mobile}),function(b){"function"==typeof define&&define.amd?define("defaults",["jquery","./ns"],b):b(a)}(function(a){return a.extend(a.mobile,{hideUrlBar:!0,keepNative:":jqmData(role='none'), :jqmData(role='nojs')",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"a",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,pageContainer:a(),allowCrossDomainPages:!1,dialogHashKey:"&ui-state=dialog"})}),function(b){"function"==typeof define&&define.amd?define("data",["jquery","./ns"],b):b(a)}(function(a){var c={},e=a.find,f=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,g=/:jqmData\(([^)]*)\)/g;return a.extend(a.mobile,{ns:a.mobileBackcompat===!1?"ui-":"",getAttribute:function(c,d){var e;c=c.jquery?c[0]:c,c&&c.getAttribute&&(e=c.getAttribute("data-"+a.mobile.ns+d));try{e="true"===e?!0:"false"===e?!1:"null"===e?null:+e+""===e?+e:f.test(e)?b.JSON.parse(e):e}catch(g){}return e},nsNormalizeDict:c,nsNormalize:function(b){return c[b]||(c[b]=a.camelCase(a.mobile.ns+b))},closestPageData:function(a){return a.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")}}),a.fn.jqmData=function(b,c){var e;return"undefined"!=typeof b&&(b&&(b=a.mobile.nsNormalize(b)),e=arguments.length<2||c===d?this.data(b):this.data(b,c)),e},a.jqmData=function(b,c,d){var e;return"undefined"!=typeof c&&(e=a.data(b,c?a.mobile.nsNormalize(c):c,d)),e},a.fn.jqmRemoveData=function(b){return this.removeData(a.mobile.nsNormalize(b))},a.jqmRemoveData=function(b,c){return a.removeData(b,a.mobile.nsNormalize(c))},a.find=function(b,c,d,f){return b.indexOf(":jqmData")>-1&&(b=b.replace(g,"[data-"+(a.mobile.ns||"")+"$1]")),e.call(this,b,c,d,f)},a.extend(a.find,e),a.mobile}),function(b){"function"==typeof define&&define.amd?define("core",["./defaults","./data","./helpers"],b):b(a)}(function(){}),function(b){"function"==typeof define&&define.amd?define("widget",["jquery","./ns","jquery-ui/widget","./data"],b):b(a)}(function(a){return a.mobile.widget=a.mobile.widget||{}}),function(b){"function"==typeof define&&define.amd?define("widgets/widget.theme",["jquery","../core","../widget"],b):b(a)}(function(a){return a.mobile.widget.theme={_create:function(){var b=this;this._super(),a.each(this._themeElements(),function(a,c){b._addClass(c.element,null,c.prefix+b.options[c.option||"theme"])})},_setOption:function(b,c){var d=this;a.each(this._themeElements(),function(a,e){var f=e.option||"theme";f===b&&d._removeClass(e.element,null,e.prefix+d.options[e.option||"theme"])._addClass(e.element,null,e.prefix+c)}),this._superApply(arguments)}},a.mobile.widget.theme}),function(b){"function"==typeof define&&define.amd?define("widgets/loader",["jquery","../helpers","../defaults","./widget.theme","../widget"],b):b(a)}(function(a){var b=a("html");return a.widget("mobile.loader",{version:"@VERSION",options:{classes:{"ui-loader":"ui-corner-all","ui-loader-icon":"ui-icon-loading"},enhanced:!1,theme:"a",textVisible:!1,text:"loading"},_create:function(){this.loader={},this.options.enhanced?(this.loader.span=this.element.children("span"),this.loader.header=this.element.children("h1")):(this.loader.span=a("<span>"),this.loader.header=a("<h1>")),this._addClass("ui-loader"),this._addClass(this.loader.span,"ui-loader-icon"),this._addClass(this.loader.header,"ui-loader-header"),this.options.enhanced||this.element.append(this.loader.span).append(this.loader.header)},_themeElements:function(){return[{element:this.element,prefix:"ui-body-"}]},show:function(c,d,e){var f,g,h,i;"object"===a.type(c)?(h=a.extend({},this.options,c),c=h.theme):(h=this.options,c=c||h.theme),g=d||(h.text===!1?"":h.text),this._addClass(b,"ui-loading"),f=h.textVisible,i=this.element.attr("class").match(/\bui-body-[a-z]\b/)||[],this._removeClass.apply(this,["ui-loader-verbose ui-loader-default ui-loader-textonly"].concat(i))._addClass("ui-loader-"+(f||d||c.text?"verbose":"default")+(h.textonly||e?" ui-loader-textonly":""),"ui-body-"+c),this.loader.header.text(g),this.element.appendTo(a(a.mobile.pagecontainer?":mobile-pagecontainer":"body"))},hide:function(){this._removeClass(b,"ui-loading")}}),a.widget("mobile.loader",a.mobile.loader,a.mobile.widget.theme)}),function(b){"function"==typeof define&&define.amd?define("widgets/loader.backcompat",["jquery","./loader"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&a.widget("mobile.loader",a.mobile.loader,{options:{html:""},fakeFixLoader:a.noop,checkLoaderPosition:a.noop,show:function(b){var c;this.resetHtml(),this._superApply(arguments),c="object"===a.type(b)&&b.html||this.options.html,c&&this.element.html(c)},resetHtml:function(){this.element.empty().append(this.loader.span).append(this.loader.header.empty())}}),a.mobile.loader}),function(b){"function"==typeof define&&define.amd?define("media",["jquery","./core"],b):b(a)}(function(a){return b.matchMedia=b.matchMedia||function(a,b){var c,d=a.documentElement,e=d.firstElementChild||d.firstChild,f=a.createElement("body"),g=a.createElement("div");return g.id="mq-test-1",g.style.cssText="position:absolute;top:-100em",f.style.background="none",f.appendChild(g),function(a){return g.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',d.insertBefore(f,e),c=42===g.offsetWidth,d.removeChild(f),{matches:c,media:a}}}(c),a.mobile.media=function(a){var c=b.matchMedia(a);return c&&c.matches},a.mobile.media}),function(b){"function"==typeof define&&define.amd?define("support/touch",["jquery","../ns"],b):b(a)}(function(a){var b={touch:"ontouchend"in c};return a.mobile.support=a.mobile.support||{},a.extend(a.support,b),a.extend(a.mobile.support,b),a.support}),function(b){"function"==typeof define&&define.amd?define("support/orientation",["jquery"],b):b(a)}(function(a){return a.extend(a.support,{orientation:"orientation"in b&&"onorientationchange"in b}),a.support}),function(b){"function"==typeof define&&define.amd?define("support",["jquery","./core","./media","./support/touch","./support/orientation"],b):b(a)}(function(a){function e(a){var b,c=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+n.join(c+" ")+c).split(" ");for(b in e)if(m[e[b]]!==d)return!0}function f(){var c=b,d=!(!c.document.createElementNS||!c.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||c.opera&&-1===navigator.userAgent.indexOf("Chrome")),e=function(b){b&&d||a("html").addClass("ui-nosvg")},f=new c.Image;f.onerror=function(){e(!1)},f.onload=function(){e(1===f.width&&1===f.height)},f.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}function g(){var e,f,g,h="transform-3d",i=a.mobile.media("(-"+n.join("-"+h+"),(-")+"-"+h+"),("+h+")");if(i)return!!i;e=c.createElement("div"),f={MozTransform:"-moz-transform",transform:"transform"},l.append(e);for(g in f)e.style[g]!==d&&(e.style[g]="translate3d( 100px, 1px, 1px )",i=b.getComputedStyle(e).getPropertyValue(f[g]));return!!i&&"none"!==i}function h(){var a,d=c.createElement("x"),e=c.documentElement,f=b.getComputedStyle;return"pointerEvents"in d.style?(d.style.pointerEvents="auto",d.style.pointerEvents="x",e.appendChild(d),a=f&&"auto"===f(d,"").pointerEvents,e.removeChild(d),!!a):!1}function i(){var a=c.createElement("div");return"undefined"!=typeof a.getBoundingClientRect}function j(){var a=b,c=navigator.userAgent,d=navigator.platform,e=c.match(/AppleWebKit\/([0-9]+)/),f=!!e&&e[1],g=c.match(/Fennec\/([0-9]+)/),h=!!g&&g[1],i=c.match(/Opera Mobi\/([0-9]+)/),j=!!i&&i[1];return(d.indexOf("iPhone")>-1||d.indexOf("iPad")>-1||d.indexOf("iPod")>-1)&&f&&534>f||a.operamini&&"[object OperaMini]"==={}.toString.call(a.operamini)||i&&7458>j||c.indexOf("Android")>-1&&f&&533>f||h&&6>h||"palmGetResource"in b&&f&&534>f||c.indexOf("MeeGo")>-1&&c.indexOf("NokiaBrowser/8.5.0")>-1?!1:!0}var k,l=a("<body>").prependTo("html"),m=l[0].style,n=["Webkit","Moz","O"],o="palmGetResource"in b,p=b.operamini&&"[object OperaMini]"==={}.toString.call(b.operamini),q=b.blackberry&&!e("-webkit-transform");return a.extend(a.mobile,{browser:{}}),a.mobile.browser.oldIE=function(){var a=3,b=c.createElement("div"),d=b.all||[];do b.innerHTML="<!--[if gt IE "+ ++a+"]><br><![endif]-->";while(d[0]);return a>4?a:!a}(),a.mobile.browser.newIEMobile=function(){var b=c.createElement("div");return!a.mobile.browser.oldIE&&"onmsgesturehold"in b&&"ontouchstart"in b&&"onpointerdown"in b}(),a.extend(a.support,{pushState:"pushState"in history&&"replaceState"in history&&!(b.navigator.userAgent.indexOf("Firefox")>=0&&b.top!==b)&&-1===b.navigator.userAgent.search(/CriOS/),mediaquery:a.mobile.media("only all"),cssPseudoElement:!!e("content"),touchOverflow:!!e("overflowScrolling"),cssTransform3d:g(),boxShadow:!!e("boxShadow")&&!q,fixedPosition:j(),scrollTop:("pageXOffset"in b||"scrollTop"in c.documentElement||"scrollTop"in l[0])&&!o&&!p,cssPointerEvents:h(),boundingRect:i(),inlineSVG:f}),l.remove(),k=function(){var a=b.navigator.userAgent;return a.indexOf("Nokia")>-1&&(a.indexOf("Symbian/3")>-1||a.indexOf("Series60/5")>-1)&&a.indexOf("AppleWebKit")>-1&&a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}(),a.mobile.gradeA=function(){return(a.support.mediaquery&&a.support.cssPseudoElement||a.mobile.browser.oldIE&&a.mobile.browser.oldIE>=8)&&(a.support.boundingRect||null!==a.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))},a.mobile.ajaxBlacklist=b.blackberry&&!b.WebKitPoint||p||k,k&&a(function(){a("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),a.support.boxShadow||a("html").addClass("ui-noboxshadow"),a.support}),function(b){"function"==typeof define&&define.amd?define("events/navigate",["jquery","./../ns","./../support"],b):b(a)}(function(a){var b,c=a.mobile.window,e=function(){};return a.event.special.beforenavigate={setup:function(){c.on("navigate",e)},teardown:function(){c.off("navigate",e)}},a.event.special.navigate=b={bound:!1,pushStateEnabled:!0,originalEventName:d,isPushStateEnabled:function(){return a.support.pushState&&a.mobile.pushStateEnabled===!0&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return a.mobile.hashListeningEnabled===!0},popstate:function(b){var d,e,f;b.isDefaultPrevented()||(d=new a.Event("navigate"),e=new a.Event("beforenavigate"),f=b.originalEvent.state||{},e.originalEvent=b,c.trigger(e),e.isDefaultPrevented()||(b.historyState&&a.extend(f,b.historyState),d.originalEvent=b,setTimeout(function(){c.trigger(d,{state:f})},0)))},hashchange:function(b){var d=new a.Event("navigate"),e=new a.Event("beforenavigate");e.originalEvent=b,c.trigger(e),e.isDefaultPrevented()||(d.originalEvent=b,c.trigger(d,{state:b.hashchangeState||{}}))},setup:function(){b.bound||(b.bound=!0,b.isPushStateEnabled()?(b.originalEventName="popstate",c.bind("popstate.navigate",b.popstate)):b.isHashChangeEnabled()&&(b.originalEventName="hashchange",c.bind("hashchange.navigate",b.hashchange)))}},a.event.special.navigate}),function(b){"function"==typeof define&&define.amd?define("vmouse",["jquery"],b):b(a)}(function(a){function b(a){for(;a&&"undefined"!=typeof a.originalEvent;)a=a.originalEvent;return a}function e(c,e){var f,g,h,i,j,k,l,m,n,o=c.type;if(c=a.Event(c),c.type=e,f=c.originalEvent,g=C,o.search(/^(mouse|click)/)>-1&&(g=E),f)for(l=g.length;l;)i=g[--l],c[i]=f[i];if(o.search(/mouse(down|up)|click/)>-1&&!c.which&&(c.which=1),-1!==o.search(/^touch/)&&(h=b(f),o=h.touches,j=h.changedTouches,k=o&&o.length?o[0]:j&&j.length?j[0]:d))for(m=0,n=A.length;n>m;m++)i=A[m],c[i]=k[i];return c}function f(b){for(var c,d,e={};b;){c=a.data(b,y);for(d in c)c[d]&&(e[d]=e.hasVirtualBinding=!0);b=b.parentNode}return e}function g(b,c){for(var d;b;){if(d=a.data(b,y),d&&(!c||d[c]))return b;b=b.parentNode}return null}function h(){M=!1}function i(){M=!0}function j(){Q=0,K.length=0,L=!1,i()}function k(){h()}function l(){G&&(clearTimeout(G),G=0)}function m(){l(),G=setTimeout(function(){G=0,j()},a.vmouse.resetTimerDuration)}function n(b,c,d){var f;return(d&&d[b]||!d&&g(c.target,b))&&(f=e(c,b),a(c.target).trigger(f)),f}function o(b){var c,d=a.data(b.target,z);"click"===b.type&&"touchstart"===a.data(b.target,"lastTouchType")&&setTimeout(function(){"touchstart"===a.data(b.target,"lastTouchType")&&(j(),delete a.data(b.target).lastTouchType,o(b))},a.vmouse.maximumTimeBetweenTouches),L||Q&&Q===d||(c=n("v"+b.type,b),c&&(c.isDefaultPrevented()&&b.preventDefault(),c.isPropagationStopped()&&b.stopPropagation(),c.isImmediatePropagationStopped()&&b.stopImmediatePropagation()))}function p(c){var d,e,g,h=b(c).touches;h&&1===h.length&&(d=c.target,e=f(d),a.data(c.target,"lastTouchType",c.type),e.hasVirtualBinding&&(Q=P++,a.data(d,z,Q),l(),k(),J=!1,g=b(c).touches[0],H=g.pageX,I=g.pageY,n("vmouseover",c,e),n("vmousedown",c,e)))}function q(b){M||(J||n("vmousecancel",b,f(b.target)),a.data(b.target,"lastTouchType",b.type),J=!0,m())}function r(c){if(!M){var d=b(c).touches[0],e=J,g=a.vmouse.moveDistanceThreshold,h=f(c.target);a.data(c.target,"lastTouchType",c.type),J=J||Math.abs(d.pageX-H)>g||Math.abs(d.pageY-I)>g,J&&!e&&n("vmousecancel",c,h),n("vmousemove",c,h),m()}}function s(c){if(!M&&a.data(c.target,"lastTouchType")!==d){i(),delete a.data(c.target).lastTouchType;var e,g,h=f(c.target);n("vmouseup",c,h),J||(e=n("vclick",c,h),e&&e.isDefaultPrevented()&&(g=b(c).changedTouches[0],K.push({touchID:Q,x:g.clientX,y:g.clientY}),L=!0)),n("vmouseout",c,h),J=!1,m()}}function t(b){var c,d=a.data(b,y);if(d)for(c in d)if(d[c])return!0;return!1}function u(){}function v(b){var c=b.substr(1);return{setup:function(){t(this)||a.data(this,y,{});var d=a.data(this,y);d[b]=!0,F[b]=(F[b]||0)+1,1===F[b]&&O.bind(c,o),a(this).bind(c,u),N&&(F.touchstart=(F.touchstart||0)+1,1===F.touchstart&&O.bind("touchstart",p).bind("touchend",s).bind("touchmove",r).bind("scroll",q))},teardown:function(){--F[b],F[b]||O.unbind(c,o),N&&(--F.touchstart,F.touchstart||O.unbind("touchstart",p).unbind("touchmove",r).unbind("touchend",s).unbind("scroll",q));var d=a(this),e=a.data(this,y);e&&(e[b]=!1),d.unbind(c,u),t(this)||d.removeData(y)}}}var w,x,y="virtualMouseBindings",z="virtualTouchID",A="clientX clientY pageX pageY screenX screenY".split(" "),B="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),C="altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),D=a.event.mouseHooks?a.event.mouseHooks.props:[],E=C.concat(D),F={},G=0,H=0,I=0,J=!1,K=[],L=!1,M=!1,N="addEventListener"in c,O=a(c),P=1,Q=0;for(a.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500,maximumTimeBetweenTouches:100},x=0;x<B.length;x++)a.event.special[B[x]]=v(B[x]);N&&c.addEventListener("click",function(b){var c,d,e,f,g,h,i=K.length,j=b.target;if(i)for(c=b.clientX,d=b.clientY,w=a.vmouse.clickDistanceThreshold,e=j;e;){for(f=0;i>f;f++)if(g=K[f],h=0,e===j&&Math.abs(g.x-c)<w&&Math.abs(g.y-d)<w||a.data(e,z)===g.touchID)return b.preventDefault(),void b.stopPropagation();e=e.parentNode}},!0)}),function(b){"function"==typeof define&&define.amd?define("events/touch",["jquery","../vmouse","../support/touch"],b):b(a)}(function(a){function e(b,c,e,f){var g=e.type;e.type=c,f?a.event.trigger(e,d,b):a.event.dispatch.call(b,e),e.type=g}var f=a(c),g=a.mobile.support.touch,h=g?"touchstart":"mousedown",i=g?"touchend":"mouseup",j=g?"touchmove":"mousemove";return a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.attrFn&&(a.attrFn[c]=!0)}),a.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var b=this,c=a(b),d=!1;c.bind("vmousedown",function(g){function h(){j&&(c.bind("vclick",k),clearTimeout(j))}function i(){h(),c.unbind("vclick",k).unbind("vmouseup",h),f.unbind("vmousecancel",i)}if(d=!1,g.which&&1!==g.which)return!0;var j,k,l=g.target;k=function(a){i(),d||l!==a.target?d&&a.preventDefault():e(b,"tap",a)},c.bind("vmouseup",h),f.bind("vmousecancel",i),j=setTimeout(function(){a.event.special.tap.emitTapOnTaphold||(d=!0),j=0,e(b,"taphold",a.Event("taphold",{target:l}))},a.event.special.tap.tapholdThreshold)})},teardown:function(){a(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),f.unbind("vmousecancel")}},a.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:b.devicePixelRatio>=2?15:30,verticalDistanceThreshold:b.devicePixelRatio>=2?15:30,getLocation:function(a){var c=b.pageXOffset,d=b.pageYOffset,e=a.clientX,f=a.clientY;return 0===a.pageY&&Math.floor(f)>Math.floor(a.pageY)||0===a.pageX&&Math.floor(e)>Math.floor(a.pageX)?(e-=c,f-=d):(f<a.pageY-d||e<a.pageX-c)&&(e=a.pageX-c,f=a.pageY-d),{x:e,y:f}},start:function(b){var c=b.originalEvent.touches?b.originalEvent.touches[0]:b,d=a.event.special.swipe.getLocation(c);return{time:(new Date).getTime(),coords:[d.x,d.y],origin:a(b.target)}},stop:function(b){var c=b.originalEvent.touches?b.originalEvent.touches[0]:b,d=a.event.special.swipe.getLocation(c);return{time:(new Date).getTime(),coords:[d.x,d.y]}},handleSwipe:function(b,c,d,f){if(c.time-b.time<a.event.special.swipe.durationThreshold&&Math.abs(b.coords[0]-c.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(b.coords[1]-c.coords[1])<a.event.special.swipe.verticalDistanceThreshold){var g=b.coords[0]>c.coords[0]?"swipeleft":"swiperight";return e(d,"swipe",a.Event("swipe",{target:f,swipestart:b,swipestop:c}),!0),e(d,g,a.Event(g,{target:f,swipestart:b,swipestop:c}),!0),!0}return!1},eventInProgress:!1,setup:function(){var b,c=this,d=a(c),e={};b=a.data(this,"mobile-events"),b||(b={length:0},a.data(this,"mobile-events",b)),b.length++,b.swipe=e,e.start=function(b){if(!a.event.special.swipe.eventInProgress){a.event.special.swipe.eventInProgress=!0;var d,g=a.event.special.swipe.start(b),h=b.target,k=!1;e.move=function(b){g&&!b.isDefaultPrevented()&&(d=a.event.special.swipe.stop(b),k||(k=a.event.special.swipe.handleSwipe(g,d,c,h),k&&(a.event.special.swipe.eventInProgress=!1)),Math.abs(g.coords[0]-d.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault())},e.stop=function(){k=!0,a.event.special.swipe.eventInProgress=!1,f.off(j,e.move),e.move=null},f.on(j,e.move).one(i,e.stop)}},d.on(h,e.start)},teardown:function(){var b,c;b=a.data(this,"mobile-events"),b&&(c=b.swipe,delete b.swipe,b.length--,0===b.length&&a.removeData(this,"mobile-events")),c&&(c.start&&a(this).off(h,c.start),c.move&&f.off(j,c.move),c.stop&&f.off(i,c.stop))}},a.each({taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)},teardown:function(){a(this).unbind(c)}}}),a.event.special}),function(b){"function"==typeof define&&define.amd?define("events/scroll",["jquery"],b):b(a)}(function(a){var b="touchmove scroll";return a.each(["scrollstart","scrollstop"],function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.attrFn&&(a.attrFn[c]=!0)}),a.event.special.scrollstart={enabled:!0,setup:function(){function c(b,c){var e=b.type;d=c,b.type=d?"scrollstart":"scrollstop",a.event.dispatch.call(f,b),b.type=e}var d,e,f=this,g=a(f),h=a.event.special.scrollstart.handler=function(b){a.event.special.scrollstart.enabled&&(d||c(b,!0),clearTimeout(e),e=setTimeout(function(){c(b,!1)},50))};g.on(b,h)},teardown:function(){a(this).off(b,a.event.special.scrollstart.handler)}},a.each({scrollstop:"scrollstart"},function(b,c){a.event.special[b]={
setup:function(){a(this).bind(c,a.noop)},teardown:function(){a(this).unbind(c)}}}),a.event.special}),function(b){"function"==typeof define&&define.amd?define("events/throttledresize",["jquery"],b):b(a)}(function(a){var b,c,d,e=250,f=0,g=function(){c=(new Date).getTime(),d=c-f,d>=e?(f=c,a(this).trigger("throttledresize")):(b&&clearTimeout(b),b=setTimeout(g,e-d))};return a.event.special.throttledresize={setup:function(){a(this).bind("resize",g)},teardown:function(){a(this).unbind("resize",g)}},a.event.special.throttledresize}),function(b){"function"==typeof define&&define.amd?define("events/orientationchange",["jquery","../support/orientation","./throttledresize"],b):b(a)}(function(a){function d(){var a=e();a!==f&&(f=a,l.trigger(m))}var e,f,g,h,i,j,k,l=a(b),m="orientationchange",n={0:!0,180:!0};return a.support.orientation&&(i=b.innerWidth||l.width(),j=b.innerHeight||l.height(),k=50,g=i>j&&i-j>k,h=n[b.orientation],(g&&h||!g&&!h)&&(n={"-90":!0,90:!0})),a.event.special.orientationchange=a.extend({},a.event.special.orientationchange,{setup:function(){return a.support.orientation&&!a.event.special.orientationchange.disabled?!1:(f=e(),void l.bind("throttledresize",d))},teardown:function(){return a.support.orientation&&!a.event.special.orientationchange.disabled?!1:void l.unbind("throttledresize",d)},add:function(a){var b=a.handler;a.handler=function(a){return a.orientation=e(),b.apply(this,arguments)}}}),a.event.special.orientationchange.orientation=e=function(){var d=!0,e=c.documentElement;return d=a.support.orientation?n[b.orientation]:e&&e.clientWidth/e.clientHeight<1.1,d?"portrait":"landscape"},a.fn[m]=function(a){return a?this.bind(m,a):this.trigger(m)},a.attrFn&&(a.attrFn[m]=!0),a.event.special}),function(b){"function"==typeof define&&define.amd?define("events",["jquery","./events/navigate","./events/touch","./events/scroll","./events/orientationchange"],b):b(a)}(function(){}),function(b){"function"==typeof define&&define.amd?define("navigation/path",["jquery","./../ns"],b):b(a)}(function(a){var c,e,f="&ui-state=dialog";return a.mobile.path=c={uiStateKey:"&ui-state",urlParseRE:/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(a){var b=this.parseUrl(a||location.href),c=a?b:location,d=b.hash;return d="#"===d?"":d,c.protocol+b.doubleSlash+c.host+(""!==c.protocol&&"/"!==c.pathname.substring(0,1)?"/":"")+c.pathname+c.search+d},getDocumentUrl:function(b){return b?a.extend({},c.documentUrl):c.documentUrl.href},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(b){if("object"===a.type(b))return b;var d=c.urlParseRE.exec(b||"")||[];return{href:d[0]||"",hrefNoHash:d[1]||"",hrefNoSearch:d[2]||"",domain:d[3]||"",protocol:d[4]||"",doubleSlash:d[5]||"",authority:d[6]||"",username:d[8]||"",password:d[9]||"",host:d[10]||"",hostname:d[11]||"",port:d[12]||"",pathname:d[13]||"",directory:d[14]||"",filename:d[15]||"",search:d[16]||"",hash:d[17]||""}},makePathAbsolute:function(a,b){var c,d,e,f;if(a&&"/"===a.charAt(0))return a;for(a=a||"",b=b?b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"",c=b?b.split("/"):[],d=a.split("/"),e=0;e<d.length;e++)switch(f=d[e]){case".":break;case"..":c.length&&c.pop();break;default:c.push(f)}return"/"+c.join("/")},isSameDomain:function(a,b){return c.parseUrl(a).domain.toLowerCase()===c.parseUrl(b).domain.toLowerCase()},isRelativeUrl:function(a){return""===c.parseUrl(a).protocol},isAbsoluteUrl:function(a){return""!==c.parseUrl(a).protocol},makeUrlAbsolute:function(a,b){if(!c.isRelativeUrl(a))return a;b===d&&(b=this.documentBase);var e=c.parseUrl(a),f=c.parseUrl(b),g=e.protocol||f.protocol,h=e.protocol?e.doubleSlash:e.doubleSlash||f.doubleSlash,i=e.authority||f.authority,j=""!==e.pathname,k=c.makePathAbsolute(e.pathname||f.filename,f.pathname),l=e.search||!j&&f.search||"",m=e.hash;return g+h+i+k+l+m},addSearchParams:function(b,d){var e=c.parseUrl(b),f="object"==typeof d?a.param(d):d,g=e.search||"?";return e.hrefNoSearch+g+("?"!==g.charAt(g.length-1)?"&":"")+f+(e.hash||"")},convertUrlToDataUrl:function(a){var d=a,e=c.parseUrl(a);return c.isEmbeddedPage(e)?d=e.hash.split(f)[0].replace(/^#/,"").replace(/\?.*$/,""):c.isSameDomain(e,this.documentBase)&&(d=e.hrefNoHash.replace(this.documentBase.domain,"").split(f)[0]),b.decodeURIComponent(d)},get:function(a){return a===d&&(a=c.parseLocation().hash),c.stripHash(a).replace(/[^\/]*\.[^\/*]+$/,"")},set:function(a){location.hash=a},isPath:function(a){return/\//.test(a)},clean:function(a){return a.replace(this.documentBase.domain,"")},stripHash:function(a){return a.replace(/^#/,"")},stripQueryParams:function(a){return a.replace(/\?.*$/,"")},cleanHash:function(a){return c.stripHash(a.replace(/\?.*$/,"").replace(f,""))},isHashValid:function(a){return/^#[^#]+$/.test(a)},isExternal:function(a){var b=c.parseUrl(a);return!(!b.protocol||b.domain.toLowerCase()===this.documentUrl.domain.toLowerCase())},hasProtocol:function(a){return/^(:?\w+:)/.test(a)},isEmbeddedPage:function(a){var b=c.parseUrl(a);return""!==b.protocol?!this.isPath(b.hash)&&b.hash&&(b.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&b.hrefNoHash===this.documentBase.hrefNoHash):/^#/.test(b.href)},squash:function(a,b){var d,e,f,g,h,i=this.isPath(a),j=this.parseUrl(a),k=j.hash,l="";return b||(i?b=c.getLocation():(h=c.getDocumentUrl(!0),b=c.isPath(h.hash)?c.squash(h.href):h.href)),e=i?c.stripHash(a):a,e=c.isPath(j.hash)?c.stripHash(j.hash):e,g=e.indexOf(this.uiStateKey),g>-1&&(l=e.slice(g),e=e.slice(0,g)),d=c.makeUrlAbsolute(e,b),f=this.parseUrl(d).search,i?((c.isPath(k)||0===k.replace("#","").indexOf(this.uiStateKey))&&(k=""),l&&-1===k.indexOf(this.uiStateKey)&&(k+=l),-1===k.indexOf("#")&&""!==k&&(k="#"+k),d=c.parseUrl(d),d=d.protocol+d.doubleSlash+d.host+d.pathname+f+k):d+=d.indexOf("#")>-1?l:"#"+l,d},isPreservableHash:function(a){return 0===a.replace("#","").indexOf(this.uiStateKey)},hashToSelector:function(a){var b="#"===a.substring(0,1);return b&&(a=a.substring(1)),(b?"#":"")+a.replace(/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g,"\\$1")},getFilePath:function(a){return a&&a.split(f)[0]},isFirstPageUrl:function(b){var e=c.parseUrl(c.makeUrlAbsolute(b,this.documentBase)),f=e.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&e.hrefNoHash===this.documentBase.hrefNoHash,g=a.mobile.firstPage,h=g&&g[0]?g[0].id:d;return f&&(!e.hash||"#"===e.hash||h&&e.hash.replace(/^#/,"")===h)},isPermittedCrossDomainRequest:function(b,c){return a.mobile.allowCrossDomainPages&&("file:"===b.protocol||"content:"===b.protocol)&&-1!==c.search(/^https?:/)}},c.documentUrl=c.parseLocation(),e=a("head").find("base"),c.documentBase=e.length?c.parseUrl(c.makeUrlAbsolute(e.attr("href"),c.documentUrl.href)):c.documentUrl,c.documentBaseDiffers=c.documentUrl.hrefNoHash!==c.documentBase.hrefNoHash,c.getDocumentBase=function(b){return b?a.extend({},c.documentBase):c.documentBase.href},c}),function(b){"function"==typeof define&&define.amd?define("navigation/history",["jquery","./../ns","./path"],b):b(a)}(function(a){return a.mobile.History=function(a,b){this.stack=a||[],this.activeIndex=b||0},a.extend(a.mobile.History.prototype,{getActive:function(){return this.stack[this.activeIndex]},getLast:function(){return this.stack[this.previousIndex]},getNext:function(){return this.stack[this.activeIndex+1]},getPrev:function(){return this.stack[this.activeIndex-1]},add:function(a,b){b=b||{},this.getNext()&&this.clearForward(),b.hash&&-1===b.hash.indexOf("#")&&(b.hash="#"+b.hash),b.url=a,this.stack.push(b),this.activeIndex=this.stack.length-1},clearForward:function(){this.stack=this.stack.slice(0,this.activeIndex+1)},find:function(a,b,c){b=b||this.stack;var d,e,f,g=b.length;for(e=0;g>e;e++)if(d=b[e],(decodeURIComponent(a)===decodeURIComponent(d.url)||decodeURIComponent(a)===decodeURIComponent(d.hash))&&(f=e,c))return f;return f},_findById:function(a){var b,c=this.stack.length;for(b=0;c>b&&this.stack[b].id!==a;b++);return c>b?b:d},closest:function(a,b){var c=b===d?d:this._findById(b),e=this.activeIndex;return c!==d?c:(c=this.find(a,this.stack.slice(0,e)),c===d&&(c=this.find(a,this.stack.slice(e),!0),c=c===d?c:c+e),c)},direct:function(b){var c=this.closest(b.url,b.id),e=this.activeIndex;c!==d&&(this.activeIndex=c,this.previousIndex=e),e>c?(b.present||b.back||a.noop)(this.getActive(),"back"):c>e?(b.present||b.forward||a.noop)(this.getActive(),"forward"):c===d&&b.missing&&b.missing(this.getActive())}}),a.mobile.History}),function(b){"function"==typeof define&&define.amd?define("navigation/navigator",["jquery","./../ns","../events/navigate","./path","./history"],b):b(a)}(function(a){var d=a.mobile.path,e=location.href;return a.mobile.Navigator=function(b){this.history=b,this.ignoreInitialHashChange=!0,a.mobile.window.bind({"popstate.history":a.proxy(this.popstate,this),"hashchange.history":a.proxy(this.hashchange,this)})},a.extend(a.mobile.Navigator.prototype,{historyEntryId:0,squash:function(f,g){var h,i,j=d.isPath(f)?d.stripHash(f):f;return i=d.squash(f),h=a.extend({id:++this.historyEntryId,hash:j,url:i},g),b.history&&b.history.replaceState&&b.history.replaceState(h,h.title||c.title,i),this.ignoreInitialHashChange&&(e=i),h},hash:function(a,b){var c,e,f,g;return c=d.parseUrl(a),e=d.parseLocation(),e.pathname+e.search===c.pathname+c.search?f=c.hash?c.hash:c.pathname+c.search:d.isPath(a)?(g=d.parseUrl(b),f=g.pathname+g.search+(d.isPreservableHash(g.hash)?g.hash.replace("#",""):"")):f=a,f},go:function(e,f,g){var h,i,j,k,l=a.event.special.navigate.isPushStateEnabled();i=d.squash(e),j=this.hash(e,i),g&&j!==d.stripHash(d.parseLocation().hash)&&(this.preventNextHashChange=g),this.preventHashAssignPopState=!0,b.location.hash=j,this.preventHashAssignPopState=!1,h=a.extend({url:i,hash:j,title:c.title},f),l&&(k=new a.Event("popstate"),k.originalEvent=new a.Event("popstate",{state:null}),h.id=(this.squash(e,h)||{}).id,g||(this.ignorePopState=!0,a.mobile.window.trigger(k))),this.history.add(h.url,h)},popstate:function(b){var c,f;if(a.event.special.navigate.isPushStateEnabled())return this.preventHashAssignPopState?(this.preventHashAssignPopState=!1,void b.stopImmediatePropagation()):this.ignorePopState?void(this.ignorePopState=!1):!b.originalEvent.state&&1===this.history.stack.length&&this.ignoreInitialHashChange&&(this.ignoreInitialHashChange=!1,location.href===e)?void b.preventDefault():(c=d.parseLocation().hash,!b.originalEvent.state&&c?(f=this.squash(c),this.history.add(f.url,f),void(b.historyState=f)):void this.history.direct({id:(b.originalEvent.state||{}).id,url:(b.originalEvent.state||{}).url||c,present:function(c,d){b.historyState=a.extend({},c),b.historyState.direction=d}}))},hashchange:function(b){var e,f;if(a.event.special.navigate.isHashChangeEnabled()&&!a.event.special.navigate.isPushStateEnabled()){if(this.preventNextHashChange)return this.preventNextHashChange=!1,void b.stopImmediatePropagation();e=this.history,f=d.parseLocation().hash,this.history.direct({url:f,present:function(c,d){b.hashchangeState=a.extend({},c),b.hashchangeState.direction=d},missing:function(){e.add(f,{hash:f,title:c.title})}})}}}),a.mobile.Navigator}),function(b){"function"==typeof define&&define.amd?define("navigation/method",["jquery","./path","./history","./navigator"],b):b(a)}(function(a){a.mobile.navigate=function(b,c,d){a.mobile.navigate.navigator.go(b,c,d)},a.mobile.navigate.history=new a.mobile.History,a.mobile.navigate.navigator=new a.mobile.Navigator(a.mobile.navigate.history);var b=a.mobile.path.parseLocation();return a.mobile.navigate.history.add(b.href,{hash:b.hash}),a.mobile.navigate}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/safe-active-element",["jquery","./version"],b):b(a)}(function(a){return a.ui.safeActiveElement=function(a){var b;try{b=a.activeElement}catch(c){b=a.body}return b||(b=a.body),b.nodeName||(b=a.body),b}}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/safe-blur",["jquery","./version"],b):b(a)}(function(a){return a.ui.safeBlur=function(b){b&&"body"!==b.nodeName.toLowerCase()&&a(b).trigger("blur")}}),function(b){"function"==typeof define&&define.amd?define("navigation/base",["jquery","./path","./../ns"],b):b(a)}(function(a){var b,c=a("head").children("base"),e=function(){return a.mobile.dynamicBaseEnabled!==d?a.mobile.dynamicBaseEnabled:b.dynamicBaseEnabled};return b={dynamicBaseEnabled:!0,element:function(){return c&&c.length||(c=a("<base>",{href:a.mobile.path.documentBase.hrefNoSearch}).prependTo(a("head"))),c},set:function(c){e()&&b.element().attr("href",a.mobile.path.makeUrlAbsolute(c,a.mobile.path.documentBase))},reset:function(){e()&&b.element().attr("href",a.mobile.path.documentBase.hrefNoSearch)}},a.mobile.base=b,b}),function(b){"function"==typeof define&&define.amd?define("widgets/enhancer",["jquery"],b):b(a)}(function(a){var b,c=!1;return a.fn.extend({enhance:function(){return a.enhance.enhance(this)},enhanceWithin:function(){return this.children().enhance(),this},enhanceOptions:function(){return a.enhance.getOptions(this)},enhanceRoles:function(){return a.enhance.getRoles(this)}}),a.enhance=a.enhance||{},a.extend(a.enhance,{enhance:function(b){var c,d=b.find("["+a.enhance.defaultProp()+"]").addBack();for(a.enhance._filter&&(d=a.enhance._filter(d)),c=0;c<a.enhance.hooks.length;c++)a.enhance.hooks[c].call(b,d);return a.enhance.defaultFunction.call(b,d),b},hooks:a.enhance.hooks||[],_filter:a.enhance._filter||!1,defaultProp:a.enhance.defaultProp||function(){return"data-ui-role"},defaultFunction:function(b){b.each(function(){var b,c=a(this).enhanceRoles();for(b=0;b<c.length;b++)a.fn[c[b]]&&a(this)[c[b]]()})},cache:!0,roleCache:{},getRoles:function(b){if(!b.length)return[];var c,e=a.enhance.roleCache[b[0].id?b[0].id:d];return e?e:(c=b.attr(a.enhance.defaultProp()),e=c?c.match(/\S+/g):[],a.enhance.roleCache[b[0].id]=e,e)},optionCache:{},getOptions:function(b){var c,e=a.enhance.optionCache[b[0].id?b[0].id:d];return e?e:(e={},c=(a.mobile.ns||"ui-").replace("-",""),a.each(a(b).data(),function(a,b){a=a.replace(c,""),a=a.charAt(0).toLowerCase()+a.slice(1),e[a]=b}),a.enhance.optionCache[b[0].id]=e,e)},_installWidget:function(){a.Widget&&!c&&(a.extend(a.Widget.prototype,{_getCreateOptions:function(a){var b,c,e=this.element.enhanceOptions();a=a||{};for(b in this.options)c=e[b],c!==d&&(a[b]=c);return a}}),c=!0)}}),a.Widget?a.enhance._installWidget():Object.defineProperty(a,"Widget",{configurable:!0,enumerable:!0,get:function(){return b},set:function(c){c&&(b=c,setTimeout(function(){a.enhance._installWidget()}))}}),a.enhance}),function(b){"function"==typeof define&&define.amd?define("widgets/enhancer.widgetCrawler",["jquery","../core","widgets/enhancer"],b):b(a)}(function(a){var b=function(c,d){a.each(d,function(d,e){var f,g=e.prototype,h=a.enhance,i=h.initGenerator(g);i&&(f=c.find(i),h._filter&&(f=h._filter(f)),f[g.widgetName](),e._childConstructors&&e._childConstructors.length>0&&b(c,e._childConstructors))})},c=function(){a.enhance.initGenerator&&a.Widget&&b(this.addBack(),a.Widget._childConstructors)};return a.enhance.hooks.push(c),a.enhance}),function(b){"function"==typeof define&&define.amd?define("widgets/enhancer.backcompat",["jquery","widgets/enhancer","widgets/enhancer.widgetCrawler"],b):b(a)}(function(a){if(a.mobileBackcompat!==!1){var b=function(b){return b=b.not(a.mobile.keepNative),a.mobile.ignoreContentEnabled&&b.each(function(){a(this).closest("[data-"+a.mobile.ns+"enhance='false']").length&&(b=b.not(this))}),b},c=function(b){return b.initSelector||a[b.namespace][b.widgetName].prototype.initSelector||!1};a.enhance._filter=b,a.enhance.defaultProp=function(){return"data-"+a.mobile.ns+"role"},a.enhance.initGenerator=c}return a.enhance}),function(b){"function"==typeof define&&define.amd?define("widgets/page",["jquery","../widget","./widget.theme","../core","widgets/enhancer","widgets/enhancer.backcompat","widgets/enhancer.widgetCrawler"],b):b(a)}(function(a){return a.widget("mobile.page",{version:"@VERSION",options:{theme:"a",domCache:!1,enhanceWithin:!0,enhanced:!1},_create:function(){return this._trigger("beforecreate")===!1?!1:(this._establishStructure(),this._setAttributes(),this._attachToDOM(),this._addHandlers(),void(this.options.enhanceWithin&&this.element.enhanceWithin()))},_establishStructure:a.noop,_setAttributes:function(){this.options.role&&this.element.attr("data-"+a.mobile.ns+"role",this.options.role),this.element.attr("tabindex","0"),this._addClass("ui-page")},_attachToDOM:a.noop,_addHandlers:function(){this._on(this.element,{pagebeforehide:"_handlePageBeforeHide",pagebeforeshow:"_handlePageBeforeShow"})},bindRemove:function(b){var c=this.element;!c.data("mobile-page").options.domCache&&c.is(":jqmData(external-page='true')")&&this._on(this.document,{pagecontainerhide:b||function(b,c){if(c.prevPage[0]===this.element[0]&&!c.samePage){var d=new a.Event("pageremove");this._trigger("remove",d),d.isDefaultPrevented()||this.element.removeWithDependents()}}})},_themeElements:function(){return[{element:this.element,prefix:"ui-page-theme-"}]},_handlePageBeforeShow:function(){this._setContainerSwatch(this.options.theme)},_handlePageBeforeHide:function(){this._setContainerSwatch("none")},_setContainerSwatch:function(a){var b=this.element.parent().pagecontainer("instance");b&&b.option("theme",a)}}),a.widget("mobile.page",a.mobile.page,a.mobile.widget.theme),a.mobile.page}),function(b){"function"==typeof define&&define.amd?define("widgets/pagecontainer",["jquery","../core","jquery-ui/safe-active-element","jquery-ui/safe-blur","jquery-ui/widget","../navigation/path","../navigation/base","../events/navigate","../navigation/history","../navigation/navigator","../navigation/method","../events/scroll","../support","../widgets/page"],b):b(a)}(function(a){var e=[],f=!1;return a.widget("mobile.pagecontainer",{version:"@VERSION",options:{theme:"a",changeOptions:{transition:d,reverse:!1,changeUrl:!0,changeHash:!0,fromHashChange:!1,duplicateCachedPage:d,showLoadMsg:!0,dataUrl:d,fromPage:d,allowSamePageTransition:!1}},initSelector:!1,_create:function(){var b=this.options;b.changeUrl=b.changeUrl?b.changeUrl:b.changeHash?!0:!1,a.mobile.pagecontainers=(a.mobile.pagecontainers?a.mobile.pagecontainers:[]).concat([this]),a.mobile.pagecontainers.active=this,this._trigger("beforecreate"),this.setLastScrollEnabled=!0,this._on(this.window,{navigate:"_disableRecordScroll",scrollstop:"_delayedRecordScroll"}),this._on(this.window,{navigate:"_filterNavigateEvents"}),this._on({pagechange:"_afterContentChange"}),this._addClass("ui-pagecontainer","ui-mobile-viewport"),this.window.one("navigate",a.proxy(function(){this.setLastScrollEnabled=!0},this))},_setOptions:function(a){a.theme!==d&&"none"!==a.theme?this._removeClass(null,"ui-overlay-"+this.options.theme)._addClass(null,"ui-overlay-"+a.theme):a.theme!==d&&this._removeClass(null,"ui-overlay-"+this.options.theme),this._super(a)},_disableRecordScroll:function(){this.setLastScrollEnabled=!1},_enableRecordScroll:function(){this.setLastScrollEnabled=!0},_afterContentChange:function(){this.setLastScrollEnabled=!0,this._off(this.window,"scrollstop"),this._on(this.window,{scrollstop:"_delayedRecordScroll"})},_recordScroll:function(){if(this.setLastScrollEnabled){var a,b,c=this._getActiveHistory();c&&(a=this._getScroll(),b=this._getDefaultScroll(),c.lastScroll=b>a?b:a)}},_delayedRecordScroll:function(){setTimeout(a.proxy(this,"_recordScroll"),100)},_getScroll:function(){return this.window.scrollTop()},_getDefaultScroll:function(){return a.mobile.defaultHomeScroll},_filterNavigateEvents:function(b,c){var d;b.originalEvent&&b.originalEvent.isDefaultPrevented()||(d=b.originalEvent.type.indexOf("hashchange")>-1?c.state.hash:c.state.url,d||(d=this._getHash()),d&&"#"!==d&&0!==d.indexOf("#"+a.mobile.path.uiStateKey)||(d=location.href),this._handleNavigate(d,c.state))},_getHash:function(){return a.mobile.path.parseLocation().hash},getActivePage:function(){return this.activePage},_getInitialContent:function(){return a.mobile.firstPage},_getHistory:function(){return a.mobile.navigate.history},_getActiveHistory:function(){return this._getHistory().getActive()},_getDocumentBase:function(){return a.mobile.path.documentBase},back:function(){this.go(-1)},forward:function(){this.go(1)},go:function(c){if(a.mobile.hashListeningEnabled)b.history.go(c);else{var d=a.mobile.navigate.history.activeIndex,e=d+parseInt(c,10),f=a.mobile.navigate.history.stack[e].url,g=c>=1?"forward":"back";a.mobile.navigate.history.activeIndex=e,a.mobile.navigate.history.previousIndex=d,this.change(f,{direction:g,changeUrl:!1,fromHashChange:!0})}},_handleDestination:function(b){var c;return"string"===a.type(b)&&(b=a.mobile.path.stripHash(b)),b&&(c=this._getHistory(),b=a.mobile.path.isPath(b)?b:a.mobile.path.makeUrlAbsolute("#"+b,this._getDocumentBase())),b||this._getInitialContent()},_optionFromHistory:function(a,b,c){var d=this._getHistory(),e="back"===a?d.getLast():d.getActive();return e&&e[b]||c},_handleDialog:function(b,c){var d,e,f=this.getActivePage();return f&&!f.data("mobile-dialog")?("back"===c.direction?this.back():this.forward(),!1):(d=c.pageUrl,e=this._getActiveHistory(),a.extend(b,{role:e.role,transition:this._optionFromHistory(c.direction,"transition",b.transition),reverse:"back"===c.direction}),d)},_handleNavigate:function(b,c){var d=a.mobile.path.stripHash(b),e=this._getHistory(),f=0===e.stack.length?"none":this._optionFromHistory(c.direction,"transition"),g={changeUrl:!1,fromHashChange:!0,reverse:"back"===c.direction};a.extend(g,c,{transition:f,allowSamePageTransition:this._optionFromHistory(c.direction,"allowSamePageTransition")}),e.activeIndex>0&&d.indexOf(a.mobile.dialogHashKey)>-1&&(d=this._handleDialog(g,c),d===!1)||this.change(this._handleDestination(d),g)},_getBase:function(){return a.mobile.base},_getNs:function(){return a.mobile.ns},_enhance:function(a,b){return a.page({role:b})},_include:function(a,b){a.appendTo(this.element),this._enhance(a,b.role),a.page("bindRemove")},_find:function(b){var c,d=this._createFileUrl(b),e=this._createDataUrl(b),f=this._getInitialContent();return c=this.element.children("[data-"+this._getNs()+"url='"+a.mobile.path.hashToSelector(e)+"']"),0===c.length&&e&&!a.mobile.path.isPath(e)&&(c=this.element.children(a.mobile.path.hashToSelector("#"+e)).attr("data-"+this._getNs()+"url",e).jqmData("url",e)),0===c.length&&a.mobile.path.isFirstPageUrl(d)&&f&&f.parent().length&&(c=a(f)),c},_getLoader:function(){return a.mobile.loading()},_showLoading:function(b,c,d,e){this._loadMsg||(this._loadMsg=setTimeout(a.proxy(function(){this._getLoader().loader("show",c,d,e),this._loadMsg=0},this),b))},_hideLoading:function(){clearTimeout(this._loadMsg),this._loadMsg=0,this._getLoader().loader("hide")},_showError:function(){this._hideLoading(),this._showLoading(0,a.mobile.pageLoadErrorMessageTheme,a.mobile.pageLoadErrorMessage,!0),setTimeout(a.proxy(this,"_hideLoading"),1500)},_parse:function(b,c){var d,e=a("<div></div>");return e.get(0).innerHTML=b,d=e.find(":jqmData(role='page'), :jqmData(role='dialog')").first(),d.length||(d=a("<div data-"+this._getNs()+"role='page'>"+(b.split(/<\/?body[^>]*>/gim)[1]||"")+"</div>")),d.attr("data-"+this._getNs()+"url",this._createDataUrl(c)).attr("data-"+this._getNs()+"external-page",!0),d},_setLoadedTitle:function(b,c){var d=c.match(/<title[^>]*>([^<]*)/)&&RegExp.$1;d&&!b.jqmData("title")&&(d=a("<div>"+d+"</div>").text(),b.jqmData("title",d))},_createDataUrl:function(b){return a.mobile.path.convertUrlToDataUrl(b)},_createFileUrl:function(b){return a.mobile.path.getFilePath(b)},_triggerWithDeprecated:function(b,c,d){var e=a.Event("page"+b),f=a.Event(this.widgetName+b);return(d||this.element).trigger(e,c),this._trigger(b,f,c),{deprecatedEvent:e,event:f}},_loadSuccess:function(b,c,e,f){var g=this._createFileUrl(b);return a.proxy(function(h,i,j){var k,l=new RegExp("(<[^>]+\\bdata-"+this._getNs()+"role=[\"']?page[\"']?[^>]*>)"),m=new RegExp("\\bdata-"+this._getNs()+"url=[\"']?([^\"'>]*)[\"']?");l.test(h)&&RegExp.$1&&m.test(RegExp.$1)&&RegExp.$1&&(g=a.mobile.path.getFilePath(a("<div>"+RegExp.$1+"</div>").text()),g=this.window[0].encodeURIComponent(g)),e.prefetch===d&&this._getBase().set(g),k=this._parse(h,g),this._setLoadedTitle(k,h),c.xhr=j,c.textStatus=i,c.page=k,c.content=k,c.toPage=k,this._triggerWithDeprecated("load",c).event.isDefaultPrevented()||(this._include(k,e),e.showLoadMsg&&this._hideLoading(),f.resolve(b,e,k))},this)},_loadDefaults:{type:"get",data:d,reload:!1,role:d,showLoadMsg:!1,loadMsgDelay:50},load:function(b,c){var e,f,g,h,i=c&&c.deferred||a.Deferred(),j=a.extend({},this._loadDefaults,c),k=null,l=a.mobile.path.makeUrlAbsolute(b,this._findBaseWithDefault());return j.data&&"get"===j.type&&(l=a.mobile.path.addSearchParams(l,j.data),j.data=d),j.data&&"post"===j.type&&(j.reload=!0),e=this._createFileUrl(l),f=this._createDataUrl(l),k=this._find(l),0===k.length&&a.mobile.path.isEmbeddedPage(e)&&!a.mobile.path.isFirstPageUrl(e)?(i.reject(l,j),i.promise()):(this._getBase().reset(),k.length&&!j.reload?(this._enhance(k,j.role),i.resolve(l,j,k),j.prefetch||this._getBase().set(b),i.promise()):(h={url:b,absUrl:l,toPage:b,prevPage:c?c.fromPage:d,dataUrl:f,deferred:i,options:j},g=this._triggerWithDeprecated("beforeload",h),g.deprecatedEvent.isDefaultPrevented()||g.event.isDefaultPrevented()?i.promise():(j.showLoadMsg&&this._showLoading(j.loadMsgDelay),j.prefetch===d&&this._getBase().reset(),a.mobile.allowCrossDomainPages||a.mobile.path.isSameDomain(a.mobile.path.documentUrl,l)?(a.ajax({url:e,type:j.type,data:j.data,contentType:j.contentType,dataType:"html",success:this._loadSuccess(l,h,j,i),error:this._loadError(l,h,j,i)}),i.promise()):(i.reject(l,j),i.promise()))))},_loadError:function(b,c,d,e){return a.proxy(function(f,g,h){this._getBase().set(a.mobile.path.get()),c.xhr=f,c.textStatus=g,c.errorThrown=h,this._hideLoading(),this._releaseTransitionLock();var i=this._triggerWithDeprecated("loadfailed",c);i.deprecatedEvent.isDefaultPrevented()||i.event.isDefaultPrevented()||(d.showLoadMsg&&this._showError(),e.reject(b,d))},this)},_getTransitionHandler:function(b){return b=a.mobile._maybeDegradeTransition(b),a.mobile.transitionHandlers[b]||a.mobile.defaultTransitionHandler},_triggerCssTransitionEvents:function(b,c,d){var e=!1;d=d||"",c&&(b[0]===c[0]&&(e=!0),this._triggerWithDeprecated(d+"hide",{nextPage:b,toPage:b,prevPage:c,samePage:e},c)),this._triggerWithDeprecated(d+"show",{prevPage:c||a(""),toPage:b},b)},_performTransition:function(b,c,d,e){var f=a.Deferred();return e&&e.removeClass("ui-page-active"),d&&d.addClass("ui-page-active"),this._delay(function(){f.resolve(b,c,d,e,!1)},0),f.promise()},_cssTransition:function(b,c,d){var e,f=d.transition,g=d.reverse,h=d.deferred;this._triggerCssTransitionEvents(b,c,"before"),this._hideLoading(),e=this._performTransition(f,g,b,c),e.done(a.proxy(function(){this._triggerCssTransitionEvents(b,c)},this)),e.done(function(){h.resolve.apply(h,arguments)})},_releaseTransitionLock:function(){f=!1,e.length>0&&this.change.apply(this,e.pop())},_removeActiveLinkClass:function(b){a.mobile.removeActiveLinkClass(b)},_loadUrl:function(b,c,d){return d.target=b,d.deferred=a.Deferred(),this.load(b,d),d.deferred.done(a.proxy(function(a,b,d){f=!1,b.absUrl=c.absUrl,this.transition(d,c,b)},this)),d.deferred.fail(a.proxy(function(){this._removeActiveLinkClass(!0),this._releaseTransitionLock(),this._triggerWithDeprecated("changefailed",c)},this)),d.deferred.promise()},_triggerPageBeforeChange:function(b,c,d){var e;return c.prevPage=this.activePage,a.extend(c,{toPage:b,options:d}),"string"===a.type(b)?c.absUrl=a.mobile.path.makeUrlAbsolute(b,this._findBaseWithDefault()):c.absUrl=d.absUrl,e=this._triggerWithDeprecated("beforechange",c),e.event.isDefaultPrevented()||e.deprecatedEvent.isDefaultPrevented()?!1:!0},change:function(b,c){if(f)return void e.unshift(arguments);var d=a.extend({},this.options.changeOptions,c),g={};return d.fromPage=d.fromPage||this.activePage,this._triggerPageBeforeChange(b,g,d)?(b=g.toPage,"string"===a.type(b)?(f=!0,this._loadUrl(b,g,d)):this.transition(b,g,d)):void 0},transition:function(b,g,h){var i,j,k,l,m,n,o,p,q,r,s,t,u,v;if(f)return void e.unshift([b,h]);if(this._triggerPageBeforeChange(b,g,h)&&(g.prevPage=h.fromPage,v=this._triggerWithDeprecated("beforetransition",g),!v.deprecatedEvent.isDefaultPrevented()&&!v.event.isDefaultPrevented()))return f=!0,b[0]!==a.mobile.firstPage[0]||h.dataUrl||(h.dataUrl=a.mobile.path.documentUrl.hrefNoHash),i=h.fromPage,j=h.dataUrl&&a.mobile.path.convertUrlToDataUrl(h.dataUrl)||b.jqmData("url"),k=j,l=a.mobile.path.getFilePath(j),m=a.mobile.navigate.history.getActive(),n=0===a.mobile.navigate.history.activeIndex,o=0,p=c.title,q=("dialog"===h.role||"dialog"===b.jqmData("role"))&&b.jqmData("dialog")!==!0,i&&i[0]===b[0]&&!h.allowSamePageTransition?(f=!1,this._triggerWithDeprecated("transition",g),this._triggerWithDeprecated("change",g),void(h.fromHashChange&&a.mobile.navigate.history.direct({url:j}))):(b.page({role:h.role}),h.fromHashChange&&(o="back"===h.direction?-1:1),a.ui.safeBlur(a.ui.safeActiveElement(this.document[0])),r=!1,q&&m&&(m.url&&m.url.indexOf(a.mobile.dialogHashKey)>-1&&this.activePage&&!this.activePage.hasClass("ui-page-dialog")&&a.mobile.navigate.history.activeIndex>0&&(h.changeUrl=!1,r=!0),j=m.url||"",j+=!r&&j.indexOf("#")>-1?a.mobile.dialogHashKey:"#"+a.mobile.dialogHashKey),s=m?b.jqmData("title")||b.children(":jqmData(type='header')").find(".ui-toolbar-title").text():p,s&&p===c.title&&(p=s),b.jqmData("title")||b.jqmData("title",p),h.transition=h.transition||(o&&!n?m.transition:d)||(q?a.mobile.defaultDialogTransition:a.mobile.defaultPageTransition),!o&&r&&(a.mobile.navigate.history.getActive().pageUrl=k),j&&!h.fromHashChange&&(!a.mobile.path.isPath(j)&&j.indexOf("#")<0&&(j="#"+j),t={allowSamePageTransition:h.allowSamePageTransition,transition:h.transition,title:p,pageUrl:k,role:h.role},h.changeUrl!==!1&&a.mobile.hashListeningEnabled?a.mobile.navigate(this.window[0].encodeURI(j),t,!0):b[0]!==a.mobile.firstPage[0]&&a.mobile.navigate.history.add(j,t)),c.title=p,a.mobile.activePage=b,this.activePage=b,h.reverse=h.reverse||0>o,u=a.Deferred(),this._cssTransition(b,i,{transition:h.transition,reverse:h.reverse,deferred:u}),u.done(a.proxy(function(c,d,e,f,i){a.mobile.removeActiveLinkClass(),h.duplicateCachedPage&&h.duplicateCachedPage.remove(),i||a.mobile.focusPage(b),this._releaseTransitionLock(),this._triggerWithDeprecated("transition",g),this._triggerWithDeprecated("change",g)},this)),u.promise())},_findBaseWithDefault:function(){var b=this.activePage&&a.mobile.getClosestBaseUrl(this.activePage);return b||a.mobile.path.documentBase.hrefNoHash},_themeElements:function(){return[{element:this.element,prefix:"ui-overlay-"}]},_destroy:function(){var b;a.mobile.pagecontainers&&(b=a.inArray(this.element,a.mobile.pagecontainers),b>=0&&(a.mobile.pagecontainers.splice(b,1),a.mobile.pagecontainers.length?a.mobile.pagecontainers.active=a.mobile.pagecontainers[0]:a.mobile.pagecontainers.active=d)),this._super()}}),a.mobile.navreadyDeferred=a.Deferred(),a.widget("mobile.pagecontainer",a.mobile.pagecontainer,a.mobile.widget.theme),a.mobile.pagecontainer}),function(b){"function"==typeof define&&define.amd?define("animationComplete",["jquery"],b):b(a)}(function(a){var b={animation:{},transition:{}},e=c.createElement("a"),f=["","webkit-","moz-","o-"],g={};return a.each(["animation","transition"],function(c,g){var h=0===c?g+"-name":g;a.each(f,function(c,f){return e.style[a.camelCase(f+h)]!==d?(b[g].prefix=f,!1):void 0}),b[g].duration=a.camelCase(b[g].prefix+g+"-duration"),b[g].event=a.camelCase(b[g].prefix+g+"-end"),""===b[g].prefix&&(b[g].event=b[g].event.toLowerCase())}),a.support.cssTransitions=b.transition.prefix!==d,a.support.cssAnimations=b.animation.prefix!==d,a(e).remove(),a.fn.extend({animationComplete:function(e,f,h){var i,j,k=this,l=function(){clearTimeout(i),e.apply(this,arguments)},m=f&&"animation"!==f?"transition":"animation";return this.length?a.support.cssTransitions&&"transition"===m||a.support.cssAnimations&&"animation"===m?(h===d&&(this.context!==c&&(j=3e3*parseFloat(this.css(b[m].duration))),
(0===j||j===d||isNaN(j))&&(j=a.fn.animationComplete.defaultDuration)),i=setTimeout(function(){k.off(b[m].event,l).each(function(){e.apply(this)})},j),g[e]={event:b[m].event,binding:l},this.one(b[m].event,l)):(setTimeout(function(){k.each(function(){e.apply(this)})},0),this):this},removeAnimationComplete:function(a){var b=g[a];return b?this.off(b.event,b.binding):this}}),a.fn.animationComplete.defaultDuration=1e3,a}),function(b){"function"==typeof define&&define.amd?define("transitions/transition",["jquery","../core","../events/scroll","../animationComplete"],b):b(a)}(function(a){return a.mobile.Transition=function(){this.init.apply(this,arguments)},a.extend(a.mobile.Transition.prototype,{toPreClass:" ui-page-pre-in",init:function(b,c,d,e){a.extend(this,{name:b,reverse:c,$to:d,$from:e,deferred:new a.Deferred})},cleanFrom:function(){this.$from.removeClass("ui-page-active out in reverse "+this.name).height("")},beforeDoneIn:function(){},beforeDoneOut:function(){},beforeStartOut:function(){},doneIn:function(){this.beforeDoneIn(),this.$to.removeClass("out in reverse "+this.name).height(""),this.toggleViewportClass(),a.mobile.window.scrollTop()!==this.toScroll&&this.scrollPage(),this.sequential||this.$to.addClass("ui-page-active"),this.deferred.resolve(this.name,this.reverse,this.$to,this.$from,!0)},doneOut:function(a,b,c,d){this.beforeDoneOut(),this.startIn(a,b,c,d)},hideIn:function(a){this.$to.css("z-index",-10),a.call(this),this.$to.css("z-index","")},scrollPage:function(){a.event.special.scrollstart.enabled=!1,(a.mobile.hideUrlBar||this.toScroll!==a.mobile.defaultHomeScroll)&&b.scrollTo(0,this.toScroll),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},startIn:function(b,c,d,e){this.hideIn(function(){this.$to.addClass("ui-page-active"+this.toPreClass),e||a.mobile.focusPage(this.$to),this.$to.height(b+this.toScroll),d||this.scrollPage()}),this.$to.removeClass(this.toPreClass).addClass(this.name+" in "+c),d?this.doneIn():this.$to.animationComplete(a.proxy(function(){this.doneIn()},this))},startOut:function(b,c,d){this.beforeStartOut(b,c,d),this.$from.height(b+a.mobile.window.scrollTop()).addClass(this.name+" out"+c)},toggleViewportClass:function(){this.$to.closest(".ui-pagecontainer").toggleClass("ui-mobile-viewport-transitioning viewport-"+this.name)},transition:function(c){var d,e=this.reverse?" reverse":"",f=a(b).height(),g=a.mobile.maxTransitionWidth!==!1&&a.mobile.window.width()>a.mobile.maxTransitionWidth;return this.toScroll=c?c:0,d=!a.support.cssTransitions||!a.support.cssAnimations||g||!this.name||"none"===this.name||Math.max(a.mobile.window.scrollTop(),this.toScroll)>a.mobile.getMaxScrollForTransition(),this.toggleViewportClass(),this.$from&&!d?this.startOut(f,e,d):this.doneOut(f,e,d,!0),this.deferred.promise()}}),a.mobile.Transition}),function(b){"function"==typeof define&&define.amd?define("transitions/serial",["jquery","../animationComplete","./transition"],b):b(a)}(function(a){return a.mobile.SerialTransition=function(){this.init.apply(this,arguments)},a.extend(a.mobile.SerialTransition.prototype,a.mobile.Transition.prototype,{sequential:!0,beforeDoneOut:function(){this.$from&&this.cleanFrom()},beforeStartOut:function(b,c,d){this.$from.animationComplete(a.proxy(function(){this.doneOut(b,c,d)},this))}}),a.mobile.SerialTransition}),function(b){"function"==typeof define&&define.amd?define("transitions/concurrent",["jquery","./transition"],b):b(a)}(function(a){return a.mobile.ConcurrentTransition=function(){this.init.apply(this,arguments)},a.extend(a.mobile.ConcurrentTransition.prototype,a.mobile.Transition.prototype,{sequential:!1,beforeDoneIn:function(){this.$from&&this.cleanFrom()},beforeStartOut:function(a,b,c){this.doneOut(a,b,c)}}),a.mobile.ConcurrentTransition}),function(b){"function"==typeof define&&define.amd?define("transitions/handlers",["jquery","../core","./serial","./concurrent"],b):b(a)}(function(a){var c=function(){return 3*a(b).height()};return a.mobile.transitionHandlers={sequential:a.mobile.SerialTransition,simultaneous:a.mobile.ConcurrentTransition},a.mobile.defaultTransitionHandler=a.mobile.transitionHandlers.sequential,a.mobile.transitionFallbacks={},a.mobile._maybeDegradeTransition=function(b){return b&&!a.support.cssTransform3d&&a.mobile.transitionFallbacks[b]&&(b=a.mobile.transitionFallbacks[b]),b},a.mobile.getMaxScrollForTransition=a.mobile.getMaxScrollForTransition||c,a.mobile.transitionHandlers}),function(b){"function"==typeof define&&define.amd?define("widgets/pagecontainer.transitions",["jquery","./pagecontainer","../navigation/method","../transitions/handlers"],b):b(a)}(function(a){return a.widget("mobile.pagecontainer",a.mobile.pagecontainer,{_getTransitionHandler:function(b){return b=a.mobile._maybeDegradeTransition(b),a.mobile.transitionHandlers[b]||a.mobile.defaultTransitionHandler},_performTransition:function(b,c,d,e){var f=this._getTransitionHandler(b);return new f(b,c,d,e).transition(a.mobile.navigate.history.getActive().lastScroll||a.mobile.defaultHomeScroll)}})}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/flip",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionFallbacks.flip="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/flow",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionFallbacks.flow="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/pop",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionFallbacks.pop="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/slide",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionHandlers.slide=a.mobile.transitionHandlers.simultaneous,a.mobile.transitionFallbacks.slide="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/slidedown",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionFallbacks.slidedown="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/slidefade",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionFallbacks.slidefade="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/slideup",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionFallbacks.slideup="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals/turn",["jquery","../handlers"],b):b(a)}(function(a){a.mobile.transitionFallbacks.turn="fade"}),function(b){"function"==typeof define&&define.amd?define("transitions/visuals",["./visuals/flip","./visuals/flow","./visuals/pop","./visuals/slide","./visuals/slidedown","./visuals/slidefade","./visuals/slideup","./visuals/turn"],b):b(a)}(function(){}),function(b){"function"==typeof define&&define.amd?define("navigation",["jquery","./core","./navigation/path","./events/navigate","./navigation/history","./navigation/navigator","./navigation/method","./support","./animationComplete","./widgets/pagecontainer","./widgets/page","./transitions/handlers"],b):b(a)}(function(a){function e(a){for(;a&&("string"!=typeof a.nodeName||"a"!==a.nodeName.toLowerCase());)a=a.parentNode;return a}var f=a.Deferred(),g=a.Deferred(),h=function(){g.resolve(),g=null},i=a.mobile.path,j=i.documentUrl,k=null;return a.mobile.back=function(){var c=b.navigator;this.phonegapNavigationEnabled&&c&&c.app&&c.app.backHistory?c.app.backHistory():a.mobile.pagecontainers.active.back()},a.mobile._maybeDegradeTransition=a.mobile._maybeDegradeTransition||function(a){return a},a.mobile._registerInternalEvents=function(){var c=function(b,c){var d,e,f,g,h=!0;return!a.mobile.ajaxEnabled||b.is(":jqmData(ajax='false')")||!b.jqmHijackable().length||b.attr("target")?!1:(d=k&&k.attr("formaction")||b.attr("action"),g=(b.attr("method")||"get").toLowerCase(),d||(d=a.mobile.getClosestBaseUrl(b),"get"===g&&(d=i.parseUrl(d).hrefNoSearch),d===i.documentBase.hrefNoHash&&(d=j.hrefNoSearch)),d=i.makeUrlAbsolute(d,a.mobile.getClosestBaseUrl(b)),i.isExternal(d)&&!i.isPermittedCrossDomainRequest(j,d)?!1:(c||(e=b.serializeArray(),k&&k[0].form===b[0]&&(f=k.attr("name"),f&&(a.each(e,function(a,b){return b.name===f?(f="",!1):void 0}),f&&e.push({name:f,value:k.attr("value")}))),h={url:d,options:{type:g,data:a.param(e),transition:b.jqmData("transition"),reverse:"reverse"===b.jqmData("direction"),reloadPage:!0}}),h))};a.mobile.document.delegate("form","submit",function(b){var d;b.isDefaultPrevented()||(d=c(a(this)),d&&(a(this).closest(".ui-pagecontainer").pagecontainer("change",d.url,d.options),b.preventDefault()))}),a.mobile.document.bind("vclick",function(b){var d,f=b.target;if(!(b.which>1)&&a.mobile.linkBindingEnabled){if(k=a(f),a.data(f,"ui-button")){if(!c(a(f).closest("form"),!0))return}else{if(f=e(f),!f||"#"===i.parseUrl(f.getAttribute("href")||"#").hash&&"back"!==f.getAttribute("data-"+a.mobile.ns+"rel"))return;if(!a(f).jqmHijackable().length)return}d=a(f).closest(".ui-button"),d.length>0&&!d.hasClass("ui-state-disabled")&&(a.mobile.removeActiveLinkClass(!0),a.mobile.activeClickedLink=d,a.mobile.activeClickedLink.addClass("ui-button-active"))}}),a.mobile.document.bind("click",function(c){if(a.mobile.linkBindingEnabled&&!c.isDefaultPrevented()){var f,g,h,k,l,m,n,o=e(c.target),p=a(o),q=function(){b.setTimeout(function(){a.mobile.removeActiveLinkClass(!0)},200)};if(a.mobile.activeClickedLink&&a.mobile.activeClickedLink[0]===c.target&&q(),o&&!(c.which>1)&&p.jqmHijackable().length){if(p.is(":jqmData(rel='back')"))return a.mobile.back(),!1;if(f=a.mobile.getClosestBaseUrl(p),g=i.makeUrlAbsolute(p.attr("href")||"#",f),!a.mobile.ajaxEnabled&&!i.isEmbeddedPage(g))return void q();if(!(-1===g.search("#")||i.isExternal(g)&&i.isAbsoluteUrl(g))){if(g=g.replace(/[^#]*#/,""),!g)return void c.preventDefault();g=i.isPath(g)?i.makeUrlAbsolute(g,f):i.makeUrlAbsolute("#"+g,j.hrefNoHash)}if(h=p.is("[rel='external']")||p.is(":jqmData(ajax='false')")||p.is("[target]"),k=h||i.isExternal(g)&&!i.isPermittedCrossDomainRequest(j,g))return void q();l=p.jqmData("transition"),m="reverse"===p.jqmData("direction")||p.jqmData("back"),n=p.attr("data-"+a.mobile.ns+"rel")||d,p.closest(".ui-pagecontainer").pagecontainer("change",g,{transition:l,reverse:m,role:n,link:p}),c.preventDefault()}}}),a.mobile.document.delegate(".ui-page","page.prefetch",function(){var b=[],c=this;a(this).find("a:jqmData(prefetch)").each(function(){var d=a(this),e=d.attr("href");e&&-1===a.inArray(e,b)&&(b.push(e),a(c).closest(".ui-pagecontainer").pagecontainer("load",e,{role:d.attr("data-"+a.mobile.ns+"rel"),prefetch:!0}))})}),a.mobile.document.bind("pageshow",function(){g?g.done(a.mobile.resetActivePageHeight):a.mobile.resetActivePageHeight()}),a.mobile.window.bind("throttledresize",a.mobile.resetActivePageHeight)},a(function(){f.resolve()}),"complete"===c.readyState?h():a.mobile.window.on("load",h),a.when(f,a.mobile.navreadyDeferred).done(function(){a.mobile._registerInternalEvents()}),a.mobile}),function(b){"function"==typeof define&&define.amd?define("degradeInputs",["jquery","defaults"],b):b(a)}(function(a){a.mobile.degradeInputs={range:"number",search:"text"},a.mobile.degradeInputsWithin=function(b){b="string"==typeof b?a(b):b,b.find("input").not(a.mobile.keepNative).each(function(){var b,c,d,e=a(this),f=this.getAttribute("type"),g=a.mobile.degradeInputs[f]||"text";a.mobile.degradeInputs[f]&&(b=a("<div>").html(e.clone()).html(),c=/\s+type=["']?\w+['"]?/,d=' type="'+g+'" data-'+a.mobile.ns+'type="'+f+'"',e.replaceWith(b.replace(c,d)))})};var b=function(){a.mobile.degradeInputsWithin(this.addBack())};return(a.enhance=a.extend(a.enhance,a.extend({hooks:[]},a.enhance))).hooks.unshift(b),a.mobile.degradeInputsWithin}),function(b){"function"==typeof define&&define.amd?define("widgets/page.dialog",["jquery","../widget","./page","../navigation"],b):b(a)}(function(a){return a.widget("mobile.page",a.mobile.page,{options:{classes:{"ui-page-dialog-close-button":"ui-button ui-corner-all ui-button-icon-only","ui-page-dialog-close-button-icon":"ui-icon-delete ui-icon","ui-page-dialog-contain":"ui-overlay-shadow ui-corner-all"},closeBtn:"left",closeBtnText:"Close",overlayTheme:"a",dialog:!1},_create:function(){return this.dialog={},this._superApply(arguments)},_establishStructure:function(){var b=this._superApply(arguments);return this.options.dialog&&(this.options.enhanced?(this.dialog.wrapper=this.element.children(".ui-page-dialog-contain").eq(0),"none"!==this.options.closeBtn&&(this.dialog.button=this.dialog.wrapper.children(".ui-toolbar-header").children("a.ui-page-dialog-close-button"),this.dialog.icon=this.dialog.button.children(".ui-page-dialog-close-button-icon"))):(this.dialog.wrapper=a("<div>"),this.dialog.wrapper.append(this.element.contents()),this._setCloseButton(this.options.closeBtn,this.options.closeBtnText))),b},_themeElements:function(){var a=this._super();return this.options.dialog&&a.push({element:this.dialog.wrapper,prefix:"ui-body-"}),a},_setAttributes:function(){var a=this._superApply(arguments);return this.options.dialog&&(this._addClass("ui-page-dialog",null),this._addClass(this.dialog.wrapper,"ui-page-dialog-contain",null),this.dialog.wrapper.attr("role","dialog")),this.dialog.button&&this.options.enhanced&&this._toggleButtonClasses(!0,this.options.closeBtn),a},_attachToDOM:function(){var a=this._superApply(arguments);return this.options.dialog&&!this.options.enhanced&&this.element.append(this.dialog.wrapper),a},_toggleButtonClasses:function(a,b){this._toggleClass(this.dialog.button,"ui-page-dialog-close-button","ui-toolbar-header-button-"+b,a),this._toggleClass(this.dialog.icon,"ui-page-dialog-close-button-icon",null,a)},_setOptions:function(b){var c,e;this._super(b),this.options.dialog&&(b.overlayTheme!==d&&a.mobile.activePage[0]===this.element[0]&&this._handlePageBeforeShow(),b.closeBtnText!==d&&(c=this.options.closeBtn,e=b.closeBtnText),b.closeBtn!==d&&(c=b.closeBtn,e=e||this.options.closeBtnText),c&&this._setCloseButton(c,e))},_toggleCloseButtonClickability:function(a){this.dialog.button&&(a?(this.dialog.button.css("pointer-events",""),this.dialog.button.removeAttr("tabindex")):(this.dialog.button.css("pointer-events","none"),this.dialog.button.attr("tabindex",-1)))},_handlePageBeforeShow:function(){this._toggleCloseButtonClickability(!0),this.options.overlayTheme&&this.options.dialog?this._setContainerSwatch(this.options.overlayTheme):this._super()},_handleButtonClick:function(){this._toggleCloseButtonClickability(!1)},_setCloseButton:function(b,c){var d;b="left"===b?"left":"right"===b?"right":"none",this.dialog.button?"none"===b?(this._toggleButtonClasses(!1,b),this._off(this.dialog.button,"click"),this.dialog.button.remove(),this.dialog.button=null,this.dialog.icon=null):(this._removeClass(this.dialog.button,null,"ui-toolbar-header-button-left ui-toolbar-header-button-right")._addClass(this.dialog.button,null,"ui-toolbar-header-button-"+b),c&&(this.dialog.button.contents().filter(function(){return 3===this.nodeType}).remove(),this.dialog.button.prepend(c))):"none"!==b&&(d=this.dialog.wrapper.children(".ui-toolbar-header,[data-"+a.mobile.ns+"type='header']").first(),d.length&&(this.dialog.button=a("<a href='#' data-"+a.mobile.ns+"rel='back'></a>").text(c||this.options.closeBtnText||""),this.dialog.icon=a("<span>").appendTo(this.dialog.button),this._toggleButtonClasses(!0,b),this.dialog.button.prependTo(d),this._on(this.dialog.button,{click:"_handleButtonClick"})))}})}),function(b){"function"==typeof define&&define.amd?define("widgets/widget.backcompat",["jquery","../ns","../widget","jquery-ui/widget"],b):b(a)}(function(a){if(a.mobileBackcompat!==!1){var b=/\S+/g;a.mobile.widget=a.extend({},{backcompat:{_boolOptions:{inline:"ui-button-inline",mini:"ui-mini",shadow:"ui-shadow",corners:"ui-corner-all"},_create:function(){this._setInitialOptions(),this._super(),!this.options.enhanced&&this.options.wrapperClass&&this._addClass(this.widget(),null,this.options.wrapperClass)},_classesToOption:function(c){if(this.classProp&&"string"==typeof c[this.classProp]){var e=this,f=c[this.classProp].match(b)||[];a.each(this._boolOptions,function(b,c){e.options[b]!==d&&(-1!==a.inArray(c,f)?e.options[b]=!0:e.options[b]=!1)})}},_getClassValue:function(c,d,e){var f=this.options.classes[c]||"",g=f.match(b)||[];return e?-1===a.inArray(d,g)&&g.push(d):g.splice(a.inArray(d,g),1),g.join(" ")},_optionsToClasses:function(a,b){var c=this.classProp,d=this._boolOptions[a];c&&this.option("classes."+c,this._getClassValue(c,d,b))},_setInitialOptions:function(){var c,e=this.options,f=a[this.namespace][this.widgetName].prototype.options,g=this.classProp,h=this;g&&(c=(e.classes[g]||"").match(b)||[],f.classes[g]!==e.classes[g]?a.each(this._boolOptions,function(b,f){e[b]!==d&&(e[b]=-1!==a.inArray(f,c))}):a.each(this._boolOptions,function(a,b){e[a]!==f[a]&&(e.classes[g]=h._getClassValue(g,b,e[a]))}))},_setOption:function(a,b){var c;"classes"===a&&this._classesToOption(b),this._boolOptions[a]&&this._optionsToClasses(a,b),"wrapperClass"===a&&(c=this.widget(),this._removeClass(c,null,this.options.wrapperClass)._addClass(c,null,b)),this._superApply(arguments)}}},a.mobile.widget)}else a.mobile.widget.backcompat={};return a.mobile.widget}),function(b){"function"==typeof define&&define.amd?define("widgets/page.dialog.backcompat",["jquery","./widget.backcompat","./page.dialog"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("mobile.page",a.mobile.page,{options:{corners:!0},classProp:"ui-page-dialog-contain",_create:function(){("dialog"===a.mobile.getAttribute(this.element[0],"role")||"dialog"===this.options.role)&&(a.data(this.element[0],"mobile-dialog",!0),this.options.dialog=!0),this._super()}}),a.widget("mobile.page",a.mobile.page,a.mobile.widget.backcompat)),a.mobile.page}),function(b){"function"==typeof define&&define.amd?define("widgets/collapsible",["jquery","../core","../widget"],b):b(a)}(function(a){var b=/([A-Z])/g;return a.widget("mobile.collapsible",{version:"@VERSION",options:{enhanced:!1,expandCueText:null,collapseCueText:null,collapsed:!0,heading:"h1,h2,h3,h4,h5,h6,legend",collapsedIcon:null,expandedIcon:null,iconpos:null,theme:null,contentTheme:null,inset:null,corners:null,mini:null},_create:function(){var b=this.element,c={accordion:b.closest(":jqmData(role='collapsible-set'),:jqmData(role='collapsibleset')"+(a.mobile.collapsibleset?", :mobile-collapsibleset":"")).addClass("ui-collapsible-set")};this._ui=c,this._renderedOptions=this._getOptions(this.options),this.options.enhanced?(c.heading=this.element.children(".ui-collapsible-heading"),c.content=c.heading.next(),c.anchor=c.heading.children(),c.status=c.anchor.children(".ui-collapsible-heading-status"),c.icon=c.anchor.children(".ui-icon")):this._enhance(b,c),this._on(c.heading,{tap:function(){c.heading.find("a").first().addClass("ui-button-active")},click:function(a){this._handleExpandCollapse(!c.heading.hasClass("ui-collapsible-heading-collapsed")),a.preventDefault(),a.stopPropagation()}})},_getOptions:function(c){var d,e=this._ui.accordion,f=this._ui.accordionWidget;c=a.extend({},c),e.length&&!f&&(this._ui.accordionWidget=f=e.data("mobile-collapsibleset"));for(d in c)c[d]=null!=c[d]?c[d]:f?f.options[d]:e.length?a.mobile.getAttribute(e[0],d.replace(b,"-$1").toLowerCase()):null,null==c[d]&&(c[d]=a.mobile.collapsible.defaults[d]);return c},_themeClassFromOption:function(a,b){return b?"none"===b?"":a+b:""},_enhance:function(b,c){var d=this._renderedOptions,e=this._themeClassFromOption("ui-body-",d.contentTheme);return b.addClass("ui-collapsible "+(d.inset?"ui-collapsible-inset ":"")+(d.inset&&d.corners?"ui-corner-all ":"")+(e?"ui-collapsible-themed-content ":"")),c.originalHeading=b.children(this.options.heading).first(),c.content=b.wrapInner("<div class='ui-collapsible-content "+e+"'></div>").children(".ui-collapsible-content"),c.heading=c.originalHeading,c.heading.is("legend")&&(c.heading=a("<div role='heading'>"+c.heading.html()+"</div>"),c.placeholder=a("<div><!-- placeholder for legend --></div>").insertBefore(c.originalHeading),c.originalHeading.remove()),c.status=a("<span class='ui-collapsible-heading-status'></span>"),c.anchor=c.heading.detach().addClass("ui-collapsible-heading").append(c.status).wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().addClass("ui-button "+this._themeClassFromOption("ui-button-",d.theme)+" "+(d.mini?"ui-mini ":"")),this._updateIcon(),c.heading.insertBefore(c.content),this._handleExpandCollapse(this.options.collapsed),c},_updateIcon:function(){var b=this._ui,c=this._getOptions(this.options),d=c.collapsed?c.collapsedIcon?" ui-icon-"+c.collapsedIcon:"":c.expandedIcon?" ui-icon-"+c.expandedIcon:"",e="bottom"===c.iconpos?"append":"prepend";b.icon&&b.icon.remove(),b.space&&b.space.remove(),b.icon=a("<span class='ui-icon"+(d?d+" ":"")+"'></span>"),"left"===c.iconpos||"right"===c.iconpos||null===c.iconpos?(b.space=a("<span class='ui-icon-space'> </span>"),b.anchor[e](b.space)):b.icon.addClass("ui-widget-icon-block"),b.anchor[e](b.icon),"right"===c.iconpos&&b.icon.addClass("ui-collapsible-icon-right")},refresh:function(){this._applyOptions(this.options),this._renderedOptions=this._getOptions(this.options),this._updateIcon()},_applyOptions:function(a){var b,c,e,f,g=this.element,h=this._renderedOptions,i=this._ui,j=i.anchor,k=i.status,l=this._getOptions(a);a.collapsed!==d&&this._handleExpandCollapse(a.collapsed),b=g.hasClass("ui-collapsible-collapsed"),b?l.expandCueText!==d&&k.text(l.expandCueText):l.collapseCueText!==d&&k.text(l.collapseCueText),l.theme!==d&&(e=this._themeClassFromOption("ui-button-",h.theme),c=this._themeClassFromOption("ui-button-",l.theme),j.removeClass(e).addClass(c)),l.contentTheme!==d&&(e=this._themeClassFromOption("ui-body-",h.contentTheme),c=this._themeClassFromOption("ui-body-",l.contentTheme),i.content.removeClass(e).addClass(c)),l.inset!==d&&(g.toggleClass("ui-collapsible-inset",l.inset),f=!(!l.inset||!l.corners&&!h.corners)),l.corners!==d&&(f=!(!l.corners||!l.inset&&!h.inset)),f!==d&&g.toggleClass("ui-corner-all",f),l.mini!==d&&j.toggleClass("ui-mini",l.mini)},_setOptions:function(a){this._applyOptions(a),this._super(a),this._renderedOptions=this._getOptions(this.options),(a.iconpos!==d||a.collapsedIcon!==d||a.expandedIcon!==d)&&this._updateIcon()},_handleExpandCollapse:function(a){var b=this._renderedOptions,c=this._ui;c.status.text(a?b.expandCueText:b.collapseCueText),c.heading.toggleClass("ui-collapsible-heading-collapsed",a).find("a").first().removeClass("ui-button-active"),c.heading.toggleClass("ui-collapsible-heading-collapsed",a).find("a").first().removeClass("ui-button-active"),c.icon&&c.icon.toggleClass("ui-icon-"+b.expandedIcon,!a).toggleClass("ui-icon-"+b.collapsedIcon,a||b.expandedIcon===b.collapsedIcon),this.element.toggleClass("ui-collapsible-collapsed",a),c.content.toggleClass("ui-collapsible-content-collapsed",a).attr("aria-hidden",a).trigger("updatelayout"),this.options.collapsed=a,this._trigger(a?"collapse":"expand")},expand:function(){this._handleExpandCollapse(!1)},collapse:function(){this._handleExpandCollapse(!0)},_destroy:function(){var a=this._ui,b=this.options;b.enhanced||(a.placeholder?(a.originalHeading.insertBefore(a.placeholder),a.placeholder.remove(),a.heading.remove()):(a.status.remove(),a.heading.removeClass("ui-collapsible-heading ui-collapsible-heading-collapsed").children().contents().unwrap()),a.icon&&a.icon.remove(),a.space&&a.space.remove(),a.anchor.contents().unwrap(),a.content.contents().unwrap(),this.element.removeClass("ui-collapsible ui-collapsible-collapsed ui-collapsible-themed-content ui-collapsible-inset ui-corner-all"))}}),a.mobile.collapsible.defaults={expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsedIcon:"plus",contentTheme:"inherit",expandedIcon:"minus",iconpos:"left",inset:!0,corners:!0,theme:"inherit",mini:!1},a.mobile.collapsible}),function(b){"function"==typeof define&&define.amd?define("widgets/addFirstLastClasses",["jquery","../core"],b):b(a)}(function(a){function b(b){var d,e=b.length,f=[];for(d=0;e>d;d++)b[d].className.match(c)||f.push(b[d]);return a(f)}var c=/\bui-screen-hidden\b/;return a.mobile.behaviors.addFirstLastClasses={_getVisibles:function(a,c){var d;return c?d=b(a):(d=a.filter(":visible"),0===d.length&&(d=b(a))),d},_addFirstLastClasses:function(a,b,c){a.removeClass("ui-first-child ui-last-child"),b.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"),c||this.element.trigger("updatelayout")},_removeFirstLastClasses:function(a){a.removeClass("ui-first-child ui-last-child")}},a.mobile.behaviors.addFirstLastClasses}),function(b){"function"==typeof define&&define.amd?define("widgets/collapsibleSet",["jquery","../widget","./collapsible","./addFirstLastClasses"],b):b(a)}(function(a){return a.widget("mobile.collapsibleset",a.extend({version:"@VERSION",options:a.extend({enhanced:!1},a.mobile.collapsible.defaults),_handleCollapsibleExpand:function(b){var c=a(b.target).closest(".ui-collapsible");c.parent().is(":mobile-collapsibleset, :jqmData(role='collapsibleset')")&&c.siblings(".ui-collapsible:not(.ui-collapsible-collapsed)").collapsible("collapse")},_create:function(){var b=this.element,c=this.options;a.extend(this,{_classes:""}),this.childCollapsiblesSelector=":mobile-collapsible, "+("[data-"+a.mobile.ns+"role='collapsible']"),c.enhanced||(b.addClass("ui-collapsible-set "+this._themeClassFromOption("ui-group-theme-",c.theme)+" "+(c.corners&&c.inset?"ui-corner-all ":"")),this.element.find(this.childCollapsiblesSelector).collapsible()),this._on(b,{collapsibleexpand:"_handleCollapsibleExpand"})},_themeClassFromOption:function(a,b){return b?"none"===b?"":a+b:""},_init:function(){this._refresh(!0),this.element.children(this.childCollapsiblesSelector).filter(":jqmData(collapsed='false')").collapsible("expand")},_setOptions:function(a){var b,c,e=this.element,f=this._themeClassFromOption("ui-group-theme-",a.theme);return f&&e.removeClass(this._themeClassFromOption("ui-group-theme-",this.options.theme)).addClass(f),a.inset!==d&&(c=!(!a.inset||!a.corners&&!this.options.corners)),a.corners!==d&&(c=!(!a.corners||!a.inset&&!this.options.inset)),c!==d&&e.toggleClass("ui-corner-all",c),b=this._super(a),this.element.children(":mobile-collapsible").collapsible("refresh"),b},_destroy:function(){var a=this.element;this._removeFirstLastClasses(a.children(this.childCollapsiblesSelector)),a.removeClass("ui-collapsible-set ui-corner-all "+this._themeClassFromOption("ui-group-theme-",this.options.theme)).children(":mobile-collapsible").collapsible("destroy")},_refresh:function(a){var b=this.element.children(this.childCollapsiblesSelector);this.element.find(this.childCollapsiblesSelector).not(".ui-collapsible").collapsible(),this._addFirstLastClasses(b,this._getVisibles(b,a),a)},refresh:function(){this._refresh(!1)}},a.mobile.behaviors.addFirstLastClasses))}),function(b){"function"==typeof define&&define.amd?define("grid",["jquery"],b):b(a)}(function(a){return a.fn.grid=function(b){return this.each(function(){var c,d,e=a(this),f=a.extend({grid:null},b),g=e.children(),h={solo:1,a:2,b:3,c:4,d:5},i=f.grid;if(!i)if(g.length<=5)for(d in h)h[d]===g.length&&(i=d);else i="a",e.addClass("ui-grid-duo");c=h[i],e.addClass("ui-grid-"+i),g.filter(":nth-child("+c+"n+1)").addClass("ui-block-a"),c>1&&g.filter(":nth-child("+c+"n+2)").addClass("ui-block-b"),c>2&&g.filter(":nth-child("+c+"n+3)").addClass("ui-block-c"),c>3&&g.filter(":nth-child("+c+"n+4)").addClass("ui-block-d"),c>4&&g.filter(":nth-child("+c+"n+5)").addClass("ui-block-e")})},a.fn.grid}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/widgets/controlgroup",["jquery","../widget"],b):b(a)}(function(a){var b=/ui-corner-([a-z]){2,6}/g;return a.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var b=this,c=[];a.each(this.options.items,function(d,e){var f,g={};return e?"controlgroupLabel"===d?(f=b.element.find(e),f.each(function(){var b=a(this);b.children(".ui-controlgroup-label-contents").length||b.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),b._addClass(f,null,"ui-widget ui-widget-content ui-state-default"),void(c=c.concat(f.get()))):void(a.fn[d]&&(g=b["_"+d+"Options"]?b["_"+d+"Options"]("middle"):{classes:{}},b.element.find(e).each(function(){var e=a(this),f=e[d]("instance"),h=a.widget.extend({},g);if("button"!==d||!e.parent(".ui-spinner").length){f||(f=e[d]()[d]("instance")),f&&(h.classes=b._resolveClassesValues(h.classes,f)),e[d](h);var i=e[d]("widget");a.data(i[0],"ui-controlgroup-data",f?f:e[d]("instance")),c.push(i[0])}}))):void 0}),this.childWidgets=a(a.unique(c)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(b){this.childWidgets.each(function(){var c=a(this),d=c.data("ui-controlgroup-data");d&&d[b]&&d[b]()})},_updateCornerClass:function(a,b){var c="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",d=this._buildSimpleOptions(b,"label").classes.label;this._removeClass(a,null,c),this._addClass(a,null,d)},_buildSimpleOptions:function(a,b){var c="vertical"===this.options.direction,d={classes:{}};return d.classes[b]={middle:"",first:"ui-corner-"+(c?"top":"left"),last:"ui-corner-"+(c?"bottom":"right"),only:"ui-corner-all"}[a],d},_spinnerOptions:function(a){var b=this._buildSimpleOptions(a,"ui-spinner");return b.classes["ui-spinner-up"]="",b.classes["ui-spinner-down"]="",b},_buttonOptions:function(a){return this._buildSimpleOptions(a,"ui-button")},_checkboxradioOptions:function(a){return this._buildSimpleOptions(a,"ui-checkboxradio-label")},_selectmenuOptions:function(a){var b="vertical"===this.options.direction;return{width:b?"auto":!1,classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(b?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(b?"top":"left")},last:{"ui-selectmenu-button-open":b?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(b?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[a]}},_resolveClassesValues:function(c,d){var e={};return a.each(c,function(f){var g=d.options.classes[f]||"";g=a.trim(g.replace(b,"")),e[f]=(g+" "+c[f]).replace(/\s+/g," ")}),e},_setOption:function(a,b){return"direction"===a&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(a,b),"disabled"===a?void this._callChildMethod(b?"disable":"enable"):void this.refresh()},refresh:function(){var b,c=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),b=this.childWidgets,this.options.onlyVisible&&(b=b.filter(":visible")),b.length&&(a.each(["first","last"],function(a,d){var e=b[d]().data("ui-controlgroup-data");if(e&&c["_"+e.widgetName+"Options"]){var f=c["_"+e.widgetName+"Options"](1===b.length?"only":d);f.classes=c._resolveClassesValues(f.classes,e),e.element[e.widgetName](f)}else c._updateCornerClass(b[d](),d)}),this._callChildMethod("refresh"))}})}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/escape-selector",["jquery","./version"],b):b(a)}(function(a){return a.ui.escapeSelector=function(){
var a=/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;return function(b){return b.replace(a,"\\$1")}}()}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/form",["jquery","./version"],b):b(a)}(function(a){return a.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):a(this[0].form)}}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/form-reset-mixin",["jquery","./form","./version"],b):b(a)}(function(a){return a.ui.formResetMixin={_formResetHandler:function(){var b=a(this);setTimeout(function(){var c=b.data("ui-form-reset-instances");a.each(c,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var a=this.form.data("ui-form-reset-instances")||[];a.length||this.form.on("reset.ui-form-reset",this._formResetHandler),a.push(this),this.form.data("ui-form-reset-instances",a)}},_unbindFormResetHandler:function(){if(this.form.length){var b=this.form.data("ui-form-reset-instances");b.splice(a.inArray(this,b),1),b.length?this.form.data("ui-form-reset-instances",b):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}}}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/labels",["jquery","./version","./escape-selector"],b):b(a)}(function(a){return a.fn.labels=function(){var b,c,d,e,f;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(e=this.eq(0).parents("label"),d=this.attr("id"),d&&(b=this.eq(0).parents().last(),f=b.add(b.length?b.siblings():this.siblings()),c="label[for='"+a.ui.escapeSelector(d)+"']",e=e.add(f.find(c).addBack(c))),this.pushStack(e))}}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/widgets/checkboxradio",["jquery","../escape-selector","../form-reset-mixin","../labels","../widget"],b):b(a)}(function(a){return a.widget("ui.checkboxradio",[a.ui.formResetMixin,{version:"1.12.1",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var b,c,d=this,e=this._super()||{};return this._readType(),c=this.element.labels(),this.label=a(c[c.length-1]),this.label.length||a.error("No label found for checkboxradio widget"),this.originalLabel="",this.label.contents().not(this.element[0]).each(function(){d.originalLabel+=3===this.nodeType?a(this).text():this.outerHTML}),this.originalLabel&&(e.label=this.originalLabel),b=this.element[0].disabled,null!=b&&(e.disabled=b),e},_create:function(){var a=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),a&&(this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this.icon&&this._addClass(this.icon,null,"ui-state-hover")),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var b=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===b&&/radio|checkbox/.test(this.type)||a.error("Can't create checkboxradio on element.nodeName="+b+" and element.type="+this.type)},_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var b,c=this.element[0].name,d="input[name='"+a.ui.escapeSelector(c)+"']";return c?(b=this.form.length?a(this.form[0].elements).filter(d):a(d).filter(function(){return 0===a(this).form().length}),b.not(this.element)):a([])},_toggleClasses:function(){var b=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",b),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",b)._toggleClass(this.icon,null,"ui-icon-blank",!b),"radio"===this.type&&this._getRadioGroup().each(function(){var b=a(this).checkboxradio("instance");b&&b._removeClass(b.label,"ui-checkboxradio-checked","ui-state-active")})},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(a,b){return"label"!==a||b?(this._super(a,b),"disabled"===a?(this._toggleClass(this.label,null,"ui-state-disabled",b),void(this.element[0].disabled=b)):void this.refresh()):void 0},_updateIcon:function(b){var c="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=a("<span>"),this.iconSpace=a("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(c+=b?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,b?"ui-icon-blank":"ui-icon-check")):c+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",c),b||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):this.icon!==d&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)},_updateLabel:function(){var a=this.label.contents().not(this.element[0]);this.icon&&(a=a.not(this.icon[0])),this.iconSpace&&(a=a.not(this.iconSpace[0])),a.remove(),this.label.append(this.options.label)},refresh:function(){var a=this.element[0].checked,b=this.element[0].disabled;this._updateIcon(a),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",a),null!==this.options.label&&this._updateLabel(),b!==this.options.disabled&&this._setOptions({disabled:b})}}]),a.ui.checkboxradio}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/widgets/button",["jquery","./controlgroup","./checkboxradio","../keycode","../widget"],b):b(a)}(function(a){return a.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var a,b=this._super()||{};return this.isInput=this.element.is("input"),a=this.element[0].disabled,null!=a&&(b.disabled=a),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(b.label=this.originalLabel),b},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(b){b.keyCode===a.ui.keyCode.SPACE&&(b.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(b,c){var d="iconPosition"!==b,e=d?this.options.iconPosition:c,f="top"===e||"bottom"===e;this.icon?d&&this._removeClass(this.icon,null,this.options.icon):(this.icon=a("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),d&&this._addClass(this.icon,null,c),this._attachIcon(e),f?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=a("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(e))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(a){this.icon[/^(?:end|bottom)/.test(a)?"before":"after"](this.iconSpace)},_attachIcon:function(a){this.element[/^(?:end|bottom)/.test(a)?"append":"prepend"](this.icon)},_setOptions:function(a){var b=a.showLabel===d?this.options.showLabel:a.showLabel,c=a.icon===d?this.options.icon:a.icon;b||c||(a.showLabel=!0),this._super(a)},_setOption:function(a,b){"icon"===a&&(b?this._updateIcon(a,b):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===a&&this._updateIcon(a,b),"showLabel"===a&&(this._toggleClass("ui-button-icon-only",null,!b),this._updateTooltip()),"label"===a&&(this.isInput?this.element.val(b):(this.element.html(b),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(a,b),"disabled"===a&&(this._toggleClass(null,"ui-state-disabled",b),this.element[0].disabled=b,b&&this.element.blur())},refresh:function(){var a=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");a!==this.options.disabled&&this._setOptions({disabled:a}),this._updateTooltip()}}),a.uiBackCompat!==!1&&(a.widget("ui.button",a.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(a,b){return"text"===a?void this._super("showLabel",b):("showLabel"===a&&(this.options.text=b),"icon"===a&&(this.options.icons.primary=b),"icons"===a&&(b.primary?(this._super("icon",b.primary),this._super("iconPosition","beginning")):b.secondary&&(this._super("icon",b.secondary),this._super("iconPosition","end"))),void this._superApply(arguments))}}),a.fn.button=function(b){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?b.apply(this,arguments):(a.ui.checkboxradio||a.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}(a.fn.button),a.fn.buttonset=function(){return a.ui.controlgroup||a.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),a.ui.button}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/button",["jquery","../../core","../../widget","../widget.theme","jquery-ui/widgets/button"],b):b(a)}(function(a){return a.widget("ui.button",a.ui.button,{options:{enhanced:!1,theme:null},_enhance:function(){this.options.enhanced?this.options.icon&&(this.icon=this.element.find("ui-button-icon")):this._super()},_themeElements:function(){return this.options.theme=this.options.theme?this.options.theme:"inherit",[{element:this.widget(),prefix:"ui-button-"}]}}),a.widget("ui.button",a.ui.button,a.mobile.widget.theme),a.ui.button.prototype.options.classes={"ui-button":"ui-shadow ui-corner-all"},a.ui.button}),function(b){"function"==typeof define&&define.amd?define("widgets/navbar",["jquery","./forms/button","../widget"],b):b(a)}(function(a){return a.widget("mobile.navbar",{version:"@VERSION",options:{iconpos:"top",maxbutton:5},_create:function(){var a=this,b=a.element,c=b.find("a"),e=c.length,f=this.options.maxbutton,g=c.filter(":jqmData(icon)").length?a.options.iconpos:d;b.addClass("ui-navbar").attr("role","navigation").find("ul"),this.navbar=b,this.navButtons=c,this.numButtons=e,this.maxButton=f,this.iconpos=g,f>=e?c.each(function(){a._makeNavButton(this,g)}):this._createNavRows()},_createNavRows:function(){var b,c,d,e,f,g,h=this.navbar.find("li"),i=this.numButtons,j=this.maxButton;for(b=i%j===0?i/j:Math.floor(i/j)+1,d=1;b>d;d++)g=a("<ul>"),this._addClass(g,"ui-navbar-row ui-navbar-row-"+d),g.appendTo(this.navbar);for(d=0;i>d;d++)e=h.eq(d),this._makeNavButton(e.find("a"),this.iconpos),d+1>j&&(e.detach(),c=(d+1)%j===0?Math.floor(d/j):Math.floor((d+1)/j),f="ul.ui-navbar-row-"+c,this.navbar.find(f).append(e))},_makeNavButton:function(b,c){var d=!1;a(b).hasClass("ui-state-disabled")&&(d=!0),a(b).button({iconPosition:c,disabled:d})},refresh:function(){var a=this;this.navButtons=this.navbar.find("a"),this.numButtons=this.navButtons.length,this._addClass(this.navbar,"ui-navbar"),this.navbar.attr("role","navigation").find("ul"),this.numButtons<=this.maxButton?this.navButtons.each(function(){a._makeNavButton(this,a.iconpos)}):this._createNavRows()},_destroy:function(){var b;this.numButtons>this.maxButton&&(b=this.navbar.find(".ui-navbar-row li").detach(),a(".ui-navbar-row").remove(),this.navbar.find("ul").append(b)),this._removeClass(this.navbar,"ui-navbar"),this.navButtons.each(function(){a(this).button("destroy")})}})}),function(b){"function"==typeof define&&define.amd?define("widgets/navbar.backcompat",["jquery","./navbar","./widget.backcompat"],b):b(a)}(function(a){return a.mobileBackcompat!==!1?a.widget("mobile.navbar",a.mobile.navbar,{_create:function(){var b=this;this._super(),b._on(b.element,{"vclick a":function(d){var e=a(d.target);e.hasClass("ui-state-disabled")||e.hasClass("ui-button-active")||(b.navButtons.removeClass("ui-button-active"),e.addClass("ui-button-active"),a(c).one("pagehide",function(){e.removeClass("ui-button-active")}))}}),b.navbar.closest(".ui-page").bind("pagebeforeshow",function(){b.navButtons.filter(".ui-state-persist").addClass("ui-button-active")})}}):void 0}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/focusable",["jquery","./version"],b):b(a)}(function(a){function b(a){for(var b=a.css("visibility");"inherit"===b;)a=a.parent(),b=a.css("visibility");return"hidden"!==b}return a.ui.focusable=function(c,d){var e,f,g,h,i,j=c.nodeName.toLowerCase();return"area"===j?(e=c.parentNode,f=e.name,c.href&&f&&"map"===e.nodeName.toLowerCase()?(g=a("img[usemap='#"+f+"']"),g.length>0&&g.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(j)?(h=!c.disabled,h&&(i=a(c).closest("fieldset")[0],i&&(h=!i.disabled))):h="a"===j?c.href||d:d,h&&a(c).is(":visible")&&b(a(c)))},a.extend(a.expr[":"],{focusable:function(b){return a.ui.focusable(b,null!=a.attr(b,"tabindex"))}}),a.ui.focusable}),function(b){"function"==typeof define&&define.amd?define("widgets/popup",["jquery","jquery-ui/focusable","jquery-ui/safe-active-element","jquery-ui/safe-blur","../widget","./widget.theme","../support","../events/navigate","../navigation/path","../navigation/history","../navigation/navigator","../navigation/method","../animationComplete","../navigation"],b):b(a)}(function(a){function c(a,b,c){return a>=c.x&&a<=c.x+c.cx&&b>=c.y&&b<=c.y+c.cy}function e(a,b){var d=a.offset(),e=a.outerWidth(!0),f=a.outerHeight(!0);return!(c(d.left,d.top,b)||c(d.left+e,d.top,b)||c(d.left+e,d.top+f,b)||c(d.left,d.top+f,b))}function f(a,b,c,d){var e=d;return e=b>a?c+(a-b)/2:Math.min(Math.max(c,d-b/2),c+a-b)}function g(a){return{x:a.scrollLeft(),y:a.scrollTop(),cx:a[0].innerWidth||a.width(),cy:a[0].innerHeight||a.height()}}var h=function(){a(this).find("a").jqmEnhanceable().filter(":jqmData(rel='popup')[href][href!='']").each(function(){var a=this,b=a.getAttribute("href").substring(1);b&&(a.setAttribute("aria-haspopup",!0),a.setAttribute("aria-owns",b),a.setAttribute("aria-expanded",!1))})};return(a.enhance=a.extend(a.enhance,a.extend({hooks:[]},a.enhance))).hooks.push(h),a.widget("mobile.popup",{version:"@VERSION",options:{classes:{"ui-popup":"ui-corner-all ui-overlay-shadow"},theme:"inherit",overlayTheme:"inherit",transition:"none",positionTo:"origin",tolerance:null,closeLinkSelector:"a[data-ui-rel='back']",dismissible:!0,enhanced:!1,history:!(a.mobile.browser.oldIE||a.mobile.browser.newIEMobile)},_handleDocumentVmousedown:function(b){this._isOpen&&a.contains(this._ui.container[0],b.target)&&this._ignoreResizeEvents()},_create:function(){var b=this.element,c=b.attr("id"),d=this.options;d.history=d.history&&a.mobile.ajaxEnabled&&a.mobile.hashListeningEnabled,a.extend(this,{_scrollTop:0,_page:b.closest(".ui-page"),_ui:null,_fallbackTransition:"",_currentTransition:!1,_prerequisites:null,_isOpen:!1,_tolerance:null,_resizeData:null,_ignoreResizeTo:0,_orientationchangeInProgress:!1}),0===this._page.length&&(this._page=a("body")),d.enhanced?(this._ui={container:b.parent(),screen:b.parent().prev(),placeholder:a(this.document[0].getElementById(c+"-placeholder"))},this._addClasses()):(this._enhance(),this._applyTransition(d.transition)),this._setTolerance(d.tolerance)._ui.focusElement=this._ui.container,this._on(this._ui.screen,{vclick:"_eatEventAndClose"}),this._on(this.window,{orientationchange:"_handleWindowOrientationchange",resize:"_handleWindowResize",keyup:"_handleWindowKeyUp"}),this._on(this.document,{vmousedown:"_handleDocumentVmousedown",focusin:"_handleDocumentFocusIn"})},_themeElements:function(){return[{element:this._ui.screen,prefix:"ui-overlay-",option:"overlayTheme"},{element:this.element,prefix:"ui-body-"}]},_addClasses:function(){this._addClass(this._ui.placeholder,null,"ui-screen-hidden"),this._addClass(this._ui.screen,"ui-popup-screen","ui-screen-hidden"),this._addClass(this._ui.container,"ui-popup-container ui-popup-hidden ui-popup-truncate"),this._addClass("ui-popup")},_enhance:function(){var b=this.element.attr("id"),c="placeholder",d={screen:a("<div>"),placeholder:a("<div>"),container:a("<div>")},e=this.document[0].createDocumentFragment();return this._ui=d,e.appendChild(d.screen[0]),e.appendChild(d.container[0]),b&&(d.screen.attr("id",b+"-screen"),d.container.attr("id",b+"-popup"),d.placeholder.attr("id",b+"-placeholder"),c="placeholder for "+b),d.placeholder.html("<!-- "+c+" -->").insertBefore(this.element),this.element.detach(),this._addClasses(),this.element.appendTo(d.container),this._page[0].appendChild(e),d},_eatEventAndClose:function(a){return a.preventDefault(),a.stopImmediatePropagation(),this.options.dismissible&&this.close(),!1},_resizeScreen:function(){var a=this._ui.screen,b=this._ui.container.outerHeight(!0),c=a.removeAttr("style").height(),d=this.document.height()-1;d>c?a.height(d):b>c&&a.height(b)},_handleWindowKeyUp:function(b){return this._isOpen&&b.keyCode===a.mobile.keyCode.ESCAPE?this._eatEventAndClose(b):void 0},_expectResizeEvent:function(){var a=g(this.window);if(this._resizeData){if(a.x===this._resizeData.windowCoordinates.x&&a.y===this._resizeData.windowCoordinates.y&&a.cx===this._resizeData.windowCoordinates.cx&&a.cy===this._resizeData.windowCoordinates.cy)return!1;clearTimeout(this._resizeData.timeoutId)}return this._resizeData={timeoutId:this._delay("_resizeTimeout",200),windowCoordinates:a},!0},_resizeTimeout:function(){this._isOpen?this._expectResizeEvent()||(this._ui.container.hasClass("ui-popup-hidden")&&(this._removeClass(this._ui.container,"ui-popup-hidden ui-popup-truncate"),this.reposition({positionTo:"window"}),this._ignoreResizeEvents()),this._resizeScreen(),this._resizeData=null,this._orientationchangeInProgress=!1):(this._resizeData=null,this._orientationchangeInProgress=!1)},_stopIgnoringResizeEvents:function(){this._ignoreResizeTo=0},_ignoreResizeEvents:function(){this._ignoreResizeTo&&clearTimeout(this._ignoreResizeTo),this._ignoreResizeTo=this._delay("_stopIgnoringResizeEvents",1e3)},_handleWindowResize:function(){this._isOpen&&0===this._ignoreResizeTo&&e(this._ui.container,g(this.window))&&(this._expectResizeEvent()||this._orientationchangeInProgress)&&!this._ui.container.hasClass("ui-popup-hidden")&&(this._addClass(this._ui.container,"ui-popup-hidden ui-popup-truncate"),this._ui.container.removeAttr("style"))},_handleWindowOrientationchange:function(){!this._orientationchangeInProgress&&this._isOpen&&0===this._ignoreResizeTo&&(this._expectResizeEvent(),this._orientationchangeInProgress=!0)},_handleDocumentFocusIn:function(b){var c,d=b.target,e=this._ui;if(this._isOpen){if(d!==e.container[0]){if(c=a(d),!a.contains(e.container[0],d))return a(a.ui.safeActiveElement(this.document[0])).one("focus",a.proxy(function(){a.ui.safeBlur(d)},this)),e.focusElement.focus(),b.preventDefault(),b.stopImmediatePropagation(),!1;e.focusElement[0]===e.container[0]&&(e.focusElement=c)}this._ignoreResizeEvents()}},_applyTransition:function(b){return b&&(this._removeClass(this._ui.container,null,this._fallbackTransition),"none"!==b&&(this._fallbackTransition=a.mobile._maybeDegradeTransition(b),"none"===this._fallbackTransition&&(this._fallbackTransition=""),this._addClass(this._ui.container,null,this._fallbackTransition))),this},_setOptions:function(a){return a.transition!==d&&(this._currentTransition||this._applyTransition(a.transition)),a.tolerance!==d&&this._setTolerance(a.tolerance),a.disabled!==d&&a.disabled&&this.close(),this._super(a)},_setTolerance:function(b){var c,e={t:30,r:15,b:30,l:15};if(b!==d)switch(c=String(b).split(","),a.each(c,function(a,b){c[a]=parseInt(b,10)}),c.length){case 1:isNaN(c[0])||(e.t=e.r=e.b=e.l=c[0]);break;case 2:isNaN(c[0])||(e.t=e.b=c[0]),isNaN(c[1])||(e.l=e.r=c[1]);break;case 4:isNaN(c[0])||(e.t=c[0]),isNaN(c[1])||(e.r=c[1]),isNaN(c[2])||(e.b=c[2]),isNaN(c[3])||(e.l=c[3])}return this._tolerance=e,this},_clampPopupWidth:function(a){var b,c=g(this.window),d={x:this._tolerance.l,y:c.y+this._tolerance.t,cx:c.cx-this._tolerance.l-this._tolerance.r,cy:c.cy-this._tolerance.t-this._tolerance.b};return a||this._ui.container.css("max-width",d.cx),b={cx:this._ui.container.outerWidth(!0),cy:this._ui.container.outerHeight(!0)},{rc:d,menuSize:b}},_calculateFinalLocation:function(a,b){var c,d=b.rc,e=b.menuSize;return c={left:f(d.cx,e.cx,d.x,a.x),top:f(d.cy,e.cy,d.y,a.y)},c.top=Math.max(0,c.top),c.top-=Math.min(c.top,Math.max(0,c.top+e.cy-this.document.height())),c},_placementCoords:function(a){return this._calculateFinalLocation(a,this._clampPopupWidth())},_createPrerequisites:function(b,c,d){var e,f=this;e={screen:a.Deferred(),container:a.Deferred()},e.screen.done(function(){e===f._prerequisites&&b()}),e.container.done(function(){e===f._prerequisites&&c()}),a.when(e.screen,e.container).done(function(){e===f._prerequisites&&(f._prerequisites=null,d())}),f._prerequisites=e},_animate:function(b){return this._removeClass(this._ui.screen,null,b.classToRemove)._addClass(this._ui.screen,null,b.screenClassToAdd),b.prerequisites.screen.resolve(),b.transition&&"none"!==b.transition&&(b.applyTransition&&this._applyTransition(b.transition),this._fallbackTransition)?(this._addClass(this._ui.container,null,b.containerClassToAdd)._removeClass(this._ui.container,null,b.classToRemove),void this._ui.container.animationComplete(a.proxy(b.prerequisites.container,"resolve"))):(this._removeClass(this._ui.container,null,b.classToRemove),void b.prerequisites.container.resolve())},_desiredCoords:function(b){var c,d=null,e=g(this.window),f=b.x,h=b.y,i=b.positionTo;if(i&&"origin"!==i)if("window"===i)f=e.cx/2+e.x,h=e.cy/2+e.y;else{try{d=a(i)}catch(j){d=null}d&&(d.filter(":visible"),0===d.length&&(d=null))}return d&&(c=d.offset(),f=c.left+d.outerWidth()/2,h=c.top+d.outerHeight()/2),("number"!==a.type(f)||isNaN(f))&&(f=e.cx/2+e.x),("number"!==a.type(h)||isNaN(h))&&(h=e.cy/2+e.y),{x:f,y:h}},_reposition:function(a){a={x:a.x,y:a.y,positionTo:a.positionTo},this._trigger("beforeposition",d,a),this._ui.container.offset(this._placementCoords(this._desiredCoords(a)))},reposition:function(a){this._isOpen&&this._reposition(a)},_openPrerequisitesComplete:function(){var b=this.element.attr("id"),c=this._ui.container.find(":focusable").first(),d=a.ui.safeActiveElement(this.document[0]);this._addClass(this._ui.container,"ui-popup-active"),this._isOpen=!0,this._resizeScreen(),d&&!a.contains(this._ui.container[0],d)&&a.ui.safeBlur(d),c.length>0&&(this._ui.focusElement=c),this._ignoreResizeEvents(),b&&this.document.find("[aria-haspopup='true'][aria-owns='"+a.mobile.path.hashToSelector(b)+"']").attr("aria-expanded",!0),this._ui.container.attr("tabindex",0),this._trigger("afteropen")},_open:function(b){var c=a.extend({},this.options,b),d=function(){var a=navigator.userAgent,b=a.match(/AppleWebKit\/([0-9\.]+)/),c=!!b&&b[1],d=a.match(/Android (\d+(?:\.\d+))/),e=!!d&&d[1],f=a.indexOf("Chrome")>-1;return null!==d&&"4.0"===e&&c&&c>534.13&&!f?!0:!1}();this._createPrerequisites(a.noop,a.noop,a.proxy(this,"_openPrerequisitesComplete")),this._currentTransition=c.transition,this._applyTransition(c.transition),this._removeClass(this._ui.screen,null,"ui-screen-hidden"),this._removeClass(this._ui.container,"ui-popup-truncate"),this._reposition(c),this._removeClass(this._ui.container,"ui-popup-hidden"),this.options.overlayTheme&&d&&this._addClass(this.element.closest(".ui-page"),"ui-popup-open"),this._animate({additionalCondition:!0,transition:c.transition,classToRemove:"",screenClassToAdd:"in",containerClassToAdd:"in",applyTransition:!1,prerequisites:this._prerequisites})},_closePrerequisiteScreen:function(){this._removeClass(this._ui.screen,null,"out")._addClass(this._ui.screen,null,"ui-screen-hidden")},_closePrerequisiteContainer:function(){this._removeClass(this._ui.container,null,"reverse out")._addClass(this._ui.container,"ui-popup-hidden ui-popup-truncate"),this._ui.container.removeAttr("style")},_closePrerequisitesDone:function(){var b=this._ui.container,c=this.element.attr("id");a.mobile.popup.active=d,a(":focus",b[0]).add(b[0]).blur(),c&&this.document.find("[aria-haspopup='true'][aria-owns='"+a.mobile.path.hashToSelector(c)+"']").attr("aria-expanded",!1),this._ui.container.removeAttr("tabindex"),this._trigger("afterclose")},_close:function(b){this._removeClass(this._ui.container,"ui-popup-active")._removeClass(this._page,"ui-popup-open"),this._isOpen=!1,this._createPrerequisites(a.proxy(this,"_closePrerequisiteScreen"),a.proxy(this,"_closePrerequisiteContainer"),a.proxy(this,"_closePrerequisitesDone")),this._animate({additionalCondition:this._ui.screen.hasClass("in"),transition:b?"none":this._currentTransition,classToRemove:"in",screenClassToAdd:"out",containerClassToAdd:"reverse out",applyTransition:!0,prerequisites:this._prerequisites})},_unenhance:function(){this.options.enhanced||(this.element.detach().insertAfter(this._ui.placeholder),this._ui.screen.remove(),this._ui.container.remove(),this._ui.placeholder.remove())},_destroy:function(){this.options.enhanced&&(this.classesElementLookup={}),a.mobile.popup.active===this?(this.element.one("popupafterclose",a.proxy(this,"_unenhance")),this.close()):this._unenhance()},_closePopup:function(c,d){var e,f,g=!1;a.mobile.popup.active!==this||c&&(c.isDefaultPrevented()||"navigate"===c.type&&d&&d.state&&d.state.url&&d.state.url===this._myUrl)||!this._isOpen||(b.scrollTo(0,this._scrollTop),c&&"pagebeforechange"===c.type&&d&&(e="string"==typeof d.toPage?d.toPage:d.toPage.jqmData("url"),e=a.mobile.path.parseUrl(e),f=e.pathname+e.search+e.hash,this._pageUrl!==a.mobile.path.makeUrlAbsolute(f)||d.options.reloadPage?g=!0:c.preventDefault()),this._off(this.window,"navigate pagebeforechange"),this._off(this.element,"click"),this._close(g))},_bindContainerClose:function(){this._on(!0,this.window,{navigate:"_closePopup",pagebeforechange:"_closePopup"})},widget:function(){return this._ui.container},_handleCloseLink:function(a){this.close(),a.preventDefault()},open:function(b){var c,d,e,f,g,h,i={},j=this,k=this.options;return a.mobile.popup.active||k.disabled?this:(a.mobile.popup.active=this,this._scrollTop=this.window.scrollTop(),k.history?(h=a.mobile.navigate.history,d=a.mobile.dialogHashKey,e=a.mobile.activePage,f=e?e.hasClass("ui-page-dialog"):!1,this._pageUrl=c=h.getActive().url,(g=c.indexOf(d)>-1&&!f&&h.activeIndex>0)?(j._open(b),j._bindContainerClose(),this):(-1!==c.indexOf(d)||f?c=a.mobile.path.parseLocation().hash+d:c+=c.indexOf("#")>-1?d:"#"+d,this.window.one("beforenavigate",function(a){a.preventDefault(),j._open(b),j._bindContainerClose()}),this.urlAltered=!0,this._myUrl=c,a.mobile.navigate(c,{role:"dialog"}),this)):(j._open(b),j._bindContainerClose(),i["click "+k.closeLinkSelector]="_handleCloseLink",this._on(i),this))},close:function(){return a.mobile.popup.active!==this?this:(this._scrollTop=this.window.scrollTop(),this.options.history&&this.urlAltered?(a.mobile.back(),this.urlAltered=!1):this._closePopup(),this)}}),a.widget("mobile.popup",a.mobile.popup,a.mobile.widget.theme),a.mobile.popup.handleLink=function(b){var c,d=a.mobile.path,e=a(d.hashToSelector(d.parseUrl(b.attr("href")).hash)).first();e.length>0&&e.data("mobile-popup")&&(c=b.offset(),e.popup("open",{x:c.left+b.outerWidth()/2,y:c.top+b.outerHeight()/2,transition:b.jqmData("transition"),positionTo:b.jqmData("position-to")})),setTimeout(function(){b.removeClass("ui-button-active")},300)},a.mobile.document.on("pagebeforechange",function(b,c){"popup"===c.options.role&&(a.mobile.popup.handleLink(c.options.link),b.preventDefault())}),a.mobile.popup}),function(b){"function"==typeof define&&define.amd?define("widgets/listview",["jquery","../widget","./addFirstLastClasses"],b):b(a)}(function(a){function b(a,b,c,d){var e=[c].concat(d?[d]:[]).join("|");a[e]||(a[e]=[]),a[e].push(b)}function c(){var a,b,c={a:!0,A:!0};for(a=this.firstChild;a;a=a.nextSibling){if(a.className&&a.className.match(f))return!0;c[a.nodeName]&&(b=a,a=a.firstChild),!a&&b&&(a=b,b=null)}}var e=a.mobile.getAttribute,f=/\bui-listview-item-count-bubble\b/;return a.widget("mobile.listview",a.extend({version:"@VERSION",options:{classes:{"ui-listview-inset":"ui-corner-all ui-shadow"},theme:"inherit",dividerTheme:"inherit",icon:"caret-r",splitIcon:"caret-r",splitTheme:"inherit",inset:!1,enhanced:!1},_create:function(){this._addClass("ui-listview"),this.options.inset&&this._addClass("ui-listview-inset"),this._refresh(!0)},_themeElements:function(){return[{element:this.element,prefix:"ui-group-theme-"}]},_setOption:function(a,b){return"inset"===a&&this._toggleClass(this.element,"ui-listview-inset",null,!!b),this._superApply(arguments)},_getChildrenByTagName:function(b,c,d){var e=[],f={};for(f[c]=f[d]=!0,b=b.firstChild;b;)f[b.nodeName]&&e.push(b),b=b.nextSibling;return a(e)},_beforeListviewRefresh:a.noop,_afterListviewRefresh:a.noop,updateItems:function(a){this._refresh(!1,a)},refresh:function(){this._refresh()},_processListItem:function(){return!0},_processListItemAnchor:function(){return!0},_refresh:function(f,g){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A=this.options,B=this.element,C=!!a.nodeName(B[0],"ol"),D=B.attr("start"),E={};for(C&&(D||0===D)&&B.css("counter-reset","listnumbering "+(parseInt(D,10)-1)),this._beforeListviewRefresh(),y=this._getChildrenByTagName(B[0],"li","LI"),v=g||y,i=0,j=v.length;j>i;i++)k=v.eq(i),l="ui-listview-item",m=d,(f||this._processListItem(k))&&(q=this._getChildrenByTagName(k[0],"a","A"),r="list-divider"===e(k[0],"role"),s=k.attr("value"),n=e(k[0],"theme"),q.length&&(this._processListItemAnchor(q)&&!r||f)?(o=e(k[0],"icon"),p=o===!1?!1:o||A.icon,h="ui-button",n&&(h+=" ui-button-"+n),q.length>1?(l+=" ui-listview-item-has-alternate",t=q.last(),u=e(t[0],"theme")||A.splitTheme||n,z=!1,x=t.children(".ui-listview-item-split-icon"),x.length||(x=a("<span>"),z=!0),b(E,x[0],"ui-listview-item-split-icon","ui-icon ui-icon-"+(e(t[0],"icon")||o||A.splitIcon)),
b(E,t[0],"ui-listview-item-split-button","ui-button ui-button-icon-only"+(u?" ui-button-"+u:"")),t.attr("title",a.trim(t.getEncodedText())),z&&t.empty().prepend(x),q=q.first()):p&&(z=!1,x=q.children(".ui-listview-item-icon"),x.length||(x=a("<span>"),z=!0),b(E,x[0],"ui-listview-item-icon","ui-icon ui-icon-"+p+" ui-widget-icon-floatend"),z&&q.prepend(x)),b(E,q[0],"ui-listview-item-button",h)):r?(l+=" ui-listview-item-divider",m="ui-bar-"+(n||A.dividerTheme||A.theme||"inherit"),k.attr("role","heading")):q.length<=0&&(l+=" ui-listview-item-static",m="ui-body-"+(n?n:"inherit")),C&&s&&k.css("counter-reset","listnumbering "+(parseInt(s,10)-1))),b(E,k[0],l,m);for(w in E)this._addClass.apply(this,[a(E[w])].concat(w.split("|")));this._addClass(v.filter(c),"ui-listview-item-has-count"),this._afterListviewRefresh(),this._addFirstLastClasses(y,this._getVisibles(y,f),f)}},a.mobile.behaviors.addFirstLastClasses))}),function(b){"function"==typeof define&&define.amd?define("widgets/navbar.morebutton",["jquery","./navbar","./popup","./listview","../widget"],b):b(a)}(function(a){return a.widget("mobile.navbar",a.mobile.navbar,{options:{morebutton:!1,morebuttontext:"...",morebuttoniconpos:"top",morebuttonicon:null},_create:function(){this._super(),this.options.morebutton&&this.numButtons>this.maxButton&&this._createNavPopup()},_id:function(){return this.element.attr("id")||this.widgetName+this.uuid},_createNavRows:function(){this.options.morebutton||this._super()},_createNavPopup:function(){var b,c,d,e,f,g=this._id()+"-popup",h=this.navbar.find("li"),i=h.length,j=this.maxButton,k=this.iconpos,l=this.options.morebuttonicon;for(b=a("<div id='"+g+"'></div>"),this._addClass(b,"ui-navbar-popup"),c=a("<ul>"),this._addClass(c,"ui-navbar-popupnav"),c.appendTo(b),e=0;i>e;e++)f=h.eq(e),this._makeNavButton(f.find("a"),k),e+1===j&&(d=a("<li></li>").append(a("<button></button>").attr("data-rel","popup").button({icon:l,iconPosition:this.options.morebuttoniconpos,label:this.options.morebuttontext})),this._on(d,{click:"_openMoreButton"}),this.navbar.find("ul").first().append(d)),e+1>=j&&(f.detach(),c.append(f)),c.listview();b.appendTo(this.navbar),b.popup({positionTo:d}),this.moreButton=d,this.popupDiv=b},_openMoreButton:function(){a("#"+this._id()+"-popup").popup("open")},refresh:function(){var a,b=this,c=this.iconpos;return this.options.morebutton?(this.popupDiv&&(a=this.moreButton.parent().nextAll(),a.find("a").each(function(){b._makeNavButton(this,c)}),a.appendTo(this.popupDiv.find("ul"))),void this._createNavPopup()):void this._super()},_destroy:function(){var b;return this.options.morebutton?void(this.popupDiv&&(b=this.popupDiv.find("li").detach(),this.popupDiv.remove(),this.moreButton.parent().remove(),this.navbar.find("ul").append(b),this.navbar.removeClass("ui-navbar"),this.navButtons=this.navbar.find("a"),this.navButtons.each(function(){a(this).button("destroy")}))):void this._super()}})}),function(b){"function"==typeof define&&define.amd?define("widgets/listview.backcompat",["jquery","./widget.theme","./widget.backcompat","./listview"],b):b(a)}(function(a){if(a.mobileBackcompat!==!1){var b=/\bui-listview-item-static\b|\bui-listview-item-divider\b/,c=/\bui-button\b/;a.widget("mobile.listview",a.mobile.listview,{options:{corners:!0,shadow:!0},classProp:"ui-listview-inset",_processListItem:function(a){return!b.test(a[0].className)},_processListItemAnchor:function(a){return!c.test(a[0].className)}}),a.widget("mobile.listview",a.mobile.listview,a.mobile.widget.backcompat)}}),function(b){"function"==typeof define&&define.amd?define("widgets/listview.autodividers",["jquery","./listview"],b):b(a)}(function(a){function b(b){var c=a.trim(b.text())||null;return c?c=c.slice(0,1).toUpperCase():null}var d=/\bui-listview-item-divider\b/;return a.widget("mobile.listview",a.mobile.listview,{options:{autodividers:!1,autodividersSelector:b},_beforeListviewRefresh:function(){return this.options.autodividers&&this._replaceDividers(),this._superApply(arguments)},_replaceDividers:function(){var b,e,f,g=this._getChildrenByTagName(this.element[0],"li","LI");g.each(a.proxy(function(h,i){var j,k;if(i=a(i),i[0].className&&i[0].className.match(d)||"list-divider"===i[0].getAttribute("data-"+a.mobile.ns+"role")){if(h===g.length-1)return i.remove(),!1;b&&b.remove(),b=i,e=i.text(),e===f&&(b.remove(),b=null,e=null)}else k=this.options.autodividersSelector(i),b&&(e===k?f=e:b.remove(),b=null,e=null),k&&f!==k&&(j=c.createElement("li"),j.appendChild(c.createTextNode(k)),j.setAttribute("data-"+a.mobile.ns+"role","list-divider"),i.before(j)),f=k},this))}})}),function(b){"function"==typeof define&&define.amd?define("widgets/listview.hidedividers",["jquery","./listview"],b):b(a)}(function(a){var b=/(^|\s)ui-listview-item-divider($|\s)/,c=/(^|\s)ui-screen-hidden($|\s)/;return a.widget("mobile.listview",a.mobile.listview,{options:{hideDividers:!1},_afterListviewRefresh:function(){var a,d,e,f=!0;if(this._superApply(arguments),this.options.hideDividers)for(a=this._getChildrenByTagName(this.element[0],"li","LI"),d=a.length-1;d>-1;d--)e=a[d],e.className.match(b)?(f&&(e.className=e.className+" ui-screen-hidden"),f=!0):e.className.match(c)||(f=!1)}})}),function(b){"function"==typeof define&&define.amd?define("nojs",["jquery","./ns"],b):b(a)}(function(a){return a.mobile.nojs=function(b){a(":jqmData(role='nojs')",b).addClass("ui-nojs")},a.mobile.nojs}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/unique-id",["jquery","./version"],b):b(a)}(function(a){return a.fn.extend({uniqueId:function(){var a=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&a(this).removeAttr("id")})}})}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/widgets/accordion",["jquery","../version","../keycode","../unique-id","../widget"],b):b(a)}(function(a){return a.widget("ui.accordion",{version:"1.12.1",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var b=this.options;this.prevShow=this.prevHide=a(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),b.collapsible||b.active!==!1&&null!=b.active||(b.active=0),this._processPanels(),b.active<0&&(b.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():a()}},_createIcons:function(){var b,c,d=this.options.icons;d&&(b=a("<span>"),this._addClass(b,"ui-accordion-header-icon","ui-icon "+d.header),b.prependTo(this.headers),c=this.active.children(".ui-accordion-header-icon"),this._removeClass(c,d.header)._addClass(c,null,d.activeHeader)._addClass(this.headers,"ui-accordion-icons"))},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var a;this.element.removeAttr("role"),this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),a=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&a.css("height","")},_setOption:function(a,b){return"active"===a?void this._activate(b):("event"===a&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(b)),this._super(a,b),"collapsible"!==a||b||this.options.active!==!1||this._activate(0),void("icons"===a&&(this._destroyIcons(),b&&this._createIcons())))},_setOptionDisabled:function(a){this._super(a),this.element.attr("aria-disabled",a),this._toggleClass(null,"ui-state-disabled",!!a),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!a)},_keydown:function(b){if(!b.altKey&&!b.ctrlKey){var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=!1;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._eventHandler(b);break;case c.HOME:f=this.headers[0];break;case c.END:f=this.headers[d-1]}f&&(a(b.target).attr("tabIndex",-1),a(f).attr("tabIndex",0),a(f).trigger("focus"),b.preventDefault())}},_panelKeyDown:function(b){b.keyCode===a.ui.keyCode.UP&&b.ctrlKey&&a(b.currentTarget).prev().trigger("focus")},refresh:function(){var b=this.options;this._processPanels(),b.active===!1&&b.collapsible===!0||!this.headers.length?(b.active=!1,this.active=a()):b.active===!1?this._activate(0):this.active.length&&!a.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(b.active=!1,this.active=a()):this._activate(Math.max(0,b.active-1)):b.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var a=this.headers,b=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),b&&(this._off(a.not(this.headers)),this._off(b.not(this.panels)))},_refresh:function(){var b,c=this.options,d=c.heightStyle,e=this.element.parent();this.active=this._findActive(c.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var b=a(this),c=b.uniqueId().attr("id"),d=b.next(),e=d.uniqueId().attr("id");b.attr("aria-controls",e),d.attr("aria-labelledby",c)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(c.event),"fill"===d?(b=e.height(),this.element.siblings(":visible").each(function(){var c=a(this),d=c.css("position");"absolute"!==d&&"fixed"!==d&&(b-=c.outerHeight(!0))}),this.headers.each(function(){b-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,b-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")):"auto"===d&&(b=0,this.headers.next().each(function(){var c=a(this).is(":visible");c||a(this).show(),b=Math.max(b,a(this).css("height","").height()),c||a(this).hide()}).height(b))},_activate:function(b){var c=this._findActive(b)[0];c!==this.active[0]&&(c=c||this.active[0],this._eventHandler({target:c,currentTarget:c,preventDefault:a.noop}))},_findActive:function(b){return"number"==typeof b?this.headers.eq(b):a()},_setupEvents:function(b){var c={keydown:"_keydown"};b&&a.each(b.split(" "),function(a,b){c[b]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,c),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(b){var c,d,e=this.options,f=this.active,g=a(b.currentTarget),h=g[0]===f[0],i=h&&e.collapsible,j=i?a():g.next(),k=f.next(),l={oldHeader:f,oldPanel:k,newHeader:i?a():g,newPanel:j};b.preventDefault(),h&&!e.collapsible||this._trigger("beforeActivate",b,l)===!1||(e.active=i?!1:this.headers.index(g),this.active=h?a():g,this._toggle(l),this._removeClass(f,"ui-accordion-header-active","ui-state-active"),e.icons&&(c=f.children(".ui-accordion-header-icon"),this._removeClass(c,null,e.icons.activeHeader)._addClass(c,null,e.icons.header)),h||(this._removeClass(g,"ui-accordion-header-collapsed")._addClass(g,"ui-accordion-header-active","ui-state-active"),e.icons&&(d=g.children(".ui-accordion-header-icon"),this._removeClass(d,null,e.icons.header)._addClass(d,null,e.icons.activeHeader)),this._addClass(g.next(),"ui-accordion-content-active")))},_toggle:function(b){var c=b.newPanel,d=this.prevShow.length?this.prevShow:b.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=c,this.prevHide=d,this.options.animate?this._animate(c,d,b):(d.hide(),c.show(),this._toggleComplete(b)),d.attr({"aria-hidden":"true"}),d.prev().attr({"aria-selected":"false","aria-expanded":"false"}),c.length&&d.length?d.prev().attr({tabIndex:-1,"aria-expanded":"false"}):c.length&&this.headers.filter(function(){return 0===parseInt(a(this).attr("tabIndex"),10)}).attr("tabIndex",-1),c.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(a,b,c){var d,e,f,g=this,h=0,i=a.css("box-sizing"),j=a.length&&(!b.length||a.index()<b.index()),k=this.options.animate||{},l=j&&k.down||k,m=function(){g._toggleComplete(c)};return"number"==typeof l&&(f=l),"string"==typeof l&&(e=l),e=e||l.easing||k.easing,f=f||l.duration||k.duration,b.length?a.length?(d=a.show().outerHeight(),b.animate(this.hideProps,{duration:f,easing:e,step:function(a,b){b.now=Math.round(a)}}),void a.hide().animate(this.showProps,{duration:f,easing:e,complete:m,step:function(a,c){c.now=Math.round(a),"height"!==c.prop?"content-box"===i&&(h+=c.now):"content"!==g.options.heightStyle&&(c.now=Math.round(d-b.outerHeight()-h),h=0)}})):b.animate(this.hideProps,f,e,m):a.animate(this.showProps,f,e,m)},_toggleComplete:function(a){var b=a.oldPanel,c=b.prev();this._removeClass(b,"ui-accordion-content-active"),this._removeClass(c,"ui-accordion-header-active")._addClass(c,"ui-accordion-header-collapsed"),b.length&&(b.parent()[0].className=b.parent()[0].className),this._trigger("activate",null,a)}})}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/button.backcompat",["jquery","../../core","../../widget","../widget.backcompat","./button"],b):b(a)}(function(a){return a.mobileBackcompat!==!1?(a.widget("ui.button",a.ui.button,{initSelector:"input[type='button'], input[type='submit'], input[type='reset'], button, [data-role='button']",options:{iconpos:"left",mini:!1,wrapperClass:null,inline:null,shadow:!0,corners:!0},classProp:"ui-button",_create:function(){this.options.iconPosition!==a.ui.button.prototype.options.iconPosition?this._seticonPosition(this.options.iconPosition):this.options.iconpos!==a.ui.button.prototype.options.iconpos&&this._seticonpos(this.options.iconpos),this._super()},_seticonPosition:function(a){"end"===a?this.options.iconpos="right":"left"!==a&&(this.options.iconpos=a)},_seticonpos:function(a){"right"===a?this._setOption("iconPosition","end"):"left"!==a&&this._setOption("iconPosition",a)},_setOption:function(a,b){("iconPosition"===a||"iconpos"===a)&&this["_set"+a](b),this._superApply(arguments)}}),a.widget("ui.button",a.ui.button,a.mobile.widget.backcompat)):void 0}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/checkboxradio",["jquery","../../core","../../widget","jquery-ui/widgets/checkboxradio","../widget.theme"],b):b(a)}(function(a){return a.widget("ui.checkboxradio",a.ui.checkboxradio,{options:{enhanced:!1,theme:"inherit"},_enhance:function(){this.options.enhanced?this.options.icon&&(this.icon=this.element.parent().find(".ui-checkboxradio-icon")):this._super()},_themeElements:function(){return[{element:this.widget(),prefix:"ui-button-"}]}}),a.widget("ui.checkboxradio",a.ui.checkboxradio,a.mobile.widget.theme),a.ui.checkboxradio}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/checkboxradio.backcompat",["jquery","../../core","../../widget","../widget.theme","../widget.backcompat","./checkboxradio"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("ui.checkboxradio",a.ui.checkboxradio,{initSelector:"input[type='radio'],input[type='checkbox']:not(:jqmData(role='flipswitch'))",options:{iconpos:"left",mini:!1,wrapperClass:null},classProp:"ui-checkboxradio-label"}),a.widget("ui.checkboxradio",a.ui.checkboxradio,a.mobile.widget.backcompat)),a.ui.checkboxradio}),function(b){"function"==typeof define&&define.amd?define("zoom",["jquery","./core"],b):b(a)}(function(a){var b=a("meta[name=viewport]"),c=b.attr("content"),d=c+",maximum-scale=1, user-scalable=no",e=c+",maximum-scale=10, user-scalable=yes",f=/(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(c);return a.mobile.zoom=a.extend({},{enabled:!f,locked:!1,disable:function(c){f||a.mobile.zoom.locked||(b.attr("content",d),a.mobile.zoom.enabled=!1,a.mobile.zoom.locked=c||!1)},enable:function(c){f||a.mobile.zoom.locked&&c!==!0||(b.attr("content",e),a.mobile.zoom.enabled=!0,a.mobile.zoom.locked=!1)},restore:function(){f||(b.attr("content",c),a.mobile.zoom.enabled=!0)}}),a.mobile.zoom}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/textinput",["jquery","../../core","../../widget","../../degradeInputs","../widget.theme","../../zoom"],b):b(a)}(function(a){return a.widget("mobile.textinput",{version:"@VERSION",options:{classes:{"ui-textinput":"ui-corner-all ui-shadow-inset","ui-textinput-search-icon":"ui-icon ui-alt-icon ui-icon-search"},theme:"inherit",preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,enhanced:!1},_create:function(){var b=this.options,c=this.element.is("[type='search'], :jqmData(type='search')"),e="textarea"===this.element[0].nodeName.toLowerCase();this.element.prop("disabled")&&(b.disabled=!0),a.extend(this,{isSearch:c,isTextarea:e}),this._autoCorrect(),b.enhanced?(this._outer=e?this.element:this.element.parent(),c&&(this._searchIcon=this._outer.children(".ui-textinput-search-icon"))):this._enhance(),this._addClass(this._outer,"ui-textinput ui-textinput-"+(this.isSearch?"search":"text")),this._searchIcon&&this._addClass(this._searchIcon,"ui-textinput-search-icon"),this._on({focus:"_handleFocus",blur:"_handleBlur"}),b.disabled!==d&&(this.element.prop("disabled",!!b.disabled),this._toggleClass(this._outer,null,"ui-state-disabled",!!b.disabled))},refresh:function(){this._setOptions({disabled:this.element.is(":disabled")})},_themeElements:function(){return[{element:this._outer,prefix:"ui-body-"}]},_enhance:function(){var b;this.isTextarea?b=this.element:(b=a("<div>"),this.isSearch&&(this._searchIcon=a("<span>").prependTo(b))),this._outer=b,this.isTextarea||b.insertBefore(this.element).append(this.element)},widget:function(){return this._outer},_autoCorrect:function(){"undefined"==typeof this.element[0].autocorrect||a.support.touchOverflow||(this.element[0].setAttribute("autocorrect","off"),this.element[0].setAttribute("autocomplete","off"))},_handleBlur:function(){this._removeClass(this._outer,null,"ui-focus"),this.options.preventFocusZoom&&a.mobile.zoom.enable(!0)},_handleFocus:function(){this.options.preventFocusZoom&&a.mobile.zoom.disable(!0),this._addClass(this._outer,null,"ui-focus")},_setOptions:function(a){return a.disabled!==d&&(this.element.prop("disabled",!!a.disabled),this._toggleClass(this._outer,null,"ui-state-disabled",!!a.disabled)),this._superApply(arguments)},_destroy:function(){return this.options.enhanced?void(this.classesElementLookup={}):(this._searchIcon&&this._searchIcon.remove(),void(this.isTextarea||this.element.unwrap()))}}),a.widget("mobile.textinput",a.mobile.textinput,a.mobile.widget.theme)}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/reset",["jquery","../../core"],b):b(a)}(function(a){return a.mobile.behaviors.formReset={_handleFormReset:function(){this._on(this.element.closest("form"),{reset:function(){this._delay("_reset")}})}},a.mobile.behaviors.formReset}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/slider",["jquery","../../core","../../widget","./textinput","../../vmouse","../widget.theme","./reset"],b):b(a)}(function(a){return a.widget("mobile.slider",a.extend({version:"@VERSION",initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",widgetEventPrefix:"slide",options:{theme:"inherit",trackTheme:"inherit",classes:{"ui-slider-track":"ui-shadow-inset ui-corner-all","ui-slider-input":"ui-shadow-inset ui-corner-all"}},_create:function(){var e,f=this.element,g=f[0].nodeName.toLowerCase(),h=f.parent().is(":jqmData(role='rangeslider')"),i=f.attr("id"),j=a("[for='"+i+"']"),k=j.attr("id")||i+"-label",l=parseFloat(f.attr("min")),m=parseFloat(f.attr("max")),n=b.parseFloat(f.attr("step")||1),o=c.createElement("a"),p=a(o),q=c.createElement("div"),r=a(q);j.attr("id",k),o.setAttribute("href","#"),q.setAttribute("role","application"),this._addClass(r,"ui-slider-track"),this._addClass(p,"ui-slider-handle"),q.appendChild(o),p.attr({role:"slider","aria-valuemin":l,"aria-valuemax":m,"aria-valuenow":this._value(),"aria-valuetext":this._value(),title:this._value(),"aria-labelledby":k}),a.extend(this,{slider:r,handle:p,control:f,type:g,step:n,max:m,min:l,isRangeslider:h,dragging:!1,beforeStart:null,userModified:!1,mouseMoved:!1}),this._addClass("ui-slider-input"),this._on(f,{change:"_controlChange",keyup:"_controlKeyup",blur:"_controlBlur",vmouseup:"_controlVMouseUp"}),r.bind("vmousedown",a.proxy(this._sliderVMouseDown,this)).bind("vclick",!1),this._on(c,{vmousemove:"_preventDocumentDrag"}),this._on(r.add(c),{vmouseup:"_sliderVMouseUp"}),r.insertAfter(f),h||(e="<div class='ui-slider'></div>",f.add(r).wrapAll(e)),this._on(this.handle,{vmousedown:"_handleVMouseDown",keydown:"_handleKeydown",keyup:"_handleKeyup"}),this.handle.bind("vclick",!1),this._handleFormReset(),this.refresh(d,d,!0)},_setOptions:function(a){a.disabled!==d&&this._setDisabled(a.disabled),this._super(a)},_controlChange:function(a){return this._trigger("controlchange",a)===!1?!1:void(this.mouseMoved||this.refresh(this._value(),!0))},_controlKeyup:function(){this.refresh(this._value(),!0,!0)},_controlBlur:function(){this.refresh(this._value(),!0)},_controlVMouseUp:function(){this._checkedRefresh()},_handleVMouseDown:function(){this.handle.focus()},_handleKeydown:function(b){var c=this._value();if(!this.options.disabled){switch(b.keyCode){case a.mobile.keyCode.HOME:case a.mobile.keyCode.END:case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:b.preventDefault(),this._keySliding||(this._keySliding=!0,this._addClass(this.handle,null,"ui-state-active"))}switch(b.keyCode){case a.mobile.keyCode.HOME:this.refresh(this.min);break;case a.mobile.keyCode.END:this.refresh(this.max);break;case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:this.refresh(c+this.step);break;case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:this.refresh(c-this.step)}}},_handleKeyup:function(){this._keySliding&&(this._keySliding=!1,this._removeClass(this.handle,null,"ui-state-active"))},_sliderVMouseDown:function(a){return this.options.disabled||1!==a.which&&0!==a.which&&a.which!==d?!1:this._trigger("beforestart",a)===!1?!1:(this.dragging=!0,this.userModified=!1,this.mouseMoved=!1,this.refresh(a),this._trigger("start"),!1)},_sliderVMouseUp:function(){return this.dragging?(this.dragging=!1,this.mouseMoved=!1,this._trigger("stop"),!1):void 0},_preventDocumentDrag:function(a){return this._trigger("drag",a)===!1?!1:this.dragging&&!this.options.disabled?(this.mouseMoved=!0,this.refresh(a),this.userModified=this.beforeStart!==this.element[0].selectedIndex,!1):void 0},_checkedRefresh:function(){this.value!==this._value()&&this.refresh(this._value())},_value:function(){return parseFloat(this.element.val())},_reset:function(){this.refresh(d,!1,!0)},refresh:function(b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w=this;if(this._addClass(w.slider,"ui-slider-track"),(this.options.disabled||this.element.prop("disabled"))&&this.disable(),this.value=this._value(),this._addClass(this.handle,null,"ui-button ui-shadow"),k=this.element,l=parseFloat(k.attr("min")),m=parseFloat(k.attr("max")),n=parseFloat(k.attr("step"))>0?parseFloat(k.attr("step")):1,"object"==typeof b){if(g=b,h=8,e=this.slider.offset().left,f=this.slider.width(),i=f/((m-l)/n),!this.dragging||g.pageX<e-h||g.pageX>e+f+h)return;j=i>1?(g.pageX-e)/f*100:Math.round((g.pageX-e)/f*100)}else null==b&&(b=parseFloat(k.val()||0)),j=(parseFloat(b)-l)/(m-l)*100;if(!isNaN(j)&&(o=j/100*(m-l)+l,p=(o-l)%n,q=o-p,2*Math.abs(p)>=n&&(q+=p>0?n:-n),r=100/((m-l)/n),o=parseFloat(q.toFixed(5)),"undefined"==typeof i&&(i=f/((m-l)/n)),i>1&&(j=(o-l)*r*(1/n)),0>j&&(j=0),j>100&&(j=100),l>o&&(o=l),o>m&&(o=m),this.handle.css("left",j+"%"),this.handle[0].setAttribute("aria-valuenow",o),this.handle[0].setAttribute("aria-valuetext",o),this.handle[0].setAttribute("title",o),this.valuebg&&this.valuebg.css("width",j+"%"),this._labels&&(s=this.handle.width()/this.slider.width()*100,t=j&&s+(100-s)*j/100,u=100===j?0:Math.min(s+100-t,100),this._labels.each(function(){var b=a(this).hasClass("ui-slider-label-a");a(this).width((b?t:u)+"%")})),!d)){if(v=!1,v=parseFloat(k.val())!==o,k.val(o),this._trigger("beforechange",b)===!1)return!1;!c&&v&&k.trigger("change")}},_themeElements:function(){return[{element:this.handle,prefix:"ui-button-"},{element:this.control,prefix:"ui-body-"},{element:this.slider,prefix:"ui-body-",option:"trackTheme"},{element:this.element,prefix:"ui-body-"}]},_setDisabled:function(a){a=!!a,this.element.prop("disabled",a),this._toggleClass(this.slider,null,"ui-state-disabled",a),this.slider.attr("aria-disabled",a),this._toggleClass(null,"ui-state-disabled",a)}},a.mobile.behaviors.formReset)),a.widget("mobile.slider",a.mobile.slider,a.mobile.widget.theme)}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/slider.backcompat",["jquery","../widget.backcompat","./slider"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("mobile.slider",a.mobile.slider,{options:{corners:!0,mini:!1,highlight:!1},classProp:"ui-slider",_create:function(){this._super(),this.options.mini&&this._addClass(this.slider,"ui-mini",null),this.options.highlight&&this._setHighlight(this.options.highlight),this.options.corners!==d&&this._setCorners(this.options.corners)},refresh:function(b,d,e){this._super(b,d,e),this.options.highlight&&0===this.slider.find(".ui-slider-bg").length&&(this.valuebg=function(b){var d=c.createElement("div");return d.className="ui-slider-bg ui-button-active",a(d).prependTo(b)}(this.slider))},_setHighlight:function(a){a?(this.options.highlight=!!a,this.refresh()):this.valuebg&&(this.valuebg.remove(),this.valuebg=!1)},_setCorners:function(a){this._toggleClass(this.slider,null,"ui-corner-all",a),this._toggleClass(this.element,null,"ui-corner-all",a)}}),a.widget("mobile.slider",a.mobile.slider,a.mobile.widget.backcompat)),a.mobile.slider}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/slider.tooltip",["jquery","./slider"],b):b(a)}(function(a){function b(){return c||(c=a("<div></div>",{"class":"ui-slider-popup ui-shadow ui-corner-all"})),c.clone()}var c;return a.widget("mobile.slider",a.mobile.slider,{options:{popupEnabled:!1,showValue:!1},_create:function(){this._super(),a.extend(this,{_currentValue:null,_popup:null,_popupVisible:!1}),this._setOption("popupEnabled",this.options.popupEnabled),this._on(this.handle.add(this.slider),{vmousedown:"_showPopup"}),this._on(this.slider.add(this.document),{vmouseup:"_hidePopup"}),this._refresh()},_positionPopup:function(){var a=this.handle.offset();this._popup.offset({left:a.left+(this.handle.width()-this._popup.width())/2,top:a.top-this._popup.outerHeight()-5})},_setOption:function(a,c){this._super(a,c),"showValue"===a?this.handle.html(c&&!this.options.mini?this._value():""):"popupEnabled"===a&&c&&!this._popup&&(this._popup=b().addClass("ui-body-"+(this.options.theme||"a")).hide().insertBefore(this.element))},refresh:function(){this._super.apply(this,arguments),this._refresh()},_refresh:function(){var a,b=this.options;b.popupEnabled&&this.handle.removeAttr("title"),a=this._value(),a!==this._currentValue&&(this._currentValue=a,b.popupEnabled&&this._popup&&(this._positionPopup(),this._popup.html(a)),b.showValue&&!this.options.mini&&this.handle.html(a))},_showPopup:function(){this.options.popupEnabled&&!this._popupVisible&&(this._popup.show(),this._positionPopup(),this._popupVisible=!0)},_hidePopup:function(){var a=this.options;a.popupEnabled&&this._popupVisible&&(a.showValue&&!a.mini&&this.handle.html(this._value()),this._popup.hide(),this._popupVisible=!1)}})}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/flipswitch",["jquery","../../core","../../widget","../../zoom","./reset"],b):b(a)}(function(a){var b=/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;return a.widget("mobile.flipswitch",a.extend({version:"@VERSION",options:{onText:"On",offText:"Off",theme:null,enhanced:!1,classes:{"ui-flipswitch":"ui-shadow-inset ui-corner-all","ui-flipswitch-on":"ui-shadow"}},_create:function(){var b;this._originalTabIndex=this.element.attr("tabindex"),this.type=this.element[0].nodeName.toLowerCase(),this.options.enhanced?a.extend(this,{flipswitch:this.element.parent(),on:this.element.find(".ui-flipswitch-on").eq(0),off:this.element.find(".ui-flipswitch-off").eq(0)}):this._enhance(),this._handleFormReset(),this.element.attr("tabindex","-1"),this._on({focus:"_handleInputFocus"}),this.element.is(":disabled")&&this._setOptions({disabled:!0}),this._on(this.flipswitch,{click:"_toggle",swipeleft:"_left",swiperight:"_right"}),this._on(this.on,{keydown:"_keydown"}),this._on({change:"refresh"}),"select"===this.element[0].nodeName.toLowerCase()&&(b=this._findLabels(),b.length&&this._on(b,{click:function(a){this.element.click(),a.preventDefault()}}))},_handleInputFocus:function(){this.on.focus()},widget:function(){return this.flipswitch},_left:function(){this.flipswitch.removeClass("ui-flipswitch-active"),"select"===this.type?this.element.get(0).selectedIndex=0:this.element.prop("checked",!1),this.element.trigger("change")},_right:function(){this._addClass(this.flipswitch,"ui-flipswitch-active"),"select"===this.type?this.element.get(0).selectedIndex=1:this.element.prop("checked",!0),this.element.trigger("change")},_enhance:function(){var b=a("<div>"),c=this.options,d=this.element,e=this._originalTabIndex||0,f=c.theme?c.theme:"inherit",g=a("<span tabindex='"+e+"'></span>"),h=a("<span></span>"),i="input"===this.type?c.onText:d.find("option").eq(1).text(),j="input"===this.type?c.offText:d.find("option").eq(0).text();this._addClass(g,"ui-flipswitch-on","ui-button ui-button-inherit"),g.text(i),this._addClass(h,"ui-flipswitch-off"),h.text(j),this._addClass(b,"ui-flipswitch","ui-bar-"+f+" "+(d.is(":checked")||d.find("option").eq(1).is(":selected")?"ui-flipswitch-active":"")+(d.is(":disabled")?" ui-state-disabled":"")),b.append(g,h),this._addClass("ui-flipswitch-input"),d.after(b).appendTo(b),a.extend(this,{flipswitch:b,on:g,off:h})},_reset:function(){this.refresh()},refresh:function(){var a,b=this.flipswitch.hasClass("ui-flipswitch-active")?"_right":"_left";a="select"===this.type?this.element.get(0).selectedIndex>0?"_right":"_left":this.element.prop("checked")?"_right":"_left",a!==b&&this[a]()},_findLabels:function(){var c=this.element[0],d=c.labels;return d&&d.length?d=a(d):(d=this.element.closest("label"),0===d.length&&(d=a(this.document[0].getElementsByTagName("label")).filter("[for='"+c.getAttribute("id").replace(b,"\\$1")+"']"))),d},_toggle:function(){var a=this.flipswitch.hasClass("ui-flipswitch-active")?"_left":"_right";
this[a]()},_keydown:function(b){b.which===a.mobile.keyCode.LEFT?this._left():b.which===a.mobile.keyCode.RIGHT?this._right():b.which===a.mobile.keyCode.SPACE&&(this._toggle(),b.preventDefault())},_setOptions:function(a){if(a.theme!==d){var b=this.options.theme?this.options.theme:"inherit",c=a.theme?a.theme:"inherit";this._removeClass(this.flipswitch,null,"ui-bar-"+b),this._addClass(this.flipswitch,null,"ui-bar-"+c)}a.onText!==d&&this.on.text(a.onText),a.offText!==d&&this.off.text(a.offText),a.disabled!==d&&this._toggleClass(this.flipswitch,null,"ui-state-disabled",a.disabled),this._super(a)},_destroy:function(){this.options.enhanced||(null!=this._originalTabIndex?this.element.attr("tabindex",this._originalTabIndex):this.element.removeAttr("tabindex"),this.on.remove(),this.off.remove(),this.element.unwrap(),this.element.removeClass("ui-flipswitch-input"),this.flipswitch.remove())}},a.mobile.behaviors.formReset))}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/flipswitch.backcompat",["jquery","../widget.backcompat","./flipswitch"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("mobile.flipswitch",a.mobile.flipswitch,{options:{corners:!0,mini:!1,wrapperClass:null},classProp:"ui-flipswitch"}),a.widget("mobile.flipswitch",a.mobile.flipswitch,a.mobile.widget.backcompat)),a.mobile.flipswitch}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/rangeslider",["jquery","../../core","../../widget","./textinput","../../vmouse","./reset","../widget.theme","./slider"],b):b(a)}(function(a){return a.widget("mobile.rangeslider",a.extend({version:"@VERSION",options:{theme:"inherit",trackTheme:"inherit"},_create:function(){var b=this.element.find("input").first(),c=this.element.find("input").last(),d=this.element.find("label").first(),e=a.data(b.get(0),"mobile-slider")||a.data(b.slider().get(0),"mobile-slider"),f=a.data(c.get(0),"mobile-slider")||a.data(c.slider().get(0),"mobile-slider"),g=e.slider,h=f.slider,i=e.handle,j=a("<div>");this._addClass(j,"ui-rangeslider-sliders"),j.appendTo(this.element),this._addClass(b,"ui-rangeslider-first"),this._addClass(c,"ui-rangeslider-last"),this._addClass("ui-rangeslider"),g.appendTo(j),h.appendTo(j),d.insertBefore(this.element),i.prependTo(h),a.extend(this,{_inputFirst:b,_inputLast:c,_sliderFirst:g,_sliderLast:h,_label:d,_targetVal:null,_sliderTarget:!1,_sliders:j,_proxy:!1}),this.refresh(),this._on(this.element.find("input.ui-slider-input"),{slidebeforestart:"_slidebeforestart",slidestop:"_slidestop",slidedrag:"_slidedrag",slidebeforechange:"_change",blur:"_change",keyup:"_change"}),this._on({mousedown:"_change"}),this._on(this.element.closest("form"),{reset:"_handleReset"}),this._on(i,{vmousedown:"_dragFirstHandle"})},_handleReset:function(){var a=this;setTimeout(function(){a._updateHighlight()},0)},_dragFirstHandle:function(b){return a.data(this._inputFirst.get(0),"mobile-slider").dragging=!0,a.data(this._inputFirst.get(0),"mobile-slider").refresh(b),a.data(this._inputFirst.get(0),"mobile-slider")._trigger("start"),!1},_slidedrag:function(b){var c=a(b.target).is(this._inputFirst),d=c?this._inputLast:this._inputFirst;return this._sliderTarget=!1,"first"===this._proxy&&c||"last"===this._proxy&&!c?(a.data(d.get(0),"mobile-slider").dragging=!0,a.data(d.get(0),"mobile-slider").refresh(b),!1):void 0},_slidestop:function(b){var c=a(b.target).is(this._inputFirst);this._proxy=!1,this.element.find("input").trigger("vmouseup"),this._sliderFirst.css("z-index",c?1:"")},_slidebeforestart:function(b){this._sliderTarget=!1,a(b.originalEvent.target).hasClass("ui-slider-track")&&(this._sliderTarget=!0,this._targetVal=a(b.target).val())},_setOptions:function(a){a.theme!==d&&this._setTheme(a.theme),a.trackTheme!==d&&this._setTrackTheme(a.trackTheme),a.disabled!==d&&this._setDisabled(a.disabled),this._super(a),this.refresh()},refresh:function(){var a=this.element,b=this.options;(this._inputFirst.is(":disabled")||this._inputLast.is(":disabled"))&&(this.options.disabled=!0),a.find("input").slider({theme:b.theme,trackTheme:b.trackTheme,disabled:b.disabled}).slider("refresh"),this._updateHighlight()},_change:function(b){if("keyup"===b.type)return this._updateHighlight(),!1;var c=this,d=parseFloat(this._inputFirst.val(),10),e=parseFloat(this._inputLast.val(),10),f=a(b.target).hasClass("ui-rangeslider-first"),g=f?this._inputFirst:this._inputLast,h=f?this._inputLast:this._inputFirst;if(this._inputFirst.val()>this._inputLast.val()&&"mousedown"===b.type&&!a(b.target).hasClass("ui-slider-handle"))g.blur();else if("mousedown"===b.type)return;return d>e&&!this._sliderTarget?(g.val(f?e:d).slider("refresh"),this._trigger("normalize")):d>e&&(g.val(this._targetVal).slider("refresh"),setTimeout(function(){h.val(f?d:e).slider("refresh"),a.data(h.get(0),"mobile-slider").handle.focus(),c._sliderFirst.css("z-index",f?"":1),c._trigger("normalize")},0),this._proxy=f?"first":"last"),d===e?(a.data(g.get(0),"mobile-slider").handle.css("z-index",1),a.data(h.get(0),"mobile-slider").handle.css("z-index",0)):(a.data(h.get(0),"mobile-slider").handle.css("z-index",""),a.data(g.get(0),"mobile-slider").handle.css("z-index","")),this._updateHighlight(),d>e?!1:void 0},_themeElements:function(){return[{element:this.element.find(".ui-slider-track"),prefix:"ui-bar-"}]},_updateHighlight:function(){var b=parseInt(a.data(this._inputFirst.get(0),"mobile-slider").handle.get(0).style.left,10),c=parseInt(a.data(this._inputLast.get(0),"mobile-slider").handle.get(0).style.left,10),d=c-b;this.element.find(".ui-slider-bg").css({"margin-left":b+"%",width:d+"%"})},_setTheme:function(a){this._inputFirst.slider("option","theme",a),this._inputLast.slider("option","theme",a)},_setTrackTheme:function(a){this._inputFirst.slider("option","trackTheme",a),this._inputLast.slider("option","trackTheme",a)},_setDisabled:function(a){this._inputFirst.prop("disabled",a),this._inputLast.prop("disabled",a)},_destroy:function(){this._label.prependTo(this.element),this._inputFirst.after(this._sliderFirst),this._inputLast.after(this._sliderLast),this._sliders.remove(),this.element.find("input").slider("destroy")}},a.mobile.behaviors.formReset)),a.widget("mobile.rangeslider",a.mobile.rangeslider,a.mobile.widget.theme)}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/rangeslider.backcompat",["jquery","../widget.backcompat","./rangeslider"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("mobile.rangeslider",a.mobile.rangeslider,{options:{corners:!0,mini:!1,highlight:!0},classProp:"ui-rangeslider",_create:function(){this._super(),this.element.find("input").slider({mini:this.options.mini,highlight:this.options.highlight}).slider("refresh"),this._updateHighlight(),this.options.mini&&(this._addClass("ui-mini",null),this._addClass(this._sliderFirst,"ui-mini",null),this._addClass(this._sliderLast,"ui-mini",null))}}),a.widget("mobile.rangeslider",a.mobile.rangeslider,a.mobile.widget.backcompat)),a.mobile.rangeslider}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/textinput.backcompat",["jquery","../widget.backcompat","./textinput"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("mobile.textinput",a.mobile.textinput,{initSelector:"input[type='text'],input[type='search'],:jqmData(type='search'),input[type='number']:not(:jqmData(type='range')),:jqmData(type='number'),input[type='password'],input[type='email'],input[type='url'],input[type='tel'],textarea,input[type='time'],input[type='date'],input[type='month'],input[type='week'],input[type='datetime'],input[type='datetime-local'],input[type='color'],input:not([type]),input[type='file']",options:{corners:!0,mini:!1,wrapperClass:null},classProp:"ui-textinput"}),a.widget("mobile.textinput",a.mobile.textinput,a.mobile.widget.backcompat)),a.mobile.textinput}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/clearButton",["jquery","./textinput"],b):b(a)}(function(a){return a.widget("mobile.textinput",a.mobile.textinput,{options:{classes:{"ui-textinput-clear-button":"ui-corner-all"},clearBtn:!1,clearBtnText:"Clear text"},_create:function(){this._super(),this.isSearch&&(this.options.clearBtn=!0),this.options.clearBtn&&!this.isTextarea&&(this.options.enhanced?(this._clearButton=this._outer.children(".ui-textinput-clear-button"),this._clearButtonIcon=this._clearButton.children(".ui-textinput-clear-button-icon"),this._toggleClasses(!0),this._bindClearEvents()):this._addClearButton())},_clearButtonClick:function(a){this.element.val("").focus().trigger("change"),a.preventDefault()},_toggleClasses:function(a){this._toggleClass(this._outer,"ui-textinput-has-clear-button",null,a),this._toggleClass(this._clearButton,"ui-textinput-clear-button","ui-button ui-button-icon-only ui-button-right",a),this._toggleClass(this._clearButtonIcon,"ui-textinput-clear-button-icon","ui-icon-delete ui-icon",a),this._toggleClass("ui-textinput-hide-clear",null,a)},_addClearButton:function(){this._clearButtonIcon=a("<span>"),this._clearButton=a("<a href='#' tabindex='-1' aria-hidden='true'></a>").attr("title",this.options.clearBtnText).text(this.options.clearBtnText).append(this._clearButtonIcon),this._toggleClasses(!0),this._clearButton.appendTo(this._outer),this._bindClearEvents(),this._toggleClear()},_removeClearButton:function(){this._toggleClasses(!1),this._unbindClearEvents(),this._clearButton.remove(),clearTimeout(this._toggleClearDelay),delete this._toggleClearDelay},_bindClearEvents:function(){this._on(this._clearButton,{click:"_clearButtonClick"}),this._on({keyup:"_toggleClear",change:"_toggleClear",input:"_toggleClear",focus:"_toggleClear",blur:"_toggleClear",cut:"_toggleClear",paste:"_toggleClear"})},_unbindClearEvents:function(){this._off(this._clearButton,"click"),this._off(this.element,"keyup change input focus blur cut paste")},_setOptions:function(a){this._super(a),a.clearBtn===d||this.isTextarea||(a.clearBtn?this._addClearButton():this._removeClearButton()),a.clearBtnText!==d&&this._clearButton!==d&&this._clearButton.text(a.clearBtnText).attr("title",a.clearBtnText)},_toggleClear:function(){this._toggleClearDelay=this._delay("_toggleClearClass",0)},_toggleClearClass:function(){this._toggleClass(this._clearButton,"ui-textinput-clear-button-hidden",d,!this.element.val()),this._clearButton.attr("aria-hidden",!this.element.val()),delete this._toggleClearDelay},_destroy:function(){this._super(),!this.options.enhanced&&this._clearButton&&this._removeClearButton()}})}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/autogrow",["jquery","./textinput"],b):b(a)}(function(a){return a.widget("mobile.textinput",a.mobile.textinput,{options:{autogrow:!0,keyupTimeoutBuffer:100},_create:function(){this._super(),this.options.autogrow&&this.isTextarea&&this._autogrow()},_autogrow:function(){this._addClass("ui-textinput-autogrow"),this._on({keyup:"_timeout",change:"_timeout",input:"_timeout",paste:"_timeout"}),this._handleShow("create"),this._on(!0,this.document,{popupbeforeposition:"_handleShow",updatelayout:"_handleShow",panelopen:"_handleShow"})},_handleShow:function(b){("create"===b||a.contains(b.target,this.element[0])&&this.element.is(":visible"))&&("create"!==b&&"popupbeforeposition"!==b.type&&(this._addClass("ui-textinput-autogrow-resize"),this.element.animationComplete(a.proxy(function(){this._removeClass("ui-textinput-autogrow-resize")},this),"transition")),this._prepareHeightUpdate())},_unbindAutogrow:function(){this._removeClass("ui-textinput-autogrow"),this._off(this.element,"keyup change input paste"),this._off(this.document,"pageshow popupbeforeposition updatelayout panelopen")},keyupTimeout:null,_prepareHeightUpdate:function(a){this.keyupTimeout&&clearTimeout(this.keyupTimeout),a===d?this._updateHeight():this.keyupTimeout=this._delay("_updateHeight",a)},_timeout:function(){this._prepareHeightUpdate(this.options.keyupTimeoutBuffer)},_updateHeight:function(){var a,b,c,d,e,f,g,h,i,j=this.window.scrollTop();this.keyupTimeout=0,"onpage"in this.element[0]||this.element.css({height:0,"min-height":0,"max-height":0}),d=this.element[0].scrollHeight,e=this.element[0].clientHeight,f=parseFloat(this.element.css("border-top-width")),g=parseFloat(this.element.css("border-bottom-width")),h=f+g,i=d+h+15,0===e&&(a=parseFloat(this.element.css("padding-top")),b=parseFloat(this.element.css("padding-bottom")),c=a+b,i+=c),this.element.css({height:i,"min-height":"","max-height":""}),this.window.scrollTop(j)},refresh:function(){this.options.autogrow&&this.isTextarea&&this._updateHeight()},_setOptions:function(a){this._super(a),a.autogrow!==d&&this.isTextarea&&(a.autogrow?this._autogrow():this._unbindAutogrow())},_destroy:function(){this._unbindAutogrow(),this._super()}})}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/select",["jquery","jquery-ui/labels","../../core","../../widget","../../zoom","../../navigation/path","../widget.theme","jquery-ui/form-reset-mixin"],b):b(a)}(function(a){var c=a.widget("mobile.selectmenu",[{version:"@VERSION",options:{classes:{"ui-selectmenu-button":"ui-corner-all ui-shadow"},theme:"inherit",icon:"caret-d",iconpos:"right",nativeMenu:!0,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1},_button:function(){return a("<div/>")},_themeElements:function(){return[{element:this.button,prefix:"ui-button-"}]},_setDisabled:function(a){return this.element.prop("disabled",a),this.button.attr("aria-disabled",a),this._setOption("disabled",a)},_focusButton:function(){var a=this;setTimeout(function(){a.button.focus()},40)},_selectOptions:function(){return this.element.find("option")},_preExtension:function(){var b="";this.element=this.element,this.selectWrapper=a("<div>"),this._addClass(this.selectWrapper,"ui-selectmenu",b),this.selectWrapper.insertBefore(this.element),this.element.detach(),this.selectId=this.element.attr("id")||"select-"+this.uuid,this.buttonId=this.selectId+"-button",this.isMultiple=this.element[0].multiple,this.element.appendTo(this.selectWrapper),this.label=this.element.labels().first()},_destroy:function(){this.selectWrapper.length>0&&(this.element.insertAfter(this.selectWrapper),this.selectWrapper.remove()),this._unbindFormResetHandler()},_create:function(){var c=this.options,d=c.icon?c.iconpos||this.element.attr("data-"+this._ns()+"iconpos"):!1;this._preExtension(),this.button=this._button(),this.button.attr("id",this.buttonId),this._addClass(this.button,"ui-selectmenu-button","ui-button"),this.button.insertBefore(this.element),this.options.icon&&(this.icon=a("<span>"),this._addClass(this.icon,"ui-selectmenu-button-icon","ui-icon-"+c.icon+" ui-icon ui-widget-icon-float"+("right"===d?"end":"beginning")),this.button.prepend(this.icon)),this.setButtonText(),c.nativeMenu&&b.opera&&b.opera.version&&this._addClass(this.button,"ui-selectmenu-nativeonly"),this.isMultiple&&(this.buttonCount=a("<span>").hide(),this._addClass(this.buttonCount,"ui-selectmenu-count-bubble","ui-listview-item-count-bubble ui-body-inherit"),this._addClass(this.button,null,"ui-listview-item-has-count"),this.buttonCount.appendTo(this.button)),(c.disabled||this.element.prop("disabled"))&&this.disable(),this._on(this.element,{change:"refresh"}),this._bindFormResetHandler(),this._on(this.button,{keydown:"_handleKeydown"}),this.build()},build:function(){var b=this;this.element.appendTo(b.button).bind("vmousedown",function(){b.button.addClass("ui-button-active")}).bind("focus",function(){b.button.addClass("ui-focus")}).bind("blur",function(){b.button.removeClass("ui-focus")}).bind("focus vmouseover",function(){b.button.trigger("vmouseover")}).bind("vmousemove",function(){b.button.removeClass("ui-button-active")}).bind("change blur vmouseout",function(){b.button.trigger("vmouseout").removeClass("ui-button-active")}),b.button.bind("vmousedown",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.label.bind("click focus",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.element.bind("focus",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.button.bind("mouseup",function(){b.options.preventFocusZoom&&setTimeout(function(){a.mobile.zoom.enable(!0)},0)}),b.element.bind("blur",function(){b.options.preventFocusZoom&&a.mobile.zoom.enable(!0)})},selected:function(){return this._selectOptions().filter(":selected")},selectedIndices:function(){var a=this;return this.selected().map(function(){return a._selectOptions().index(this)}).get()},setButtonText:function(){var b=this,c=this.selected(),d=this.placeholder,e=a("<span>");this.button.children("span").not(".ui-selectmenu-count-bubble,.ui-selectmenu-button-icon").remove().end().end().append(function(){return c.length&&(d=c.map(function(){return a(this).text()}).get().join(", ")),d?e.text(d):e.html("&#160;"),e.attr("aria-hidden","true"),b._addClass(e,"ui-selectmenu-button-text",[b.element.attr("class"),c.attr("class")].join(" ")),b._removeClass(e,null,"ui-screen-hidden"),e}())},setButtonCount:function(){var a=this.selected();this.isMultiple&&this.buttonCount[a.length>1?"show":"hide"]().text(a.length)},_handleKeydown:function(){this._delay("_refreshButton")},_refreshButton:function(){this.setButtonText(),this.setButtonCount()},refresh:function(){this._refreshButton()},open:a.noop,close:a.noop,disable:function(){this._setDisabled(!0),this.button.addClass("ui-state-disabled")},enable:function(){this._setDisabled(!1),this.button.removeClass("ui-state-disabled")}},a.ui.formResetMixin]);return a.widget("mobile.selectmenu",c,a.mobile.widget.theme)}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/select.backcompat",["jquery","../widget.backcompat","./select"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("mobile.selectmenu",a.mobile.selectmenu,{options:{inline:!1,corners:!0,shadow:!0,mini:!1},initSelector:"select:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",classProp:"ui-selectmenu-button"}),a.widget("mobile.selectmenu",a.mobile.selectmenu,a.mobile.widget.backcompat)),a.mobile.selectmenu}),function(b){"function"==typeof define&&define.amd?define("widgets/toolbar",["jquery","../widget","../core","../navigation","./widget.theme","../zoom"],b):b(a)}(function(a){return a.widget("mobile.toolbar",{version:"@VERSION",options:{theme:"inherit",addBackBtn:!1,backBtnTheme:null,backBtnText:"Back",type:"toolbar",ariaRole:null},_create:function(){var b,c,d=this.options.type,e=this.element.closest(".ui-page"),f=null===this.options.ariaRole?"header"===d?"banner":"footer"===d?"contentinfo":"toolbar":this.options.ariaRole;0===e.length&&(e=!1,this._on(this.document,{pageshow:"refresh"})),a.extend(this,{role:d,page:e,leftbutton:b,rightbutton:c}),this.element.attr("role",f),this._addClass("ui-toolbar"+("toolbar"!==d?"-"+d:"")),this.refresh(),this._setOptions(this.options)},_setOptions:function(a){a.addBackBtn&&this._updateBackButton(),a.backBtnText!==d&&this.element.find(".ui-toolbar-back-button .ui-button-text").text(a.backBtnText),this._super(a)},refresh:function(){this.page||(this._setRelative(),"footer"===this.role?this.element.appendTo("body"):"header"===this.role&&this._updateBackButton()),this._addHeadingClasses()},_setRelative:function(){a("[data-"+a.mobile.ns+"role='page']").css({position:"relative"})},_updateBackButton:function(){var b,c=this.options,d=c.backBtnTheme||c.theme;b=this._backButton=this._backButton||{},this.options.addBackBtn&&"header"===this.role&&a(".ui-page").length>1&&(this.page?this.page[0].getAttribute("data-"+a.mobile.ns+"url")!==a.mobile.path.stripHash(location.hash):a.mobile.navigate&&a.mobile.navigate.history&&a.mobile.navigate.history.activeIndex>0)&&!this.leftbutton?b.attached||(this.backButton=b.element=(b.element||a("<a role='button' href='#' class='ui-button ui-corner-all ui-shadow ui-toolbar-header-button-left "+(d?"ui-button-"+d+" ":"")+"ui-toolbar-back-button ui-icon-carat-l ui-icon-beginning' data-"+a.mobile.ns+"rel='back'>"+c.backBtnText+"</a>")).prependTo(this.element),b.attached=!0):b.element&&(b.element.detach(),b.attached=!1)},_addHeadingClasses:function(){this.headerElements=this.element.children("h1, h2, h3, h4, h5, h6"),this._addClass(this.headerElements,"ui-toolbar-title"),this.headerElements.attr({role:"heading","aria-level":"1"})},_destroy:function(){var a;this.headerElements.removeAttr("role aria-level"),"header"===this.role&&this.backButton&&this.backButton.remove(),a=this.options.theme?this.options.theme:"inherit",this.element.removeAttr("role")},_themeElements:function(){var a=[{element:this.element,prefix:"ui-bar-"}];return this.options.addBackBtn&&this.backButton!==d&&a.push({element:this.backButton,prefix:"ui-button-",option:"backBtnTheme"}),a}}),a.widget("mobile.toolbar",a.mobile.toolbar,a.mobile.widget.theme)}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/select.custom",["jquery","../../core","../../navigation","./select","../toolbar","../listview","../page.dialog.backcompat","../popup"],b):b(a)}(function(a){var b=".ui-disabled,.ui-state-disabled,.ui-listview-item-divider,.ui-screen-hidden";return a.widget("mobile.selectmenu",a.mobile.selectmenu,{options:{classes:{"ui-selectmenu-custom-header-close-button":"ui-corner-all"},overlayTheme:null,dividerTheme:null,hidePlaceholderMenuItems:!0,closeText:"Close"},_ns:function(){return"ui-"},_create:function(){var a=this.options;return this._origTabIndex=this.element.attr("tabindex")===d?!1:this.element.attr("tabindex"),a.nativeMenu=a.nativeMenu||this.element.closest("[data-"+this._ns()+"role='popup'],:mobile-popup").length>0,this._super()},_handleSelectFocus:function(){this.element.blur(),this.button.focus()},_handleKeydown:function(a){this._super(a),this._handleButtonVclickKeydown(a)},_handleButtonVclickKeydown:function(b){this.options.disabled||this.isOpen||this.options.nativeMenu||("vclick"===b.type||b.keyCode&&(b.keyCode===a.ui.keyCode.ENTER||b.keyCode===a.ui.keyCode.SPACE))&&(this._decideFormat(),"overlay"===this.menuType?this.button.attr("href","#"+this.popupId).attr("data-"+this._ns()+"rel","popup"):this.button.attr("href","#"+this.dialogId).attr("data-"+this._ns()+"rel","dialog"),this.isOpen=!0)},_handleListFocus:function(b){var c="focusin"===b.type?{tabindex:"0",event:"vmouseover"}:{tabindex:"-1",event:"vmouseout"};a(b.target).attr("tabindex",c.tabindex).trigger(c.event)},_goToAdjacentItem:function(a,c,d){var e=a[d+"All"]().not(b+",[data-"+this._ns()+"role='placeholder']").first();e.length&&(c.blur().attr("tabindex","-1"),e.find("a").first().focus())},_handleListKeydown:function(b){var c=a(b.target),d=c.closest("li");switch(b.keyCode){case 38:return this._goToAdjacentItem(d,c,"prev"),!1;case 40:return this._goToAdjacentItem(d,c,"next"),!1;case 13:case 32:return c.trigger("click"),!1}},_handleBeforeTransition:function(b,c){var d;c&&c.prevPage&&c.prevPage[0]===this.menuPage[0]&&(d=a.proxy(function(){this._delay(function(){this._focusButton()})},this),c.options&&c.options.transition&&"none"!==c.options.transition?c.prevPage.animationComplete(d):d())},_handleHeaderCloseClick:function(){return"overlay"===this.menuType?(this.close(),!1):void 0},_handleListItemClick:function(b){var c,d=a(b.target).closest("li"),e=this.element[0].selectedIndex,f=a.mobile.getAttribute(d,"option-index"),g=this._selectOptions().eq(f)[0];g.selected=this.isMultiple?!g.selected:!0,this.isMultiple&&(c=d.find("a"),this._toggleClass(c,null,"ui-checkbox-on",g.selected),this._toggleClass(c,null,"ui-checkbox-off",!g.selected)),this.isMultiple||e===f||(this._triggerChange=!0),this.isMultiple?(this.element.trigger("change"),this.list.find("li:not(.ui-listview-item-divider)").eq(f).find("a").first().focus()):this.close(),b.preventDefault()},build:function(){if(this.options.nativeMenu)return this._super();var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w=this.options;return b=this.selectId,c=b+"-listbox",d=b+"-dialog",e=this.label,f=this.element.closest(".ui-page"),g=this.element[0].multiple,h=b+"-menu",i=w.theme?" data-"+this._ns()+"theme='"+w.theme+"'":"",j=w.overlayTheme||w.theme||null,k=j?" data-"+this._ns()+"overlay-theme='"+j+"'":"",l=w.dividerTheme&&this.element.children("optgroup").length>0?" data-"+this._ns()+"divider-theme='"+w.dividerTheme+"'":"",m=a("<div data-"+this._ns()+"role='page' data-"+this._ns()+"dialog='true'><div></div></div>").attr("id",d),s=m.children(),n=a("<div data-"+this._ns()+"type='header'><h1></h1></div>").prependTo(m),o=a("<div></div>").attr("id",c).insertAfter(this.element).popup(),p=a("<ul role='listbox' aria-labelledby='"+this.buttonId+"'"+i+l+"></ul>").attr("id",h).appendTo(o),q=a("<div>").prependTo(o),r=a("<h1></h1>").appendTo(q),m.page(),n.add(q).toolbar({type:"header"}),this._addClass(m,"ui-selectmenu-custom"),this._addClass(s,null,"ui-content"),this._addClass(o,null,"ui-selectmenu-custom"),this._addClass(p,null,"ui-selectmenu-custom-list"),this.isMultiple&&(u=a("<a>",{role:"button",href:"#"}),v=a("<span>"),this._addClass(v,"ui-selectmenu-custom-header-close-button-icon","ui-icon ui-icon-delete"),u.append(v),this._addClass(u,"ui-selectmenu-custom-header-close-button","ui-button ui-toolbar-header-button-left ui-button-icon-only"),u.appendTo(q)),a.extend(this,{selectId:b,menuId:h,popupId:c,dialogId:d,thisPage:f,menuPage:m,menuPageHeader:n,label:e,isMultiple:g,theme:w.theme,listbox:o,list:p,header:q,headerTitle:r,headerClose:u,menuPageContent:s,menuPageClose:t,placeholder:""}),this.refresh(),this.element.attr("tabindex","-1"),this._on(this.element,{focus:"_handleSelectFocus"}),this._on(this.button,{vclick:"_handleButtonVclickKeydown"}),this.list.attr("role","listbox"),this._on(this.list,{focusin:"_handleListFocus",focusout:"_handleListFocus",keydown:"_handleListKeydown","click li:not(.ui-disabled,.ui-state-disabled,.ui-listview-item-divider)":"_handleListItemClick"}),this._on(this.listbox,{popupafterclose:"_popupClosed"}),this.isMultiple&&this._on(this.headerClose,{click:"_handleHeaderCloseClick"}),this._on(this.document,{pagecontainerbeforetransition:"_handleBeforeTransition"}),this},_popupClosed:function(){this.close(),this._delayedTrigger()},_delayedTrigger:function(){this._triggerChange&&this.element.trigger("change"),this._triggerChange=!1},_isRebuildRequired:function(){var a=this.list.find("li"),b=this._selectOptions().not(".ui-screen-hidden");return b.text()!==a.text()},selected:function(){return this._selectOptions().filter(":selected:not( [data-"+this._ns()+"placeholder='true'] )")},refresh:function(b){var c,d;return this.options.nativeMenu?this._super(b):((b||this._isRebuildRequired())&&this._buildList(),c=this.selectedIndices(),this.setButtonText(),this.setButtonCount(),d=this.list.find("li:not(.ui-listview-item-divider)"),this._removeClass(d.find("a"),null,"ui-button-active"),d.attr("aria-selected",!1),void d.each(a.proxy(function(b,d){var e,f=a(d);a.inArray(b,c)>-1?(f.attr("aria-selected",!0),this.isMultiple?(e=f.find("a"),this._removeClass(e,null,"ui-checkbox-off"),this._addClass(e,null,"ui-checkbox-on")):f.hasClass("ui-screen-hidden")?this._addClass(f.next().find("a"),null,"ui-button-active"):this._addClass(f.find("a"),null,"ui-button-active")):this.isMultiple&&(e=f.find("a"),this._removeClass(e,null,"ui-checkbox-on"),this._addClass(e,null,"ui-checkbox-off"))},this)))},close:function(){!this.options.disabled&&this.isOpen&&("page"===this.menuType?this.menuPage.hasClass("ui-page-active")&&a.mobile.back():this.listbox.popup("close"),this._focusButton(),this.isOpen=!1)},open:function(){this.button.click()},_focusMenuItem:function(){var a=this.list.find("a.ui-button-active");0===a.length&&(a=this.list.find("li:not("+b+",[data-"+this._ns()+"role='placeholder'] ) a.ui-button")),a.first().focus()},_setTheme:function(a,b){this.listbox.popup("option",a,b),"inherit"!==b&&this.menuPage.page("option",a,b),"theme"===a&&(this.header.toolbar("option",a,b),this.menuPageHeader.toolbar("option",a,b))},_setOption:function(a,b){return this.options.nativeMenu||"theme"!==a&&"overlayTheme"!==a||this._setTheme(a,b),"hidePlaceholderMenuItems"===a?(this._superApply(arguments),void this.refresh(!0)):("closeText"===a&&this.headerClose.text(b),this._superApply(arguments))},_decideFormat:function(){var b,c=this.window,d=this.list.parent(),e=d.outerHeight(),f=c.scrollTop(),g=this.button.offset().top,h=c.height();e>h-80||!a.support.scrollTop?(this.menuPage.appendTo(this.element.closest(".ui-pagecontainer")),this.menuPageClose=this.menuPage.find(".ui-toolbar-header a"),b=this.thisPage.page("instance"),b._off(b.document,"pagecontainerhide"),0===f&&g>h&&this.thisPage.one("pagehide",function(){a(this).data(a.camelCase(this._ns()+"lastScroll"),g)}),this._on(this.document,{pagecontainershow:"_handlePageContainerShow",pagecontainerhide:"_handlePageContainerHide"}),this.menuType="page",this.menuPageContent.append(this.list),this.menuPage.find("div .ui-toolbar-title").text(this.label.getEncodedText()||this.placeholder)):(this.menuType="overlay",this.listbox.one({popupafteropen:a.proxy(this,"_focusMenuItem")})),this._setTheme("theme",this.options.theme),this._setTheme("overlayTheme",this.options.overlayTheme)},_handlePageContainerShow:function(a,b){b.toPage[0]===this.menuPage[0]&&(this._off(this.document,"pagecontainershow"),this._focusMenuItem())},_handlePageContainerHide:function(a,b){b.prevPage[0]===this.menuPage[0]&&(this._off(this.document,"pagecontainershow"),this._delayedTrigger(),this.thisPage.page("bindRemove"),this.menuPage.detach(),this.list.appendTo(this.listbox),this.close())},_buildList:function(){var b,d,e,f,g,h,i,j,k,l,m,n,o,p,q=this.options,r=this.placeholder,s=!0,t="false",u="data-"+this._ns(),v=u+"option-index",w=u+"icon",x=u+"role",y=u+"placeholder",z=c.createDocumentFragment(),A=!1;for(this.list.empty().filter(".ui-listview").listview("destroy"),b=this._selectOptions(),d=b.length,e=this.element[0],g=0;d>g;g++,A=!1)h=b[g],i=a(h),i.hasClass("ui-screen-hidden")||(j=h.parentNode,m=[],k=i.text(),l=c.createElement("a"),l.setAttribute("href","#"),l.appendChild(c.createTextNode(k)),j!==e&&"optgroup"===j.nodeName.toLowerCase()&&(n=j.getAttribute("label"),n!==f&&(o=c.createElement("li"),o.setAttribute(x,"list-divider"),o.setAttribute("role","option"),o.setAttribute("tabindex","-1"),o.appendChild(c.createTextNode(n)),z.appendChild(o),f=n)),!s||h.getAttribute("value")&&0!==k.length&&!i.data(a.camelCase(this._ns()+"placeholder"))||(s=!1,A=!0,null===h.getAttribute(y)&&(this._removePlaceholderAttr=!0),h.setAttribute(y,!0),q.hidePlaceholderMenuItems&&m.push("ui-screen-hidden"),r!==k&&(r=this.placeholder=k)),p=c.createElement("li"),h.disabled&&(m.push("ui-state-disabled"),p.setAttribute("aria-disabled",!0)),p.setAttribute(v,g),p.setAttribute(w,t),A&&p.setAttribute(y,!0),p.className=m.join(" "),p.setAttribute("role","option"),l.setAttribute("tabindex","-1"),this.isMultiple&&this._addClass(a(l),null,"ui-button ui-checkbox-off ui-icon-end"),p.appendChild(l),z.appendChild(p));this.list[0].appendChild(z),this.isMultiple||r.length?this.headerTitle.text(this.placeholder):this._addClass(this.header,null,"ui-screen-hidden"),this.list.listview()},_button:function(){var b={href:"#",role:"button",id:this.buttonId,"aria-haspopup":"true","aria-owns":this.menuId};return b["data-"+this._ns()+"transition"]="pop",this._origTabIndex&&(b.tabindex=this._origTabIndex),this.options.nativeMenu?this._super():a("<a>",b)},_destroy:function(){this.options.nativeMenu||(this.close(),this._origTabIndex!==d&&(this._origTabIndex!==!1?this.element.attr("tabindex",this._origTabIndex):this.element.removeAttr("tabindex")),this._removePlaceholderAttr&&this._selectOptions().removeAttr("data-"+this._ns()+"placeholder"),this.listbox.remove(),this.menuPage.remove()),this._super()}})}),function(b){"function"==typeof define&&define.amd?define("widgets/forms/select.custom.backcompat",["jquery","./select.custom"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&a.widget("mobile.selectmenu",a.mobile.selectmenu,{_ns:function(){return a.mobile.ns||""}}),a.mobile.selectmenu}),function(b){"function"==typeof define&&define.amd?define("widgets/controlgroup",["jquery","jquery-ui/widget","./widget.theme","jquery-ui/widgets/controlgroup"],b):b(a);
}(function(a){return a.widget("ui.controlgroup",a.ui.controlgroup,{options:{theme:"inherit"},_create:function(){this._super(),this._on(this.document,{pagecontainershow:function(b,c){a.contains(c.toPage[0],this.element[0])&&this.refresh()}})},container:function(){return this.element},_themeElements:function(){return[{element:this.widget(),prefix:"ui-group-theme-"}]}}),a.widget("ui.controlgroup",a.ui.controlgroup,a.mobile.widget.theme),a.ui.controlgroup}),function(b){"function"==typeof define&&define.amd?define("widgets/controlgroup.backcompat",["jquery","jquery-ui/widget","./widget.theme","jquery-ui/widgets/controlgroup","./controlgroup","./widget.backcompat"],b):b(a)}(function(a){return a.widget("ui.controlgroup",a.ui.controlgroup,{options:{shadow:!1,direction:"vertical",type:"vertical",mini:!1},_create:function(){this.options.direction!==a.ui.controlgroup.prototype.options.direction?this.options.type=this.options.direction:this.options.type!==a.ui.controlgroup.prototype.options.type&&this._setOption("direction",this.options.type),this._super()},classProp:"ui-controlgroup",_setOption:function(a,b){"direction"===a&&(this.options.type=b),"type"===a&&this._setOption("direction",b),this._superApply(arguments)}}),a.widget("ui.controlgroup",a.ui.controlgroup,a.mobile.widget.backcompat),a.ui.controlgroup}),function(b){"function"==typeof define&&define.amd?define("widgets/controlgroup.selectmenu",["jquery","./controlgroup"],b):b(a)}(function(a){var b=/ui-button-inline/g,c=/ui-shadow/g;return a.widget("ui.controlgroup",a.ui.controlgroup,{_selectmenuOptions:function(a){var b="vertical"===this.options.direction,c=b?"":"ui-button-inline";return{classes:{middle:{"ui-selectmenu":c,"ui-selectmenu-button":""},first:{"ui-selectmenu":c,"ui-selectmenu-button":"ui-corner-"+(b?"top":"left")},last:{"ui-selectmenu":c,"ui-selectmenu-button":"ui-corner-"+(b?"bottom":"right")},only:{"ui-selectmenu":c,"ui-selectmenu-button":"ui-corner-all"}}[a]}},_initWidgets:function(){this._superApply(arguments),this.childWidgets=this.childWidgets.map(function(){var d=a.data(this,"mobile-selectmenu");return d?(a.data(this.parentNode,"ui-controlgroup-data",a.data(this,"ui-controlgroup-data")),a.removeData(this,"ui-controlgroup-data"),d.option("classes.ui-selectmenu",d.option("classes.ui-selectmenu").replace(b,"").trim()),d.option("classes.ui-selectmenu-button",d.option("classes.ui-selectmenu-button").replace(c,"").trim()),this.parentNode):this})}})}),function(b){"function"==typeof define&&define.amd?define("widgets/fixedToolbar",["jquery","../widget","../core","../animationComplete","../navigation","./page","./toolbar","../zoom"],b):b(a)}(function(a){return a.widget("mobile.toolbar",a.mobile.toolbar,{options:{position:null,visibleOnPageShow:!0,disablePageZoom:!0,transition:"slide",fullscreen:!1,updatePagePadding:!0},_create:function(){this._super(),"fixed"===this.options.position&&(this.pagecontainer=this.element.closest(".ui-mobile-viewport"),this._makeFixed())},_makeFixed:function(){this._addClass("ui-toolbar-"+this.role+"-fixed"),this.updatePagePadding(),this._addTransitionClass(),this._bindPageEvents()},_setOptions:function(b){if("fixed"===b.position&&"fixed"!==this.options.position&&this._makeFixed(),"fixed"===this.options.position){var c=a(".ui-page-active"),e=this.page?this.page:c.length?c:a(".ui-page").eq(0);b.fullscreen!==d&&(b.fullscreen?(this._addClass("ui-toolbar-"+this.role+"-fullscreen"),this._addClass(e,"ui-toolbar-page-"+this.role+"-fullscreen")):(this._removeClass("ui-toolbar-"+this.role+"-fullscreen"),this._removeClass(e,"ui-toolbar-page-"+this.role+"-fullscreen"),this._addClass(e,"ui-toolbar-page-"+this.role+"-fixed")))}this._super(b)},_addTransitionClass:function(){var a=this.options.transition;a&&"none"!==a&&("slide"===a&&(a="header"===this.role?"slidedown":"slideup"),this._addClass(null,a))},_bindPageEvents:function(){var a=this.page?this.element.closest(".ui-page"):this.document;this._on(a,{pagebeforeshow:"_handlePageBeforeShow",webkitAnimationStart:"_handleAnimationStart",animationstart:"_handleAnimationStart",updatelayout:"_handleAnimationStart",pageshow:"_handlePageShow",pagebeforehide:"_handlePageBeforeHide"})},_handlePageBeforeShow:function(){var b=this.options;b.disablePageZoom&&a.mobile.zoom.disable(!0),b.visibleOnPageShow||this.hide(!0)},_handleAnimationStart:function(){this.options.updatePagePadding&&this.updatePagePadding(this.page?this.page:".ui-page-active")},_handlePageShow:function(){this.updatePagePadding(this.page?this.page:".ui-page-active"),this.options.updatePagePadding&&this._on(this.window,{throttledresize:"updatePagePadding"})},_handlePageBeforeHide:function(){this.options.disablePageZoom&&a.mobile.zoom.enable(!0),this.options.updatePagePadding&&this._off(this.window,"throttledresize")},_visible:!0,updatePagePadding:function(b){var c=this.element,e="header"===this.role,f=parseFloat(c.css(e?"top":"bottom"));this.options.fullscreen||(b=b&&b.type===d&&b||this.page||c.closest(".ui-page"),b=this.page?this.page:".ui-page-active",a(b).css("padding-"+(e?"top":"bottom"),c.outerHeight()+f))},_useTransition:function(c){var d=this.window,e=this.element,f=d.scrollTop(),g=e.height(),h=this.page?e.closest(".ui-page").height():a(".ui-page-active").height(),i=a(b).height();return!c&&(this.options.transition&&"none"!==this.options.transition&&("header"===this.role&&!this.options.fullscreen&&f>g||"footer"===this.role&&!this.options.fullscreen&&h-g>f+i)||this.options.fullscreen)},show:function(b){this._useTransition(b)?(this._animationInProgress="show",this._removeClass(null,"out"),this._removeClass("ui-toolbar-fixed-hidden"),this._addClass(null,"in"),this.element.animationComplete(a.proxy(function(){"show"===this._animationInProgress&&(this._animationInProgress=!1,this._removeClass(null,"in"))},this))):this._removeClass("ui-toolbar-fixed-hidden"),this._visible=!0},hide:function(b){var c="slide"===this.options.transition?" reverse":"";this._useTransition(b)?(this._animationInProgress="hide",this._addClass(null,"out"),this._addClass(null,c),this._removeClass(null,"in"),this.element.animationComplete(a.proxy(function(){"hide"===this._animationInProgress&&(this._animationInProgress=!1,this._addClass("ui-toolbar-fixed-hidden"),this._removeClass(null,"out"),this._removeClass(null,c))},this))):this._addClass("ui-toolbar-fixed-hidden")._removeClass(null,c),this._visible=!1},toggle:function(){this[this._visible?"hide":"show"]()},_setRelative:function(){"fixed"!==this.options.position&&this._super()},_destroy:function(){var b,c,d,e,f,g=this.pagecontainer.pagecontainer("getActivePage");this._super(),"fixed"===this.options.position&&(d=a("body>.ui-"+this.role+"-fixed").add(g.find(".ui-"+this.role+"-fixed")).not(this.element).length>0,f=a("body>.ui-"+this.role+"-fixed").add(g.find(".ui-"+this.role+"-fullscreen")).not(this.element).length>0,c="ui-header-fixed ui-footer-fixed ui-header-fullscreen in out ui-footer-fullscreen fade slidedown slideup ui-fixed-hidden",this._removeClass(c),f||(b="ui-page-"+this.role+"-fullscreen"),d||(e="header"===this.role,b+=" ui-page-"+this.role+"-fixed",g.css("padding-"+(e?"top":"bottom"),"")),this._removeClass(g,b))}})}),function(b){"function"==typeof define&&define.amd?define("widgets/fixedToolbar.backcompat",["jquery","./fixedToolbar"],b):b(a)}(function(a){return a.mobileBackcompat!==!1?a.widget("mobile.toolbar",a.mobile.toolbar,{options:{hideDuringFocus:"input, textarea, select",tapToggle:!0,supportBlacklist:function(){return a.noop}},_hideDuringFocusData:{delayShow:0,delayHide:0,isVisible:!0},_handlePageFocusinFocusout:function(b){var c=this._hideDuringFocusData;this.options.hideDuringFocus&&screen.width<1025&&a(b.target).is(this.options.hideDuringFocus)&&!a(b.target).closest(".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed").length&&("focusout"!==b.type||c.isVisible?"focusin"===b.type&&c.isVisible&&(clearTimeout(c.delayShow),c.isVisible=!1,c.delayHide=this._delay("hide",0)):(c.isVisible=!0,clearTimeout(c.delayHide),c.delayShow=this._delay("show",0)))},_attachToggleHandlersToPage:function(a){return this._on(a,{focusin:"_handlePageFocusinFocusout",focusout:"_handlePageFocusinFocusout"}),this._superApply(arguments)},_makeFixed:function(){this._super(),this._workarounds()},_workarounds:function(){var a=navigator.userAgent,b=a.match(/AppleWebKit\/([0-9]+)/),c=!!b&&b[1],d=null,e=this;a.indexOf("Android")>-1&&(d="android","android"===d&&c&&534>c&&(e._bindScrollWorkaround(),e._bindListThumbWorkaround()))},_viewportOffset:function(){var a=this.element,b=a.hasClass("ui-toolbar-header"),c=Math.abs(a.offset().top-this.window.scrollTop());return b||(c=Math.round(c-this.window.height()+a.outerHeight())-60),c},_bindScrollWorkaround:function(){var a=this;this._on(this.window,{scrollstop:function(){var b=a._viewportOffset();b>2&&a._visible&&a._triggerRedraw()}})},_bindListThumbWorkaround:function(){var b=a(".ui-page-active"),c=this.page?this.page:b.length?b:a(".ui-page").eq(0);this._addClass(c,"ui-toolbar-android-2x-fix")},_triggerRedraw:function(){var b=parseFloat(a(".ui-page-active").css("padding-bottom"));a(".ui-page-active").css("padding-bottom",b+1+"px"),setTimeout(function(){a(".ui-page-active").css("padding-bottom",b+"px")},0)},destroy:function(){this._super();var b=a(".ui-page-active"),c=this.page?this.page:b.length?b:a(".ui-page").eq(0);this._removeClass(c,"ui-toolbar-android-2x-fix")}}):void 0}),function(b){"function"==typeof define&&define.amd?define("widgets/popup.backcompat",["jquery","./widget.backcompat","./popup"],b):b(a)}(function(a){return a.mobileBackcompat!==!1&&(a.widget("mobile.popup",a.mobile.popup,{options:{wrapperClass:null,closeLinkSelector:"a:jqmData(rel='back')",shadow:!0,corners:!0},classProp:"ui-popup"}),a.widget("mobile.popup",a.mobile.popup,a.mobile.widget.backcompat),a.mobile.popup.prototype._boolOptions.shadow="ui-overlay-shadow"),a.mobile.popup}),function(b){"function"==typeof define&&define.amd?define("widgets/popup.arrow",["jquery","./popup"],b):b(a)}(function(a){return a.widget("mobile.popup",a.mobile.popup,{options:{classes:{"ui-popup-arrow":"ui-overlay-shadow"},arrow:""},_create:function(){var a,b=this._superApply(arguments);return this.options.arrow&&(this.options.enhanced?(a={gd:this.element.children(".ui-popup-arrow-guide"),ct:this.element.children(".ui-popup-arrow-container")},a.ar=a.ct.children(".ui-popup-arrow"),a.arEls=a.ct.add(a.gd),this._addArrowClasses(a)):a=this._addArrow(),this._ui.arrow=a),b},_addArrowClasses:function(b){this._addClass(b.gd,"ui-popup-arrow-guide"),this._addClass(b.ct,"ui-popup-arrow-container",a.mobile.browser.oldIE&&a.mobile.browser.oldIE<=8?"ie":""),this._addClass(b.ar,"ui-popup-arrow","ui-body-inherit")},_addArrow:function(){var b=this.document[0].createElement("div"),c=this.document[0].createElement("div"),d=this.document[0].createElement("div"),e={arEls:a([b,d]),gd:a(d),ct:a(b),ar:a(c)};return b.appendChild(c),this._addArrowClasses(e),e.arEls.hide().appendTo(this.element),e},_unenhance:function(){var a=this._ui.arrow;return a&&a.arEls.remove(),this._super()},_tryAnArrow:function(a,b,c,d,e){var f,g,h,i={},j={};return d.arFull[a.dimKey]>d.guideDims[a.dimKey]?e:(i[a.fst]=c[a.fst]+(d.arHalf[a.oDimKey]+d.menuHalf[a.oDimKey])*a.offsetFactor-d.contentBox[a.fst]+(d.clampInfo.menuSize[a.oDimKey]-d.contentBox[a.oDimKey])*a.arrowOffsetFactor,i[a.snd]=c[a.snd],f=d.result||this._calculateFinalLocation(i,d.clampInfo),g={x:f.left,y:f.top},j[a.fst]=g[a.fst]+d.contentBox[a.fst]+a.tipOffset,j[a.snd]=Math.max(f[a.prop]+d.guideOffset[a.prop]+d.arHalf[a.dimKey],Math.min(f[a.prop]+d.guideOffset[a.prop]+d.guideDims[a.dimKey]-d.arHalf[a.dimKey],c[a.snd])),h=Math.abs(c.x-j.x)+Math.abs(c.y-j.y),(!e||h<e.diff)&&(j[a.snd]-=d.arHalf[a.dimKey]+f[a.prop]+d.contentBox[a.snd],e={dir:b,diff:h,result:f,posProp:a.prop,posVal:j[a.snd]}),e)},_getPlacementState:function(a){var b,c,d=this._ui.arrow,e={clampInfo:this._clampPopupWidth(!a),arFull:{cx:d.ct.width(),cy:d.ct.height()},guideDims:{cx:d.gd.width(),cy:d.gd.height()},guideOffset:d.gd.offset()};return b=this.element.offset(),d.gd.css({left:0,top:0,right:0,bottom:0}),c=d.gd.offset(),e.contentBox={x:c.left-b.left,y:c.top-b.top,cx:d.gd.width(),cy:d.gd.height()},d.gd.removeAttr("style"),e.guideOffset={left:e.guideOffset.left-b.left,top:e.guideOffset.top-b.top},e.arHalf={cx:e.arFull.cx/2,cy:e.arFull.cy/2},e.menuHalf={cx:e.clampInfo.menuSize.cx/2,cy:e.clampInfo.menuSize.cy/2},e},_placementCoords:function(b){var c,d,e,f=this.options.arrow,g=this._ui.arrow;return g?(g.arEls.show(),c=this._getPlacementState(!0),e={l:{fst:"x",snd:"y",prop:"top",dimKey:"cy",oDimKey:"cx",offsetFactor:1,tipOffset:-c.arHalf.cx,arrowOffsetFactor:0},r:{fst:"x",snd:"y",prop:"top",dimKey:"cy",oDimKey:"cx",offsetFactor:-1,tipOffset:c.arHalf.cx+c.contentBox.cx,arrowOffsetFactor:1},b:{fst:"y",snd:"x",prop:"left",dimKey:"cx",oDimKey:"cy",offsetFactor:-1,tipOffset:c.arHalf.cy+c.contentBox.cy,arrowOffsetFactor:1},t:{fst:"y",snd:"x",prop:"left",dimKey:"cx",oDimKey:"cy",offsetFactor:1,tipOffset:-c.arHalf.cy,arrowOffsetFactor:0}},a.each((f===!0?"l,t,r,b":f).split(","),a.proxy(function(a,f){d=this._tryAnArrow(e[f],f,b,c,d)},this)),d?(this._removeClass(g.ct,"ui-popup-arrow-l ui-popup-arrow-t ui-popup-arrow-r ui-popup-arrow-b")._addClass(g.ct,"ui-popup-arrow-"+d.dir),g.ct.removeAttr("style").css(d.posProp,d.posVal).show(),d.result):(g.arEls.hide(),this._super(b))):this._super(b)},_setOptions:function(a){var b=this._ui.arrow,c=this._super(a);if(a.arrow!==d){if(!b&&a.arrow)return void(this._ui.arrow=this._addArrow());b&&!a.arrow&&(b.arEls.remove(),delete this._ui.arrow)}return c},_destroy:function(){var a=this._ui.arrow;return a&&a.arEls.remove(),this._super()}})}),function(b){"function"==typeof define&&define.amd?define("widgets/popup.arrow.backcompat",["jquery","./popup.backcompat","./popup.arrow"],b):b(a)}(function(a){var b=/\bui-overlay-shadow\b/;return a.mobileBackcompat!==!1&&a.widget("mobile.popup",a.mobile.popup,{_setInitialOptions:function(){var b=this.options.classes;this._super(),b["ui-popup-arrow"]===a[this.namespace][this.widgetName].prototype.options.classes["ui-popup-arrow"]&&(b["ui-popup-arrow"]=this._getClassValue(b["ui-popup-arrow"],"ui-overlay-shadow",this.options.shadow))},_setOption:function(a,c){var d;return"classes"===a&&(d=c["ui-popup"].match(b),c["ui-popup-arrow"].match(b)!==d&&(c["ui-popup-arrow"]=this._getClassValue(c["ui-popup-arrow"],"ui-overlay-shadow",d))),this._superApply(arguments)}}),a.mobile.popup}),function(b){"function"==typeof define&&define.amd?define("widgets/panel",["jquery","../widget","./page"],b):b(a)}(function(a){return a.widget("mobile.panel",{version:"@VERSION",options:{classes:{},animate:!0,theme:null,position:"left",dismissible:!0,display:"reveal",swipeClose:!0,positionFixed:!1},_closeLink:null,_parentPage:null,_page:null,_modal:null,_panelInner:null,_wrapper:null,_fixedToolbars:null,_create:function(){var b=this.element,c=b.closest(".ui-page, :jqmData(role='page')");a.extend(this,{_closeLink:b.find(":jqmData(rel='close')"),_parentPage:c.length>0?c:!1,_openedPage:null,_page:this._getPage,_panelInner:this._getPanelInner(),_fixedToolbars:this._getFixedToolbars}),"overlay"!==this.options.display&&this._getWrapper(),this._addClass("ui-panel ui-panel-closed",this._getPanelClasses()),a.support.cssTransform3d&&this.options.animate&&this._addClass("ui-panel-animate"),this._bindUpdateLayout(),this._bindCloseEvents(),this._bindLinkListeners(),this._bindPageEvents(),this.options.dismissible&&this._createModal(),this._bindSwipeEvents(),this._superApply(arguments)},_safelyWrap:function(b,c,d){return d.length?(d.eq(0).before(c),c.append(d),d.parent()):a(c).appendTo(b)},_getPanelInner:function(){var b=this.element.find(".ui-panel-inner");return 0===b.length&&(b=a("<div>"),this._addClass(b,"ui-panel-inner"),b=this._safelyWrap(this.element,b,this.element.children())),b},_createModal:function(){var b=this,c=b._parentPage?b._parentPage.parent():b.element.parent();b._modal=a("<div>"),b._addClass(b._modal,"ui-panel-dismiss"),b._modal.on("mousedown",function(){b.close()}).appendTo(c)},_getPage:function(){var b=this._openedPage||this._parentPage||a(".ui-page-active");return b},_getWrapper:function(){var b,c=this._page().find(".ui-panel-wrapper");0===c.length&&(b=this._page(),c=a("<div>"),this._addClass(c,"ui-panel-wrapper"),c=this._safelyWrap(b,c,this._page().children(".ui-toolbar-header:not(.ui-toolbar-header-fixed), [data-"+a.mobile.ns+"role='toolbar'],.ui-content:not(.ui-popup),.ui-toolbar-footer:not(.ui-toolbar-footer-fixed)"))),this._wrapper=c},_getFixedToolbars:function(){var b=a("body").children(".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed"),c=this._page().find(".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed"),d=b.add(c);return this._addClass(d,"ui-panel-fixed-toolbar"),d},_getPosDisplayClasses:function(a){return a+"-position-"+this.options.position+" "+a+"-display-"+this.options.display},_getPanelClasses:function(){var a=this._getPosDisplayClasses("ui-panel")+" ui-body-"+(this.options.theme?this.options.theme:"inherit");return this.options.positionFixed&&(a+=" ui-panel-fixed"),a},_handleCloseClick:function(a){a.isDefaultPrevented()||this.close()},_bindCloseEvents:function(){this._on(this._closeLink,{click:"_handleCloseClick"}),this._on({"click a:jqmData(ajax='false')":"_handleCloseClick"})},_positionPanel:function(b){var c,d,e=this,f=e._panelInner.outerHeight(),g=f>this.window.height();g||!e.options.positionFixed?(g?(e._unfixPanel(),a.mobile.resetActivePageHeight(f)):this._parentPage||(c=this.element.outerHeight(!0),c<this.document.height()&&(d=this.element.outerHeight(),this.element.outerHeight(this.document.height()-(c-d)))),b!==!0||a.mobile.isElementCurrentlyVisible(".ui-content")||this.window[0].scrollTo(0,a.mobile.defaultHomeScroll)):e._fixPanel()},_bindFixListener:function(){this._on(this.window,{throttledresize:"_positionPanel"})},_unbindFixListener:function(){this._off(this.window,"throttledresize")},_unfixPanel:function(){this.options.positionFixed&&a.support.fixedPosition&&this._removeClass("ui-panel-fixed")},_fixPanel:function(){this.options.positionFixed&&a.support.fixedPosition&&this._addClass("ui-panel-fixed")},_bindUpdateLayout:function(){var a=this;a.element.on("updatelayout",function(){a._open&&a._positionPanel()})},_bindLinkListeners:function(){this._on("body",{"click a":"_handleClick"})},_handleClick:function(b){var c,e=this.element.attr("id"),f=this;b.currentTarget.href.split("#")[1]===e&&e!==d&&(b.preventDefault(),c=a(b.target),c.hasClass("ui-button")&&(this._addClass(c,null,"ui-button-active"),this.element.one("panelopen panelclose",function(){f._removeClass(c,null,"ui-button-active")})),this.toggle())},_handleSwipe:function(a){a.isDefaultPrevented()||this.close()},_bindSwipeEvents:function(){var a={};this.options.swipeClose&&(a["swipe"+this.options.position]="_handleSwipe",this._on(this._modal?this.element.add(this._modal):this.element,a))},_bindPageEvents:function(){var a=this;this.document.on("panelbeforeopen",function(b){a._open&&b.target!==a.element[0]&&a.close()}).on("keyup.panel",function(b){27===b.keyCode&&a._open&&a.close()}),this._parentPage||"overlay"===this.options.display||this._on(this.document,{pageshow:function(){this._openedPage=null,this._getWrapper()}}),a._parentPage?this.document.on("pagehide",":jqmData(role='page')",function(){a._open&&a.close(!0)}):this.document.on("pagebeforehide",function(){a._open&&a.close(!0)})},_open:!1,_pageContentOpenClasses:null,_modalOpenClasses:null,open:function(b){if(!this._open){var c=this,d=c.options,e=function(){c._open&&("overlay"!==d.display&&(c._addClass(c._wrapper,"ui-panel-page-content-open"),c._addClass(c._fixedToolbars(),"ui-panel-page-content-open")),c._bindFixListener(),c._trigger("open"),c._openedPage=c._page())},f=function(){c._off(c.document,"panelclose"),c._page().jqmData("panel","open"),a.support.cssTransform3d&&d.animate&&"overlay"!==d.display&&(c._addClass(c._wrapper,"ui-panel-animate"),c._addClass(c._fixedToolbars(),"ui-panel-animate")),!b&&a.support.cssTransform3d&&d.animate?(c._wrapper||c.element).animationComplete(e,"transition"):setTimeout(e,0),d.theme&&"overlay"!==d.display&&c._addClass(c._page().parent(),"ui-panel-page-container-themed ui-panel-page-container-"+d.theme),c._removeClass("ui-panel-closed")._addClass("ui-panel-open"),c._positionPanel(!0),c._pageContentOpenClasses=c._getPosDisplayClasses("ui-panel-page-content"),"overlay"!==d.display&&(c._addClass(c._page().parent(),"ui-panel-page-container"),c._addClass(c._wrapper,c._pageContentOpenClasses),c._addClass(c._fixedToolbars(),c._pageContentOpenClasses)),c._modalOpenClasses=c._getPosDisplayClasses("ui-panel-dismiss")+" ui-panel-dismiss-open",c._modal&&(c._addClass(c._modal,c._modalOpenClasses),c._modal.height(Math.max(c._modal.height(),c.document.height())))};c._trigger("beforeopen"),"open"===c._page().jqmData("panel")?c._on(c.document,{panelclose:f}):f(),c._open=!0}},close:function(b){if(this._open){var c=this,d=c._page(),e=this.options,f=function(){e.theme&&"overlay"!==e.display&&c._removeClass(d.parent(),"ui-panel-page-container-themed ui-panel-page-container-"+e.theme),c._addClass("ui-panel-closed"),c._positionPanel(!0),"overlay"!==e.display&&(c._removeClass(d.parent(),"ui-panel-page-container"),c._removeClass(c._wrapper,"ui-panel-page-content-open"),c._removeClass(c._fixedToolbars(),"ui-panel-page-content-open")),a.support.cssTransform3d&&e.animate&&"overlay"!==e.display&&(c._removeClass(c._wrapper,"ui-panel-animate"),c._removeClass(c._fixedToolbars(),"ui-panel-animate")),c._fixPanel(),c._unbindFixListener(),a.mobile.resetActivePageHeight(),d.jqmRemoveData("panel"),c._trigger("close"),c._openedPage=null},g=function(){c._removeClass("ui-panel-open"),"overlay"!==e.display&&(c._removeClass(c._wrapper,c._pageContentOpenClasses),c._removeClass(c._fixedToolbars(),c._pageContentOpenClasses)),!b&&a.support.cssTransform3d&&e.animate?(c._wrapper||c.element).animationComplete(f,"transition"):setTimeout(f,0),c._modal&&(c._removeClass(c._modal,c._modalOpenClasses),c._modal.height(""))};c._trigger("beforeclose"),g(),c._open=!1}},toggle:function(){this[this._open?"close":"open"]()},_destroy:function(){var b,c=this.options,d=a("body > :mobile-panel").length+a.mobile.activePage.find(":mobile-panel").length>1;"overlay"!==c.display&&(b=a("body > :mobile-panel").add(a.mobile.activePage.find(":mobile-panel")),0===b.not(".ui-panel-display-overlay").not(this.element).length&&this._wrapper.children().unwrap(),this._open&&(this._removeClass(this._fixedToolbars(),"ui-panel-page-content-open"),a.support.cssTransform3d&&c.animate&&this._removeClass(this._fixedToolbars(),"ui-panel-animate"),this._removeClass(this._page().parent(),"ui-panel-page-container"),c.theme&&this._removeClass(this._page().parent(),"ui-panel-page-container-themed ui-panel-page-container-"+c.theme))),d||this.document.off("panelopen panelclose"),this._open&&this._page().jqmRemoveData("panel"),this._panelInner.children().unwrap(),this._removeClass("ui-panel ui-panel-closed ui-panel-open ui-panel-animate",this._getPanelClasses()),this.element.off("panelbeforeopen panelhide keyup.panel updatelayout"),this._modal&&this._modal.remove(),this._superApply(arguments)}})}),function(b){"function"==typeof define&&define.amd?define("widgets/table",["jquery","../widget","./page"],b):b(a)}(function(a){return a.widget("mobile.table",{version:"@VERSION",options:{classes:{"ui-table":""},enhanced:!1},headers:null,allHeaders:null,_create:function(){var a=this.options;a.enhanced||this._addClass("ui-table",a.disabled?" ui-state-disabled":""),this.refresh()},_setOptions:function(a){return a.disabled!==d&&this._toggleClass(null,"ui-state-disabled",a.disabled),this._super(a)},_setHeaders:function(){this.headerRows=this.element.children("thead").children("tr"),this.headers=this.headerRows.first().children(),this.allHeaders=this.headerRows.children(),this.allRowsExceptFirst=this.element.children("thead,tbody").children("tr").not(this.headerRows.eq(0))},rebuild:function(){this.refresh()},_refreshHeaderCell:function(b,c,d){var e,f=parseInt(c.getAttribute("colspan"),10),g=":nth-child("+(d+1)+")";if(f)for(e=0;f-1>e;e++)d++,g+=", :nth-child("+(d+1)+")";return a(c).jqmData("cells",this.allRowsExceptFirst.not(c).children(g)),d},_refreshHeaderRow:function(b,c){var d=0;a(c).children().each(a.proxy(function(a,b){d=this._refreshHeaderCell(a,b,d)+1},this))},refresh:function(){this._setHeaders(),this.headerRows.each(a.proxy(this,"_refreshHeaderRow"))},_destroy:function(){var b=this.element;b.find("thead tr").children().each(function(){a(this).jqmRemoveData("cells")})}})}),function(b){"function"==typeof define&&define.amd?define("widgets/table.columntoggle",["jquery","./table"],b):b(a)}(function(a,b){return a.widget("mobile.table",a.mobile.table,{options:{mode:"columntoggle",classes:{"ui-table-cell-hidden":"","ui-table-cell-visible":"","ui-table-priority-":"","ui-table-columntoggle":""}},_create:function(){this._instantiating=!0,this._super(),"columntoggle"===this.options.mode&&(this.options.enhanced||this._enhanceColumnToggle(),this._instantiating=!1)},_enhanceColumnToggle:function(){this._addClass("ui-table-columntoggle"),this._updateHeaderPriorities()},_updateVariableColumn:function(a,b,c){this._addClass(b,"ui-table-priority-"+c)},_updateHeaderPriorities:function(b){this.headers.each(a.proxy(function(c,d){var e=a(d),f=a.mobile.getAttribute(d,"priority");f&&this._updateVariableColumn(e,e.add(e.jqmData("cells")),f,b)},this))},_setColumnVisibility:function(a,b){var c=a.jqmData("cells");c&&(c=c.add(a),this._unlock(c),this._addClass(c,b?"ui-table-cell-visible":"ui-table-cell-hidden"))},setColumnVisibility:function(b,c){var d;"number"===a.type(b)?d=this.headers.eq(b):b.length>0&&(this.headers.index(b[0])>=0?d=b.first():this.headers.each(a.proxy(function(c,e){var f=a(e),g=f.jqmData("cells");return(g?g.index(b[0]):-1)>=0?(d=f,!1):void 0},this))),d&&this._setColumnVisibility(d,c)},_unlock:function(a){var b=a||this.element.children("thead, tbody").children("tr").children(".ui-table-cell-hidden, .ui-table-cell-visible");this._removeClass(b,"ui-table-cell-hidden ui-table-cell-visible")},_recordLockedColumns:a.noop,_restoreLockedColumns:a.noop,refresh:function(){var a;this._super(),this._instantiating||"columntoggle"!==this.options.mode||(a=this._recordLockedColumns(),this._unlock(),this._updateHeaderPriorities(),this._restoreLockedColumns(a))},_destroy:function(){return"columntoggle"===this.options.mode&&(this.options.enhanced||this.headers.each(a.proxy(function(b,c){var d,e=a.mobile.getAttribute(c,"priority");e&&(d=a(c),d.add(d.jqmData("cells")))},this))),this._superApply(arguments)}})}),function(b){"function"==typeof define&&define.amd?define("widgets/table.columntoggle.popup",["jquery","./table.columntoggle","./popup","./controlgroup","./forms/button","./widget.theme","./forms/checkboxradio"],b):b(a)}(function(a,b){return a.widget("mobile.table",a.mobile.table,{options:{columnButton:!0,columnButtonTheme:null,columnPopupTheme:null,columnButtonText:"Columns...",columnUi:!0,classes:{"ui-table-columntoggle-popup":"","ui-table-columntoggle-btn":"ui-corner-all ui-shadow ui-mini"}},_create:function(){var b,c;this.options.columnButtonTheme=this.options.columnButtonTheme?this.options.columnButtonTheme:"inherit",this._super(),"columntoggle"===this.options.mode&&this.options.columnUi&&this.options.enhanced&&(b=this._id(),c=a(this.document[0].getElementById(b+"-popup")),this._ui={popup:c,menu:c.children().first(),button:a(this.document[0].getElementById(b+"-button"))},this._updateHeaderPriorities({keep:!0}))},_updateVariableColumn:function(b,c,d,e){var f;return(this.options.columnUi||e&&e.turningOnUI)&&(f=e.keep?e.inputs.eq(e.checkboxIndex++):a("<label><input type='checkbox' checked />"+(b.children("abbr").first().attr("title")||b.text())+"</label>").appendTo(e.container).children(0).checkboxradio({theme:this.options.columnPopupTheme}),f.jqmData("header",b).jqmData("cells",c),b.jqmData("input",f)),e&&e.turningOnUI?this:this._superApply(arguments)},_updateHeaderPriorities:function(b){var c,d,e;return b=b||{},this.options.columnUi||b.turningOnUI?(d=this._ui.menu.controlgroup("container"),b.keep?c=d.find("input"):d.empty(),e=this._super(a.extend(b,{checkboxIndex:0,container:d,inputs:c})),b.keep||this._ui.menu.controlgroup("refresh"),this._setupEvents(),this._setToggleState()):e=this._superApply(arguments),e},_id:function(){return this.element.attr("id")||this.widgetName+this.uuid},_themeClassFromOption:function(a,b){return b?"none"===b?"":a+b:""},_removeColumnUi:function(b){var c=this._ui.menu.find("input");c.each(function(){var c=a(this),d=c.jqmData("header");b&&c.jqmRemoveData("cells").jqmRemoveData("header"),d.jqmRemoveData("input")}),b||(this._ui.menu.remove(),this._ui.popup.remove(),this._ui.button&&this._ui.button.remove())},_setOptions:function(a){var b=this.options.columnUi;return"columntoggle"===this.options.mode&&(null!=a.columnUi&&(this.options.columnUi&&!a.columnUi?this._removeColumnUi(!1):!this.options.columnUi&&a.columnUi&&this._addColumnUI({callback:this._updateHeaderPriorities,callbackContext:this,callbackArguments:[{turningOnUI:!0}]}),b=a.columnUi),b&&(null!=a.disabled&&(this._ui.popup.popup("option","disabled",a.disabled),this._ui.button&&(this._toggleClass(this._ui.button,"ui-state-disabled",null,a.disabled),a.disabled?this._ui.button.attr("tabindex",-1):this._ui.button.removeAttr("tabindex"))),null!=a.columnButtonTheme&&this._ui.button&&(this._removeClass(this._ui.button,null,this._themeClassFromOption("ui-button-",this.options.columnButtonTheme)),this._addClass(this._ui.button,null,this._themeClassFromOption("ui-button-",a.columnButtonTheme))),null!=a.columnPopupTheme&&this._ui.popup.popup("option","theme",a.columnPopupTheme),null!=a.columnButtonText&&this._ui.button&&this._ui.button.text(a.columnButtonText),null!=a.columnButton&&(a.columnButton?(this._ui.button&&0!==this._ui.button.length||(this._ui.button=this._columnsButton()),this._ui.button.insertBefore(this.element)):this._ui.button&&this._ui.button.detach()))),this._superApply(arguments)},_setColumnVisibility:function(a,b,c){var d;return!c&&this.options.columnUi&&(d=a.jqmData("input"),d&&d.prop("checked",b).checkboxradio("refresh")),this._superApply(arguments)},_setupEvents:function(){this._on(this.window,{throttledresize:"_setToggleState"}),this._on(this._ui.menu,{"change input":"_menuInputChange"})},_menuInputChange:function(b){var c=a(b.target);this._setColumnVisibility(c.jqmData("header"),c.prop("checked"),!0)},_columnsButton:function(){var b=this._id(),c=this.options,d=a("<a href='#"+b+"-popup' id='"+b+"-button' data-"+a.mobile.ns+"rel='popup' data-theme='"+c.columnButtonTheme+"'>"+c.columnButtonText+"</a>");return d.button(),this._addClass(d,"ui-table-columntoggle-btn"),this._on(d,{click:"_handleButtonClicked"}),d},_addColumnUI:function(b){var c,d,e,f,g,h,i,j;return d=this._id(),e=d+"-popup",f=this.element,g=this.options,h=g.columnPopupTheme?" data-"+a.mobile.ns+"theme='"+g.columnPopupTheme+"'":"",i=this.document[0].createDocumentFragment(),c=this._ui={button:this.options.columnButton?this._columnsButton():null,popup:a("<div id='"+e+"'"+h+"></div>"),menu:a("<fieldset></fieldset>").controlgroup()},this._addClass(c.popup,"ui-table-columntoggle-popup"),j=b.callback.apply(b.callbackContext,b.callbackArguments),c.menu.appendTo(c.popup),i.appendChild(c.popup[0]),c.button&&i.appendChild(c.button[0]),f.before(i),c.popup.popup(),j},_enhanceColumnToggle:function(){return this.options.columnUi?this._addColumnUI({callback:this._superApply,callbackContext:this,callbackArguments:arguments}):this._superApply(arguments)},_handleButtonClicked:function(b){a.mobile.popup.handleLink(this._ui.button),b.preventDefault()},_setToggleState:function(){this._ui.menu.find("input").each(function(){var b=a(this);b.prop("checked","table-cell"===b.jqmData("cells").eq(0).css("display")).checkboxradio("refresh")})},_recordLockedColumns:function(){var b=this.headers,c=[];return this._ui.menu.find("input").each(function(){
var d=a(this),e=d.jqmData("header"),f=-1;e&&(f=b.index(e[0])),f>-1&&(c=c.concat(e.hasClass("ui-table-cell-visible")?[{index:f,visible:!0}]:e.hasClass("ui-table-cell-hidden")?[{index:f,visible:!1}]:[]),c.push(f))}),c},_restoreLockedColumns:function(a){var b,c,d;for(b=a.length-1;b>-1;b--)c=a[b],d=this.headers.eq(c.index).jqmData("input"),d&&d.prop("checked",c.visible).checkboxradio("refresh").trigger("change")},_destroy:function(){return"columntoggle"===this.options.mode&&this.options.columnUi&&this._removeColumnUi(this.options.enhanced),this._superApply(arguments)}})}),function(b){"function"==typeof define&&define.amd?define("widgets/table.reflow",["jquery","./table"],b):b(a)}(function(a){return a.widget("mobile.table",a.mobile.table,{options:{mode:"reflow",classes:{"ui-table-reflow":"","ui-table-cell-label":"","ui-table-cell-label-top":""}},_create:function(){return"reflow"!==this.options.mode||this.options.enhanced||this._addClass("ui-table-reflow"),this._superApply(arguments)},_refreshHeaderCell:function(b,c,d){return c.setAttribute("data-"+a.mobile.ns+"colstart",d+1),this._superApply(arguments)},refresh:function(){this._superApply(arguments),"reflow"===this.options.mode&&a(this.allHeaders.get().reverse()).each(a.proxy(this,"_updateCellsFromHeader"))},_updateCellsFromHeader:function(b,c){var d,e,f,g,h=a(c),i=h.clone().contents();i.length>0&&(g="ui-table-cell-label",e=h.jqmData("cells"),f=a.mobile.getAttribute(c,"colstart"),e.not(c).filter("thead th").length>0&&(g+=" ui-table-cell-label-top",d=parseInt(c.getAttribute("colspan"),10),d&&(e=e.filter("td:nth-child("+d+"n + "+f+")"))),this._addLabels(e,g,i))},_addLabels:function(b,c,d){var e=a("<b>");1===d.length&&"abbr"===d[0].nodeName.toLowerCase()&&(d=d.eq(0).attr("title")),this._addClass(e,c),e.append(d),b.not(":has(b."+c.split(" ").join(".")+")").prepend(e)},_destroy:function(){var b;return"reflow"===this.options.mode&&(b="data-"+a.mobile.ns+"colstart",this.options.enhanced||this.element.children("thead").find("["+b+"]").removeAttr(b).end().end().children("tbody").find("b.ui-table-cell-label").remove()),this._superApply(arguments)}})}),function(b){"function"==typeof define&&define.amd?define("widgets/filterable",["jquery","../widget"],b):b(a)}(function(a){var c=function(b,c){var d,e=a.mobile.getAttribute(this,"filtertext");return e||(d=a(this),e=d.text(),e||(e=d.val()||"")),-1===(""+e).toLowerCase().indexOf(c)};return a.widget("mobile.filterable",{version:"@VERSION",initSelector:":jqmData(filter='true')",options:{filterReveal:!1,filterCallback:c,enhanced:!1,input:null,children:"> li, > option, > optgroup option, > tbody tr, > .ui-controlgroup > .ui-btn, > .ui-controlgroup > .ui-checkbox, > .ui-controlgroup > .ui-radio"},_create:function(){var b=this.options;a.extend(this,{_search:null,_timer:0}),this._setInput(b.input),b.enhanced||this._filterItems((this._search&&this._search.val()||"").toLowerCase())},_onKeyUp:function(){var c,d,e=this._search;if(e){if(c=e.val().toLowerCase(),d=a.mobile.getAttribute(e[0],"lastval")+"",d&&d===c)return;this._timer&&(b.clearTimeout(this._timer),this._timer=0),this._timer=this._delay(function(){return this._trigger("beforefilter",null,{input:e})===!1?!1:(e[0].setAttribute("data-"+a.mobile.ns+"lastval",c),this._filterItems(c),void(this._timer=0))},250)}},_getFilterableItems:function(){var b=this.element,c=this.options.children,d=c?a.isFunction(c)?c():c.nodeName?a(c):c.jquery?c:this.element.find(c):{length:0};return 0===d.length&&(d=b.children()),d},_filterItems:function(b){var d,e,f,g,h=[],i=[],j=this.options,k=this._getFilterableItems();if(null!=b)for(e=j.filterCallback||c,f=k.length,d=0;f>d;d++)g=e.call(k[d],d,b)?i:h,g.push(k[d]);0===i.length?k[j.filterReveal&&0===b.length?"addClass":"removeClass"]("ui-screen-hidden"):(a(i).addClass("ui-screen-hidden"),a(h).removeClass("ui-screen-hidden")),this._refreshChildWidget(),this._trigger("filter",null,{items:k})},_refreshChildWidget:function(){var b,c,d=["collapsibleset","selectmenu","controlgroup","listview"];for(c=d.length-1;c>-1;c--)b=d[c],a.mobile[b]&&(b=this.element.data("mobile-"+b),b&&a.isFunction(b.refresh)&&b.refresh())},_setInput:function(c){var d=this._search;this._timer&&(b.clearTimeout(this._timer),this._timer=0),d&&(this._off(d,"keyup keydown keypress change input"),d=null),c&&(d=c.jquery?c:c.nodeName?a(c):this.document.find(c),this._on(d,{keydown:"_onKeyDown",keypress:"_onKeyPress",keyup:"_onKeyUp",change:"_onKeyUp",input:"_onKeyUp"})),this._search=d},_onKeyDown:function(b){this._preventKeyPress=!1,b.keyCode===a.ui.keyCode.ENTER&&(b.preventDefault(),this._preventKeyPress=!0)},_onKeyPress:function(a){this._preventKeyPress&&(a.preventDefault(),this._preventKeyPress=!1)},_setOptions:function(a){var b=!(a.filterReveal===d&&a.filterCallback===d&&a.children===d);this._super(a),a.input!==d&&(this._setInput(a.input),b=!0),b&&this.refresh()},_destroy:function(){var a=this.options,b=this._getFilterableItems();a.enhanced?b.toggleClass("ui-screen-hidden",a.filterReveal):b.removeClass("ui-screen-hidden")},refresh:function(){this._timer&&(b.clearTimeout(this._timer),this._timer=0),this._filterItems((this._search&&this._search.val()||"").toLowerCase())}})}),function(b){"function"==typeof define&&define.amd?define("jquery-ui/widgets/tabs",["jquery","../escape-selector","../keycode","../safe-active-element","../unique-id","../version","../widget"],b):b(a)}(function(a){return a.widget("ui.tabs",{version:"1.12.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var a=/#.*$/;return function(b){var c,d;c=b.href.replace(a,""),d=location.href.replace(a,"");try{c=decodeURIComponent(c)}catch(e){}try{d=decodeURIComponent(d)}catch(e){}return b.hash.length>1&&c===d}}(),_create:function(){var b=this,c=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,c.collapsible),this._processTabs(),c.active=this._initialActive(),a.isArray(c.disabled)&&(c.disabled=a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"),function(a){return b.tabs.index(a)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(c.active):this.active=a(),this._refresh(),this.active.length&&this.load(c.active)},_initialActive:function(){var b=this.options.active,c=this.options.collapsible,d=location.hash.substring(1);return null===b&&(d&&this.tabs.each(function(c,e){return a(e).attr("aria-controls")===d?(b=c,!1):void 0}),null===b&&(b=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===b||-1===b)&&(b=this.tabs.length?0:!1)),b!==!1&&(b=this.tabs.index(this.tabs.eq(b)),-1===b&&(b=c?!1:0)),!c&&b===!1&&this.anchors.length&&(b=0),b},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):a()}},_tabKeydown:function(b){var c=a(a.ui.safeActiveElement(this.document[0])).closest("li"),d=this.tabs.index(c),e=!0;if(!this._handlePageNav(b)){switch(b.keyCode){case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:d++;break;case a.ui.keyCode.UP:case a.ui.keyCode.LEFT:e=!1,d--;break;case a.ui.keyCode.END:d=this.anchors.length-1;break;case a.ui.keyCode.HOME:d=0;break;case a.ui.keyCode.SPACE:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d);case a.ui.keyCode.ENTER:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d===this.options.active?!1:d);default:return}b.preventDefault(),clearTimeout(this.activating),d=this._focusNextTab(d,e),b.ctrlKey||b.metaKey||(c.attr("aria-selected","false"),this.tabs.eq(d).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",d)},this.delay))}},_panelKeydown:function(b){this._handlePageNav(b)||b.ctrlKey&&b.keyCode===a.ui.keyCode.UP&&(b.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(b){return b.altKey&&b.keyCode===a.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):b.altKey&&b.keyCode===a.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(b,c){function d(){return b>e&&(b=0),0>b&&(b=e),b}for(var e=this.tabs.length-1;-1!==a.inArray(d(),this.options.disabled);)b=c?b+1:b-1;return b},_focusNextTab:function(a,b){return a=this._findNextTab(a,b),this.tabs.eq(a).trigger("focus"),a},_setOption:function(a,b){return"active"===a?void this._activate(b):(this._super(a,b),"collapsible"===a&&(this._toggleClass("ui-tabs-collapsible",null,b),b||this.options.active!==!1||this._activate(0)),"event"===a&&this._setupEvents(b),void("heightStyle"===a&&this._setupHeightStyle(b)))},_sanitizeSelector:function(a){return a?a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var b=this.options,c=this.tablist.children(":has(a[href])");b.disabled=a.map(c.filter(".ui-state-disabled"),function(a){return c.index(a)}),this._processTabs(),b.active!==!1&&this.anchors.length?this.active.length&&!a.contains(this.tablist[0],this.active[0])?this.tabs.length===b.disabled.length?(b.active=!1,this.active=a()):this._activate(this._findNextTab(Math.max(0,b.active-1),!1)):b.active=this.tabs.index(this.active):(b.active=!1,this.active=a()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var b=this,c=this.tabs,d=this.anchors,e=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(b){a(this).is(".ui-state-disabled")&&b.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){a(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return a("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=a(),this.anchors.each(function(c,d){var e,f,g,h=a(d).uniqueId().attr("id"),i=a(d).closest("li"),j=i.attr("aria-controls");b._isLocal(d)?(e=d.hash,g=e.substring(1),f=b.element.find(b._sanitizeSelector(e))):(g=i.attr("aria-controls")||a({}).uniqueId()[0].id,e="#"+g,f=b.element.find(e),f.length||(f=b._createPanel(g),f.insertAfter(b.panels[c-1]||b.tablist)),f.attr("aria-live","polite")),f.length&&(b.panels=b.panels.add(f)),j&&i.data("ui-tabs-aria-controls",j),i.attr({"aria-controls":g,"aria-labelledby":h}),f.attr("aria-labelledby",h)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),c&&(this._off(c.not(this.tabs)),this._off(d.not(this.anchors)),this._off(e.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(b){return a("<div>").attr("id",b).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(b){var c,d,e;for(a.isArray(b)&&(b.length?b.length===this.anchors.length&&(b=!0):b=!1),e=0;d=this.tabs[e];e++)c=a(d),b===!0||-1!==a.inArray(e,b)?(c.attr("aria-disabled","true"),this._addClass(c,null,"ui-state-disabled")):(c.removeAttr("aria-disabled"),this._removeClass(c,null,"ui-state-disabled"));this.options.disabled=b,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,b===!0)},_setupEvents:function(b){var c={};b&&a.each(b.split(" "),function(a,b){c[b]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(a){a.preventDefault()}}),this._on(this.anchors,c),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(b){var c,d=this.element.parent();"fill"===b?(c=d.height(),c-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var b=a(this),d=b.css("position");"absolute"!==d&&"fixed"!==d&&(c-=b.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){c-=a(this).outerHeight(!0)}),this.panels.each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")):"auto"===b&&(c=0,this.panels.each(function(){c=Math.max(c,a(this).height("").height())}).height(c))},_eventHandler:function(b){var c=this.options,d=this.active,e=a(b.currentTarget),f=e.closest("li"),g=f[0]===d[0],h=g&&c.collapsible,i=h?a():this._getPanelForTab(f),j=d.length?this._getPanelForTab(d):a(),k={oldTab:d,oldPanel:j,newTab:h?a():f,newPanel:i};b.preventDefault(),f.hasClass("ui-state-disabled")||f.hasClass("ui-tabs-loading")||this.running||g&&!c.collapsible||this._trigger("beforeActivate",b,k)===!1||(c.active=h?!1:this.tabs.index(f),this.active=g?a():f,this.xhr&&this.xhr.abort(),j.length||i.length||a.error("jQuery UI Tabs: Mismatching fragment identifier."),i.length&&this.load(this.tabs.index(f),b),this._toggle(b,k))},_toggle:function(b,c){function d(){f.running=!1,f._trigger("activate",b,c)}function e(){f._addClass(c.newTab.closest("li"),"ui-tabs-active","ui-state-active"),g.length&&f.options.show?f._show(g,f.options.show,d):(g.show(),d())}var f=this,g=c.newPanel,h=c.oldPanel;this.running=!0,h.length&&this.options.hide?this._hide(h,this.options.hide,function(){f._removeClass(c.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),e()}):(this._removeClass(c.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),h.hide(),e()),h.attr("aria-hidden","true"),c.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),g.length&&h.length?c.oldTab.attr("tabIndex",-1):g.length&&this.tabs.filter(function(){return 0===a(this).attr("tabIndex")}).attr("tabIndex",-1),g.attr("aria-hidden","false"),c.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(b){var c,d=this._findActive(b);d[0]!==this.active[0]&&(d.length||(d=this.active),c=d.find(".ui-tabs-anchor")[0],this._eventHandler({target:c,currentTarget:c,preventDefault:a.noop}))},_findActive:function(b){return b===!1?a():this.tabs.eq(b)},_getIndex:function(b){return"string"==typeof b&&(b=this.anchors.index(this.anchors.filter("[href$='"+a.ui.escapeSelector(b)+"']"))),b},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){a.data(this,"ui-tabs-destroy")?a(this).remove():a(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var b=a(this),c=b.data("ui-tabs-aria-controls");c?b.attr("aria-controls",c).removeData("ui-tabs-aria-controls"):b.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(b){var c=this.options.disabled;c!==!1&&(b===d?c=!1:(b=this._getIndex(b),c=a.isArray(c)?a.map(c,function(a){return a!==b?a:null}):a.map(this.tabs,function(a,c){return c!==b?c:null})),this._setOptionDisabled(c))},disable:function(b){var c=this.options.disabled;if(c!==!0){if(b===d)c=!0;else{if(b=this._getIndex(b),-1!==a.inArray(b,c))return;c=a.isArray(c)?a.merge([b],c).sort():[b]}this._setOptionDisabled(c)}},load:function(b,c){b=this._getIndex(b);var d=this,e=this.tabs.eq(b),f=e.find(".ui-tabs-anchor"),g=this._getPanelForTab(e),h={tab:e,panel:g},i=function(a,b){"abort"===b&&d.panels.stop(!1,!0),d._removeClass(e,"ui-tabs-loading"),g.removeAttr("aria-busy"),a===d.xhr&&delete d.xhr};this._isLocal(f[0])||(this.xhr=a.ajax(this._ajaxSettings(f,c,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(e,"ui-tabs-loading"),g.attr("aria-busy","true"),this.xhr.done(function(a,b,e){setTimeout(function(){g.html(a),d._trigger("load",c,h),i(e,b)},1)}).fail(function(a,b){setTimeout(function(){i(a,b)},1)})))},_ajaxSettings:function(b,c,d){var e=this;return{url:b.attr("href").replace(/#.*$/,""),beforeSend:function(b,f){return e._trigger("beforeLoad",c,a.extend({jqXHR:b,ajaxSettings:f},d))}}},_getPanelForTab:function(b){var c=a(b).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+c))}}),a.uiBackCompat!==!1&&a.widget("ui.tabs",a.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),a.ui.tabs}),function(b){"function"==typeof define&&define.amd?define("widgets/tabs.ajax",["jquery","../defaults","../navigation/path","../navigation/base","jquery-ui/widgets/tabs"],b):b(a)}(function(a){return a.widget("ui.tabs",a.ui.tabs,{_create:function(){this._super(),this.active.find("a.ui-tabs-anchor").addClass("ui-button-active")},_isLocal:function(b){var c,d,e;return a.mobile.ajaxEnabled?(c=a.mobile.path,d=c.parseUrl(a.mobile.base.element().attr("href")),e=c.parseUrl(c.makeUrlAbsolute(b.getAttribute("href"),d)),c.isSameDomain(e.href,d.href)&&e.pathname===d.pathname):this._superApply(arguments)}})}),function(b){"function"==typeof define&&define.amd?define("zoom/iosorientationfix",["jquery","../core","../zoom"],b):b(a)}(function(a){function c(a){e=a.originalEvent,i=e.accelerationIncludingGravity,f=Math.abs(i.x),g=Math.abs(i.y),h=Math.abs(i.z),!b.orientation&&(f>7||(h>6&&8>g||8>h&&g>6)&&f>5)?d.enabled&&d.disable():d.enabled||d.enable()}a.mobile.iosorientationfixEnabled=!0;var d,e,f,g,h,i,j=navigator.userAgent;return/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(j)&&j.indexOf("AppleWebKit")>-1?(d=a.mobile.zoom,void a.mobile.document.on("mobileinit",function(){a.mobile.iosorientationfixEnabled&&a.mobile.window.bind("orientationchange.iosorientationfix",d.enable).bind("devicemotion.iosorientationfix",c)})):void(a.mobile.iosorientationfixEnabled=!1)}),function(b){"function"==typeof define&&define.amd?define("init",["jquery","./defaults","./helpers","./data","./support","./widgets/enhancer","./events/navigate","./navigation/path","./navigation/method","./navigation","./widgets/loader","./vmouse"],b):b(a)}(function(a){function e(){f.removeClass("ui-mobile-rendering")}var f=a("html"),g=a.mobile.window;a.mobile.document.trigger("mobileinit"),a.mobile.gradeA()&&(a.mobile.ajaxBlacklist&&(a.mobile.ajaxEnabled=!1),f.addClass("ui-mobile ui-mobile-rendering"),setTimeout(e,5e3),a.extend(a.mobile,{initializePage:function(){var b,f=a.mobile.path,h=a(":jqmData(role='page'), :jqmData(role='dialog')"),i=f.stripHash(f.stripQueryParams(f.parseLocation().hash)),j=a.mobile.path.parseLocation(),k=i?c.getElementById(i):d;h.length||(h=a("body").wrapInner("<div data-"+a.mobile.ns+"role='page'></div>").children(0)),h.each(function(){var b=a(this);b[0].getAttribute("data-"+a.mobile.ns+"url")||b.attr("data-"+a.mobile.ns+"url",b.attr("id")||f.convertUrlToDataUrl(j.pathname+j.search))}),a.mobile.firstPage=h.first(),b=a.mobile.firstPage.parent().pagecontainer(),a.mobile.navreadyDeferred.resolve(),a.mobile.loading("show"),e(),a.mobile.hashListeningEnabled&&a.mobile.path.isHashValid(location.hash)&&(a(k).is(":jqmData(role='page')")||a.mobile.path.isPath(i)||i===a.mobile.dialogHashKey)?a.event.special.navigate.isPushStateEnabled()?(a.mobile.navigate.history.stack=[],a.mobile.navigate(a.mobile.path.isPath(location.hash)?location.hash:location.href)):g.trigger("hashchange",[!0]):(a.event.special.navigate.isPushStateEnabled()&&a.mobile.navigate.navigator.squash(f.parseLocation().href),b.pagecontainer("change",a.mobile.firstPage,{transition:"none",reverse:!0,changeUrl:!1,fromHashChange:!0}))}}),a(function(){a.support.inlineSVG(),a.mobile.hideUrlBar&&b.scrollTo(0,1),a.mobile.defaultHomeScroll=a.support.scrollTop&&1!==a.mobile.window.scrollTop()?1:0,a.mobile.autoInitializePage&&a.mobile.initializePage(),a.support.cssPointerEvents||a.mobile.document.delegate(".ui-state-disabled,.ui-disabled","vclick",function(a){a.preventDefault(),a.stopImmediatePropagation()})}))})});
;/**
  * Klass.js - copyright @dedfat
  * version 1.0
  * https://github.com/ded/klass
  * Follow our software http://twitter.com/dedfat :)
  * MIT License
  */
!function(a,b){function j(a,b){function c(){}c[e]=this[e];var d=this,g=new c,h=f(a),j=h?a:this,k=h?{}:a,l=function(){this.initialize?this.initialize.apply(this,arguments):(b||h&&d.apply(this,arguments),j.apply(this,arguments))};l.methods=function(a){i(g,a,d),l[e]=g;return this},l.methods.call(l,k).prototype.constructor=l,l.extend=arguments.callee,l[e].implement=l.statics=function(a,b){a=typeof a=="string"?function(){var c={};c[a]=b;return c}():a,i(this,a,d);return this};return l}function i(a,b,d){for(var g in b)b.hasOwnProperty(g)&&(a[g]=f(b[g])&&f(d[e][g])&&c.test(b[g])?h(g,b[g],d):b[g])}function h(a,b,c){return function(){var d=this.supr;this.supr=c[e][a];var f=b.apply(this,arguments);this.supr=d;return f}}function g(a){return j.call(f(a)?a:d,a,1)}var c=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,d=function(){},e="prototype",f=function(a){return typeof a===b};if(typeof module!="undefined"&&module.exports)module.exports=g;else{var k=a.klass;g.noConflict=function(){a.klass=k;return this},a.klass=g}}(this,"function")
;/*!
 * Add to Homescreen v2.0.1 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var addToHome = (function (w) {
	var nav = w.navigator,
		isIDevice = 'platform' in nav && (/iphone|ipod|ipad/gi).test(nav.platform),
		isIPad,
		isRetina,
		isSafari,
		isStandalone,
		OSVersion,
		startX = 0,
		startY = 0,
		lastVisit = 0,
		isExpired,
		isSessionActive,
		isReturningVisitor,
		balloon,
		overrideChecks,
		positionInterval,
		closeTimeout,
    localStoragePrefix = 'cubiqa2h_',
    dismissedKey = 'dismissed',

		options = {
			autostart: true,			// Automatically open the balloon
			returningVisitor: false,	// Show the balloon to returning visitors only (setting this to true is HIGHLY RECCOMENDED)
			animationIn: 'drop',		// drop || bubble || fade
			animationOut: 'fade',		// drop || bubble || fade
			startDelay: 2000,			// 2 seconds from page load before the balloon appears
			lifespan: 15000,			// 15 seconds before it is automatically destroyed
			bottomOffset: 14,			// Distance of the balloon from bottom
			expire: 0,					// Minutes to wait before showing the popup again (0 = always displayed)
			message: '',				// Customize your message or force a language ('' = automatic)
			touchIcon: false,			// Display the touch icon
			arrow: true,				// Display the balloon arrow
			hookOnLoad: true,			// Should we hook to onload event? (really advanced usage)
      timesToDismiss: 1,    // # of times note is dismissed before perma-hidden.
			iterations: 100				// Internal/debug use
		},

		intl = {
			ca_es: 'Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d\'inici</strong>.',
			cs_cz: 'Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.',
			da_dk: 'Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.',
			de_de: 'Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.',
			el_gr: 'Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.',
			en_us: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',
			es_es: 'Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.',
			fi_fi: 'Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.',
			fr_fr: 'Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l\'écran d\'accueil</strong>.',
			he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
			hu_hu: 'Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.',
			it_it: 'Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.',
			ja_jp: 'このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。',
			ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
			nb_no: 'Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>',
			nl_nl: 'Installeer deze webapp op uw %device: tik %icon en dan <strong>Zet in beginscherm</strong>.',
			pl_pl: 'Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.',
			pt_br: 'Instale este web app em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.',
			pt_pt: 'Para instalar esta aplicação no seu %device, prima o %icon e depois o <strong>Adicionar ao ecrã principal</strong>.',
			ru_ru: 'Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.',
			sv_se: 'Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.',
			th_th: 'ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>',
			tr_tr: '%device için bu uygulamayı kurduktan sonra %icon simgesine dokunarak <strong>Ana Ekrana Ekle</strong>yin.',
			zh_cn: '您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。',
			zh_tw: '您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。'
		};

	function init () {
		// Preliminary check, prevents all further checks to be performed on iDevices only
		if ( !isIDevice ) return;

		var now = Date.now(),
			i;

		// Merge local with global options
		if (w.addToHomeConfig) {
			for ( i in w.addToHomeConfig ) {
				options[i] = w.addToHomeConfig[i];
			}
		}
		if ( !options.autostart ) options.hookOnLoad = false;

		isIPad = (/ipad/gi).test(nav.platform);
		isRetina = w.devicePixelRatio && w.devicePixelRatio > 1;
		isSafari = (/Safari/i).test(nav.appVersion) && !(/CriOS/i).test(nav.appVersion);
		isStandalone = nav.standalone;
		OSVersion = nav.appVersion.match(/OS (\d+_\d+)/i);
		OSVersion = OSVersion[1] ? +OSVersion[1].replace('_', '.') : 0;

		lastVisit = +w.localStorage.getItem('addToHome');

		isSessionActive = w.sessionStorage.getItem('addToHomeSession');
		isReturningVisitor = options.returningVisitor ? lastVisit && lastVisit + 28*24*60*60*1000 > now : true;

		if ( !lastVisit ) lastVisit = now;

		// If it is expired we need to reissue a new balloon
		isExpired = isReturningVisitor && lastVisit <= now;

		if ( options.hookOnLoad ) w.addEventListener('load', loaded, false);
		else if ( !options.hookOnLoad && options.autostart ) loaded();
	}

	function loaded () {
		w.removeEventListener('load', loaded, false);

    if (!w.localStorage) { return; }

    var lsKey = localStoragePrefix + dismissedKey; 
    var lsVal = Number(w.localStorage[lsKey]) || 0;
    if ( !overrideChecks && lsVal >= options.timesToDismiss) { return; }

		if ( !isReturningVisitor ) w.localStorage.setItem('addToHome', Date.now());
		else if ( options.expire && isExpired ) w.localStorage.setItem('addToHome', Date.now() + options.expire * 60000);

		if ( !overrideChecks && ( !isSafari || !isExpired || isSessionActive || isStandalone || !isReturningVisitor ) ) return;

		var icons = options.touchIcon ? document.querySelectorAll('head link[rel=apple-touch-icon],head link[rel=apple-touch-icon-precomposed]') : [],
			sizes,
			touchIcon = '',
			closeButton,
			platform = nav.platform.split(' ')[0],
			language = nav.language.replace('-', '_'),
			i, l;

		balloon = document.createElement('div');
		balloon.id = 'addToHomeScreen';
		balloon.style.cssText += 'left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:' + (OSVersion < 5 ? 'absolute' : 'fixed');

		// Localize message
		if ( options.message in intl ) {		// You may force a language despite the user's locale
			language = options.message;
			options.message = '';
		}
		if ( options.message === '' ) {			// We look for a suitable language (defaulted to en_us)
			options.message = language in intl ? intl[language] : intl['en_us'];
		}

		// Search for the apple-touch-icon
		if ( icons.length ) {
			for ( i = 0, l = icons.length; i < l; i++ ) {
				sizes = icons[i].getAttribute('sizes');

				if ( sizes ) {
					if ( isRetina && sizes == '114x114' ) {
						touchIcon = icons[i].href;
						break;
					}
				} else {
					touchIcon = icons[i].href;
				}
			}

			touchIcon = '<span style="background-image:url(' + touchIcon + ')" class="addToHomeTouchIcon"></span>';
		}

		balloon.className = (isIPad ? 'addToHomeIpad' : 'addToHomeIphone') + (touchIcon ? ' addToHomeWide' : '');
		balloon.innerHTML = touchIcon +
			options.message.replace('%device', platform).replace('%icon', OSVersion >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') +
			(options.arrow ? '<span class="addToHomeArrow"></span>' : '') +
			'<span class="addToHomeClose">\u00D7</span>';

		document.body.appendChild(balloon);

		// Add the close action
		closeButton = balloon.querySelector('.addToHomeClose');
		if ( closeButton ) closeButton.addEventListener('click', clicked, false);

		setTimeout(show, options.startDelay);
	}

	function show () {
		var duration,
			iPadXShift = 160;

		// Set the initial position
		if ( isIPad ) {
			if ( OSVersion < 5 ) {
				startY = w.scrollY;
				startX = w.scrollX;
				iPadXShift = 208;
			}

			balloon.style.top = startY + options.bottomOffset + 'px';
			balloon.style.left = startX + iPadXShift - Math.round(balloon.offsetWidth / 2) + 'px';

			switch ( options.animationIn ) {
				case 'drop':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(w.scrollY + options.bottomOffset + balloon.offsetHeight) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.opacity = '0';
					balloon.style.webkitTransform = 'translate3d(0,' + (startY + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		} else {
			startY = w.innerHeight + w.scrollY;

			if ( OSVersion < 5 ) {
				startX = Math.round((w.innerWidth - balloon.offsetWidth) / 2) + w.scrollX;
				balloon.style.left = startX + 'px';
				balloon.style.top = startY - balloon.offsetHeight - options.bottomOffset + 'px';
			} else {
				balloon.style.left = '50%';
				balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) + 'px';
				balloon.style.bottom = options.bottomOffset + 'px';
			}

			switch (options.animationIn) {
				case 'drop':
					duration = '1s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(startY + options.bottomOffset) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + (balloon.offsetHeight + options.bottomOffset + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		}

		balloon.offsetHeight;	// repaint trick
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.opacity = '1';
		balloon.style.webkitTransform = 'translate3d(0,0,0)';
		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);

		closeTimeout = setTimeout(close, options.lifespan);
	}

	function manualShow (override) {
		if ( !isIDevice || balloon ) return;

		overrideChecks = override;
		loaded();
	}

	function close () {
		clearInterval( positionInterval );
		clearTimeout( closeTimeout );
		closeTimeout = null;

    var lsKey = localStoragePrefix + dismissedKey; 
    var lsVal = Number(w.localStorage[lsKey]) || 0;
    w.localStorage[lsKey] = String(lsVal + 1);

		var posY = 0,
			posX = 0,
			opacity = '1',
			duration = '0',
			closeButton = balloon.querySelector('.addToHomeClose');

		if ( closeButton ) closeButton.removeEventListener('click', close, false);

		if ( OSVersion < 5 ) {
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY;
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth)/2) - startX;
		}

		balloon.style.webkitTransitionProperty = '-webkit-transform,opacity';

		switch ( options.animationOut ) {
			case 'drop':
				if ( isIPad ) {
					duration = '0.4s';
					opacity = '0';
					posY = posY + 50;
				} else {
					duration = '0.6s';
					posY = posY + balloon.offsetHeight + options.bottomOffset + 50;
				}
				break;
			case 'bubble':
				if ( isIPad ) {
					duration = '0.8s';
					posY = posY - balloon.offsetHeight - options.bottomOffset - 50;
				} else {
					duration = '0.4s';
					opacity = '0';
					posY = posY - 50;
				}
				break;
			default:
				duration = '0.8s';
				opacity = '0';
		}

		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);
		balloon.style.opacity = opacity;
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}


	function clicked () {
		w.sessionStorage.setItem('addToHomeSession', '1');
		isSessionActive = true;
		close();
	}

	function transitionEnd () {
		balloon.removeEventListener('webkitTransitionEnd', transitionEnd, false);

		balloon.style.webkitTransitionProperty = '-webkit-transform';
		balloon.style.webkitTransitionDuration = '0.2s';

		// We reached the end!
		if ( !closeTimeout ) {
			balloon.parentNode.removeChild(balloon);
			balloon = null;
			return;
		}

		// On iOS 4 we start checking the element position
		if ( OSVersion < 5 && closeTimeout ) positionInterval = setInterval(setPosition, options.iterations);
	}

	function setPosition () {
		var matrix = new WebKitCSSMatrix(w.getComputedStyle(balloon, null).webkitTransform),
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY,
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX;

		// Screen didn't move
		if ( posY == matrix.m42 && posX == matrix.m41 ) return;

		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}

	// Clear local and session storages (this is useful primarily in development)
	function reset () {
		w.localStorage.removeItem('addToHome');
		w.sessionStorage.removeItem('addToHomeSession');
	}

	// Bootstrap!
	init();

	return {
    show:      manualShow,
    close:     close,
    reset:     reset,
    isIDevice: isIDevice
	};
})(this);
;/* Modernizr 2.8.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)t[c[d]]=c[d]in k;return t.list&&(t.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return x("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.flexbox=function(){return I("flexWrap")},r.flexboxlegacy=function(){return I("boxDirection")},r.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},r.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){return!!a.openDatabase},r.indexedDB=function(){return!!I("indexedDB",a)},r.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return!!a.history&&!!history.pushState},r.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},r.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},r.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},r.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},r.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},r.backgroundsize=function(){return I("backgroundSize")},r.borderimage=function(){return I("borderImage")},r.borderradius=function(){return I("borderRadius")},r.boxshadow=function(){return I("boxShadow")},r.textshadow=function(){return b.createElement("div").style.textShadow===""},r.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},r.cssanimations=function(){return I("animationName")},r.csscolumns=function(){return I("columnCount")},r.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},r.cssreflections=function(){return I("boxReflect")},r.csstransforms=function(){return!!I("transform")},r.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},r.csstransitions=function(){return I("transition")},r.fontface=function(){var a;return x('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},r.generatedcontent=function(){var a;return x(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},r.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},r.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},r.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},r.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},r.webworkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache};for(var K in r)B(r,K)&&(w=K.toLowerCase(),e[w]=r[K](),u.push((e[w]?"":"no-")+w));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=y,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=x,e.prefixed=function(a,b,c){return b?I(a,b,c):I(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;// -----------------------------------------------------------------------------
// Loads a widget's content dynamically. This is for widgets that need their
// published content loaded dynamically via xhr.
// -----------------------------------------------------------------------------
(function($) {
  if (!($.iv)) { $.extend({ iv: {} }); }

  $.fn.iv_widget = function(options) {
    return this.each(function() {
      new jQuery.iv.widget(this, options);
    });
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Widget
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  $.iv.widget = function(el, options) {
    jQuery.data(el, 'widget', this);

    options = $.extend({
      values:    null,
      no_parent: false
    }, options);

    var $$      = $(el);       // the calling div
    var $widget = $$.parent(); // the widget div (only if no_parent is false)

    _load();

    // ---------------------------------------------------------------------------
    function _load() {
      var url     = '/website/widget';
      var qry_str = location.search;

      if (qry_str) { url += qry_str; }

      var $div = $widget;
      if (options.no_parent) {
        $div = $$;
      }

      $div.load(url, {
          id:     $$[0].id,
          values: options.values,
          cookie: document.cookie
        },
        function() {
          if (options.no_parent) {
            var $children = $$.children();
            if ($children.length > 0) {
              $children.first().unwrap();
            }
            else {
              $$.remove();
            }
          }
        }
      );
    }

    // ---------------------------------------------------------------------------
  };

})(jQuery);
;(function($) {
  //---------------------------------------------------------------------------
  $.fn.iv_mobile_carousel = function(options) {
    return this.each(function() {
      new $.iv.mobile_carousel(this, options);
    });
  };
  //---------------------------------------------------------------------------
  $.fn.iv_mobile_carousel_resize = function(args) {
    return this.each(function() {
      var o = $.data(this, 'mobile_carousel');
      o.resize(args);
    });
  };
  //---------------------------------------------------------------------------
  $.fn.iv_mobile_carousel_hide_address_bar = function(args) {
    return this.each(function() {
      var o = $.data(this, 'mobile_carousel');
      o.hide_address_bar(args);
    });
  };
  //---------------------------------------------------------------------------
  $.iv.mobile_carousel = function(el, options) {
    $.data(el, 'mobile_carousel', this);
    options = $.extend({
      show_count    : 3,
      animate_speed : 400
    }, options);
   
    var animate_speed     = options.animate_speed;
    var el_id             = $(el).attr('id');
    var max_offset        = 0;
    var page_idx          = 0;
    var show_count        = options.show_count;
    var last_page         = 0;

    this.hide_address_bar = hide_address_bar;
    this.resize           = resize;

    _init();
    //-------------------------------------------------------------------------
    function _init() {
      _bind_events();
      resize();
    }
    //-------------------------------------------------------------------------
    function _bind_events() {
      $(window).unbind('resize', resize);
      $(window).bind('resize', resize);
    }
    //-------------------------------------------------------------------------
    // Function has photoswipe dependency.  If it is not present it should
    // die gracefully (I Hope).
    //-------------------------------------------------------------------------
    function hide_address_bar() {
      if(Code && Code.Util) {
        if(Code.Util.Browser.blackberry) {
          window.scrollTo(0, 59);
        }
        else {
          if(Code.Util.Browser.android) {
            window.scrollTo(0,0);
            var page_height = window.parseInt(Code.Util.DOM.getStyle(document.body, 'height'), 10);
            var new_height  = window.outerHeight;
            if (new_height > page_height) {
              new_height = new_height / window.devicePixelRatio
              Code.Util.DOM.setStyle(document.body, { height: new_height });
            }
          }
          window.scrollTo(0,1);
        }
      }
    }
    //-------------------------------------------------------------------------
    function resize() {
      var carousel_width = $('#' + el_id).width();
      var carousel_diff  = $('#' + el_id).outerWidth() - carousel_width;
//      var img_width = Math.floor($('#' + el_id).width() / show_count);
//      var img_width = Math.floor(wrapper_width / show_count);

      var $spans   = $('.mobile_carousel span.mini_thumb', '#' + el_id);
      var $wrapper = $('.mobile_carousel_wrapper', '#' + el_id);
      var $carousel = $('.mobile_carousel', '#' + el_id);
      var $carousel_btns = $('.mobile_carousel_btns', '#' + el_id);
      var $help_span  = $('.mobile_carousel_help', '#' + el_id);

/*      var $btns = $('.nav_btn', '#' + el_id).each(function() {
        carousel_width -= $(this).outerWidth(true);
      });*/
      carousel_width -= carousel_diff;
      $carousel.width(carousel_width);

      var img_width = Math.floor($wrapper.width() / show_count);

      var item_count   = 0;
      $spans.each(function() {
        var $span = $(this);
        $('img', $span).each(function() {
          var $img = $(this);
          var diff = Math.ceil($img.outerWidth(true) - $img.width());
          $img.width(img_width - diff - 2);
          $span.width(img_width - diff - 2); // Seems to have 2 px error not sure why
          $img.unbind('swipeleft').bind('swipeleft', page_next);
          $img.unbind('swiperight').bind('swiperight', page_prev);
        });
        item_count++; 
      });
      last_page  = Math.ceil(item_count/show_count);
      max_offset = last_page * $wrapper.width();

      var help_span_w = $carousel_btns.width();
      $('.nav_btn', '#' + el_id).each(function() {
        var btn_top = ($carousel_btns.height() - $(this).outerHeight(true)) / 2;
        $(this).css({ 'top' : btn_top });
        help_span_w -= $(this).outerWidth(true);
      });
      $help_span.width(help_span_w);
      $help_span.css({ 'padding-left' : $('.nav_btn.page_prev', '#' + el_id).outerWidth(true) });

      update_page_btn_evt();
      position_images(false);
    }
    //-------------------------------------------------------------------------
    function update_page_btn_evt() {
      $('.page_prev', '#' + el_id).unbind('click');
      if(page_idx > 0) {
        $('.page_prev', '#' + el_id).bind('click', page_prev);
      }

      $('.page_next', '#' + el_id).unbind('click');
      if(page_idx < last_page - 1) {
        $('.page_next', '#' + el_id).bind('click', page_next);
      }
    }
    //-------------------------------------------------------------------------
    function page_next() {
      page_idx++;
      update_page_btn_evt();
      return(position_images(true));
    }
    //-------------------------------------------------------------------------
    function page_prev() {
      page_idx--;
      update_page_btn_evt();
      return(position_images(true));
    }
    //-------------------------------------------------------------------------
    function position_images(animate_action) {

      var $wrapper = $('.mobile_carousel_wrapper', '#' + el_id);

      var left_offset = -($wrapper.width()) * page_idx;
      var max_left = max_offset - $wrapper.width();

      if(left_offset > 0)         { left_offset = 0;        }
      if(-max_left > left_offset) { left_offset = -max_left; }
      if(animate_action) {
        $wrapper.animate({ left: left_offset }, animate_speed, _update_btn_visibility);
      }
      else {
        $wrapper.css({ left: left_offset });
        _update_btn_visibility();
      }
    }
    //-------------------------------------------------------------------------
    function _update_btn_visibility() {
      if(page_idx < 1) {
        $('.page_prev img', '#' + el_id).addClass('hidden');
      }
      else {
        $('.page_prev img', '#' + el_id).removeClass('hidden');
      }
      if(page_idx >= last_page - 1) {
        $('.page_next img', '#' + el_id).addClass('hidden');
      }
      else {
        $('.page_next img', '#' + el_id).removeClass('hidden');
      }
    }
    //-------------------------------------------------------------------------
  };
  //---------------------------------------------------------------------------
})(jQuery);
;// PhotoSwipe - http://www.photoswipe.com/
// Copyright (c) 2011 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.4
(function(e){if(!Function.prototype.bind)Function.prototype.bind=function(c){var a=[].slice,b=a.call(arguments,1),d=this,f=function(){},g=function(){return d.apply(this instanceof f?this:c||{},b.concat(a.call(arguments)))};f.prototype=d.prototype;g.prototype=new f;return g};if(typeof e.Code==="undefined")e.Code={};e.Code.Util={registerNamespace:function(){var c=arguments,a=null,b,d,f,g,h;b=0;for(g=c.length;b<g;b++){f=c[b];f=f.split(".");a=f[0];typeof e[a]==="undefined"&&(e[a]={});a=e[a];d=1;for(h=
f.length;d<h;++d)a[f[d]]=a[f[d]]||{},a=a[f[d]]}},coalesce:function(){var c,a;c=0;for(a=arguments.length;c<a;c++)if(!this.isNothing(arguments[c]))return arguments[c];return null},extend:function(c,a,b){var d;this.isNothing(b)&&(b=!0);if(c&&a&&this.isObject(a))for(d in a)this.objectHasProperty(a,d)&&(b?c[d]=a[d]:typeof c[d]==="undefined"&&(c[d]=a[d]))},clone:function(c){var a={};this.extend(a,c);return a},isObject:function(c){return c instanceof Object},isFunction:function(c){return{}.toString.call(c)===
"[object Function]"},isArray:function(c){return c instanceof Array},isLikeArray:function(c){return typeof c.length==="number"},isNumber:function(c){return typeof c==="number"},isString:function(c){return typeof c==="string"},isNothing:function(c){if(typeof c==="undefined"||c===null)return!0;return!1},swapArrayElements:function(c,a,b){var d=c[a];c[a]=c[b];c[b]=d},trim:function(c){return c.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},toCamelCase:function(c){return c.replace(/(\-[a-z])/g,function(a){return a.toUpperCase().replace("-",
"")})},toDashedCase:function(c){return c.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},arrayIndexOf:function(c,a,b){var d,f,g,e;g=-1;d=0;for(f=a.length;d<f;d++)if(e=a[d],this.isNothing(b)){if(e===c){g=d;break}}else if(this.objectHasProperty(e,b)&&e[b]===c){g=d;break}return g},objectHasProperty:function(c,a){return c.hasOwnProperty?c.hasOwnProperty(a):"undefined"!==typeof c[a]}}})(window);
(function(e,c){c.Browser={ua:null,version:null,safari:null,webkit:null,opera:null,msie:null,chrome:null,mozilla:null,android:null,blackberry:null,iPad:null,iPhone:null,iPod:null,iOS:null,is3dSupported:null,isCSSTransformSupported:null,isTouchSupported:null,isGestureSupported:null,_detect:function(){this.ua=e.navigator.userAgent;this.version=this.ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[];this.safari=/Safari/gi.test(e.navigator.appVersion);this.webkit=/webkit/i.test(this.ua);this.opera=/opera/i.test(this.ua);
this.msie=/msie/i.test(this.ua)&&!this.opera;this.chrome=/Chrome/i.test(this.ua);this.firefox=/Firefox/i.test(this.ua);this.fennec=/Fennec/i.test(this.ua);this.mozilla=/mozilla/i.test(this.ua)&&!/(compatible|webkit)/.test(this.ua);this.android=/android/i.test(this.ua);this.blackberry=/blackberry/i.test(this.ua);this.iOS=/iphone|ipod|ipad/gi.test(e.navigator.platform);this.iPad=/ipad/gi.test(e.navigator.platform);this.iPhone=/iphone/gi.test(e.navigator.platform);this.iPod=/ipod/gi.test(e.navigator.platform);
var a=document.createElement("div");this.is3dSupported=!c.isNothing(a.style.WebkitPerspective);this.isCSSTransformSupported=!c.isNothing(a.style.WebkitTransform)||!c.isNothing(a.style.MozTransform)||!c.isNothing(a.style.transformProperty);this.isTouchSupported=this.isEventSupported("touchstart");this.isGestureSupported=this.isEventSupported("gesturestart")},_eventTagNames:{select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"},isEventSupported:function(a){var b=
document.createElement(this._eventTagNames[a]||"div"),d,a="on"+a;d=c.objectHasProperty(b,a);d||(b.setAttribute(a,"return;"),d=typeof b[a]==="function");return d},isLandscape:function(){return c.DOM.windowWidth()>c.DOM.windowHeight()}};c.Browser._detect()})(window,window.Code.Util);
(function(e,c){c.extend(c,{Events:{add:function(a,b,d){this._checkHandlersProperty(a);b==="mousewheel"&&(b=this._normaliseMouseWheelType());typeof a.__eventHandlers[b]==="undefined"&&(a.__eventHandlers[b]=[]);a.__eventHandlers[b].push(d);this._isBrowserObject(a)&&a.addEventListener(b,d,!1)},remove:function(a,b,d){this._checkHandlersProperty(a);b==="mousewheel"&&(b=this._normaliseMouseWheelType());if(a.__eventHandlers[b]instanceof Array){var f,g,e=a.__eventHandlers[b];if(c.isNothing(d)){if(this._isBrowserObject(a)){f=
0;for(g=e.length;f<g;f++)a.removeEventListener(b,e[f],!1)}a.__eventHandlers[b]=[]}else{f=0;for(g=e.length;f<g;f++)if(e[f]===d){e.splice(f,1);break}this._isBrowserObject(a)&&a.removeEventListener(b,d,!1)}}},fire:function(a,b){var d,f,g,h,j=Array.prototype.slice.call(arguments).splice(2);b==="mousewheel"&&(b=this._normaliseMouseWheelType());if(this._isBrowserObject(a)){if(typeof b!=="string")throw"type must be a string for DOM elements";g=this._NATIVE_EVENTS[b];d=document.createEvent(g?"HTMLEvents":
"UIEvents");d[g?"initEvent":"initUIEvent"](b,!0,!0,e,1);if(j.length<1){a.dispatchEvent(d);return}}this._checkHandlersProperty(a);d=typeof b==="string"?{type:b}:b;if(!d.target)d.target=a;if(!d.type)throw Error("Event object missing 'type' property.");if(a.__eventHandlers[d.type]instanceof Array){g=a.__eventHandlers[d.type];j.unshift(d);d=0;for(f=g.length;d<f;d++)h=g[d],c.isNothing(h)||h.apply(a,j)}},getMousePosition:function(a){var b={x:0,y:0};if(a.pageX)b.x=a.pageX;else if(a.clientX)b.x=a.clientX+
(document.documentElement.scrollLeft||document.body.scrollLeft);if(a.pageY)b.y=a.pageY;else if(a.clientY)b.y=a.clientY+(document.documentElement.scrollTop||document.body.scrollTop);return b},getTouchEvent:function(a){return a},getWheelDelta:function(a){var b=0;c.isNothing(a.wheelDelta)?c.isNothing(a.detail)||(b=-a.detail/3):b=a.wheelDelta/120;return b},domReady:function(a){document.addEventListener("DOMContentLoaded",a,!1)},_checkHandlersProperty:function(a){c.isNothing(a.__eventHandlers)&&c.extend(a,
{__eventHandlers:{}})},_isBrowserObject:function(a){if(a===e||a===e.document)return!0;return this._isElement(a)||this._isNode(a)},_isElement:function(a){return typeof e.HTMLElement==="object"?a instanceof e.HTMLElement:typeof a==="object"&&a.nodeType===1&&typeof a.nodeName==="string"},_isNode:function(a){return typeof e.Node==="object"?a instanceof e.Node:typeof a==="object"&&typeof a.nodeType==="number"&&typeof a.nodeName==="string"},_normaliseMouseWheelType:function(){if(c.Browser.isEventSupported("mousewheel"))return"mousewheel";
return"DOMMouseScroll"},_NATIVE_EVENTS:{click:1,dblclick:1,mouseup:1,mousedown:1,contextmenu:1,mousewheel:1,DOMMouseScroll:1,mouseover:1,mouseout:1,mousemove:1,selectstart:1,selectend:1,keydown:1,keypress:1,keyup:1,orientationchange:1,touchstart:1,touchmove:1,touchend:1,touchcancel:1,gesturestart:1,gesturechange:1,gestureend:1,focus:1,blur:1,change:1,reset:1,select:1,submit:1,load:1,unload:1,beforeunload:1,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1}}})})(window,
window.Code.Util);
(function(e,c){c.extend(c,{DOM:{setData:function(a,b,d){if(c.isLikeArray(a)){var f,g;f=0;for(g=a.length;f<g;f++)c.DOM._setData(a[f],b,d)}else c.DOM._setData(a,b,d)},_setData:function(a,b,d){c.DOM.setAttribute(a,"data-"+b,d)},getData:function(a,b,d){return c.DOM.getAttribute(a,"data-"+b,d)},removeData:function(a,b){if(c.isLikeArray(a)){var d,f;d=0;for(f=a.length;d<f;d++)c.DOM._removeData(a[d],b)}else c.DOM._removeData(a,b)},_removeData:function(a,b){c.DOM.removeAttribute(a,"data-"+b)},isChildOf:function(a,
b){if(b===a)return!1;for(;a&&a!==b;)a=a.parentNode;return a===b},find:function(a,b){if(c.isNothing(b))b=e.document;var d=b.querySelectorAll(a),f=[],g,h;g=0;for(h=d.length;g<h;g++)f.push(d[g]);return f},createElement:function(a,b,d){var f,a=document.createElement(a);for(f in b)c.objectHasProperty(b,f)&&a.setAttribute(f,b[f]);a.innerHTML=d||"";return a},appendChild:function(a,b){b.appendChild(a)},insertBefore:function(a,b,d){d.insertBefore(a,b)},appendText:function(a,b){c.DOM.appendChild(document.createTextNode(a),
b)},appendToBody:function(a){this.appendChild(a,document.body)},removeChild:function(a,b){b.removeChild(a)},removeChildren:function(a){if(a.hasChildNodes())for(;a.childNodes.length>=1;)a.removeChild(a.childNodes[a.childNodes.length-1])},hasAttribute:function(a,b){return!c.isNothing(a.getAttribute(b))},getAttribute:function(a,b,d){a=a.getAttribute(b);c.isNothing(a)&&!c.isNothing(d)&&(a=d);return a},setAttribute:function(a,b,d){if(c.isLikeArray(a)){var f,g;f=0;for(g=a.length;f<g;f++)c.DOM._setAttribute(a[f],
b,d)}else c.DOM._setAttribute(a,b,d)},_setAttribute:function(a,b,d){a.setAttribute(b,d)},removeAttribute:function(a,b){if(c.isLikeArray(a)){var d,f;d=0;for(f=a.length;d<f;d++)c.DOM._removeAttribute(a[d],b)}else c.DOM._removeAttribute(a,b)},_removeAttribute:function(a,b){this.hasAttribute(a,b)&&a.removeAttribute(b)},addClass:function(a,b){if(c.isLikeArray(a)){var d,f;d=0;for(f=a.length;d<f;d++)c.DOM._addClass(a[d],b)}else c.DOM._addClass(a,b)},_addClass:function(a,b){var d=c.DOM.getAttribute(a,"class",
"");RegExp("(?:^|\\s+)"+b+"(?:\\s+|$)").test(d)||(d!==""&&(d+=" "),d+=b,c.DOM.setAttribute(a,"class",d))},removeClass:function(a,b){if(c.isLikeArray(a)){var d,f;d=0;for(f=a.length;d<f;d++)c.DOM._removeClass(a[d],b)}else c.DOM._removeClass(a,b)},_removeClass:function(a,b){var d=c.DOM.getAttribute(a,"class",""),d=c.trim(d).split(" "),f="",g,e;g=0;for(e=d.length;g<e;g++)d[g]!==b&&(f!==""&&(f+=" "),f+=d[g]);f===""?c.DOM.removeAttribute(a,"class"):c.DOM.setAttribute(a,"class",f)},hasClass:function(a,b){return RegExp("(?:^|\\s+)"+
b+"(?:\\s+|$)").test(c.DOM.getAttribute(a,"class",""))},setStyle:function(a,b,d){if(c.isLikeArray(a)){var f,g;f=0;for(g=a.length;f<g;f++)c.DOM._setStyle(a[f],b,d)}else c.DOM._setStyle(a,b,d)},_setStyle:function(a,b,d){var f;if(c.isObject(b))for(f in b)c.objectHasProperty(b,f)&&(f==="width"?c.DOM.width(a,b[f]):f==="height"?c.DOM.height(a,b[f]):a.style[f]=b[f]);else a.style[b]=d},getStyle:function(a,b){var d=e.getComputedStyle(a,"").getPropertyValue(b);d===""&&(d=a.style[b]);return d},hide:function(a){if(c.isLikeArray(a)){var b,
d;b=0;for(d=a.length;b<d;b++)c.DOM._hide(a[b])}else c.DOM._hide(a)},_hide:function(a){c.DOM.setData(a,"ccl-disp",c.DOM.getStyle(a,"display"));c.DOM.setStyle(a,"display","none")},show:function(a){if(c.isLikeArray(a)){var b,d;b=0;for(d=a.length;b<d;b++)c.DOM._show(a[b])}else c.DOM._show(a)},_show:function(a){if(c.DOM.getStyle(a,"display")==="none"){var b=c.DOM.getData(a,"ccl-disp","block");if(b==="none"||b==="")b="block";c.DOM.setStyle(a,"display",b)}},width:function(a,b){if(!c.isNothing(b))c.isNumber(b)&&
(b+="px"),a.style.width=b;return this._getDimension(a,"width")},outerWidth:function(a){var b=c.DOM.width(a);b+=parseInt(c.DOM.getStyle(a,"padding-left"),10)+parseInt(c.DOM.getStyle(a,"padding-right"),10);b+=parseInt(c.DOM.getStyle(a,"margin-left"),10)+parseInt(c.DOM.getStyle(a,"margin-right"),10);b+=parseInt(c.DOM.getStyle(a,"border-left-width"),10)+parseInt(c.DOM.getStyle(a,"border-right-width"),10);return b},height:function(a,b){if(!c.isNothing(b))c.isNumber(b)&&(b+="px"),a.style.height=b;return this._getDimension(a,
"height")},_getDimension:function(a,b){var d=e.parseInt(e.getComputedStyle(a,"").getPropertyValue(b)),f;if(isNaN(d))f={display:a.style.display,left:a.style.left},a.style.display="block",a.style.left="-1000000px",d=e.parseInt(e.getComputedStyle(a,"").getPropertyValue(b)),a.style.display=f.display,a.style.left=f.left;return d},outerHeight:function(a){var b=c.DOM.height(a);b+=parseInt(c.DOM.getStyle(a,"padding-top"),10)+parseInt(c.DOM.getStyle(a,"padding-bottom"),10);b+=parseInt(c.DOM.getStyle(a,"margin-top"),
10)+parseInt(c.DOM.getStyle(a,"margin-bottom"),10);b+=parseInt(c.DOM.getStyle(a,"border-top-width"),10)+parseInt(c.DOM.getStyle(a,"border-bottom-width"),10);return b},documentWidth:function(){return c.DOM.width(document.documentElement)},documentHeight:function(){return c.DOM.height(document.documentElement)},documentOuterWidth:function(){return c.DOM.width(document.documentElement)},documentOuterHeight:function(){return c.DOM.outerHeight(document.documentElement)},bodyWidth:function(){return c.DOM.width(document.body)},
bodyHeight:function(){return c.DOM.height(document.body)},bodyOuterWidth:function(){return c.DOM.outerWidth(document.body)},bodyOuterHeight:function(){return c.DOM.outerHeight(document.body)},windowWidth:function(){return e.innerWidth},windowHeight:function(){return e.innerHeight},windowScrollLeft:function(){return e.pageXOffset},windowScrollTop:function(){return e.pageYOffset}}})})(window,window.Code.Util);
(function(e,c){c.extend(c,{Animation:{_applyTransitionDelay:50,_transitionEndLabel:e.document.documentElement.style.webkitTransition!==void 0?"webkitTransitionEnd":"transitionend",_transitionEndHandler:null,_transitionPrefix:e.document.documentElement.style.webkitTransition!==void 0?"webkitTransition":e.document.documentElement.style.MozTransition!==void 0?"MozTransition":"transition",_transformLabel:e.document.documentElement.style.webkitTransform!==void 0?"webkitTransform":e.document.documentElement.style.MozTransition!==
void 0?"MozTransform":"transform",_getTransitionEndHandler:function(){if(c.isNothing(this._transitionEndHandler))this._transitionEndHandler=this._onTransitionEnd.bind(this);return this._transitionEndHandler},stop:function(a){if(c.Browser.isCSSTransformSupported){var b={};c.Events.remove(a,this._transitionEndLabel,this._getTransitionEndHandler());c.isNothing(a.callbackLabel)&&delete a.callbackLabel;b[this._transitionPrefix+"Property"]="";b[this._transitionPrefix+"Duration"]="";b[this._transitionPrefix+
"TimingFunction"]="";b[this._transitionPrefix+"Delay"]="";b[this._transformLabel]="";c.DOM.setStyle(a,b)}else c.isNothing(e.jQuery)||e.jQuery(a).stop(!0,!0)},fadeIn:function(a,b,d,f,g){g=c.coalesce(g,1);g<=0&&(g=1);if(b<=0&&(c.DOM.setStyle(a,"opacity",g),!c.isNothing(d))){d(a);return}c.DOM.getStyle(a,"opacity")>=1&&c.DOM.setStyle(a,"opacity",0);c.Browser.isCSSTransformSupported?this._applyTransition(a,"opacity",g,b,d,f):c.isNothing(e.jQuery)||e.jQuery(a).fadeTo(b,g,d)},fadeTo:function(a,b,d,f,c){this.fadeIn(a,
d,f,c,b)},fadeOut:function(a,b,d,f){if(b<=0&&(c.DOM.setStyle(a,"opacity",0),!c.isNothing(d))){d(a);return}c.Browser.isCSSTransformSupported?this._applyTransition(a,"opacity",0,b,d,f):e.jQuery(a).fadeTo(b,0,d)},slideBy:function(a,b,d,f,g,h){var j={},b=c.coalesce(b,0),d=c.coalesce(d,0),h=c.coalesce(h,"ease-out");j[this._transitionPrefix+"Property"]="all";j[this._transitionPrefix+"Delay"]="0";f===0?(j[this._transitionPrefix+"Duration"]="",j[this._transitionPrefix+"TimingFunction"]=""):(j[this._transitionPrefix+
"Duration"]=f+"ms",j[this._transitionPrefix+"TimingFunction"]=c.coalesce(h,"ease-out"),c.Events.add(a,this._transitionEndLabel,this._getTransitionEndHandler()));j[this._transformLabel]=c.Browser.is3dSupported?"translate3d("+b+"px, "+d+"px, 0px)":"translate("+b+"px, "+d+"px)";if(!c.isNothing(g))a.cclallcallback=g;c.DOM.setStyle(a,j);f===0&&e.setTimeout(function(){this._leaveTransforms(a)}.bind(this),this._applyTransitionDelay)},resetTranslate:function(a){var b={};b[this._transformLabel]=b[this._transformLabel]=
c.Browser.is3dSupported?"translate3d(0px, 0px, 0px)":"translate(0px, 0px)";c.DOM.setStyle(a,b)},_applyTransition:function(a,b,d,f,g,h){var j={},h=c.coalesce(h,"ease-in");j[this._transitionPrefix+"Property"]=b;j[this._transitionPrefix+"Duration"]=f+"ms";j[this._transitionPrefix+"TimingFunction"]=h;j[this._transitionPrefix+"Delay"]="0";c.Events.add(a,this._transitionEndLabel,this._getTransitionEndHandler());c.DOM.setStyle(a,j);c.isNothing(g)||(a["ccl"+b+"callback"]=g);e.setTimeout(function(){c.DOM.setStyle(a,
b,d)},this._applyTransitionDelay)},_onTransitionEnd:function(a){c.Events.remove(a.currentTarget,this._transitionEndLabel,this._getTransitionEndHandler());this._leaveTransforms(a.currentTarget)},_leaveTransforms:function(a){var b=a.style[this._transitionPrefix+"Property"],d=b!==""?"ccl"+b+"callback":"cclallcallback",f,b=c.coalesce(a.style.webkitTransform,a.style.MozTransform,a.style.transform),g,h=e.parseInt(c.DOM.getStyle(a,"left"),0),j=e.parseInt(c.DOM.getStyle(a,"top"),0),i,l,k={};b!==""&&(b=c.Browser.is3dSupported?
b.match(/translate3d\((.*?)\)/):b.match(/translate\((.*?)\)/),c.isNothing(b)||(g=b[1].split(", "),i=e.parseInt(g[0],0),l=e.parseInt(g[1],0)));k[this._transitionPrefix+"Property"]="";k[this._transitionPrefix+"Duration"]="";k[this._transitionPrefix+"TimingFunction"]="";k[this._transitionPrefix+"Delay"]="";c.DOM.setStyle(a,k);e.setTimeout(function(){if(!c.isNothing(g))k={},k[this._transformLabel]="",k.left=h+i+"px",k.top=j+l+"px",c.DOM.setStyle(a,k);c.isNothing(a[d])||(f=a[d],delete a[d],f(a))}.bind(this),
this._applyTransitionDelay)}}})})(window,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.Util.TouchElement");a.TouchElement.EventTypes={onTouch:"CodeUtilTouchElementOnTouch"};a.TouchElement.ActionTypes={touchStart:"touchStart",touchMove:"touchMove",touchEnd:"touchEnd",touchMoveEnd:"touchMoveEnd",tap:"tap",doubleTap:"doubleTap",swipeLeft:"swipeLeft",swipeRight:"swipeRight",swipeUp:"swipeUp",swipeDown:"swipeDown",gestureStart:"gestureStart",gestureChange:"gestureChange",gestureEnd:"gestureEnd"}})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.Util.TouchElement");a.TouchElement.TouchElementClass=c({el:null,captureSettings:null,touchStartPoint:null,touchEndPoint:null,touchStartTime:null,doubleTapTimeout:null,touchStartHandler:null,touchMoveHandler:null,touchEndHandler:null,mouseDownHandler:null,mouseMoveHandler:null,mouseUpHandler:null,mouseOutHandler:null,gestureStartHandler:null,gestureChangeHandler:null,gestureEndHandler:null,swipeThreshold:null,swipeTimeThreshold:null,doubleTapSpeed:null,dispose:function(){var b;
this.removeEventHandlers();for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(b,d){this.el=b;this.captureSettings={swipe:!1,move:!1,gesture:!1,doubleTap:!1,preventDefaultTouchEvents:!0};a.extend(this.captureSettings,d);this.swipeThreshold=50;this.doubleTapSpeed=this.swipeTimeThreshold=250;this.touchStartPoint={x:0,y:0};this.touchEndPoint={x:0,y:0}},addEventHandlers:function(){if(a.isNothing(this.touchStartHandler))this.touchStartHandler=this.onTouchStart.bind(this),this.touchMoveHandler=
this.onTouchMove.bind(this),this.touchEndHandler=this.onTouchEnd.bind(this),this.mouseDownHandler=this.onMouseDown.bind(this),this.mouseMoveHandler=this.onMouseMove.bind(this),this.mouseUpHandler=this.onMouseUp.bind(this),this.mouseOutHandler=this.onMouseOut.bind(this),this.gestureStartHandler=this.onGestureStart.bind(this),this.gestureChangeHandler=this.onGestureChange.bind(this),this.gestureEndHandler=this.onGestureEnd.bind(this);a.Events.add(this.el,"touchstart",this.touchStartHandler);this.captureSettings.move&&
a.Events.add(this.el,"touchmove",this.touchMoveHandler);a.Events.add(this.el,"touchend",this.touchEndHandler);a.Events.add(this.el,"mousedown",this.mouseDownHandler);a.Browser.isGestureSupported&&this.captureSettings.gesture&&(a.Events.add(this.el,"gesturestart",this.gestureStartHandler),a.Events.add(this.el,"gesturechange",this.gestureChangeHandler),a.Events.add(this.el,"gestureend",this.gestureEndHandler))},removeEventHandlers:function(){a.Events.remove(this.el,"touchstart",this.touchStartHandler);
this.captureSettings.move&&a.Events.remove(this.el,"touchmove",this.touchMoveHandler);a.Events.remove(this.el,"touchend",this.touchEndHandler);a.Events.remove(this.el,"mousedown",this.mouseDownHandler);a.Browser.isGestureSupported&&this.captureSettings.gesture&&(a.Events.remove(this.el,"gesturestart",this.gestureStartHandler),a.Events.remove(this.el,"gesturechange",this.gestureChangeHandler),a.Events.remove(this.el,"gestureend",this.gestureEndHandler))},getTouchPoint:function(a){return{x:a[0].pageX,
y:a[0].pageY}},fireTouchEvent:function(b){var d=0,f=0,c=0,h,d=this.touchEndPoint.x-this.touchStartPoint.x,f=this.touchEndPoint.y-this.touchStartPoint.y,c=Math.sqrt(d*d+f*f);if(this.captureSettings.swipe&&(h=new Date,h-=this.touchStartTime,h<=this.swipeTimeThreshold)){if(e.Math.abs(d)>=this.swipeThreshold){a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:d<0?a.TouchElement.ActionTypes.swipeLeft:a.TouchElement.ActionTypes.swipeRight,targetEl:b.target,
currentTargetEl:b.currentTarget});return}if(e.Math.abs(f)>=this.swipeThreshold){a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:f<0?a.TouchElement.ActionTypes.swipeUp:a.TouchElement.ActionTypes.swipeDown,targetEl:b.target,currentTargetEl:b.currentTarget});return}}c>1?a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchMoveEnd,point:this.touchEndPoint,targetEl:b.target,currentTargetEl:b.currentTarget}):
this.captureSettings.doubleTap?a.isNothing(this.doubleTapTimeout)?this.doubleTapTimeout=e.setTimeout(function(){this.doubleTapTimeout=null;a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:a.TouchElement.ActionTypes.tap,targetEl:b.target,currentTargetEl:b.currentTarget})}.bind(this),this.doubleTapSpeed):(e.clearTimeout(this.doubleTapTimeout),this.doubleTapTimeout=null,a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,
action:a.TouchElement.ActionTypes.doubleTap,targetEl:b.target,currentTargetEl:b.currentTarget})):a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:a.TouchElement.ActionTypes.tap,targetEl:b.target,currentTargetEl:b.currentTarget})},onTouchStart:function(b){this.captureSettings.preventDefaultTouchEvents&&b.preventDefault();a.Events.remove(this.el,"mousedown",this.mouseDownHandler);var d=a.Events.getTouchEvent(b).touches;d.length>1&&this.captureSettings.gesture?
this.isGesture=!0:(this.touchStartTime=new Date,this.isGesture=!1,this.touchStartPoint=this.getTouchPoint(d),a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchStart,point:this.touchStartPoint,targetEl:b.target,currentTargetEl:b.currentTarget}))},onTouchMove:function(b){this.captureSettings.preventDefaultTouchEvents&&b.preventDefault();if(!this.isGesture||!this.captureSettings.gesture){var d=a.Events.getTouchEvent(b).touches;a.Events.fire(this,
{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchMove,point:this.getTouchPoint(d),targetEl:b.target,currentTargetEl:b.currentTarget})}},onTouchEnd:function(b){if(!this.isGesture||!this.captureSettings.gesture){this.captureSettings.preventDefaultTouchEvents&&b.preventDefault();var d=a.Events.getTouchEvent(b);this.touchEndPoint=this.getTouchPoint(!a.isNothing(d.changedTouches)?d.changedTouches:d.touches);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,
target:this,action:a.TouchElement.ActionTypes.touchEnd,point:this.touchEndPoint,targetEl:b.target,currentTargetEl:b.currentTarget});this.fireTouchEvent(b)}},onMouseDown:function(b){b.preventDefault();a.Events.remove(this.el,"touchstart",this.mouseDownHandler);a.Events.remove(this.el,"touchmove",this.touchMoveHandler);a.Events.remove(this.el,"touchend",this.touchEndHandler);this.captureSettings.move&&a.Events.add(this.el,"mousemove",this.mouseMoveHandler);a.Events.add(this.el,"mouseup",this.mouseUpHandler);
a.Events.add(this.el,"mouseout",this.mouseOutHandler);this.touchStartTime=new Date;this.isGesture=!1;this.touchStartPoint=a.Events.getMousePosition(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchStart,point:this.touchStartPoint,targetEl:b.target,currentTargetEl:b.currentTarget})},onMouseMove:function(b){b.preventDefault();a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchMove,
point:a.Events.getMousePosition(b),targetEl:b.target,currentTargetEl:b.currentTarget})},onMouseUp:function(b){b.preventDefault();this.captureSettings.move&&a.Events.remove(this.el,"mousemove",this.mouseMoveHandler);a.Events.remove(this.el,"mouseup",this.mouseUpHandler);a.Events.remove(this.el,"mouseout",this.mouseOutHandler);this.touchEndPoint=a.Events.getMousePosition(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchEnd,point:this.touchEndPoint,
targetEl:b.target,currentTargetEl:b.currentTarget});this.fireTouchEvent(b)},onMouseOut:function(b){var d=b.relatedTarget;if(!(this.el===d||a.DOM.isChildOf(d,this.el)))b.preventDefault(),this.captureSettings.move&&a.Events.remove(this.el,"mousemove",this.mouseMoveHandler),a.Events.remove(this.el,"mouseup",this.mouseUpHandler),a.Events.remove(this.el,"mouseout",this.mouseOutHandler),this.touchEndPoint=a.Events.getMousePosition(b),a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,
action:a.TouchElement.ActionTypes.touchEnd,point:this.touchEndPoint,targetEl:b.target,currentTargetEl:b.currentTarget}),this.fireTouchEvent(b)},onGestureStart:function(b){b.preventDefault();var d=a.Events.getTouchEvent(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.gestureStart,scale:d.scale,rotation:d.rotation,targetEl:b.target,currentTargetEl:b.currentTarget})},onGestureChange:function(b){b.preventDefault();var d=a.Events.getTouchEvent(b);
a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.gestureChange,scale:d.scale,rotation:d.rotation,targetEl:b.target,currentTargetEl:b.currentTarget})},onGestureEnd:function(b){b.preventDefault();var d=a.Events.getTouchEvent(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.gestureEnd,scale:d.scale,rotation:d.rotation,targetEl:b.target,currentTargetEl:b.currentTarget})}})})(window,window.klass,
window.Code.Util);(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Image");e.Code.PhotoSwipe.Image.EventTypes={onLoad:"onLoad",onError:"onError"}})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Image");var b=e.Code.PhotoSwipe;b.Image.ImageClass=c({refObj:null,imageEl:null,src:null,caption:null,metaData:null,imageLoadHandler:null,imageErrorHandler:null,dispose:function(){var d;this.shrinkImage();for(d in this)a.objectHasProperty(this,d)&&(this[d]=null)},initialize:function(a,b,c,h){this.refObj=a;this.src=this.originalSrc=b;this.caption=c;this.metaData=h;this.imageEl=new e.Image;this.imageLoadHandler=this.onImageLoad.bind(this);this.imageErrorHandler=
this.onImageError.bind(this)},load:function(){this.imageEl.originalSrc=a.coalesce(this.imageEl.originalSrc,"");this.imageEl.originalSrc===this.src?this.imageEl.isError?a.Events.fire(this,{type:b.Image.EventTypes.onError,target:this}):a.Events.fire(this,{type:b.Image.EventTypes.onLoad,target:this}):(this.imageEl.isError=!1,this.imageEl.isLoading=!0,this.imageEl.naturalWidth=null,this.imageEl.naturalHeight=null,this.imageEl.isLandscape=!1,this.imageEl.onload=this.imageLoadHandler,this.imageEl.onerror=
this.imageErrorHandler,this.imageEl.onabort=this.imageErrorHandler,this.imageEl.originalSrc=this.src,this.imageEl.src=this.src)},shrinkImage:function(){if(!a.isNothing(this.imageEl)&&this.imageEl.src.indexOf(this.src)>-1)this.imageEl.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",a.isNothing(this.imageEl.parentNode)||a.DOM.removeChild(this.imageEl,this.imageEl.parentNode)},onImageLoad:function(){this.imageEl.onload=null;this.imageEl.naturalWidth=a.coalesce(this.imageEl.naturalWidth,
this.imageEl.width);this.imageEl.naturalHeight=a.coalesce(this.imageEl.naturalHeight,this.imageEl.height);this.imageEl.isLandscape=this.imageEl.naturalWidth>this.imageEl.naturalHeight;this.imageEl.isLoading=!1;a.Events.fire(this,{type:b.Image.EventTypes.onLoad,target:this})},onImageError:function(){this.imageEl.onload=null;this.imageEl.onerror=null;this.imageEl.onabort=null;this.imageEl.isLoading=!1;this.imageEl.isError=!0;a.Events.fire(this,{type:b.Image.EventTypes.onError,target:this})}})})(window,
window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Cache");e=e.Code.PhotoSwipe;e.Cache.Mode={normal:"normal",aggressive:"aggressive"};e.Cache.Functions={getImageSource:function(a){return a.href},getImageCaption:function(b){if(b.nodeName==="IMG")return a.DOM.getAttribute(b,"alt");var d,f,c;d=0;for(f=b.childNodes.length;d<f;d++)if(c=b.childNodes[d],b.childNodes[d].nodeName==="IMG")return a.DOM.getAttribute(c,"alt")},getImageMetaData:function(){return{}}}})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Cache");var b=e.Code.PhotoSwipe;b.Cache.CacheClass=c({images:null,settings:null,dispose:function(){var b,f,c;if(!a.isNothing(this.images)){f=0;for(c=this.images.length;f<c;f++)this.images[f].dispose();this.images.length=0}for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(a,f){var c,e,j,i,l,k;this.settings=f;this.images=[];c=0;for(e=a.length;c<e;c++)j=a[c],i=this.settings.getImageSource(j),l=this.settings.getImageCaption(j),
k=this.settings.getImageMetaData(j),this.images.push(new b.Image.ImageClass(j,i,l,k))},getImages:function(d){var f,c,e=[],j;f=0;for(c=d.length;f<c;f++){j=this.images[d[f]];if(this.settings.cacheMode===b.Cache.Mode.aggressive)j.cacheDoNotShrink=!0;e.push(j)}if(this.settings.cacheMode===b.Cache.Mode.aggressive){f=0;for(c=this.images.length;f<c;f++)j=this.images[f],a.objectHasProperty(j,"cacheDoNotShrink")?delete j.cacheDoNotShrink:j.shrinkImage()}return e}})})(window,window.klass,window.Code.Util,window.Code.PhotoSwipe.Image);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.DocumentOverlay");e.Code.PhotoSwipe.DocumentOverlay.CssClasses={documentOverlay:"ps-document-overlay"}})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.DocumentOverlay");var b=e.Code.PhotoSwipe;b.DocumentOverlay.DocumentOverlayClass=c({el:null,settings:null,initialBodyHeight:null,dispose:function(){var b;a.Animation.stop(this.el);a.DOM.removeChild(this.el,this.el.parentNode);for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(d){this.settings=d;this.el=a.DOM.createElement("div",{"class":b.DocumentOverlay.CssClasses.documentOverlay},"");a.DOM.setStyle(this.el,{display:"block",
position:"absolute",left:0,top:0,zIndex:this.settings.zIndex});a.DOM.hide(this.el);this.settings.target===e?a.DOM.appendToBody(this.el):a.DOM.appendChild(this.el,this.settings.target);a.Animation.resetTranslate(this.el);this.initialBodyHeight=a.DOM.bodyOuterHeight()},resetPosition:function(){var b,f,c;if(this.settings.target===e){b=a.DOM.windowWidth();f=a.DOM.bodyOuterHeight()*2;c=this.settings.jQueryMobile?a.DOM.windowScrollTop()+"px":"0px";if(f<1)f=this.initialBodyHeight;a.DOM.windowHeight()>f&&
(f=a.DOM.windowHeight())}else b=a.DOM.width(this.settings.target),f=a.DOM.height(this.settings.target),c="0px";a.DOM.setStyle(this.el,{width:b,height:f,top:c})},fadeIn:function(b,f){this.resetPosition();a.DOM.setStyle(this.el,"opacity",0);a.DOM.show(this.el);a.Animation.fadeIn(this.el,b,f)}})})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Carousel");e=e.Code.PhotoSwipe;e.Carousel.EventTypes={onSlideByEnd:"PhotoSwipeCarouselOnSlideByEnd",onSlideshowStart:"PhotoSwipeCarouselOnSlideshowStart",onSlideshowStop:"PhotoSwipeCarouselOnSlideshowStop"};e.Carousel.CssClasses={carousel:"ps-carousel",content:"ps-carousel-content",item:"ps-carousel-item",itemLoading:"ps-carousel-item-loading",itemError:"ps-carousel-item-error"};e.Carousel.SlideByAction={previous:"previous",current:"current",next:"next"}})(window,
window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Carousel");var b=e.Code.PhotoSwipe;b.Carousel.CarouselClass=c({el:null,contentEl:null,settings:null,cache:null,slideByEndHandler:null,currentCacheIndex:null,isSliding:null,isSlideshowActive:null,lastSlideByAction:null,touchStartPoint:null,touchStartPosition:null,imageLoadHandler:null,imageErrorHandler:null,slideshowTimeout:null,dispose:function(){var d,f,c;f=0;for(c=this.cache.images.length;f<c;f++)a.Events.remove(this.cache.images[f],b.Image.EventTypes.onLoad,
this.imageLoadHandler),a.Events.remove(this.cache.images[f],b.Image.EventTypes.onError,this.imageErrorHandler);this.stopSlideshow();a.Animation.stop(this.el);a.DOM.removeChild(this.el,this.el.parentNode);for(d in this)a.objectHasProperty(this,d)&&(this[d]=null)},initialize:function(d,f){var c,h,j;this.cache=d;this.settings=f;this.slideByEndHandler=this.onSlideByEnd.bind(this);this.imageLoadHandler=this.onImageLoad.bind(this);this.imageErrorHandler=this.onImageError.bind(this);this.currentCacheIndex=
0;this.isSlideshowActive=this.isSliding=!1;if(this.cache.images.length<3)this.settings.loop=!1;this.el=a.DOM.createElement("div",{"class":b.Carousel.CssClasses.carousel},"");a.DOM.setStyle(this.el,{display:"block",position:"absolute",left:0,top:0,overflow:"hidden",zIndex:this.settings.zIndex});a.DOM.hide(this.el);this.contentEl=a.DOM.createElement("div",{"class":b.Carousel.CssClasses.content},"");a.DOM.setStyle(this.contentEl,{display:"block",position:"absolute",left:0,top:0});a.DOM.appendChild(this.contentEl,
this.el);h=d.images.length<3?d.images.length:3;for(c=0;c<h;c++)j=a.DOM.createElement("div",{"class":b.Carousel.CssClasses.item+" "+b.Carousel.CssClasses.item+"-"+c},""),a.DOM.setAttribute(j,"style","float: left;"),a.DOM.setStyle(j,{display:"block",position:"relative",left:0,top:0,overflow:"hidden"}),this.settings.margin>0&&a.DOM.setStyle(j,{marginRight:this.settings.margin+"px"}),a.DOM.appendChild(j,this.contentEl);this.settings.target===e?a.DOM.appendToBody(this.el):a.DOM.appendChild(this.el,this.settings.target)},
resetPosition:function(){var d,f,c,h,j,i;this.settings.target===e?(d=a.DOM.windowWidth(),f=a.DOM.windowHeight(),c=a.DOM.windowScrollTop()+"px"):(d=a.DOM.width(this.settings.target),f=a.DOM.height(this.settings.target),c="0px");h=this.settings.margin>0?d+this.settings.margin:d;j=a.DOM.find("."+b.Carousel.CssClasses.item,this.contentEl);h*=j.length;a.DOM.setStyle(this.el,{top:c,width:d,height:f});a.DOM.setStyle(this.contentEl,{width:h,height:f});c=0;for(h=j.length;c<h;c++)i=j[c],a.DOM.setStyle(i,{width:d,
height:f}),i=a.DOM.find("img",i)[0],a.isNothing(i)||this.resetImagePosition(i);this.setContentLeftPosition()},resetImagePosition:function(b){if(!a.isNothing(b)){a.DOM.getAttribute(b,"src");var c,e,h,j=a.DOM.width(this.el),i=a.DOM.height(this.el);this.settings.imageScaleMethod==="fitNoUpscale"?(e=b.naturalWidth,h=b.naturalHeight,e>j&&(c=j/e,e=Math.round(e*c),h=Math.round(h*c)),h>i&&(c=i/h,h=Math.round(h*c),e=Math.round(e*c))):(c=b.isLandscape?j/b.naturalWidth:i/b.naturalHeight,e=Math.round(b.naturalWidth*
c),h=Math.round(b.naturalHeight*c),this.settings.imageScaleMethod==="zoom"?(c=1,h<i?c=i/h:e<j&&(c=j/e),c!==1&&(e=Math.round(e*c),h=Math.round(h*c))):this.settings.imageScaleMethod==="fit"&&(c=1,e>j?c=j/e:h>i&&(c=i/h),c!==1&&(e=Math.round(e*c),h=Math.round(h*c))));a.DOM.setStyle(b,{position:"absolute",width:e,height:h,top:Math.round((i-h)/2)+"px",left:Math.round((j-e)/2)+"px",display:"block"})}},setContentLeftPosition:function(){var b,c,g;b=this.settings.target===e?a.DOM.windowWidth():a.DOM.width(this.settings.target);
c=this.getItemEls();g=0;this.settings.loop?g=(b+this.settings.margin)*-1:this.currentCacheIndex===this.cache.images.length-1?g=(c.length-1)*(b+this.settings.margin)*-1:this.currentCacheIndex>0&&(g=(b+this.settings.margin)*-1);a.DOM.setStyle(this.contentEl,{left:g+"px"})},show:function(d){this.currentCacheIndex=d;this.resetPosition();this.setImages(!1);a.DOM.show(this.el);a.Animation.resetTranslate(this.contentEl);var d=this.getItemEls(),c,e;c=0;for(e=d.length;c<e;c++)a.Animation.resetTranslate(d[c]);
a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideByEnd,target:this,action:b.Carousel.SlideByAction.current,cacheIndex:this.currentCacheIndex})},setImages:function(a){var b,c=this.getItemEls();b=this.currentCacheIndex+1;var e=this.currentCacheIndex-1;this.settings.loop?(b>this.cache.images.length-1&&(b=0),e<0&&(e=this.cache.images.length-1),b=this.cache.getImages([e,this.currentCacheIndex,b]),a||this.addCacheImageToItemEl(b[1],c[1]),this.addCacheImageToItemEl(b[2],c[2]),this.addCacheImageToItemEl(b[0],
c[0])):c.length===1?a||(b=this.cache.getImages([this.currentCacheIndex]),this.addCacheImageToItemEl(b[0],c[0])):c.length===2?this.currentCacheIndex===0?(b=this.cache.getImages([this.currentCacheIndex,this.currentCacheIndex+1]),a||this.addCacheImageToItemEl(b[0],c[0]),this.addCacheImageToItemEl(b[1],c[1])):(b=this.cache.getImages([this.currentCacheIndex-1,this.currentCacheIndex]),a||this.addCacheImageToItemEl(b[1],c[1]),this.addCacheImageToItemEl(b[0],c[0])):this.currentCacheIndex===0?(b=this.cache.getImages([this.currentCacheIndex,
this.currentCacheIndex+1,this.currentCacheIndex+2]),a||this.addCacheImageToItemEl(b[0],c[0]),this.addCacheImageToItemEl(b[1],c[1]),this.addCacheImageToItemEl(b[2],c[2])):(this.currentCacheIndex===this.cache.images.length-1?(b=this.cache.getImages([this.currentCacheIndex-2,this.currentCacheIndex-1,this.currentCacheIndex]),a||this.addCacheImageToItemEl(b[2],c[2]),this.addCacheImageToItemEl(b[1],c[1])):(b=this.cache.getImages([this.currentCacheIndex-1,this.currentCacheIndex,this.currentCacheIndex+1]),
a||this.addCacheImageToItemEl(b[1],c[1]),this.addCacheImageToItemEl(b[2],c[2])),this.addCacheImageToItemEl(b[0],c[0]))},addCacheImageToItemEl:function(d,c){a.DOM.removeClass(c,b.Carousel.CssClasses.itemError);a.DOM.addClass(c,b.Carousel.CssClasses.itemLoading);a.DOM.removeChildren(c);a.DOM.setStyle(d.imageEl,{display:"none"});a.DOM.appendChild(d.imageEl,c);a.Animation.resetTranslate(d.imageEl);a.Events.add(d,b.Image.EventTypes.onLoad,this.imageLoadHandler);a.Events.add(d,b.Image.EventTypes.onError,
this.imageErrorHandler);d.load()},slideCarousel:function(d,c,g){if(!this.isSliding){var h,j;h=this.settings.target===e?a.DOM.windowWidth()+this.settings.margin:a.DOM.width(this.settings.target)+this.settings.margin;g=a.coalesce(g,this.settings.slideSpeed);if(!(e.Math.abs(j)<1)){switch(c){case a.TouchElement.ActionTypes.swipeLeft:d=h*-1;break;case a.TouchElement.ActionTypes.swipeRight:d=h;break;default:j=d.x-this.touchStartPoint.x,d=e.Math.abs(j)>h/2?j>0?h:h*-1:0}this.lastSlideByAction=d<0?b.Carousel.SlideByAction.next:
d>0?b.Carousel.SlideByAction.previous:b.Carousel.SlideByAction.current;if(!this.settings.loop&&(this.lastSlideByAction===b.Carousel.SlideByAction.previous&&this.currentCacheIndex===0||this.lastSlideByAction===b.Carousel.SlideByAction.next&&this.currentCacheIndex===this.cache.images.length-1))d=0,this.lastSlideByAction=b.Carousel.SlideByAction.current;this.isSliding=!0;this.doSlideCarousel(d,g)}}},moveCarousel:function(a){this.isSliding||this.settings.enableDrag&&this.doMoveCarousel(a.x-this.touchStartPoint.x)},
getItemEls:function(){return a.DOM.find("."+b.Carousel.CssClasses.item,this.contentEl)},previous:function(){this.stopSlideshow();this.slideCarousel({x:0,y:0},a.TouchElement.ActionTypes.swipeRight,this.settings.nextPreviousSlideSpeed)},next:function(){this.stopSlideshow();this.slideCarousel({x:0,y:0},a.TouchElement.ActionTypes.swipeLeft,this.settings.nextPreviousSlideSpeed)},slideshowNext:function(){this.slideCarousel({x:0,y:0},a.TouchElement.ActionTypes.swipeLeft)},startSlideshow:function(){this.stopSlideshow();
this.isSlideshowActive=!0;this.slideshowTimeout=e.setTimeout(this.slideshowNext.bind(this),this.settings.slideshowDelay);a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideshowStart,target:this})},stopSlideshow:function(){if(!a.isNothing(this.slideshowTimeout))e.clearTimeout(this.slideshowTimeout),this.slideshowTimeout=null,this.isSlideshowActive=!1,a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideshowStop,target:this})},onSlideByEnd:function(){if(!a.isNothing(this.isSliding)){var d=this.getItemEls();
this.isSliding=!1;this.lastSlideByAction===b.Carousel.SlideByAction.next?this.currentCacheIndex+=1:this.lastSlideByAction===b.Carousel.SlideByAction.previous&&(this.currentCacheIndex-=1);if(this.settings.loop)if(this.lastSlideByAction===b.Carousel.SlideByAction.next?a.DOM.appendChild(d[0],this.contentEl):this.lastSlideByAction===b.Carousel.SlideByAction.previous&&a.DOM.insertBefore(d[d.length-1],d[0],this.contentEl),this.currentCacheIndex<0)this.currentCacheIndex=this.cache.images.length-1;else{if(this.currentCacheIndex===
this.cache.images.length)this.currentCacheIndex=0}else this.cache.images.length>3&&(this.currentCacheIndex>1&&this.currentCacheIndex<this.cache.images.length-2?this.lastSlideByAction===b.Carousel.SlideByAction.next?a.DOM.appendChild(d[0],this.contentEl):this.lastSlideByAction===b.Carousel.SlideByAction.previous&&a.DOM.insertBefore(d[d.length-1],d[0],this.contentEl):this.currentCacheIndex===1?this.lastSlideByAction===b.Carousel.SlideByAction.previous&&a.DOM.insertBefore(d[d.length-1],d[0],this.contentEl):
this.currentCacheIndex===this.cache.images.length-2&&this.lastSlideByAction===b.Carousel.SlideByAction.next&&a.DOM.appendChild(d[0],this.contentEl));this.lastSlideByAction!==b.Carousel.SlideByAction.current&&(this.setContentLeftPosition(),this.setImages(!0));a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideByEnd,target:this,action:this.lastSlideByAction,cacheIndex:this.currentCacheIndex});this.isSlideshowActive&&(this.lastSlideByAction!==b.Carousel.SlideByAction.current?this.startSlideshow():
this.stopSlideshow())}},onTouch:function(b,c){this.stopSlideshow();switch(b){case a.TouchElement.ActionTypes.touchStart:this.touchStartPoint=c;this.touchStartPosition={x:e.parseInt(a.DOM.getStyle(this.contentEl,"left"),0),y:e.parseInt(a.DOM.getStyle(this.contentEl,"top"),0)};break;case a.TouchElement.ActionTypes.touchMove:this.moveCarousel(c);break;case a.TouchElement.ActionTypes.touchMoveEnd:case a.TouchElement.ActionTypes.swipeLeft:case a.TouchElement.ActionTypes.swipeRight:this.slideCarousel(c,
b)}},onImageLoad:function(d){d=d.target;a.isNothing(d.imageEl.parentNode)||(a.DOM.removeClass(d.imageEl.parentNode,b.Carousel.CssClasses.itemLoading),this.resetImagePosition(d.imageEl));a.Events.remove(d,b.Image.EventTypes.onLoad,this.imageLoadHandler);a.Events.remove(d,b.Image.EventTypes.onError,this.imageErrorHandler)},onImageError:function(d){d=d.target;a.isNothing(d.imageEl.parentNode)||(a.DOM.removeClass(d.imageEl.parentNode,b.Carousel.CssClasses.itemLoading),a.DOM.addClass(d.imageEl.parentNode,
b.Carousel.CssClasses.itemError));a.Events.remove(d,b.Image.EventTypes.onLoad,this.imageLoadHandler);a.Events.remove(d,b.Image.EventTypes.onError,this.imageErrorHandler)}})})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Carousel");c=e.Code.PhotoSwipe;c.Carousel.CarouselClass=c.Carousel.CarouselClass.extend({getStartingPos:function(){var b=this.touchStartPosition;a.isNothing(b)&&(b={x:e.parseInt(a.DOM.getStyle(this.contentEl,"left"),0),y:e.parseInt(a.DOM.getStyle(this.contentEl,"top"),0)});return b},doMoveCarousel:function(b){var d;a.Browser.isCSSTransformSupported?(d={},d[a.Animation._transitionPrefix+"Property"]="all",d[a.Animation._transitionPrefix+"Duration"]=
"",d[a.Animation._transitionPrefix+"TimingFunction"]="",d[a.Animation._transitionPrefix+"Delay"]="0",d[a.Animation._transformLabel]=a.Browser.is3dSupported?"translate3d("+b+"px, 0px, 0px)":"translate("+b+"px, 0px)",a.DOM.setStyle(this.contentEl,d)):a.isNothing(e.jQuery)||e.jQuery(this.contentEl).stop().css("left",this.getStartingPos().x+b+"px")},doSlideCarousel:function(b,d){var c;if(d<=0)this.slideByEndHandler();else if(a.Browser.isCSSTransformSupported)c=a.coalesce(this.contentEl.style.webkitTransform,
this.contentEl.style.MozTransform,this.contentEl.style.transform,""),c.indexOf("translate3d("+b)===0?this.slideByEndHandler():c.indexOf("translate("+b)===0?this.slideByEndHandler():a.Animation.slideBy(this.contentEl,b,0,d,this.slideByEndHandler,this.settings.slideTimingFunction);else if(!a.isNothing(e.jQuery)){c={left:this.getStartingPos().x+b+"px"};if(this.settings.animationTimingFunction==="ease-out")this.settings.animationTimingFunction="easeOutQuad";if(a.isNothing(e.jQuery.easing[this.settings.animationTimingFunction]))this.settings.animationTimingFunction=
"linear";e.jQuery(this.contentEl).animate(c,this.settings.slideSpeed,this.settings.animationTimingFunction,this.slideByEndHandler)}}})})(window,window.klass,window.Code.Util,window.Code.PhotoSwipe.TouchElement);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Toolbar");var b=e.Code.PhotoSwipe;b.Toolbar.CssClasses={toolbar:"ps-toolbar",toolbarContent:"ps-toolbar-content",toolbarTop:"ps-toolbar-top",caption:"ps-caption",captionBottom:"ps-caption-bottom",captionContent:"ps-caption-content",close:"ps-toolbar-close",play:"ps-toolbar-play",previous:"ps-toolbar-previous",previousDisabled:"ps-toolbar-previous-disabled",next:"ps-toolbar-next",nextDisabled:"ps-toolbar-next-disabled"};b.Toolbar.ToolbarAction=
{close:"close",play:"play",next:"next",previous:"previous",none:"none"};b.Toolbar.EventTypes={onTap:"PhotoSwipeToolbarOnClick",onBeforeShow:"PhotoSwipeToolbarOnBeforeShow",onShow:"PhotoSwipeToolbarOnShow",onBeforeHide:"PhotoSwipeToolbarOnBeforeHide",onHide:"PhotoSwipeToolbarOnHide"};b.Toolbar.getToolbar=function(){return'<div class="'+b.Toolbar.CssClasses.close+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+'"></div></div><div class="'+b.Toolbar.CssClasses.play+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+
'"></div></div><div class="'+b.Toolbar.CssClasses.previous+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+'"></div></div><div class="'+b.Toolbar.CssClasses.next+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+'"></div></div>'}})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.Toolbar");var b=e.Code.PhotoSwipe;b.Toolbar.ToolbarClass=c({toolbarEl:null,closeEl:null,playEl:null,previousEl:null,nextEl:null,captionEl:null,captionContentEl:null,currentCaption:null,settings:null,cache:null,timeout:null,isVisible:null,fadeOutHandler:null,touchStartHandler:null,touchMoveHandler:null,clickHandler:null,dispose:function(){var b;this.clearTimeout();this.removeEventHandlers();a.Animation.stop(this.toolbarEl);a.Animation.stop(this.captionEl);
a.DOM.removeChild(this.toolbarEl,this.toolbarEl.parentNode);a.DOM.removeChild(this.captionEl,this.captionEl.parentNode);for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(d,c){var g;this.settings=c;this.cache=d;this.isVisible=!1;this.fadeOutHandler=this.onFadeOut.bind(this);this.touchStartHandler=this.onTouchStart.bind(this);this.touchMoveHandler=this.onTouchMove.bind(this);this.clickHandler=this.onClick.bind(this);g=b.Toolbar.CssClasses.toolbar;this.settings.captionAndToolbarFlipPosition&&
(g=g+" "+b.Toolbar.CssClasses.toolbarTop);this.toolbarEl=a.DOM.createElement("div",{"class":g},this.settings.getToolbar());a.DOM.setStyle(this.toolbarEl,{left:0,position:"absolute",overflow:"hidden",zIndex:this.settings.zIndex});this.settings.target===e?a.DOM.appendToBody(this.toolbarEl):a.DOM.appendChild(this.toolbarEl,this.settings.target);a.DOM.hide(this.toolbarEl);this.closeEl=a.DOM.find("."+b.Toolbar.CssClasses.close,this.toolbarEl)[0];this.settings.preventHide&&!a.isNothing(this.closeEl)&&a.DOM.hide(this.closeEl);
this.playEl=a.DOM.find("."+b.Toolbar.CssClasses.play,this.toolbarEl)[0];this.settings.preventSlideshow&&!a.isNothing(this.playEl)&&a.DOM.hide(this.playEl);this.nextEl=a.DOM.find("."+b.Toolbar.CssClasses.next,this.toolbarEl)[0];this.previousEl=a.DOM.find("."+b.Toolbar.CssClasses.previous,this.toolbarEl)[0];g=b.Toolbar.CssClasses.caption;this.settings.captionAndToolbarFlipPosition&&(g=g+" "+b.Toolbar.CssClasses.captionBottom);this.captionEl=a.DOM.createElement("div",{"class":g},"");a.DOM.setStyle(this.captionEl,
{left:0,position:"absolute",overflow:"hidden",zIndex:this.settings.zIndex});this.settings.target===e?a.DOM.appendToBody(this.captionEl):a.DOM.appendChild(this.captionEl,this.settings.target);a.DOM.hide(this.captionEl);this.captionContentEl=a.DOM.createElement("div",{"class":b.Toolbar.CssClasses.captionContent},"");a.DOM.appendChild(this.captionContentEl,this.captionEl);this.addEventHandlers()},resetPosition:function(){var b,c,g;this.settings.target===e?(this.settings.captionAndToolbarFlipPosition?
(c=a.DOM.windowScrollTop(),g=a.DOM.windowScrollTop()+a.DOM.windowHeight()-a.DOM.height(this.captionEl)):(c=a.DOM.windowScrollTop()+a.DOM.windowHeight()-a.DOM.height(this.toolbarEl),g=a.DOM.windowScrollTop()),b=a.DOM.windowWidth()):(this.settings.captionAndToolbarFlipPosition?(c="0",g=a.DOM.height(this.settings.target)-a.DOM.height(this.captionEl)):(c=a.DOM.height(this.settings.target)-a.DOM.height(this.toolbarEl),g=0),b=a.DOM.width(this.settings.target));a.DOM.setStyle(this.toolbarEl,{top:c+"px",
width:b});a.DOM.setStyle(this.captionEl,{top:g+"px",width:b})},toggleVisibility:function(a){this.isVisible?this.fadeOut():this.show(a)},show:function(d){a.Animation.stop(this.toolbarEl);a.Animation.stop(this.captionEl);this.resetPosition();this.setToolbarStatus(d);a.Events.fire(this,{type:b.Toolbar.EventTypes.onBeforeShow,target:this});this.showToolbar();this.setCaption(d);this.showCaption();this.isVisible=!0;this.setTimeout();a.Events.fire(this,{type:b.Toolbar.EventTypes.onShow,target:this})},setTimeout:function(){if(this.settings.captionAndToolbarAutoHideDelay>
0)this.clearTimeout(),this.timeout=e.setTimeout(this.fadeOut.bind(this),this.settings.captionAndToolbarAutoHideDelay)},clearTimeout:function(){if(!a.isNothing(this.timeout))e.clearTimeout(this.timeout),this.timeout=null},fadeOut:function(){this.clearTimeout();a.Events.fire(this,{type:b.Toolbar.EventTypes.onBeforeHide,target:this});a.Animation.fadeOut(this.toolbarEl,this.settings.fadeOutSpeed);a.Animation.fadeOut(this.captionEl,this.settings.fadeOutSpeed,this.fadeOutHandler);this.isVisible=!1},addEventHandlers:function(){a.Browser.isTouchSupported&&
(a.Browser.blackberry||a.Events.add(this.toolbarEl,"touchstart",this.touchStartHandler),a.Events.add(this.toolbarEl,"touchmove",this.touchMoveHandler),a.Events.add(this.captionEl,"touchmove",this.touchMoveHandler));a.Events.add(this.toolbarEl,"click",this.clickHandler)},removeEventHandlers:function(){a.Browser.isTouchSupported&&(a.Browser.blackberry||a.Events.remove(this.toolbarEl,"touchstart",this.touchStartHandler),a.Events.remove(this.toolbarEl,"touchmove",this.touchMoveHandler),a.Events.remove(this.captionEl,
"touchmove",this.touchMoveHandler));a.Events.remove(this.toolbarEl,"click",this.clickHandler)},handleTap:function(d){this.clearTimeout();var c;if(d.target===this.nextEl||a.DOM.isChildOf(d.target,this.nextEl))c=b.Toolbar.ToolbarAction.next;else if(d.target===this.previousEl||a.DOM.isChildOf(d.target,this.previousEl))c=b.Toolbar.ToolbarAction.previous;else if(d.target===this.closeEl||a.DOM.isChildOf(d.target,this.closeEl))c=b.Toolbar.ToolbarAction.close;else if(d.target===this.playEl||a.DOM.isChildOf(d.target,
this.playEl))c=b.Toolbar.ToolbarAction.play;this.setTimeout();if(a.isNothing(c))c=b.Toolbar.ToolbarAction.none;a.Events.fire(this,{type:b.Toolbar.EventTypes.onTap,target:this,action:c,tapTarget:d.target})},setCaption:function(b){a.DOM.removeChildren(this.captionContentEl);this.currentCaption=a.coalesce(this.cache.images[b].caption,"\u00a0");if(a.isObject(this.currentCaption))a.DOM.appendChild(this.currentCaption,this.captionContentEl);else{if(this.currentCaption==="")this.currentCaption="\u00a0";
a.DOM.appendText(this.currentCaption,this.captionContentEl)}this.currentCaption=this.currentCaption==="\u00a0"?"":this.currentCaption;this.resetPosition()},showToolbar:function(){a.DOM.setStyle(this.toolbarEl,{opacity:this.settings.captionAndToolbarOpacity});a.DOM.show(this.toolbarEl)},showCaption:function(){(this.currentCaption===""||this.captionContentEl.childNodes.length<1)&&!this.settings.captionAndToolbarShowEmptyCaptions?a.DOM.hide(this.captionEl):(a.DOM.setStyle(this.captionEl,{opacity:this.settings.captionAndToolbarOpacity}),
a.DOM.show(this.captionEl))},setToolbarStatus:function(d){this.settings.loop||(a.DOM.removeClass(this.previousEl,b.Toolbar.CssClasses.previousDisabled),a.DOM.removeClass(this.nextEl,b.Toolbar.CssClasses.nextDisabled),d>0&&d<this.cache.images.length-1||(d===0&&(a.isNothing(this.previousEl)||a.DOM.addClass(this.previousEl,b.Toolbar.CssClasses.previousDisabled)),d===this.cache.images.length-1&&(a.isNothing(this.nextEl)||a.DOM.addClass(this.nextEl,b.Toolbar.CssClasses.nextDisabled))))},onFadeOut:function(){a.DOM.hide(this.toolbarEl);
a.DOM.hide(this.captionEl);a.Events.fire(this,{type:b.Toolbar.EventTypes.onHide,target:this})},onTouchStart:function(b){b.preventDefault();a.Events.remove(this.toolbarEl,"click",this.clickHandler);this.handleTap(b)},onTouchMove:function(a){a.preventDefault()},onClick:function(a){a.preventDefault();this.handleTap(a)}})})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.UILayer");e.Code.PhotoSwipe.UILayer.CssClasses={uiLayer:"ps-uilayer"}})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.UILayer");var b=e.Code.PhotoSwipe;b.UILayer.UILayerClass=a.TouchElement.TouchElementClass.extend({el:null,settings:null,dispose:function(){var b;this.removeEventHandlers();a.DOM.removeChild(this.el,this.el.parentNode);for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(d){this.settings=d;this.el=a.DOM.createElement("div",{"class":b.UILayer.CssClasses.uiLayer},"");a.DOM.setStyle(this.el,{display:"block",position:"absolute",
left:0,top:0,overflow:"hidden",zIndex:this.settings.zIndex,opacity:0});a.DOM.hide(this.el);this.settings.target===e?a.DOM.appendToBody(this.el):a.DOM.appendChild(this.el,this.settings.target);this.supr(this.el,{swipe:!0,move:!0,gesture:a.Browser.iOS,doubleTap:!0,preventDefaultTouchEvents:this.settings.preventDefaultTouchEvents})},resetPosition:function(){this.settings.target===e?a.DOM.setStyle(this.el,{top:a.DOM.windowScrollTop()+"px",width:a.DOM.windowWidth(),height:a.DOM.windowHeight()}):a.DOM.setStyle(this.el,
{top:"0px",width:a.DOM.width(this.settings.target),height:a.DOM.height(this.settings.target)})},show:function(){this.resetPosition();a.DOM.show(this.el);this.addEventHandlers()},addEventHandlers:function(){this.supr()},removeEventHandlers:function(){this.supr()}})})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.ZoomPanRotate");e=e.Code.PhotoSwipe;e.ZoomPanRotate.CssClasses={zoomPanRotate:"ps-zoom-pan-rotate"};e.ZoomPanRotate.EventTypes={onTransform:"PhotoSwipeZoomPanRotateOnTransform"}})(window,window.klass,window.Code.Util);
(function(e,c,a){a.registerNamespace("Code.PhotoSwipe.ZoomPanRotate");var b=e.Code.PhotoSwipe;b.ZoomPanRotate.ZoomPanRotateClass=c({el:null,settings:null,containerEl:null,imageEl:null,transformSettings:null,panStartingPoint:null,transformEl:null,dispose:function(){var b;a.DOM.removeChild(this.el,this.el.parentNode);for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(c,f,g){var h,j,i;this.settings=c;this.settings.target===e?(c=document.body,h=a.DOM.windowWidth(),j=a.DOM.windowHeight(),
i=a.DOM.windowScrollTop()+"px"):(c=this.settings.target,h=a.DOM.width(c),j=a.DOM.height(c),i="0px");this.imageEl=f.imageEl.cloneNode(!1);a.DOM.setStyle(this.imageEl,{zIndex:1});this.transformSettings={startingScale:1,scale:1,startingRotation:0,rotation:0,startingTranslateX:0,startingTranslateY:0,translateX:0,translateY:0};this.el=a.DOM.createElement("div",{"class":b.ZoomPanRotate.CssClasses.zoomPanRotate},"");a.DOM.setStyle(this.el,{left:0,top:i,position:"absolute",width:h,height:j,zIndex:this.settings.zIndex,
display:"block"});a.DOM.insertBefore(this.el,g.el,c);a.Browser.iOS?(this.containerEl=a.DOM.createElement("div"),a.DOM.setStyle(this.containerEl,{left:0,top:0,width:h,height:j,position:"absolute",zIndex:1}),a.DOM.appendChild(this.imageEl,this.containerEl),a.DOM.appendChild(this.containerEl,this.el),a.Animation.resetTranslate(this.containerEl),a.Animation.resetTranslate(this.imageEl),this.transformEl=this.containerEl):(a.DOM.appendChild(this.imageEl,this.el),this.transformEl=this.imageEl)},setStartingTranslateFromCurrentTransform:function(){var b=
a.coalesce(this.transformEl.style.webkitTransform,this.transformEl.style.MozTransform,this.transformEl.style.transform);if(!a.isNothing(b)&&(b=b.match(/translate\((.*?)\)/),!a.isNothing(b)))b=b[1].split(", "),this.transformSettings.startingTranslateX=e.parseInt(b[0],10),this.transformSettings.startingTranslateY=e.parseInt(b[1],10)},getScale:function(a){a*=this.transformSettings.startingScale;if(this.settings.minUserZoom!==0&&a<this.settings.minUserZoom)a=this.settings.minUserZoom;else if(this.settings.maxUserZoom!==
0&&a>this.settings.maxUserZoom)a=this.settings.maxUserZoom;return a},setStartingScaleAndRotation:function(a,b){this.transformSettings.startingScale=this.getScale(a);this.transformSettings.startingRotation=(this.transformSettings.startingRotation+b)%360},zoomRotate:function(a,b){this.transformSettings.scale=this.getScale(a);this.transformSettings.rotation=this.transformSettings.startingRotation+b;this.applyTransform()},panStart:function(a){this.setStartingTranslateFromCurrentTransform();this.panStartingPoint=
{x:a.x,y:a.y}},pan:function(a){var b=(a.y-this.panStartingPoint.y)/this.transformSettings.scale;this.transformSettings.translateX=this.transformSettings.startingTranslateX+(a.x-this.panStartingPoint.x)/this.transformSettings.scale;this.transformSettings.translateY=this.transformSettings.startingTranslateY+b;this.applyTransform()},zoomAndPanToPoint:function(b,c){if(this.settings.target===e){this.panStart({x:a.DOM.windowWidth()/2,y:a.DOM.windowHeight()/2});var g=(c.y-this.panStartingPoint.y)/this.transformSettings.scale;
this.transformSettings.translateX=(this.transformSettings.startingTranslateX+(c.x-this.panStartingPoint.x)/this.transformSettings.scale)*-1;this.transformSettings.translateY=(this.transformSettings.startingTranslateY+g)*-1}this.setStartingScaleAndRotation(b,0);this.transformSettings.scale=this.transformSettings.startingScale;this.transformSettings.rotation=0;this.applyTransform()},applyTransform:function(){var c=this.transformSettings.rotation%360,f=e.parseInt(this.transformSettings.translateX,10),
g=e.parseInt(this.transformSettings.translateY,10),h="scale("+this.transformSettings.scale+") rotate("+c+"deg) translate("+f+"px, "+g+"px)";a.DOM.setStyle(this.transformEl,{webkitTransform:h,MozTransform:h,msTransform:h,transform:h});a.Events.fire(this,{target:this,type:b.ZoomPanRotate.EventTypes.onTransform,scale:this.transformSettings.scale,rotation:this.transformSettings.rotation,rotationDegs:c,translateX:f,translateY:g})}})})(window,window.klass,window.Code.Util);
(function(e,c){c.registerNamespace("Code.PhotoSwipe");var a=e.Code.PhotoSwipe;a.CssClasses={buildingBody:"ps-building",activeBody:"ps-active"};a.EventTypes={onBeforeShow:"PhotoSwipeOnBeforeShow",onShow:"PhotoSwipeOnShow",onBeforeHide:"PhotoSwipeOnBeforeHide",onHide:"PhotoSwipeOnHide",onDisplayImage:"PhotoSwipeOnDisplayImage",onResetPosition:"PhotoSwipeOnResetPosition",onSlideshowStart:"PhotoSwipeOnSlideshowStart",onSlideshowStop:"PhotoSwipeOnSlideshowStop",onTouch:"PhotoSwipeOnTouch",onBeforeCaptionAndToolbarShow:"PhotoSwipeOnBeforeCaptionAndToolbarShow",
onCaptionAndToolbarShow:"PhotoSwipeOnCaptionAndToolbarShow",onBeforeCaptionAndToolbarHide:"PhotoSwipeOnBeforeCaptionAndToolbarHide",onCaptionAndToolbarHide:"PhotoSwipeOnCaptionAndToolbarHide",onToolbarTap:"PhotoSwipeOnToolbarTap",onBeforeZoomPanRotateShow:"PhotoSwipeOnBeforeZoomPanRotateShow",onZoomPanRotateShow:"PhotoSwipeOnZoomPanRotateShow",onBeforeZoomPanRotateHide:"PhotoSwipeOnBeforeZoomPanRotateHide",onZoomPanRotateHide:"PhotoSwipeOnZoomPanRotateHide",onZoomPanRotateTransform:"PhotoSwipeOnZoomPanRotateTransform"};
a.instances=[];a.activeInstances=[];a.setActivateInstance=function(b){if(c.arrayIndexOf(b.settings.target,a.activeInstances,"target")>-1)throw"Code.PhotoSwipe.activateInstance: Unable to active instance as another instance is already active for this target";a.activeInstances.push({target:b.settings.target,instance:b})};a.unsetActivateInstance=function(b){b=c.arrayIndexOf(b,a.activeInstances,"instance");a.activeInstances.splice(b,1)};a.attach=function(b,d,e){var g,h;g=a.createInstance(b,d,e);d=0;for(e=
b.length;d<e;d++)if(h=b[d],!c.isNothing(h.nodeType)&&h.nodeType===1)h.__photoSwipeClickHandler=a.onTriggerElementClick.bind(g),c.Events.remove(h,"click",h.__photoSwipeClickHandler),c.Events.add(h,"click",h.__photoSwipeClickHandler);return g};if(e.jQuery)e.jQuery.fn.photoSwipe=function(b,c){return a.attach(this,b,c)};a.detatch=function(b){var d,e,g;d=0;for(e=b.originalImages.length;d<e;d++)g=b.originalImages[d],!c.isNothing(g.nodeType)&&g.nodeType===1&&(c.Events.remove(g,"click",g.__photoSwipeClickHandler),
delete g.__photoSwipeClickHandler);a.disposeInstance(b)};a.createInstance=function(b,d,e){var g;if(c.isNothing(b))throw"Code.PhotoSwipe.attach: No images passed.";if(!c.isLikeArray(b))throw"Code.PhotoSwipe.createInstance: Images must be an array of elements or image urls.";if(b.length<1)throw"Code.PhotoSwipe.createInstance: No images to passed.";d=c.coalesce(d,{});g=a.getInstance(e);if(c.isNothing(g))g=new a.PhotoSwipeClass(b,d,e),a.instances.push(g);else throw'Code.PhotoSwipe.createInstance: Instance with id "'+
e+' already exists."';return g};a.disposeInstance=function(b){var c=a.getInstanceIndex(b);if(c<0)throw"Code.PhotoSwipe.disposeInstance: Unable to find instance to dispose.";b.dispose();a.instances.splice(c,1)};a.onTriggerElementClick=function(a){a.preventDefault();this.show(a.currentTarget)};a.getInstance=function(b){var c,e,g;c=0;for(e=a.instances.length;c<e;c++)if(g=a.instances[c],g.id===b)return g;return null};a.getInstanceIndex=function(b){var c,e,g=-1;c=0;for(e=a.instances.length;c<e;c++)if(a.instances[c]===
b){g=c;break}return g}})(window,window.Code.Util);
(function(e,c,a,b,d,f,g,h,j){a.registerNamespace("Code.PhotoSwipe");var i=e.Code.PhotoSwipe;i.PhotoSwipeClass=c({id:null,settings:null,isBackEventSupported:null,backButtonClicked:null,currentIndex:null,originalImages:null,mouseWheelStartTime:null,windowDimensions:null,cache:null,documentOverlay:null,carousel:null,uiLayer:null,toolbar:null,zoomPanRotate:null,windowOrientationChangeHandler:null,windowScrollHandler:null,windowHashChangeHandler:null,keyDownHandler:null,windowOrientationEventName:null,
uiLayerTouchHandler:null,carouselSlideByEndHandler:null,carouselSlideshowStartHandler:null,carouselSlideshowStopHandler:null,toolbarTapHandler:null,toolbarBeforeShowHandler:null,toolbarShowHandler:null,toolbarBeforeHideHandler:null,toolbarHideHandler:null,mouseWheelHandler:null,zoomPanRotateTransformHandler:null,_isResettingPosition:null,_uiWebViewResetPositionTimeout:null,dispose:function(){var b;a.Events.remove(this,i.EventTypes.onBeforeShow);a.Events.remove(this,i.EventTypes.onShow);a.Events.remove(this,
i.EventTypes.onBeforeHide);a.Events.remove(this,i.EventTypes.onHide);a.Events.remove(this,i.EventTypes.onDisplayImage);a.Events.remove(this,i.EventTypes.onResetPosition);a.Events.remove(this,i.EventTypes.onSlideshowStart);a.Events.remove(this,i.EventTypes.onSlideshowStop);a.Events.remove(this,i.EventTypes.onTouch);a.Events.remove(this,i.EventTypes.onBeforeCaptionAndToolbarShow);a.Events.remove(this,i.EventTypes.onCaptionAndToolbarShow);a.Events.remove(this,i.EventTypes.onBeforeCaptionAndToolbarHide);
a.Events.remove(this,i.EventTypes.onCaptionAndToolbarHide);a.Events.remove(this,i.EventTypes.onZoomPanRotateTransform);this.removeEventHandlers();a.isNothing(this.documentOverlay)||this.documentOverlay.dispose();a.isNothing(this.carousel)||this.carousel.dispose();a.isNothing(this.uiLayer)||this.uiLayer.dispose();a.isNothing(this.toolbar)||this.toolbar.dispose();this.destroyZoomPanRotate();a.isNothing(this.cache)||this.cache.dispose();for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(c,
d,f){this.id=a.isNothing(f)?"PhotoSwipe"+(new Date).getTime().toString():f;this.originalImages=c;if(a.Browser.android&&e.navigator.userAgent.match(/Android (\d+.\d+)/).toString().replace(/^.*\,/,"")>=2.1)this.isBackEventSupported=!0;if(!this.isBackEventSupported)this.isBackEventSupported=a.objectHasProperty(e,"onhashchange");this.settings={fadeInSpeed:250,fadeOutSpeed:250,preventHide:!1,preventSlideshow:!1,zIndex:1E3,backButtonHideEnabled:!0,enableKeyboard:!0,enableMouseWheel:!0,mouseWheelSpeed:350,
autoStartSlideshow:!1,jQueryMobile:!a.isNothing(e.jQuery)&&!a.isNothing(e.jQuery.mobile),jQueryMobileDialogHash:"&ui-state=dialog",enableUIWebViewRepositionTimeout:!1,uiWebViewResetPositionDelay:500,target:e,preventDefaultTouchEvents:!0,loop:!0,slideSpeed:250,nextPreviousSlideSpeed:0,enableDrag:!0,swipeThreshold:50,swipeTimeThreshold:250,slideTimingFunction:"ease-out",slideshowDelay:3E3,doubleTapSpeed:250,margin:20,imageScaleMethod:"fit",captionAndToolbarHide:!1,captionAndToolbarFlipPosition:!1,captionAndToolbarAutoHideDelay:5E3,
captionAndToolbarOpacity:0.8,captionAndToolbarShowEmptyCaptions:!0,getToolbar:i.Toolbar.getToolbar,allowUserZoom:!0,allowRotationOnUserZoom:!1,maxUserZoom:5,minUserZoom:0.5,doubleTapZoomLevel:2.5,getImageSource:i.Cache.Functions.getImageSource,getImageCaption:i.Cache.Functions.getImageCaption,getImageMetaData:i.Cache.Functions.getImageMetaData,cacheMode:i.Cache.Mode.normal};a.extend(this.settings,d);this.settings.target!==e&&(d=a.DOM.getStyle(this.settings.target,"position"),(d!=="relative"||d!==
"absolute")&&a.DOM.setStyle(this.settings.target,"position","relative"));if(this.settings.target!==e)this.isBackEventSupported=!1,this.settings.backButtonHideEnabled=!1;else if(this.settings.preventHide)this.settings.backButtonHideEnabled=!1;this.cache=new b.CacheClass(c,this.settings)},show:function(b){var c,d;this.backButtonClicked=this._isResettingPosition=!1;if(a.isNumber(b))this.currentIndex=b;else{this.currentIndex=-1;c=0;for(d=this.originalImages.length;c<d;c++)if(this.originalImages[c]===
b){this.currentIndex=c;break}}if(this.currentIndex<0||this.currentIndex>this.originalImages.length-1)throw"Code.PhotoSwipe.PhotoSwipeClass.show: Starting index out of range";this.isAlreadyGettingPage=this.getWindowDimensions();i.setActivateInstance(this);this.windowDimensions=this.getWindowDimensions();this.settings.target===e?a.DOM.addClass(e.document.body,i.CssClasses.buildingBody):a.DOM.addClass(this.settings.target,i.CssClasses.buildingBody);this.createComponents();a.Events.fire(this,{type:i.EventTypes.onBeforeShow,
target:this});this.documentOverlay.fadeIn(this.settings.fadeInSpeed,this.onDocumentOverlayFadeIn.bind(this))},getWindowDimensions:function(){return{width:a.DOM.windowWidth(),height:a.DOM.windowHeight()}},createComponents:function(){this.documentOverlay=new d.DocumentOverlayClass(this.settings);this.carousel=new f.CarouselClass(this.cache,this.settings);this.uiLayer=new h.UILayerClass(this.settings);if(!this.settings.captionAndToolbarHide)this.toolbar=new g.ToolbarClass(this.cache,this.settings)},
resetPosition:function(){if(!this._isResettingPosition){var b=this.getWindowDimensions();if(a.isNothing(this.windowDimensions)||!(b.width===this.windowDimensions.width&&b.height===this.windowDimensions.height))this._isResettingPosition=!0,this.windowDimensions=b,this.destroyZoomPanRotate(),this.documentOverlay.resetPosition(),this.carousel.resetPosition(),a.isNothing(this.toolbar)||this.toolbar.resetPosition(),this.uiLayer.resetPosition(),this._isResettingPosition=!1,a.Events.fire(this,{type:i.EventTypes.onResetPosition,
target:this})}},addEventHandler:function(b,c){a.Events.add(this,b,c)},addEventHandlers:function(){if(a.isNothing(this.windowOrientationChangeHandler))this.windowOrientationChangeHandler=this.onWindowOrientationChange.bind(this),this.windowScrollHandler=this.onWindowScroll.bind(this),this.keyDownHandler=this.onKeyDown.bind(this),this.windowHashChangeHandler=this.onWindowHashChange.bind(this),this.uiLayerTouchHandler=this.onUILayerTouch.bind(this),this.carouselSlideByEndHandler=this.onCarouselSlideByEnd.bind(this),
this.carouselSlideshowStartHandler=this.onCarouselSlideshowStart.bind(this),this.carouselSlideshowStopHandler=this.onCarouselSlideshowStop.bind(this),this.toolbarTapHandler=this.onToolbarTap.bind(this),this.toolbarBeforeShowHandler=this.onToolbarBeforeShow.bind(this),this.toolbarShowHandler=this.onToolbarShow.bind(this),this.toolbarBeforeHideHandler=this.onToolbarBeforeHide.bind(this),this.toolbarHideHandler=this.onToolbarHide.bind(this),this.mouseWheelHandler=this.onMouseWheel.bind(this),this.zoomPanRotateTransformHandler=
this.onZoomPanRotateTransform.bind(this);a.Browser.android?this.orientationEventName="resize":a.Browser.iOS&&!a.Browser.safari?a.Events.add(e.document.body,"orientationchange",this.windowOrientationChangeHandler):this.orientationEventName=!a.isNothing(e.onorientationchange)?"orientationchange":"resize";a.isNothing(this.orientationEventName)||a.Events.add(e,this.orientationEventName,this.windowOrientationChangeHandler);this.settings.target===e&&a.Events.add(e,"scroll",this.windowScrollHandler);this.settings.enableKeyboard&&
a.Events.add(e.document,"keydown",this.keyDownHandler);if(this.isBackEventSupported&&this.settings.backButtonHideEnabled)this.windowHashChangeHandler=this.onWindowHashChange.bind(this),this.settings.jQueryMobile?e.location.hash=this.settings.jQueryMobileDialogHash:(this.currentHistoryHashValue="PhotoSwipe"+(new Date).getTime().toString(),e.location.hash=this.currentHistoryHashValue),a.Events.add(e,"hashchange",this.windowHashChangeHandler);this.settings.enableMouseWheel&&a.Events.add(e,"mousewheel",
this.mouseWheelHandler);a.Events.add(this.uiLayer,a.TouchElement.EventTypes.onTouch,this.uiLayerTouchHandler);a.Events.add(this.carousel,f.EventTypes.onSlideByEnd,this.carouselSlideByEndHandler);a.Events.add(this.carousel,f.EventTypes.onSlideshowStart,this.carouselSlideshowStartHandler);a.Events.add(this.carousel,f.EventTypes.onSlideshowStop,this.carouselSlideshowStopHandler);a.isNothing(this.toolbar)||(a.Events.add(this.toolbar,g.EventTypes.onTap,this.toolbarTapHandler),a.Events.add(this.toolbar,
g.EventTypes.onBeforeShow,this.toolbarBeforeShowHandler),a.Events.add(this.toolbar,g.EventTypes.onShow,this.toolbarShowHandler),a.Events.add(this.toolbar,g.EventTypes.onBeforeHide,this.toolbarBeforeHideHandler),a.Events.add(this.toolbar,g.EventTypes.onHide,this.toolbarHideHandler))},removeEventHandlers:function(){a.Browser.iOS&&!a.Browser.safari&&a.Events.remove(e.document.body,"orientationchange",this.windowOrientationChangeHandler);a.isNothing(this.orientationEventName)||a.Events.remove(e,this.orientationEventName,
this.windowOrientationChangeHandler);a.Events.remove(e,"scroll",this.windowScrollHandler);this.settings.enableKeyboard&&a.Events.remove(e.document,"keydown",this.keyDownHandler);this.isBackEventSupported&&this.settings.backButtonHideEnabled&&a.Events.remove(e,"hashchange",this.windowHashChangeHandler);this.settings.enableMouseWheel&&a.Events.remove(e,"mousewheel",this.mouseWheelHandler);a.isNothing(this.uiLayer)||a.Events.remove(this.uiLayer,a.TouchElement.EventTypes.onTouch,this.uiLayerTouchHandler);
a.isNothing(this.toolbar)||(a.Events.remove(this.carousel,f.EventTypes.onSlideByEnd,this.carouselSlideByEndHandler),a.Events.remove(this.carousel,f.EventTypes.onSlideshowStart,this.carouselSlideshowStartHandler),a.Events.remove(this.carousel,f.EventTypes.onSlideshowStop,this.carouselSlideshowStopHandler));a.isNothing(this.toolbar)||(a.Events.remove(this.toolbar,g.EventTypes.onTap,this.toolbarTapHandler),a.Events.remove(this.toolbar,g.EventTypes.onBeforeShow,this.toolbarBeforeShowHandler),a.Events.remove(this.toolbar,
g.EventTypes.onShow,this.toolbarShowHandler),a.Events.remove(this.toolbar,g.EventTypes.onBeforeHide,this.toolbarBeforeHideHandler),a.Events.remove(this.toolbar,g.EventTypes.onHide,this.toolbarHideHandler))},hide:function(){if(!this.settings.preventHide){if(a.isNothing(this.documentOverlay))throw"Code.PhotoSwipe.PhotoSwipeClass.hide: PhotoSwipe instance is already hidden";if(a.isNothing(this.hiding)){this.clearUIWebViewResetPositionTimeout();this.destroyZoomPanRotate();this.removeEventHandlers();a.Events.fire(this,
{type:i.EventTypes.onBeforeHide,target:this});this.uiLayer.dispose();this.uiLayer=null;if(!a.isNothing(this.toolbar))this.toolbar.dispose(),this.toolbar=null;this.carousel.dispose();this.carousel=null;a.DOM.removeClass(e.document.body,i.CssClasses.activeBody);this.documentOverlay.dispose();this.documentOverlay=null;this._isResettingPosition=!1;i.unsetActivateInstance(this);a.Events.fire(this,{type:i.EventTypes.onHide,target:this});this.goBackInHistory()}}},goBackInHistory:function(){this.isBackEventSupported&&
this.settings.backButtonHideEnabled&&(this.backButtonClicked||e.history.back())},play:function(){!this.isZoomActive()&&!this.settings.preventSlideshow&&!a.isNothing(this.carousel)&&(!a.isNothing(this.toolbar)&&this.toolbar.isVisible&&this.toolbar.fadeOut(),this.carousel.startSlideshow())},stop:function(){this.isZoomActive()||a.isNothing(this.carousel)||this.carousel.stopSlideshow()},previous:function(){this.isZoomActive()||a.isNothing(this.carousel)||this.carousel.previous()},next:function(){this.isZoomActive()||
a.isNothing(this.carousel)||this.carousel.next()},toggleToolbar:function(){this.isZoomActive()||a.isNothing(this.toolbar)||this.toolbar.toggleVisibility(this.currentIndex)},fadeOutToolbarIfVisible:function(){!a.isNothing(this.toolbar)&&this.toolbar.isVisible&&this.settings.captionAndToolbarAutoHideDelay>0&&this.toolbar.fadeOut()},createZoomPanRotate:function(){this.stop();if(this.canUserZoom()&&!this.isZoomActive())a.Events.fire(this,i.EventTypes.onBeforeZoomPanRotateShow),this.zoomPanRotate=new j.ZoomPanRotateClass(this.settings,
this.cache.images[this.currentIndex],this.uiLayer),this.uiLayer.captureSettings.preventDefaultTouchEvents=!0,a.Events.add(this.zoomPanRotate,i.ZoomPanRotate.EventTypes.onTransform,this.zoomPanRotateTransformHandler),a.Events.fire(this,i.EventTypes.onZoomPanRotateShow),!a.isNothing(this.toolbar)&&this.toolbar.isVisible&&this.toolbar.fadeOut()},destroyZoomPanRotate:function(){if(!a.isNothing(this.zoomPanRotate))a.Events.fire(this,i.EventTypes.onBeforeZoomPanRotateHide),a.Events.remove(this.zoomPanRotate,
i.ZoomPanRotate.EventTypes.onTransform,this.zoomPanRotateTransformHandler),this.zoomPanRotate.dispose(),this.zoomPanRotate=null,this.uiLayer.captureSettings.preventDefaultTouchEvents=this.settings.preventDefaultTouchEvents,a.Events.fire(this,i.EventTypes.onZoomPanRotateHide)},canUserZoom:function(){var b;if(a.Browser.msie){if(b=document.createElement("div"),a.isNothing(b.style.msTransform))return!1}else if(!a.Browser.isCSSTransformSupported)return!1;if(!this.settings.allowUserZoom)return!1;if(this.carousel.isSliding)return!1;
b=this.cache.images[this.currentIndex];if(a.isNothing(b))return!1;if(b.isLoading)return!1;return!0},isZoomActive:function(){return!a.isNothing(this.zoomPanRotate)},getCurrentImage:function(){return this.cache.images[this.currentIndex]},onDocumentOverlayFadeIn:function(){e.setTimeout(function(){var b=this.settings.target===e?e.document.body:this.settings.target;a.DOM.removeClass(b,i.CssClasses.buildingBody);a.DOM.addClass(b,i.CssClasses.activeBody);this.addEventHandlers();this.carousel.show(this.currentIndex);
this.uiLayer.show();this.settings.autoStartSlideshow?this.play():a.isNothing(this.toolbar)||this.toolbar.show(this.currentIndex);a.Events.fire(this,{type:i.EventTypes.onShow,target:this});this.setUIWebViewResetPositionTimeout()}.bind(this),250)},setUIWebViewResetPositionTimeout:function(){if(this.settings.enableUIWebViewRepositionTimeout&&a.Browser.iOS&&!a.Browser.safari)a.isNothing(this._uiWebViewResetPositionTimeout)||e.clearTimeout(this._uiWebViewResetPositionTimeout),this._uiWebViewResetPositionTimeout=
e.setTimeout(function(){this.resetPosition();this.setUIWebViewResetPositionTimeout()}.bind(this),this.settings.uiWebViewResetPositionDelay)},clearUIWebViewResetPositionTimeout:function(){a.isNothing(this._uiWebViewResetPositionTimeout)||e.clearTimeout(this._uiWebViewResetPositionTimeout)},onWindowScroll:function(){this.resetPosition()},onWindowOrientationChange:function(){this.resetPosition()},onWindowHashChange:function(){if(e.location.hash!=="#"+(this.settings.jQueryMobile?this.settings.jQueryMobileDialogHash:
this.currentHistoryHashValue))this.backButtonClicked=!0,this.hide()},onKeyDown:function(a){a.keyCode===37?(a.preventDefault(),this.previous()):a.keyCode===39?(a.preventDefault(),this.next()):a.keyCode===38||a.keyCode===40?a.preventDefault():a.keyCode===27?(a.preventDefault(),this.hide()):a.keyCode===32?(this.settings.hideToolbar?this.hide():this.toggleToolbar(),a.preventDefault()):a.keyCode===13&&(a.preventDefault(),this.play())},onUILayerTouch:function(b){if(this.isZoomActive())switch(b.action){case a.TouchElement.ActionTypes.gestureChange:this.zoomPanRotate.zoomRotate(b.scale,
this.settings.allowRotationOnUserZoom?b.rotation:0);break;case a.TouchElement.ActionTypes.gestureEnd:this.zoomPanRotate.setStartingScaleAndRotation(b.scale,this.settings.allowRotationOnUserZoom?b.rotation:0);break;case a.TouchElement.ActionTypes.touchStart:this.zoomPanRotate.panStart(b.point);break;case a.TouchElement.ActionTypes.touchMove:this.zoomPanRotate.pan(b.point);break;case a.TouchElement.ActionTypes.doubleTap:this.destroyZoomPanRotate();this.toggleToolbar();break;case a.TouchElement.ActionTypes.swipeLeft:this.destroyZoomPanRotate();
this.next();this.toggleToolbar();break;case a.TouchElement.ActionTypes.swipeRight:this.destroyZoomPanRotate(),this.previous(),this.toggleToolbar()}else switch(b.action){case a.TouchElement.ActionTypes.touchMove:case a.TouchElement.ActionTypes.swipeLeft:case a.TouchElement.ActionTypes.swipeRight:this.fadeOutToolbarIfVisible();this.carousel.onTouch(b.action,b.point);break;case a.TouchElement.ActionTypes.touchStart:case a.TouchElement.ActionTypes.touchMoveEnd:this.carousel.onTouch(b.action,b.point);
break;case a.TouchElement.ActionTypes.tap:this.toggleToolbar();break;case a.TouchElement.ActionTypes.doubleTap:this.settings.target===e&&(b.point.x-=a.DOM.windowScrollLeft(),b.point.y-=a.DOM.windowScrollTop());var c=this.cache.images[this.currentIndex].imageEl,d=e.parseInt(a.DOM.getStyle(c,"top"),10),f=e.parseInt(a.DOM.getStyle(c,"left"),10),g=f+a.DOM.width(c),c=d+a.DOM.height(c);if(b.point.x<f)b.point.x=f;else if(b.point.x>g)b.point.x=g;if(b.point.y<d)b.point.y=d;else if(b.point.y>c)b.point.y=c;
this.createZoomPanRotate();this.isZoomActive()&&this.zoomPanRotate.zoomAndPanToPoint(this.settings.doubleTapZoomLevel,b.point);break;case a.TouchElement.ActionTypes.gestureStart:this.createZoomPanRotate()}a.Events.fire(this,{type:i.EventTypes.onTouch,target:this,point:b.point,action:b.action})},onCarouselSlideByEnd:function(b){this.currentIndex=b.cacheIndex;a.isNothing(this.toolbar)||(this.toolbar.setCaption(this.currentIndex),this.toolbar.setToolbarStatus(this.currentIndex));a.Events.fire(this,{type:i.EventTypes.onDisplayImage,
target:this,action:b.action,index:b.cacheIndex})},onToolbarTap:function(b){switch(b.action){case g.ToolbarAction.next:this.next();break;case g.ToolbarAction.previous:this.previous();break;case g.ToolbarAction.close:this.hide();break;case g.ToolbarAction.play:this.play()}a.Events.fire(this,{type:i.EventTypes.onToolbarTap,target:this,toolbarAction:b.action,tapTarget:b.tapTarget})},onMouseWheel:function(b){var c=a.Events.getWheelDelta(b);if(!(b.timeStamp-(this.mouseWheelStartTime||0)<this.settings.mouseWheelSpeed))this.mouseWheelStartTime=
b.timeStamp,this.settings.invertMouseWheel&&(c*=-1),c<0?this.next():c>0&&this.previous()},onCarouselSlideshowStart:function(){a.Events.fire(this,{type:i.EventTypes.onSlideshowStart,target:this})},onCarouselSlideshowStop:function(){a.Events.fire(this,{type:i.EventTypes.onSlideshowStop,target:this})},onToolbarBeforeShow:function(){a.Events.fire(this,{type:i.EventTypes.onBeforeCaptionAndToolbarShow,target:this})},onToolbarShow:function(){a.Events.fire(this,{type:i.EventTypes.onCaptionAndToolbarShow,
target:this})},onToolbarBeforeHide:function(){a.Events.fire(this,{type:i.EventTypes.onBeforeCaptionAndToolbarHide,target:this})},onToolbarHide:function(){a.Events.fire(this,{type:i.EventTypes.onCaptionAndToolbarHide,target:this})},onZoomPanRotateTransform:function(b){a.Events.fire(this,{target:this,type:i.EventTypes.onZoomPanRotateTransform,scale:b.scale,rotation:b.rotation,rotationDegs:b.rotationDegs,translateX:b.translateX,translateY:b.translateY})}})})(window,window.klass,window.Code.Util,window.Code.PhotoSwipe.Cache,
window.Code.PhotoSwipe.DocumentOverlay,window.Code.PhotoSwipe.Carousel,window.Code.PhotoSwipe.Toolbar,window.Code.PhotoSwipe.UILayer,window.Code.PhotoSwipe.ZoomPanRotate);
;
/*! Lity - v2.2.2 - 2016-12-14
* http://sorgalla.com/lity/
* Copyright (c) 2015-2016 Jan Sorgalla; Licensed MIT */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=b(a,require("jquery")):a.lity=b(a,a.jQuery||a.Zepto)}("undefined"!=typeof window?window:this,function(a,b){"use strict";function c(a){var b=B();return N&&a.length?(a.one(N,b.resolve),setTimeout(b.resolve,500)):b.resolve(),b.promise()}function d(a,c,d){if(1===arguments.length)return b.extend({},a);if("string"==typeof c){if("undefined"==typeof d)return"undefined"==typeof a[c]?null:a[c];a[c]=d}else b.extend(a,c);return this}function e(a){for(var b,c=decodeURI(a.split("#")[0]).split("&"),d={},e=0,f=c.length;e<f;e++)c[e]&&(b=c[e].split("="),d[b[0]]=b[1]);return d}function f(a,c){return a+(a.indexOf("?")>-1?"&":"?")+b.param(c)}function g(a,b){var c=a.indexOf("#");return-1===c?b:(c>0&&(a=a.substr(c)),b+a)}function h(a){return b('<span class="lity-error"/>').append(a)}function i(a,c){var d=c.opener()&&c.opener().data("lity-desc")||"Image with no description",e=b('<img src="'+a+'" alt="'+d+'"/>'),f=B(),g=function(){f.reject(h("Failed loading image"))};return e.on("load",function(){return 0===this.naturalWidth?g():void f.resolve(e)}).on("error",g),f.promise()}function j(a,c){var d,e,f;try{d=b(a)}catch(a){return!1}return!!d.length&&(e=b('<i style="display:none !important"/>'),f=d.hasClass("lity-hide"),c.element().one("lity:remove",function(){e.before(d).remove(),f&&!d.closest(".lity-content").length&&d.addClass("lity-hide")}),d.removeClass("lity-hide").after(e))}function k(a){var c=J.exec(a);return!!c&&o(g(a,f("https://www.youtube"+(c[2]||"")+".com/embed/"+c[4],b.extend({autoplay:1},e(c[5]||"")))))}function l(a){var c=K.exec(a);return!!c&&o(g(a,f("https://player.vimeo.com/video/"+c[3],b.extend({autoplay:1},e(c[4]||"")))))}function m(a){var c=M.exec(a);return!!c&&(0!==a.indexOf("http")&&(a="https:"+a),o(g(a,f("https://www.facebook.com/plugins/video.php?href="+a,b.extend({autoplay:1},e(c[4]||""))))))}function n(a){var b=L.exec(a);return!!b&&o(g(a,f("https://www.google."+b[3]+"/maps?"+b[6],{output:b[6].indexOf("layer=c")>0?"svembed":"embed"})))}function o(a){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+a+'"/></div>'}function p(){return z.documentElement.clientHeight?z.documentElement.clientHeight:Math.round(A.height())}function q(a){var b=v();b&&(27===a.keyCode&&b.close(),9===a.keyCode&&r(a,b))}function r(a,b){var c=b.element().find(G),d=c.index(z.activeElement);a.shiftKey&&d<=0?(c.get(c.length-1).focus(),a.preventDefault()):a.shiftKey||d!==c.length-1||(c.get(0).focus(),a.preventDefault())}function s(){b.each(D,function(a,b){b.resize()})}function t(a){1===D.unshift(a)&&(C.addClass("lity-active"),A.on({resize:s,keydown:q})),b("body > *").not(a.element()).addClass("lity-hidden").each(function(){var a=b(this);void 0===a.data(F)&&a.data(F,a.attr(E)||null)}).attr(E,"true")}function u(a){var c;a.element().attr(E,"true"),1===D.length&&(C.removeClass("lity-active"),A.off({resize:s,keydown:q})),D=b.grep(D,function(b){return a!==b}),c=D.length?D[0].element():b(".lity-hidden"),c.removeClass("lity-hidden").each(function(){var a=b(this),c=a.data(F);c?a.attr(E,c):a.removeAttr(E),a.removeData(F)})}function v(){return 0===D.length?null:D[0]}function w(a,c,d,e){var f,g="inline",h=b.extend({},d);return e&&h[e]?(f=h[e](a,c),g=e):(b.each(["inline","iframe"],function(a,b){delete h[b],h[b]=d[b]}),b.each(h,function(b,d){return!d||(!(!d.test||d.test(a,c))||(f=d(a,c),!1!==f?(g=b,!1):void 0))})),{handler:g,content:f||""}}function x(a,e,f,g){function h(a){k=b(a).css("max-height",p()+"px"),j.find(".lity-loader").each(function(){var a=b(this);c(a).always(function(){a.remove()})}),j.removeClass("lity-loading").find(".lity-content").empty().append(k),m=!0,k.trigger("lity:ready",[l])}var i,j,k,l=this,m=!1,n=!1;e=b.extend({},H,e),j=b(e.template),l.element=function(){return j},l.opener=function(){return f},l.options=b.proxy(d,l,e),l.handlers=b.proxy(d,l,e.handlers),l.resize=function(){m&&!n&&k.css("max-height",p()+"px").trigger("lity:resize",[l])},l.close=function(){if(m&&!n){n=!0,u(l);var a=B();if(g&&(z.activeElement===j[0]||b.contains(j[0],z.activeElement)))try{g.focus()}catch(a){}return k.trigger("lity:close",[l]),j.removeClass("lity-opened").addClass("lity-closed"),c(k.add(j)).always(function(){k.trigger("lity:remove",[l]),j.remove(),j=void 0,a.resolve()}),a.promise()}},i=w(a,l,e.handlers,e.handler),j.attr(E,"false").addClass("lity-loading lity-opened lity-"+i.handler).appendTo("body").focus().on("click","[data-lity-close]",function(a){b(a.target).is("[data-lity-close]")&&l.close()}).trigger("lity:open",[l]),t(l),b.when(i.content).always(h)}function y(a,c,d){a.preventDefault?(a.preventDefault(),d=b(this),a=d.data("lity-target")||d.attr("href")||d.attr("src")):d=b(d);var e=new x(a,b.extend({},d.data("lity-options")||d.data("lity"),c),d,z.activeElement);if(!a.preventDefault)return e}var z=a.document,A=b(a),B=b.Deferred,C=b("html"),D=[],E="aria-hidden",F="lity-"+E,G='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',H={handler:null,handlers:{image:i,inline:j,youtube:k,vimeo:l,googlemaps:n,facebookvideo:m,iframe:o},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'},I=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,J=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,K=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,L=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,M=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,N=function(){var a=z.createElement("div"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return b[c];return!1}();return i.test=function(a){return I.test(a)},y.version="2.2.2",y.options=b.proxy(d,y,H),y.handlers=b.proxy(d,y,H.handlers),y.current=v,b(z).on("click.lity","[data-lity]",y),y});;

// -----------------------------------------------------------------------------
// Utility functions for menu & menuwidget widgets. This file is meant to be
// compatible with published sites as well as within the editor (i.e. this
// file is a way to share/re-use code for menu widgets on published sites or
// within the editor).
// -----------------------------------------------------------------------------
(function($) {
  if (!($.iv)) { $.extend({ iv: {} }); }

  $.fn.iv_menu_util = function(options) {
    return this.each(function() {
      new jQuery.iv.menu_util(this, options);
    });
  };

  $.fn.iv_menu_util_show_sub_menu = function(menu, parent_menu) {
    return this.each(function() {
      jQuery.data(this, 'menu_util').show_sub_menu(menu, parent_menu);
    });
  };

  $.fn.iv_menu_util_hide_sub_menus = function(args) {
    return this.each(function() {
      jQuery.data(this, 'menu_util').hide_sub_menus(args);
    });
  };

  $.fn.iv_menu_util_expand = function(args) {
    return this.each(function() {
      jQuery.data(this, 'menu_util').expand(args);
    });
  };

  $.fn.iv_menu_util_collapse = function(args) {
    return this.each(function() {
      jQuery.data(this, 'menu_util').collapse(args);
    });
  };

  $.fn.iv_menu_util_menu_type = function() {
    return jQuery.data(this[0], 'menu_util').menu_type();
  };

  $.fn.iv_menu_util_in_editor = function(in_editor) {
    return this.each(function() {
      jQuery.data(this, 'menu_util').in_editor(in_editor);
    });
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Menu Util
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  $.iv.menu_util = function(el, options) {
    jQuery.data(el, 'menu_util', this);

    options = $.extend({
      auto_hide: true,      // auto-hide menu items
      in_editor: false,
      globals:   {
        open_sub_menus:      [],
        current_menu_item:   null,
        current_parent_menu: null,
        hide_timeouts:       []
      }
    }, options);

    var $$                 = $(el); // the menu widget
    var $sub_menus         = null;
    var next_submenu_index = 0;
    var prev_menu_type     = null;
    var menu_types         = {
      phone: 'box_menu'
    };

    // public methods
    this.show_sub_menu  = _show_sub_menu;
    this.hide_sub_menus = _hide_sub_menus;
    this.expand         = _expand;
    this.collapse       = _collapse;
    this.menu_type      = _menu_type;
    this.in_editor      = _in_editor;

    // ---------------------------------------------------------------------------
    function _in_editor(in_editor) {
      if (typeof(in_editor) !== 'undefined') {
        options.in_editor = in_editor;
      }

      return options.in_editor;
    }

    // ---------------------------------------------------------------------------
    function _get_doc_height() {
      if (!options.in_editor) {
        var D = document;
        return Math.max(
          Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
          Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
          Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
      }

      return $('#editor_page').height();
    }

    // ---------------------------------------------------------------------------
    function _get_doc_width() {
      if (!options.in_editor) {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }

      return $('#editor_content').width() - $.iv.scrollbar_width();
    }

    // ---------------------------------------------------------------------------
    function _menu_type() {
      if ($('#__res_main_nav_label', $$).length > 0 && $('#__res_main_nav_label', $$).css('display') != 'none') {
        return 'box_menu';
      }

      return 'default';
    }

    // ---------------------------------------------------------------------------
    function _is_using_responsive_menu() {
      if ($$.hasClass('b_menu')) {
        var $breakpoints = jQuery('head meta[name="breakpoints"]');

        if ($breakpoints.length == 1) {
          var widths    = $breakpoints.prop('content').split(',');
          var $res_menu = jQuery('#__res_main_nav_label'); // responsive menu label

          for (var i=0; i<widths.length; i++) {
            var doc_width = _get_doc_width();

            if (doc_width <= widths[i]) {
              if ($res_menu &&
                  $res_menu.length == 1 &&
                  $res_menu.css('display') != 'none') {
                $$.removeClass('default_menu').addClass('box_menu');
                return true;
              }
            }
          }
        }
      }

      $$.removeClass('box_menu').addClass('default_menu');

      return false;
    }

    // ---------------------------------------------------------------------------
    function _show_sub_menu(menu, parent_menu) {
      // TODO: Fix this line. Menuwidget submenus do not show!
      if (_is_using_responsive_menu()) { return; }

      // clear all timeouts
      while (options.globals.hide_timeouts.length) {
        clearTimeout(options.globals.hide_timeouts.pop());
      }

// COMMENTED: Now using CSS to show/hide submenus
//      // auto-hide menu items
//      if (options.auto_hide) {
//        if (options.globals.open_sub_menus.length) {
//          if (parent_menu == options.globals.current_parent_menu) {
//            var open_sub_menu = options.globals.open_sub_menus.pop();
//            open_sub_menu.css("visibility", "hidden");
//          }
//          else if (!parent_menu) {
//            while (options.globals.open_sub_menus.length) {
//              var open_sub_menu = options.globals.open_sub_menus.pop();
//              open_sub_menu.css("visibility", "hidden");
//            }
//          }
//        }
//      }

      // track the current parent menu
      options.globals.current_parent_menu = parent_menu;

      var id                = jQuery(menu).attr("id");
      var ul                = jQuery("#sub_"+id);
      var div_parent        = ul.parents("div:first");
      var padding_left      = parseInt(jQuery(menu).css("padding-left").replace(/px/, ""));
      var padding_right     = parseInt(jQuery(menu).css("padding-right").replace(/px/, ""));
      var padding_top       = parseInt(jQuery(menu).css("padding-top").replace(/px/, ""));
      var padding_bottom    = parseInt(jQuery(menu).css("padding-bottom").replace(/px/, ""));
      var ul_padding_left   = parseInt(ul.css("padding-left").replace(/px/, ""));
      var ul_padding_right  = parseInt(ul.css("padding-right").replace(/px/, ""));
      var ul_padding_top    = parseInt(ul.css("padding-top").replace(/px/, ""));
      var ul_padding_bottom = parseInt(ul.css("padding-bottom").replace(/px/, ""));
      var menu_position     = (ul.attr('menu_position'))?ul.attr('menu_position'):null;

// COMMENTED: Now using CSS to show/hide submenus
//      if (options.auto_hide) {
//        options.globals.open_sub_menus.push(ul);
//      }

      if (menu_position == 'top') {
        if (parent_menu) {
          // Sub sub menu & beyond

          // if submenu will expand past bottom of the page, move up instead
          if (jQuery(menu).offset().top + jQuery(menu).height() + ul_padding_top + ul_padding_bottom + ul.height() > _get_doc_height()) {
            ul.css("top", jQuery(menu).position().top - ul.height() + jQuery(menu).height() + padding_top + padding_bottom);
          } else {
            ul.css("top", jQuery(menu).position().top - ul_padding_top);
          }

          // If submenu goes off screen, move left instead.
          if (jQuery(menu).offset().left + jQuery(menu).width() + padding_left + padding_right + ul.width() > _get_doc_width()) {
            ul.css("left", jQuery(menu).position().left - ul.width());
          }
          else {
            ul.css("left", jQuery(menu).position().left + jQuery(menu).width() + padding_left + padding_right);
          }
        } else {
          // Initial submenu
          var ul_top;
          if (div_parent.css('position')) {
            var li = jQuery(menu);
            // Add 35 from activation bar
            if (li.position().top + li.height() + padding_top + padding_bottom + ul.height() + 35 > _get_doc_height()) {
              ul_top = li.position().top - ul.height();
            } else {
              // Get li height, not div
              ul_top = li.position().top + li.height() + padding_top + padding_bottom;
            }
          }

          ul.css("top", ul_top);
          if (jQuery(ul).parent().offset().left - ul_padding_left + ul.width() > _get_doc_width()) {
            // If submenu goes off screen, move left instead.
            ul.css("right", 0).css("left", "");
          }
          else {
            ul.css("left", jQuery(menu).position().left - ul_padding_left).css("right", "");
          }
        }
      }
      else if (menu_position == 'left') {
        if (parent_menu) {
          if (jQuery(menu).offset().top + ul_padding_bottom + ul_padding_top + ul.height() > _get_doc_height()) {
    	ul.css("top", jQuery(menu).position().top - ul.height() + jQuery(menu).height() + padding_top + padding_bottom);
          } else {
    	ul.css("top", jQuery(menu).position().top - ul_padding_top);
          }
        }
        else {
          // Initial submenu
          if (jQuery(menu).position().top - padding_top + ul.height() > _get_doc_height()) {
    	ul.css("top", _get_doc_height() - ul.height() - padding_top);
          } else {
    	ul.css("top", jQuery(menu).position().top);
          }
        }
        if (jQuery(menu).offset().left + jQuery(menu).width() + padding_left + padding_right + ul.width() > _get_doc_width()) {
          ul.css("left", jQuery(menu).position().left - ul.width());
          if (ul.offset().left < 0) { ul.css("left", 0); }
        }
        else {
          ul.css("left", jQuery(menu).position().left + jQuery(menu).width() + padding_left + padding_right);
          if (ul.offset().left + ul.width() > _get_doc_width()) {
            ul.css("left", jQuery(menu).position().left - ul.width());
            if (ul.offset().left < 0) { ul.css("left", 0); }
          }
        }
        //ul.css("left", jQuery(menu).position().left + jQuery(menu).width() + padding_left + padding_right);
      }
      else if (menu_position == 'right') {
        var ul_width = jQuery(ul).width();
        var max_width = 400;
        if (ul_width >= max_width) { ul_width = max_width; jQuery(ul).width(max_width) }
        ul.css("top", jQuery(menu).position().top - ul_padding_top);
        var left;
        if (jQuery(menu).offset().left - ul_width - ul_padding_left - ul_padding_right < 0) {
          left = jQuery(menu).position().left + ul_width + ul_padding_left + ul_padding_right;
        } else {
          left = jQuery(menu).position().left - ul_width - ul_padding_left - ul_padding_right;
        }
        ul.css("left", left);
      }
      else if (menu_position == 'bottom') {
        if (parent_menu) {
          // Sub sub menu & beyond
          ul.css("top", jQuery(menu).position().top - ul.height() + jQuery(menu).height());
          // If submenu goes off screen, move left instead.
          if (jQuery(menu).offset().left + jQuery(menu).width() + padding_left + padding_right + ul.width() > _get_doc_width()) {
            ul.css("left", jQuery(menu).position().left - ul.width());
          }
          else {
            ul.css("left", jQuery(menu).position().left + jQuery(menu).width() + padding_left + padding_right);
          }
        } else {
          // Initial submenu
          var ul_top;
          if (div_parent.css('position')) {
            var li = jQuery(menu);
            ul_top = li.position().top - padding_top - ul.height();
          }

          ul.css("top", ul_top);
          if (jQuery(menu).offset().left - ul_padding_left + ul.width() > _get_doc_width()) {
            // If submenu goes off screen, move left instead.
            ul.css("left", _get_doc_width() - ul.width());
          }
          else {
            ul.css("left", jQuery(menu).position().left - ul_padding_left);
          }
        }
      }

// COMMENTED: Now using CSS to show/hide submenus
//      ul.css("visibility", "visible")
      ul.css("position", "absolute")
        .css("z-index", 940000)
        .show();

      jQuery('a', ul).css('float', 'none');

      // Handle menus that overlap video widgets
      // ---------------------------------------
      var $sub_menu     = jQuery('.sub_menu', parent_menu);
      var sub_menu_rect = ($sub_menu[0]) ? $sub_menu[0].getBoundingClientRect() : undefined;

      jQuery('div[block_type="video"] video').each(function() {
        var overlap = false;
        if (sub_menu_rect) {
          // Check for overlapping.  If video/menu overlap then
          // force pause.
          var video_rect = this.getBoundingClientRect();
          overlap        = !(sub_menu_rect.right < video_rect.left ||
                           sub_menu_rect.left > video_rect.right ||
                           sub_menu_rect.bottom < video_rect.top ||
                           sub_menu_rect.top > video_rect.bottom);
        }
        if (overlap) {
          jQuery(this).get(0).pause();
        }
      });

      if (!jQuery('div[block_type="video"] video').hasClass('vjs-tech')) {
        jQuery('div[block_type="video"] video').addClass('hidden');
        jQuery('div[block_type="video"] img.video_preview').removeClass('hidden');
      }
      // ---------------------------------------
    }

    // ---------------------------------------------------------------------------
    function _hide_sub_menus(args) {
// COMMENTED: Now using CSS to show/hide submenus
//      if (_is_using_responsive_menu()) { return; }
//
//      args = args || {};
//
//      var now  = args['now'];
//      var time = (now)?1:500;
//
//      options.globals.hide_timeouts.push(setTimeout(function () {
//        if (!options.globals.current_menu_item) {
//          while (options.globals.open_sub_menus.length) {
//            var open_sub_menu = options.globals.open_sub_menus.pop();
//            open_sub_menu.css("visibility", "hidden");
//            jQuery('.video video').removeClass('hidden');
//            jQuery('.video img.video_preview').addClass('hidden');
//          }
//        }
//      }, time));
    }

    // -------------------------------------------------------------------------
    function _expand(args) {
      args = args || {};

      var menu_type = _menu_type();

      if (prev_menu_type !== menu_type) {
        _collapse(args);
        prev_menu_type = menu_type;
      }

      switch(menu_type) {
        case 'box_menu':
          _expand_for_box_menu(args);
          break;
        default:
          _expand_for_default(args);
      }
    }

    // -------------------------------------------------------------------------
    function _expand_for_box_menu(args) {
      args = args || {};

      var $menu     = $$;
      var menu_type = _menu_type();

      if (!$sub_menus) {
        $sub_menus         = $('ul', $menu);
        next_submenu_index = 0;
      }

      var $ul        = null;
      var $prev_ul   = null;
      var prev_index = next_submenu_index - 1;

      // the next ul to show
      if ($sub_menus.length) {
        if ($sub_menus.length - 1 < next_submenu_index) {
          _collapse({
            menu_type:     menu_type,
            keep_submenus: true
          });
        }

        $ul = $($sub_menus[next_submenu_index]);
      }
      else {
        return _collapse({ menu_type: menu_type });
      }

      // the previous ul
      if ($sub_menus.length - 2 >= prev_index) {
        $prev_ul = $($sub_menus[prev_index]);
      }

      if ($ul) {
        var ul_id      = $ul[0].id;
        var $parent_ul = ($ul.hasClass('sub_menu'))?$ul.parents('ul'):null;

        if ($parent_ul && $parent_ul.length > 0) {
          // if the previous ul exists and is not the root ul and is not the
          // same as the parent ul, we need to hide the previous ul and possibly
          // its parents
          if (prev_index !== 0 &&
              $prev_ul &&
              $prev_ul.length > 0 &&
              $parent_ul[0].id !== $prev_ul[0].id) {
            var $cb = $($prev_ul.prevAll('input[type="checkbox"]')[0]);
            $cb.removeAttr('checked');

            var parents = $prev_ul.parents('ul.sub_menu');
            for (var idx=0; idx<parents.length; idx++) {
              if (parents[idx].id !== $parent_ul[0].id) {
                var $cb = $($(parents[idx]).prevAll('input[type="checkbox"]')[0]);
                $cb.removeAttr('checked');
              }
              else {
                break;
              }
            }
          }
        }

        // clear inline styles
        $ul.removeAttr('style');

        // show the next sub menu
        var $cb = $($ul.prevAll('input[type="checkbox"]')[0]);
        $cb.attr('checked', 'checked');

        // show the sub view
        $ul.css('visibility', 'visible');

        next_submenu_index += 1;
      }
    }

    // -------------------------------------------------------------------------
    function _expand_for_default(args) {
      args = args || {};

      var $menu = $$;

      if (!$sub_menus) {
        $sub_menus         = $('ul.sub_menu', $menu);
        next_submenu_index = 0;
      }

      var $ul        = null;
      var $prev_ul   = null;
      var prev_index = next_submenu_index - 1;

      // the next ul to show
      if ($sub_menus.length) {
        if ($sub_menus.length - 1 < next_submenu_index) {
          _collapse({ keep_submenus: true });
        }

        $ul = $($sub_menus[next_submenu_index]);
      }
      else {
        return _collapse();
      }

      // the previous ul
      if ($sub_menus.length - 2 >= prev_index) {
        $prev_ul = $($sub_menus[prev_index]);
      }

      if ($ul) {
        var ul_id       = $ul[0].id;
        var a_id        = ul_id.replace('sub_', '');
        var $submenu    = $('#'+a_id, $menu);
        var parent_menu = null;
        var $parent_ul  = $submenu.parents('ul');

        if ($parent_ul.length > 0) {
          // if the previous ul exists and is not the same as the parent ul,
          // we need to hide the previous ul and possibly its parents
          if ($prev_ul && $prev_ul.length > 0 && $parent_ul[0].id !== $prev_ul[0].id) {
            $prev_ul.hide().css('visibility', '');
            var parents = $prev_ul.parents('ul.sub_menu');
            for (var idx=0; idx<parents.length; idx++) {
              if (parents[idx].id !== $parent_ul[0].id) {
                $(parents[idx]).hide().css('visibility', '');
              }
              else {
                break;
              }
            }
          }

          // get the actual parent element
          if ($parent_ul.hasClass('sub_menu')) {
            var parent_id = $parent_ul[0].id.replace('sub_', '');
            var $parent_menu = $('#'+parent_id, $menu);
            parent_menu = $parent_menu[0];
          }
        }

        // position the next sub menu
        _show_sub_menu($submenu[0], parent_menu);

        // show the sub view
        $ul.css('visibility', 'visible');

        next_submenu_index += 1;
      }
    }

    // -------------------------------------------------------------------------
    function _collapse(args) {
      args = args || {};

      var menu_type = _menu_type();

      switch(menu_type) {
        case 'box_menu':
          _collapse_for_box_menu(args);
          break;
        default:
          _collapse_for_default(args);
      }
    }

    // -------------------------------------------------------------------------
    function _collapse_for_box_menu(args) {
      args = args || {};

      var $menu = $$;

      $('input[type="checkbox"]', $menu).each(function() {
        $(this).prop('checked', false);
      });

      $('ul li ul', $menu).each(function() {
        $(this).hide().css('visibility', '');
      });

      if (!args['keep_submenus']) { $sub_menus = null; }

      next_submenu_index = 0;
    }

    // -------------------------------------------------------------------------
    function _collapse_for_default(args) {
      args = args || {};

      var $menu = $$;

      // Don't collapse menu trees
      if ($('div.menuwidget_vertical_tree', $menu)[0]) {
        return;
      }

      $('ul li ul', $menu).each(function() {
        $(this).hide().css('visibility', '');
      });

      if (!args['keep_submenus']) { $sub_menus = null; }

      next_submenu_index = 0;
    }

    // ---------------------------------------------------------------------------
  };

})(jQuery);
;

// -------------------------------------------
// This file is for website menu blocks
//   It is needed for the display on published sites
//   This only works for single menus.  Will need to be changed for menu widgets
// -------------------------------------------

var _iv_menu_globals = {
  open_sub_menus:      [],
  current_menu_item:   null,
  current_parent_menu: null,
  hide_timeouts:       [],
  prev_window_width:   0
};

// wait until the DOM is ready before creating objects
jQuery(document).ready(function() {
  // all menu and menuwidget widgets should have menu_util objects
  jQuery('div.b_menu').iv_menu_util({ globals: _iv_menu_globals });
  jQuery('div.b_menuwidget').iv_menu_util({ globals: _iv_menu_globals });
});

// Helper function used by the dimensions and offset modules
function num(elem, prop) {
  return elem[0] && parseInt( jQuery.css(elem[0], prop, true), 10 ) || 0;
}

function _on_responsive_resize() {
  var $res_menu = jQuery('#__res_main_nav_label'); // responsive menu label

  if ($res_menu && $res_menu.length == 1 && _iv_menu_globals.prev_window_width != jQuery(window).width()) {
    jQuery('ul li ul', $res_menu.parent()).hide();
    jQuery('input[type="checkbox"]:checked', $res_menu.parent()).prop('checked', false);
  }
}

function _init_responsive_menu() {
  var $res_menu = jQuery('#__res_main_nav_label'); // responsive menu label

  _iv_menu_globals.prev_window_width = jQuery(window).width();

  if ($res_menu && $res_menu.length == 1) {
    jQuery(window).unbind('resize', _on_responsive_resize).resize(_on_responsive_resize);

    var clear_styles = function($obj) {
      $obj.parent().find('ul').removeAttr('style');
      $obj.parent().find('ul li').removeAttr('style');
      $obj.parent().find('ul li a').removeAttr('style');
    };

    $res_menu.unbind().click(function() { clear_styles(jQuery(this)); });

    // All links without a destination should operate as toggles to open/close their submenu if applicable.
    jQuery('ul li a[nodes="1"]', $res_menu.parent()).each(function(idx, ele) {
      if (jQuery('~ input', jQuery(ele)).length === 1) {
        jQuery(ele).unbind().click(function() {
          jQuery('~ input', jQuery(this)).prop('checked', !(jQuery('~ input', jQuery(this)).prop('checked')));
        });
      }
    });

    jQuery('.res_main_nav_label_child', $res_menu.parent()).unbind().click(function() {
      clear_styles(jQuery(this));
    });
  }
}

function _show_sub_menu(menu, parent_menu) {
  var widget_div = (jQuery(menu).parents('.b_menu')[0])
                    ?jQuery(menu).parents('.b_menu')[0]
                    :jQuery(menu).parents('.b_menuwidget')[0];
  jQuery(widget_div).iv_menu_util_show_sub_menu(menu, parent_menu);
}

function _hide_sub_menus(now) {
  jQuery('div.b_menu').each(function() {
    jQuery(this).iv_menu_util_hide_sub_menus({
      now: now
    });
  });
  jQuery('div.b_menuwidget').each(function() {
    jQuery(this).iv_menu_util_hide_sub_menus({
      now: now
    });
  });
}
;
(function($) { $("#566a576c64b7082ceae69aa4f22119ac").iv_widget({ values: "D%2BZSi6l5eQKnDsXQiEhJKog38AnoqyCb8hyjpJXfkFCKxTGs10g4UuNzV2ORmR8o6eQmjfUzuBM96O%2FHwvK%2FGUrNvgysRsZOrMHF05lK2ZHvlgwyvDY%2FPmpHwz%2BgmAkclj0KsT5rg1w%3D", no_parent: true }); })(jQuery);

jQuery(".mmb").iv_mobile_menu_button();

    jQuery("body").css("height", "auto");
    jQuery("span.top", jQuery("#device_view")).click(function() {
      jQuery("html, body").animate({ scrollTop: 0 }, 0);
    });
if (addToHome.isIDevice) {
      jQuery("#device_view a").first().after("<span class=\"smf_button add_to_home\">Add to Home</span>");
      jQuery("#device_view .add_to_home").click(function() { addToHome.show(true); });
    }
