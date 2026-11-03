var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());;/*! jQuery Migrate v1.3.0 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b,c){function d(c){var d=b.console;f[c]||(f[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function e(b,c,e,f){if(Object.defineProperty)try{return void Object.defineProperty(b,c,{configurable:!0,enumerable:!0,get:function(){return d(f),e},set:function(a){d(f),e=a}})}catch(g){}a._definePropertyBroken=!0,b[c]=e}a.migrateVersion="1.3.0";var f={};a.migrateWarnings=[],!a.migrateMute&&b.console&&b.console.log&&b.console.log("JQMIGRATE: Logging is active"),a.migrateTrace===c&&(a.migrateTrace=!0),a.migrateReset=function(){f={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&d("jQuery is not compatible with Quirks Mode");var g=a("<input/>",{size:1}).attr("size")&&a.attrFn,h=a.attr,i=a.attrHooks.value&&a.attrHooks.value.get||function(){return null},j=a.attrHooks.value&&a.attrHooks.value.set||function(){return c},k=/^(?:input|button)$/i,l=/^[238]$/,m=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,n=/^(?:checked|selected)$/i;e(a,"attrFn",g||{},"jQuery.attrFn is deprecated"),a.attr=function(b,e,f,i){var j=e.toLowerCase(),o=b&&b.nodeType;return i&&(h.length<4&&d("jQuery.fn.attr( props, pass ) is deprecated"),b&&!l.test(o)&&(g?e in g:a.isFunction(a.fn[e])))?a(b)[e](f):("type"===e&&f!==c&&k.test(b.nodeName)&&b.parentNode&&d("Can't change the 'type' of an input or button in IE 6/7/8"),!a.attrHooks[j]&&m.test(j)&&(a.attrHooks[j]={get:function(b,d){var e,f=a.prop(b,d);return f===!0||"boolean"!=typeof f&&(e=b.getAttributeNode(d))&&e.nodeValue!==!1?d.toLowerCase():c},set:function(b,c,d){var e;return c===!1?a.removeAttr(b,d):(e=a.propFix[d]||d,e in b&&(b[e]=!0),b.setAttribute(d,d.toLowerCase())),d}},n.test(j)&&d("jQuery.fn.attr('"+j+"') might use property instead of attribute")),h.call(a,b,e,f))},a.attrHooks.value={get:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?i.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value') no longer gets properties"),b in a?a.value:null)},set:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?j.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value', val) no longer sets properties"),void(a.value=b))}};var o,p,q=a.fn.init,r=a.parseJSON,s=/^\s*</,t=/^([^<]*)(<[\w\W]+>)([^>]*)$/;a.fn.init=function(b,e,f){var g,h;return b&&"string"==typeof b&&!a.isPlainObject(e)&&(g=t.exec(a.trim(b)))&&g[0]&&(s.test(b)||d("$(html) HTML strings must start with '<' character"),g[3]&&d("$(html) HTML text after last tag is ignored"),"#"===g[0].charAt(0)&&(d("HTML string cannot start with a '#' character"),a.error("JQMIGRATE: Invalid selector string (XSS)")),e&&e.context&&(e=e.context),a.parseHTML)?q.call(this,a.parseHTML(g[2],e&&e.ownerDocument||e||document,!0),e,f):("#"===b&&(d("jQuery( '#' ) is not a valid selector"),b=[]),h=q.apply(this,arguments),b&&b.selector!==c?(h.selector=b.selector,h.context=b.context):(h.selector="string"==typeof b?b:"",b&&(h.context=b.nodeType?b:e||document)),h)},a.fn.init.prototype=a.fn,a.parseJSON=function(a){return a?r.apply(this,arguments):(d("jQuery.parseJSON requires a valid JSON string"),null)},a.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a.browser||(o=a.uaMatch(navigator.userAgent),p={},o.browser&&(p[o.browser]=!0,p.version=o.version),p.chrome?p.webkit=!0:p.webkit&&(p.safari=!0),a.browser=p),e(a,"browser",a.browser,"jQuery.browser is deprecated"),a.boxModel=a.support.boxModel="CSS1Compat"===document.compatMode,e(a,"boxModel",a.boxModel,"jQuery.boxModel is deprecated"),e(a.support,"boxModel",a.support.boxModel,"jQuery.support.boxModel is deprecated"),a.sub=function(){function b(a,c){return new b.fn.init(a,c)}a.extend(!0,b,this),b.superclass=this,b.fn=b.prototype=this(),b.fn.constructor=b,b.sub=this.sub,b.fn.init=function(d,e){var f=a.fn.init.call(this,d,e,c);return f instanceof b?f:b(f)},b.fn.init.prototype=b.fn;var c=b(document);return d("jQuery.sub() is deprecated"),b},a.fn.size=function(){return d("jQuery.fn.size() is deprecated; use the .length property"),this.length};var u=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return u=!0,a=d.apply(this,arguments),u=!1,a})}),a.swap=function(a,b,c,e){var f,g,h={};u||d("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=c.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f},a.ajaxSetup({converters:{"text json":a.parseJSON}});var v=a.fn.data;a.fn.data=function(b){var e,f,g=this[0];return!g||"events"!==b||1!==arguments.length||(e=a.data(g,b),f=a._data(g,b),e!==c&&e!==f||f===c)?v.apply(this,arguments):(d("Use of jQuery.fn.data('events') is deprecated"),f)};var w=/\/(java|ecma)script/i;a.clean||(a.clean=function(b,c,e,f){c=c||document,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,d("jQuery.clean() is deprecated");var g,h,i,j,k=[];if(a.merge(k,a.buildFragment(b,c).childNodes),e)for(i=function(a){return!a.type||w.test(a.type)?f?f.push(a.parentNode?a.parentNode.removeChild(a):a):e.appendChild(a):void 0},g=0;null!=(h=k[g]);g++)a.nodeName(h,"script")&&i(h)||(e.appendChild(h),"undefined"!=typeof h.getElementsByTagName&&(j=a.grep(a.merge([],h.getElementsByTagName("script")),i),k.splice.apply(k,[g+1,0].concat(j)),g+=j.length));return k});var x=a.event.add,y=a.event.remove,z=a.event.trigger,A=a.fn.toggle,B=a.fn.live,C=a.fn.die,D=a.fn.load,E="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",F=new RegExp("\\b(?:"+E+")\\b"),G=/(?:^|\s)hover(\.\S+|)\b/,H=function(b){return"string"!=typeof b||a.event.special.hover?b:(G.test(b)&&d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),b&&b.replace(G,"mouseenter$1 mouseleave$1"))};a.event.props&&"attrChange"!==a.event.props[0]&&a.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),a.event.dispatch&&e(a.event,"handle",a.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),a.event.add=function(a,b,c,e,f){a!==document&&F.test(b)&&d("AJAX events should be attached to document: "+b),x.call(this,a,H(b||""),c,e,f)},a.event.remove=function(a,b,c,d,e){y.call(this,a,H(b)||"",c,d,e)},a.each(["load","unload","error"],function(b,c){a.fn[c]=function(){var a=Array.prototype.slice.call(arguments,0);return d("jQuery.fn."+c+"() is deprecated"),"load"===c&&"string"==typeof arguments[0]?D.apply(this,arguments):(a.splice(0,0,c),arguments.length?this.bind.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a.fn.toggle=function(b,c){if(!a.isFunction(b)||!a.isFunction(c))return A.apply(this,arguments);d("jQuery.fn.toggle(handler, handler...) is deprecated");var e=arguments,f=b.guid||a.guid++,g=0,h=function(c){var d=(a._data(this,"lastToggle"+b.guid)||0)%g;return a._data(this,"lastToggle"+b.guid,d+1),c.preventDefault(),e[d].apply(this,arguments)||!1};for(h.guid=f;g<e.length;)e[g++].guid=f;return this.click(h)},a.fn.live=function(b,c,e){return d("jQuery.fn.live() is deprecated"),B?B.apply(this,arguments):(a(this.context).on(b,this.selector,c,e),this)},a.fn.die=function(b,c){return d("jQuery.fn.die() is deprecated"),C?C.apply(this,arguments):(a(this.context).off(b,this.selector||"**",c),this)},a.event.trigger=function(a,b,c,e){return c||F.test(a)||d("Global events are undocumented and deprecated"),z.call(this,a,b,c||document,e)},a.each(E.split("|"),function(b,c){a.event.special[c]={setup:function(){var b=this;return b!==document&&(a.event.add(document,c+"."+a.guid,function(){a.event.trigger(c,Array.prototype.slice.call(arguments,1),b,!0)}),a._data(this,c,a.guid++)),!1},teardown:function(){return this!==document&&a.event.remove(document,c+"."+a._data(this,c)),!1}}}),a.event.special.ready={setup:function(){d("'ready' event is deprecated")}};var I=a.fn.andSelf||a.fn.addBack,J=a.fn.find;if(a.fn.andSelf=function(){return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),I.apply(this,arguments)},a.fn.find=function(a){var b=J.apply(this,arguments);return b.context=this.context,b.selector=this.selector?this.selector+" "+a:a,b},a.Callbacks){var K=a.Deferred,L=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var c=K(),e=c.promise();return c.pipe=e.pipe=function(){var b=arguments;return d("deferred.pipe() is deprecated"),a.Deferred(function(d){a.each(L,function(f,g){var h=a.isFunction(b[f])&&b[f];c[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(d.resolve).fail(d.reject).progress(d.notify):d[g[0]+"With"](this===e?d.promise():this,h?[b]:arguments)})}),b=null}).promise()},c.isResolved=function(){return d("deferred.isResolved is deprecated"),"resolved"===c.state()},c.isRejected=function(){return d("deferred.isRejected is deprecated"),"rejected"===c.state()},b&&b.call(c,c),c}}}(jQuery,window);;/* Modernizr 2.8.2 (Custom Build) | MIT & BSD
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
(function($) { $("#566a576c64b7082ceae69aa4f22119ac").iv_widget({ values: "D%2BZHgqRpeym2KNzR9RsaOY4NFnrjva3hvBsZBNNYvBzBV2Tjy3q7KFkaS2Ksl5M8RBF5Pk2d%2BQvSxmaSLzHMrCHqwwOHjiAIN2xObtcAKlFF3F7Yu3xITOZOmM9D%2BOVrnzGvLDY7MGo%3D", no_parent: true }); })(jQuery);

jQuery("#menu_308179").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_330873").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_308211").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_308183").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_308181").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_308185").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_308187").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332115").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332161").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332097").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332003").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_331135").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_331067").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332043").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332117").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332159").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_332045").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_331133").mouseover(function () { _hide_sub_menus(1) });jQuery("#menu_331019").mouseover(function () { _hide_sub_menus(1) });
