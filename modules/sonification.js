/*
 Highcharts JS v8.2.0 (2020-10-16)

 Sonification module

 (c) 2012-2019 ystein Moseng

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sonification",["highcharts"],function(m){b(m);b.Highcharts=m;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function m(d,b,e,p){d.hasOwnProperty(b)||(d[b]=p.apply(null,e))}b=b?b._modules:{};m(b,"Extensions/Sonification/Instrument.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(d,b){function e(c){this.init(c)}
var p=b.error,l=b.merge,k=b.pick,z=b.uniqueKey,n={type:"oscillator",playCallbackInterval:20,masterVolume:1,oscillator:{waveformShape:"sine"}};e.prototype.init=function(c){if(this.initAudioContext()){this.options=l(n,c);this.id=this.options.id=c&&c.id||z();this.masterVolume=this.options.masterVolume||0;c=d.audioContext;var a=this.destinationNode||c.destination;this.gainNode=c.createGain();this.setGain(0);(this.panNode=c.createStereoPanner&&c.createStereoPanner())?(this.setPan(0),this.gainNode.connect(this.panNode),
this.panNode.connect(a)):this.gainNode.connect(a);"oscillator"===this.options.type&&this.initOscillator(this.options.oscillator);this.playCallbackTimers=[]}else p(29)};e.prototype.copy=function(c){return new e(l(this.options,{id:null},c))};e.prototype.initAudioContext=function(){var c=d.win.AudioContext||d.win.webkitAudioContext,a=!!d.audioContext;return c?(d.audioContext=d.audioContext||new c,!a&&d.audioContext&&"running"===d.audioContext.state&&d.audioContext.suspend(),!!(d.audioContext&&d.audioContext.createOscillator&&
d.audioContext.createGain)):!1};e.prototype.initOscillator=function(c){this.oscillator=d.audioContext.createOscillator();this.oscillator.type=c.waveformShape;this.oscillator.connect(this.gainNode);this.oscillatorStarted=!1};e.prototype.setPan=function(c){this.panNode&&this.panNode.pan.setValueAtTime(c,d.audioContext.currentTime)};e.prototype.setGain=function(c,a){var f=this.gainNode;c*=this.masterVolume;f&&(1.2<c&&(console.warn("Highcharts sonification warning: Volume of instrument set too high."),
c=1.2),a?(f.gain.setValueAtTime(f.gain.value,d.audioContext.currentTime),f.gain.linearRampToValueAtTime(c,d.audioContext.currentTime+a/1E3)):f.gain.setValueAtTime(c,d.audioContext.currentTime))};e.prototype.cancelGainRamp=function(){this.gainNode&&this.gainNode.gain.cancelScheduledValues(0)};e.prototype.setMasterVolume=function(c){this.masterVolume=c||0};e.prototype.getValidFrequency=function(c,a,f){var g=this.options.allowedFrequencies,b=k(f,Infinity),d=k(a,-Infinity);return g&&g.length?g.reduce(function(a,
f){return Math.abs(f-c)<Math.abs(a-c)&&f<b&&f>d?f:a},Infinity):c};e.prototype.clearPlayCallbackTimers=function(){this.playCallbackTimers.forEach(function(c){clearInterval(c)});this.playCallbackTimers=[]};e.prototype.setFrequency=function(c,a){a=a||{};c=this.getValidFrequency(c,a.min,a.max);"oscillator"===this.options.type&&this.oscillatorPlay(c)};e.prototype.oscillatorPlay=function(c){this.oscillatorStarted||(this.oscillator.start(),this.oscillatorStarted=!0);this.oscillator.frequency.setValueAtTime(c,
d.audioContext.currentTime)};e.prototype.preparePlay=function(){this.setGain(.001);"suspended"===d.audioContext.state&&d.audioContext.resume();this.oscillator&&!this.oscillatorStarted&&(this.oscillator.start(),this.oscillatorStarted=!0)};e.prototype.play=function(c){var a=this,f=c.duration||0,g=function(f,g,b){var d=c.duration,e=0,l=a.options.playCallbackInterval;if("function"===typeof f){var k=setInterval(function(){e++;var c=e*l/d;if(1<=c)a[g](f(1),b),clearInterval(k);else a[g](f(c),b)},l);a.playCallbackTimers.push(k)}else a[g](f,
b)};if(a.id)if("suspended"===d.audioContext.state||this.oscillator&&!this.oscillatorStarted)a.preparePlay(),setTimeout(function(){a.play(c)},10);else{a.playCallbackTimers.length&&a.clearPlayCallbackTimers();a.cancelGainRamp();a.stopOscillatorTimeout&&(clearTimeout(a.stopOscillatorTimeout),delete a.stopOscillatorTimeout);a.stopTimeout&&(clearTimeout(a.stopTimeout),delete a.stopTimeout,a.stopCallback&&(a._play=a.play,a.play=function(){},a.stopCallback("cancelled"),a.play=a._play));var b=f<d.sonification.fadeOutDuration+
20;a.stopCallback=c.onEnd;var e=function(){delete a.stopTimeout;a.stop(b)};f?(a.stopTimeout=setTimeout(e,b?f:f-d.sonification.fadeOutDuration),g(c.frequency,"setFrequency",{minFrequency:c.minFrequency,maxFrequency:c.maxFrequency}),g(k(c.volume,1),"setGain",4),g(k(c.pan,0),"setPan")):e()}};e.prototype.mute=function(){this.setGain(.0001,.8*d.sonification.fadeOutDuration)};e.prototype.stop=function(c,a,f){var g=this,b=function(){g.stopOscillatorTimeout&&delete g.stopOscillatorTimeout;try{g.oscillator.stop()}catch(D){}g.oscillator.disconnect(g.gainNode);
g.initOscillator(g.options.oscillator);a&&a(f);g.stopCallback&&g.stopCallback(f)};g.playCallbackTimers.length&&g.clearPlayCallbackTimers();g.stopTimeout&&clearTimeout(g.stopTimeout);c?(g.setGain(0),b()):(g.mute(),g.stopOscillatorTimeout=setTimeout(b,d.sonification.fadeOutDuration+100))};return e});m(b,"Extensions/Sonification/MusicalFrequencies.js",[],function(){return[16.351597831287414,17.323914436054505,18.354047994837977,19.445436482630058,20.601722307054366,21.826764464562746,23.12465141947715,
24.499714748859326,25.956543598746574,27.5,29.13523509488062,30.86770632850775,32.70319566257483,34.64782887210901,36.70809598967594,38.890872965260115,41.20344461410875,43.653528929125486,46.2493028389543,48.999429497718666,51.91308719749314,55,58.27047018976124,61.7354126570155,65.40639132514966,69.29565774421802,73.41619197935188,77.78174593052023,82.4068892282175,87.30705785825097,92.4986056779086,97.99885899543733,103.82617439498628,110,116.54094037952248,123.47082531403103,130.8127826502993,
138.59131548843604,146.8323839587038,155.56349186104046,164.81377845643496,174.61411571650194,184.9972113558172,195.99771799087463,207.65234878997256,220,233.08188075904496,246.94165062806206,261.6255653005986,277.1826309768721,293.6647679174076,311.1269837220809,329.6275569128699,349.2282314330039,369.9944227116344,391.99543598174927,415.3046975799451,440,466.1637615180899,493.8833012561241,523.2511306011972,554.3652619537442,587.3295358348151,622.2539674441618,659.2551138257398,698.4564628660078,
739.9888454232688,783.9908719634985,830.6093951598903,880,932.3275230361799,987.7666025122483,1046.5022612023945,1108.7305239074883,1174.6590716696303,1244.5079348883237,1318.5102276514797,1396.9129257320155,1479.9776908465376,1567.981743926997,1661.2187903197805,1760,1864.6550460723597,1975.533205024496,2093.004522404789,2217.4610478149766,2349.31814333926,2489.0158697766474,2637.02045530296,2793.825851464031,2959.955381693075,3135.9634878539946,3322.437580639561,3520,3729.3100921447194,3951.066410048992,
4186.009044809578]});m(b,"Extensions/Sonification/Utilities.js",[b["Extensions/Sonification/MusicalFrequencies.js"],b["Core/Utilities.js"]],function(b,h){function d(b){this.init(b||[])}var p=h.clamp;d.prototype.init=function(b){this.supportedSignals=b;this.signals={}};d.prototype.registerSignalCallbacks=function(b){var d=this;d.supportedSignals.forEach(function(e){var k=b[e];k&&(d.signals[e]=d.signals[e]||[]).push(k)})};d.prototype.clearSignalCallbacks=function(b){var d=this;b?b.forEach(function(b){d.signals[b]&&
delete d.signals[b]}):d.signals={}};d.prototype.emitSignal=function(b,d){var e;this.signals[b]&&this.signals[b].forEach(function(b){b=b(d);e="undefined"!==typeof b?b:e});return e};return{musicalFrequencies:b,SignalHandler:d,getMusicalScale:function(d){return b.filter(function(b,e){var k=e%12+1;return d.some(function(b){return b===k})})},calculateDataExtremes:function(b,d){return b.series.reduce(function(b,e){e.points.forEach(function(c){c="undefined"!==typeof c[d]?c[d]:c.options[d];b.min=Math.min(b.min,
c);b.max=Math.max(b.max,c)});return b},{min:Infinity,max:-Infinity})},virtualAxisTranslate:function(b,d,e,n){var c=d.max-d.min;b=e.min+Math.abs(e.max-e.min)*(n?d.max-b:b-d.min)/c;return 0<c?p(b,e.min,e.max):e.min}}});m(b,"Extensions/Sonification/InstrumentDefinitions.js",[b["Extensions/Sonification/Instrument.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h){var d={};["sine","square","triangle","sawtooth"].forEach(function(e){d[e]=new b({oscillator:{waveformShape:e}});d[e+"Musical"]=new b({allowedFrequencies:h.musicalFrequencies,
oscillator:{waveformShape:e}});d[e+"Major"]=new b({allowedFrequencies:h.getMusicalScale([1,3,5,6,8,10,12]),oscillator:{waveformShape:e}})});return d});m(b,"Extensions/Sonification/Earcon.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(b,h){function d(b){this.init(b||{})}var p=h.error,l=h.merge,k=h.pick,m=h.uniqueKey;d.prototype.init=function(b){this.options=b;this.options.id||(this.options.id=this.id=m());this.instrumentsPlaying={}};d.prototype.sonify=function(d){var c=l(this.options,d),
a=k(c.volume,1),f=c.pan,g=this,e=d&&d.onEnd,h=g.options.onEnd;c.instruments.forEach(function(d){var c="string"===typeof d.instrument?b.sonification.instruments[d.instrument]:d.instrument,q=l(d.playOptions),n="";if(c&&c.play){if(d.playOptions){q.pan=k(f,q.pan);var y=q.onEnd;q.onEnd=function(){delete g.instrumentsPlaying[n];y&&y.apply(this,arguments);Object.keys(g.instrumentsPlaying).length||(e&&e.apply(this,arguments),h&&h.apply(this,arguments))};d=c.copy();d.setMasterVolume(a);n=d.id;g.instrumentsPlaying[n]=
d;d.play(q)}}else p(30)})};d.prototype.cancelSonify=function(b){var d=this.instrumentsPlaying,a=d&&Object.keys(d);a&&a.length&&(a.forEach(function(a){d[a].stop(!b,null,"cancelled")}),this.instrumentsPlaying={})};return d});m(b,"Extensions/Sonification/PointSonify.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h,e){var d=h.error,l=h.merge,k=h.pick,m={minDuration:20,maxDuration:2E3,minVolume:.1,maxVolume:1,minPan:-1,maxPan:1,minFrequency:220,maxFrequency:2200};
return{pointSonify:function(h){var c,a=this,f=a.series.chart,g=k(h.masterVolume,null===(c=f.options.sonification)||void 0===c?void 0:c.masterVolume),p=h.dataExtremes||{},n=function(b,d,f){if("function"===typeof b)return d?function(d){return b(a,p,d)}:b(a,p);if("string"===typeof b){var c=(d="-"===b.charAt(0))?b.slice(1):b,g=k(a[c],a.options[c]);p[c]=p[c]||e.calculateDataExtremes(a.series.chart,c);return e.virtualAxisTranslate(g,p[c],f,d)}return b};f.sonification.currentlyPlayingPoint=a;a.sonification=
a.sonification||{};a.sonification.instrumentsPlaying=a.sonification.instrumentsPlaying||{};var u=a.sonification.signalHandler=a.sonification.signalHandler||new e.SignalHandler(["onEnd"]);u.clearSignalCallbacks();u.registerSignalCallbacks({onEnd:h.onEnd});!a.isNull&&a.visible&&a.series.visible?h.instruments.forEach(function(c){var e="string"===typeof c.instrument?b.sonification.instruments[c.instrument]:c.instrument,k=c.instrumentMapping||{},h=l(m,c.instrumentOptions),p=e.id,v=function(b){c.onEnd&&
c.onEnd.apply(this,arguments);f.sonification&&f.sonification.currentlyPlayingPoint&&delete f.sonification.currentlyPlayingPoint;a.sonification&&a.sonification.instrumentsPlaying&&(delete a.sonification.instrumentsPlaying[p],Object.keys(a.sonification.instrumentsPlaying).length||u.emitSignal("onEnd",b))};e&&e.play?("undefined"!==typeof g&&e.setMasterVolume(g),a.sonification.instrumentsPlaying[e.id]=e,e.play({frequency:n(k.frequency,!0,{min:h.minFrequency,max:h.maxFrequency}),duration:n(k.duration,
!1,{min:h.minDuration,max:h.maxDuration}),pan:n(k.pan,!0,{min:h.minPan,max:h.maxPan}),volume:n(k.volume,!0,{min:h.minVolume,max:h.maxVolume}),onEnd:v,minFrequency:h.minFrequency,maxFrequency:h.maxFrequency})):d(30)}):u.emitSignal("onEnd")},pointCancelSonify:function(b){var d=this.sonification&&this.sonification.instrumentsPlaying,a=d&&Object.keys(d);a&&a.length&&(a.forEach(function(a){d[a].stop(!b,null,"cancelled")}),this.sonification.instrumentsPlaying={},this.sonification.signalHandler.emitSignal("onEnd",
"cancelled"))}}});m(b,"Extensions/Sonification/ChartSonify.js",[b["Core/Globals.js"],b["Core/Series/Point.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h,e,p){function d(a,b){return"function"===typeof b?b(a):x(a[b],a.options[b])}function k(a,b){return a.points.reduce(function(a,c){c=d(c,b);a.min=Math.min(a.min,c);a.max=Math.max(a.max,c);return a},{min:Infinity,max:-Infinity})}function m(a,b,d){var c,f=(b||[]).slice(0);b=null===(c=a.options.sonification)||void 0===
c?void 0:c.defaultInstrumentOptions;var r=function(a){return{instrumentMapping:a.mapping}};b&&f.push(r(b));a.series.forEach(function(a){var b;(a=null===(b=a.options.sonification)||void 0===b?void 0:b.instruments)&&(f=f.concat(a.map(r)))});return f.reduce(function(b,d){Object.keys(d.instrumentMapping||{}).forEach(function(c){c=d.instrumentMapping[c];"string"!==typeof c||b[c]||(b[c]=p.calculateDataExtremes(a,c))});return b},t(d))}function n(a,c){return c.reduce(function(c,d){var f=d.earcon;d.condition?
(d=d.condition(a),d instanceof b.sonification.Earcon?c.push(d):d&&c.push(f)):d.onPoint&&a.id===d.onPoint&&c.push(f);return c},[])}function c(a){return a.map(function(a){var d=a.instrument;d=("string"===typeof d?b.sonification.instruments[d]:d).copy();return t(a,{instrument:d})})}function a(a,b){a.forEach(function(a){a=a.instrument;"string"!==typeof a&&a.setMasterVolume(b)});return a}function f(a,b,d){var c=a.points[a.points.length-1];return b.reduce(function(a,b){b=b.instrumentMapping.duration;b=
"string"===typeof b?0:"function"===typeof b?b(c,d):b;return Math.max(a,b)},0)}function g(e,g){var r=g.timeExtremes||k(e,g.pointPlayTime),F=m(e.chart,g.instruments,g.dataExtremes),J=f(e,g.instruments,F),C=x(g.masterVolume,1),B=c(g.instruments),l=a(B,C);B=e.points.reduce(function(a,c){var f=n(c,g.earcons||[]),e=p.virtualAxisTranslate(d(c,g.pointPlayTime),r,{min:0,max:Math.max(g.duration-J,10)});return a.concat(new b.sonification.TimelineEvent({eventObject:c,time:e,id:c.id,playOptions:{instruments:l,
dataExtremes:F,masterVolume:C}}),f.map(function(a){return new b.sonification.TimelineEvent({eventObject:a,time:e,playOptions:{volume:C}})}))},[]);return new b.sonification.TimelinePath({events:B,onStart:function(){if(g.onStart)g.onStart(e)},onEventStart:function(a){var b=a.options&&a.options.eventObject;if(b instanceof h){if(!b.series.visible&&!b.series.chart.series.some(function(a){return a.visible}))return a.timelinePath.timeline.pause(),a.timelinePath.timeline.resetCursor(),!1;if(g.onPointStart)g.onPointStart(a,
b)}},onEventEnd:function(a){var b=a.event&&a.event.options&&a.event.options.eventObject;if(b instanceof h&&g.onPointEnd)g.onPointEnd(a.event,b)},onEnd:function(){if(g.onEnd)g.onEnd(e)},targetDuration:g.duration})}function A(a,b,d){var c,f,g,e=d.seriesOptions||{},r=(null===(g=null===(f=null===(c=a.chart.options.sonification)||void 0===c?void 0:c.defaultInstrumentOptions)||void 0===f?void 0:f.mapping)||void 0===g?void 0:g.pointPlayTime)||"x";c=E(a);return t(c,{dataExtremes:b,timeExtremes:k(a,r),instruments:d.instruments||
c.instruments,onStart:d.onSeriesStart||c.onStart,onEnd:d.onSeriesEnd||c.onEnd,earcons:d.earcons||c.earcons,masterVolume:x(d.masterVolume,c.masterVolume)},K(e)?L(e,function(b){return b.id===x(a.id,a.options.id)})||{}:e,{pointPlayTime:r})}function D(a,c,d){if("sequential"===a||"simultaneous"===a){var f=c.series.reduce(function(a,b){var c;b.visible&&!1!==(null===(c=b.options.sonification)||void 0===c?void 0:c.enabled)&&a.push({series:b,seriesOptions:d(b)});return a},[]);"simultaneous"===a&&(f=[f])}else f=
a.reduce(function(a,f){f=w(f).reduce(function(a,f){var g;if("string"===typeof f){var e=c.get(f);e.visible&&(g={series:e,seriesOptions:d(e)})}else f instanceof b.sonification.Earcon&&(g=new b.sonification.TimelinePath({events:[new b.sonification.TimelineEvent({eventObject:f})]}));f.silentWait&&(g=new b.sonification.TimelinePath({silentWait:f.silentWait}));g&&a.push(g);return a},[]);f.length&&a.push(f);return a},[]);return f}function u(a,c){return c?a.reduce(function(d,f,g){f=w(f);d.push(f);g<a.length-
1&&f.some(function(a){return a.series})&&d.push(new b.sonification.TimelinePath({silentWait:c}));return d},[]):a}function v(a){return a.reduce(function(a,b){b=w(b);return a+(1===b.length&&b[0].options&&b[0].options.silentWait||0)},0)}function q(a){var c=a.reduce(function(a,b){(b=b.events)&&b.length&&(a.min=Math.min(b[0].time,a.min),a.max=Math.max(b[b.length-1].time,a.max));return a},{min:Infinity,max:-Infinity});a.forEach(function(a){var d=a.events,f=d&&d.length,g=[];f&&d[0].time<=c.min||g.push(new b.sonification.TimelineEvent({time:c.min}));
f&&d[d.length-1].time>=c.max||g.push(new b.sonification.TimelineEvent({time:c.max}));g.length&&a.addTimelineEvents(g)})}function G(a){return a.reduce(function(a,b){return a+w(b).reduce(function(a,b){return(b=b.series&&b.seriesOptions&&b.seriesOptions.timeExtremes)?Math.max(a,b.max-b.min):a},0)},0)}function y(a,c){var d=Math.max(c-v(a),0),f=G(a);return a.reduce(function(a,c){c=w(c).reduce(function(a,c){c instanceof b.sonification.TimelinePath?a.push(c):c.series&&(c.seriesOptions.duration=c.seriesOptions.duration||
p.virtualAxisTranslate(c.seriesOptions.timeExtremes.max-c.seriesOptions.timeExtremes.min,{min:0,max:f},{min:0,max:d}),a.push(g(c.series,c.seriesOptions)));return a},[]);a.push(c);return a},[])}function H(a,b){var c,d;if(null===b||void 0===b?0:b.instruments)return b.instruments;var f=(null===(c=a.chart.options.sonification)||void 0===c?void 0:c.defaultInstrumentOptions)||{},g=function(a){M(a,function(b,c){null===b&&delete a[c]})};return((null===(d=a.options.sonification)||void 0===d?void 0:d.instruments)||
[{}]).map(function(a){g(a.mapping||{});g(a);return{instrument:a.instrument||f.instrument,instrumentOptions:t(f,a,{mapping:void 0,instrument:void 0}),instrumentMapping:t(f.mapping,a.mapping)}})}function E(a){var b,c,d=a.options.sonification||{},f=a.chart.options.sonification||{},g=f.events||{},e=d.events||{};return{onEnd:e.onSeriesEnd||g.onSeriesEnd,onStart:e.onSeriesStart||g.onSeriesStart,onPointEnd:e.onPointEnd||g.onPointEnd,onPointStart:e.onPointStart||g.onPointStart,pointPlayTime:null===(c=null===
(b=f.defaultInstrumentOptions)||void 0===b?void 0:b.mapping)||void 0===c?void 0:c.pointPlayTime,masterVolume:f.masterVolume,instruments:H(a),earcons:d.earcons||f.earcons}}function I(a,b){var c,d,f,g,e;a=a.options.sonification||{};return t({duration:a.duration,afterSeriesWait:a.afterSeriesWait,pointPlayTime:null===(d=null===(c=a.defaultInstrumentOptions)||void 0===c?void 0:c.mapping)||void 0===d?void 0:d.pointPlayTime,order:a.order,onSeriesStart:null===(f=a.events)||void 0===f?void 0:f.onSeriesStart,
onSeriesEnd:null===(g=a.events)||void 0===g?void 0:g.onSeriesEnd,onEnd:null===(e=a.events)||void 0===e?void 0:e.onEnd},b)}"";var L=e.find,K=e.isArray,t=e.merge,x=e.pick,w=e.splat,M=e.objectEach;return{chartSonify:function(a){var c=I(this,a);this.sonification.timeline&&this.sonification.timeline.pause();this.sonification.duration=c.duration;var d=m(this,c.instruments,c.dataExtremes);a=D(c.order,this,function(a){return A(a,d,c)});a=u(a,c.afterSeriesWait||0);a=y(a,c.duration);a.forEach(function(a){q(a)});
this.sonification.timeline=new b.sonification.Timeline({paths:a,onEnd:c.onEnd});this.sonification.timeline.play()},seriesSonify:function(a){var c=this.chart.options.sonification,d=this.options.sonification;a=t({duration:(null===d||void 0===d?void 0:d.duration)||(null===c||void 0===c?void 0:c.duration)},E(this),a);c=g(this,a);d=this.chart.sonification;d.timeline&&d.timeline.pause();d.duration=a.duration;d.timeline=new b.sonification.Timeline({paths:[c]});d.timeline.play()},pause:function(a){this.sonification.timeline?
this.sonification.timeline.pause(x(a,!0)):this.sonification.currentlyPlayingPoint&&this.sonification.currentlyPlayingPoint.cancelSonify(a)},resume:function(a){this.sonification.timeline&&this.sonification.timeline.play(a)},rewind:function(a){this.sonification.timeline&&this.sonification.timeline.rewind(a)},cancel:function(a){this.pauseSonify(a);this.resetSonifyCursor()},getCurrentPoints:function(){if(this.sonification.timeline){var a=this.sonification.timeline.getCursor();return Object.keys(a).map(function(b){return a[b].eventObject}).filter(function(a){return a instanceof
h})}return[]},setCursor:function(a){var b=this.sonification.timeline;b&&w(a).forEach(function(a){b.setCursor(a.id)})},resetCursor:function(){this.sonification.timeline&&this.sonification.timeline.resetCursor()},resetCursorEnd:function(){this.sonification.timeline&&this.sonification.timeline.resetCursorEnd()}}});m(b,"Extensions/Sonification/Timeline.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h,e){function d(a){this.init(a||{})}function l(a){this.init(a)}
function k(a){this.init(a||{})}var m=h.merge,n=h.splat,c=h.uniqueKey;d.prototype.init=function(a){this.options=a;this.time=a.time||0;this.id=this.options.id=a.id||c()};d.prototype.play=function(a){var b=this.options.eventObject,c=this.options.onEnd,d=a&&a.onEnd,e=this.options.playOptions&&this.options.playOptions.onEnd;a=m(this.options.playOptions,a);b&&b.sonify?(a.onEnd=c||d||e?function(){var a=arguments;[c,d,e].forEach(function(b){b&&b.apply(this,a)})}:void 0,b.sonify(a)):(d&&d(),c&&c())};d.prototype.cancel=
function(a){this.options.eventObject.cancelSonify(a)};l.prototype.init=function(a){this.options=a;this.id=this.options.id=a.id||c();this.cursor=0;this.eventsPlaying={};this.events=a.silentWait?[new d({time:0}),new d({time:a.silentWait})]:this.options.events;this.targetDuration=a.targetDuration||a.silentWait;this.sortEvents();this.updateEventIdMap();this.signalHandler=new e.SignalHandler(["playOnEnd","masterOnEnd","onStart","onEventStart","onEventEnd"]);this.signalHandler.registerSignalCallbacks(m(a,
{masterOnEnd:a.onEnd}))};l.prototype.sortEvents=function(){this.events=this.events.sort(function(a,b){return a.time-b.time})};l.prototype.updateEventIdMap=function(){this.eventIdMap=this.events.reduce(function(a,b,c){a[b.id]=c;return a},{})};l.prototype.addTimelineEvents=function(a){this.events=this.events.concat(a);this.sortEvents();this.updateEventIdMap()};l.prototype.getCursor=function(){return this.events[this.cursor]};l.prototype.setCursor=function(a){a=this.eventIdMap[a];return"undefined"!==
typeof a?(this.cursor=a,!0):!1};l.prototype.play=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(1)};l.prototype.rewind=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(-1)};l.prototype.resetCursor=function(){this.cursor=
0};l.prototype.resetCursorEnd=function(){this.cursor=this.events.length-1};l.prototype.pause=function(a){var b=this;clearTimeout(b.nextScheduledPlay);Object.keys(b.eventsPlaying).forEach(function(c){b.eventsPlaying[c]&&b.eventsPlaying[c].cancel(a)});b.eventsPlaying={}};l.prototype.playEvents=function(a){var b=this,c=b.events[this.cursor],d=b.events[this.cursor+a],e=function(a){b.signalHandler.emitSignal("masterOnEnd",a);b.signalHandler.emitSignal("playOnEnd",a)};c.timelinePath=b;if(!1===b.signalHandler.emitSignal("onEventStart",
c))e({event:c,cancelled:!0});else if(b.eventsPlaying[c.id]=c,c.play({onEnd:function(a){a={event:c,cancelled:!!a};delete b.eventsPlaying[c.id];b.signalHandler.emitSignal("onEventEnd",a);d||e(a)}}),d){var h=Math.abs(d.time-c.time);1>h?(b.cursor+=a,b.playEvents(a)):this.nextScheduledPlay=setTimeout(function(){b.cursor+=a;b.playEvents(a)},h)}};k.prototype.init=function(a){this.options=a;this.cursor=0;this.paths=a.paths||[];this.pathsPlaying={};this.signalHandler=new e.SignalHandler(["playOnEnd","masterOnEnd",
"onPathStart","onPathEnd"]);this.signalHandler.registerSignalCallbacks(m(a,{masterOnEnd:a.onEnd}))};k.prototype.play=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(1)};k.prototype.rewind=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(-1)};k.prototype.playPaths=function(a){var c=this,d=c.signalHandler;
if(c.paths.length){var e=n(this.paths[this.cursor]),h=this.paths[this.cursor+a],k=0,l=function(b){d.emitSignal("onPathStart",b);c.pathsPlaying[b.id]=b;b[0<a?"play":"rewind"](function(f){f=f&&f.cancelled;var g={path:b,cancelled:f};delete c.pathsPlaying[b.id];d.emitSignal("onPathEnd",g);k++;k>=e.length&&(h&&!f?(c.cursor+=a,n(h).forEach(function(b){b[0<a?"resetCursor":"resetCursorEnd"]()}),c.playPaths(a)):(d.emitSignal("playOnEnd",g),d.emitSignal("masterOnEnd",g)))})};e.forEach(function(a){a&&(a.timeline=
c,setTimeout(function(){l(a)},b.sonification.fadeOutDuration))})}else{var m={cancelled:!1};d.emitSignal("playOnEnd",m);d.emitSignal("masterOnEnd",m)}};k.prototype.pause=function(a){var b=this;Object.keys(b.pathsPlaying).forEach(function(c){b.pathsPlaying[c]&&b.pathsPlaying[c].pause(a)});b.pathsPlaying={}};k.prototype.resetCursor=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursor()})});this.cursor=0};k.prototype.resetCursorEnd=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursorEnd()})});
this.cursor=this.paths.length-1};k.prototype.setCursor=function(a){return this.paths.some(function(b){return n(b).some(function(b){return b.setCursor(a)})})};k.prototype.getCursor=function(){return this.getCurrentPlayingPaths().reduce(function(a,b){a[b.id]=b.getCursor();return a},{})};k.prototype.atStart=function(){return this.cursor?!1:!n(this.paths[0]).some(function(a){return a.cursor})};k.prototype.getCurrentPlayingPaths=function(){return this.paths.length?n(this.paths[this.cursor]):[]};return{TimelineEvent:d,
TimelinePath:l,Timeline:k}});m(b,"Extensions/Sonification/Options.js",[],function(){return{sonification:{enabled:!1,duration:2500,afterSeriesWait:700,masterVolume:1,order:"sequential",defaultInstrumentOptions:{instrument:"sineMusical",minFrequency:392,maxFrequency:1046,mapping:{pointPlayTime:"x",duration:200,frequency:"y"}}}}});m(b,"Extensions/Sonification/Sonification.js",[b["Core/Chart/Chart.js"],b["Core/Globals.js"],b["Core/Options.js"],b["Core/Series/Point.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Instrument.js"],
b["Extensions/Sonification/InstrumentDefinitions.js"],b["Extensions/Sonification/Earcon.js"],b["Extensions/Sonification/PointSonify.js"],b["Extensions/Sonification/ChartSonify.js"],b["Extensions/Sonification/Utilities.js"],b["Extensions/Sonification/Timeline.js"],b["Extensions/Sonification/Options.js"]],function(b,h,e,m,l,k,z,n,c,a,f,g,A){e=e.defaultOptions;var d=l.addEvent,p=l.extend,v=l.merge;h.sonification={fadeOutDuration:20,utilities:f,Instrument:k,instruments:z,Earcon:n,TimelineEvent:g.TimelineEvent,
TimelinePath:g.TimelinePath,Timeline:g.Timeline};v(!0,e,A);m.prototype.sonify=c.pointSonify;m.prototype.cancelSonify=c.pointCancelSonify;h.Series.prototype.sonify=a.seriesSonify;p(b.prototype,{sonify:a.chartSonify,pauseSonify:a.pause,resumeSonify:a.resume,rewindSonify:a.rewind,cancelSonify:a.cancel,getCurrentSonifyPoints:a.getCurrentPoints,setSonifyCursor:a.setCursor,resetSonifyCursor:a.resetCursor,resetSonifyCursorEnd:a.resetCursorEnd});d(b,"init",function(){this.sonification={}});d(b,"update",function(a){(a=
a.options.sonification)&&v(!0,this.options.sonification,a)})});m(b,"masters/modules/sonification.src.js",[],function(){})});
//# sourceMappingURL=sonification.js.map