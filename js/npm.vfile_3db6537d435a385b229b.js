(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{"+XMi":function(t,e,n){"use strict";(function(e){var i=n("33yf"),s=n("48q5"),a=n("BEtg");t.exports=p;var r={}.hasOwnProperty,o=p.prototype;o.toString=function(t){var e=this.contents||"";return a(e)?e.toString(t):String(e)};var h=["history","path","basename","stem","extname","dirname"];function p(t){var n,i,s;if(t){if("string"==typeof t||a(t))t={contents:t};else if("message"in t&&"messages"in t)return t}else t={};if(!(this instanceof p))return new p(t);for(this.data={},this.messages=[],this.history=[],this.cwd=e.cwd(),i=-1,s=h.length;++i<s;)n=h[i],r.call(t,n)&&(this[n]=t[n]);for(n in t)-1===h.indexOf(n)&&(this[n]=t[n])}function f(t,e){if(-1!==t.indexOf(i.sep))throw new Error("`"+e+"` cannot be a path: did not expect `"+i.sep+"`")}function c(t,e){if(!t)throw new Error("`"+e+"` cannot be empty")}function u(t,e){if(!t)throw new Error("Setting `"+e+"` requires `path` to be set too")}Object.defineProperty(o,"path",{get:function(){return this.history[this.history.length-1]},set:function(t){c(t,"path"),t!==this.path&&this.history.push(t)}}),Object.defineProperty(o,"dirname",{get:function(){return"string"==typeof this.path?i.dirname(this.path):void 0},set:function(t){u(this.path,"dirname"),this.path=i.join(t||"",this.basename)}}),Object.defineProperty(o,"basename",{get:function(){return"string"==typeof this.path?i.basename(this.path):void 0},set:function(t){c(t,"basename"),f(t,"basename"),this.path=i.join(this.dirname||"",t)}}),Object.defineProperty(o,"extname",{get:function(){return"string"==typeof this.path?i.extname(this.path):void 0},set:function(t){var e=t||"";if(f(e,"extname"),u(this.path,"extname"),e){if("."!==e.charAt(0))throw new Error("`extname` must start with `.`");if(-1!==e.indexOf(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=s(this.path,e)}}),Object.defineProperty(o,"stem",{get:function(){return"string"==typeof this.path?i.basename(this.path,this.extname):void 0},set:function(t){c(t,"stem"),f(t,"stem"),this.path=i.join(this.dirname||"",t+(this.extname||""))}})}).call(this,n("8oxB"))},Esvb:function(t,e,n){"use strict";var i=n("aCXt"),s=n("+XMi");t.exports=s;var a=s.prototype;function r(t,e,n){var s=this.path,a=new i(t,e,n);return s&&(a.name=s+":"+a.name,a.file=s),a.fatal=!1,this.messages.push(a),a}a.message=r,a.info=function(){var t=this.message.apply(this,arguments);return t.fatal=null,t},a.fail=function(){var t=this.message.apply(this,arguments);throw t.fatal=!0,t},a.warn=r}}]);