/*
 Highstock JS v8.2.0 (2020-10-16)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts","highcharts/modules/stock"],function(k){a(k);a.Highcharts=k;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function k(a,d,p,g){a.hasOwnProperty(d)||(a[d]=g.apply(null,p))}a=a?a._modules:{};k(a,"Mixins/ReduceArray.js",[],function(){return{minInArray:function(a,d){return a.reduce(function(a,
g){return Math.min(a,g[d])},Number.MAX_VALUE)},maxInArray:function(a,d){return a.reduce(function(a,g){return Math.max(a,g[d])},-Number.MAX_VALUE)},getArrayExtremes:function(a,d,p){return a.reduce(function(a,m){return[Math.min(a[0],m[d]),Math.max(a[1],m[p])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});k(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var d=a.error;return{isParentLoaded:function(a,g,m,f,l){if(a)return f?f(a):!0;d(l||this.generateMessage(m,g));return!1},generateMessage:function(a,
g){return'Error: "'+a+'" indicator type requires "'+g+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});k(a,"Stock/Indicators/SMAIndicator.js",[a["Core/Series/Series.js"],a["Core/Globals.js"],a["Mixins/IndicatorRequired.js"],a["Core/Utilities.js"]],function(a,d,k,g){var m=a.seriesTypes,f=g.addEvent,l=g.error,r=g.extend,p=g.isArray,t=g.pick,u=g.splat,q=d.Series,h=m.ohlc.prototype,n=k.generateMessage;f(d.Series,"init",function(a){a=a.options;a.useOhlcData&&
"highcharts-navigator-series"!==a.id&&r(this,{pointValKey:h.pointValKey,keys:h.keys,pointArrayMap:h.pointArrayMap,toYData:h.toYData})});f(q,"afterSetOptions",function(a){a=a.options;var e=a.dataGrouping;e&&a.useOhlcData&&"highcharts-navigator-series"!==a.id&&(e.approximation="ohlc")});a.seriesType("sma","line",{name:void 0,tooltip:{valueDecimals:4},linkedTo:void 0,compareToMain:!1,params:{index:0,period:14}},{processData:function(){var a=this.options.compareToMain,c=this.linkedParent;q.prototype.processData.apply(this,
arguments);c&&c.compareValue&&a&&(this.compareValue=c.compareValue)},bindTo:{series:!0,eventName:"updatedData"},hasDerivedData:!0,useCommonDataGrouping:!0,nameComponents:["period"],nameSuffixes:[],calculateOn:"init",requiredIndicators:[],requireIndicators:function(){var a={allLoaded:!0};this.requiredIndicators.forEach(function(e){m[e]?m[e].prototype.requireIndicators():(a.allLoaded=!1,a.needed=e)});return a},init:function(a,c){function e(){var a=b.points||[],e=(b.xData||[]).length,c=b.getValues(b.linkedParent,
b.options.params)||{values:[],xData:[],yData:[]},g=[],d=!0;if(e&&!b.hasGroupedData&&b.visible&&b.points)if(b.cropped){if(b.xAxis){var f=b.xAxis.min;var h=b.xAxis.max}e=b.cropData(c.xData,c.yData,f,h);for(f=0;f<e.xData.length;f++)g.push([e.xData[f]].concat(u(e.yData[f])));e=c.xData.indexOf(b.xData[0]);f=c.xData.indexOf(b.xData[b.xData.length-1]);-1===e&&f===c.xData.length-2&&g[0][0]===a[0].x&&g.shift();b.updateData(g)}else c.xData.length!==e-1&&c.xData.length!==e+1&&(d=!1,b.updateData(c.values));d&&
(b.xData=c.xData,b.yData=c.yData,b.options.data=c.values);!1===b.bindTo.series&&(delete b.processedXData,b.isDirty=!0,b.redraw());b.isDirtyData=!1}var b=this,g=b.requireIndicators();if(!g.allLoaded)return l(n(b.type,g.needed));q.prototype.init.call(b,a,c);a.linkSeries();b.dataEventsToUnbind=[];if(!b.linkedParent)return l("Series "+b.options.linkedTo+" not found! Check `linkedTo`.",!1,a);b.dataEventsToUnbind.push(f(b.bindTo.series?b.linkedParent:b.linkedParent.xAxis,b.bindTo.eventName,e));if("init"===
b.calculateOn)e();else var d=f(b.chart,b.calculateOn,function(){e();d()});return b},getName:function(){var a=this.name,c=[];a||((this.nameComponents||[]).forEach(function(a,b){c.push(this.options.params[a]+t(this.nameSuffixes[b],""))},this),a=(this.nameBase||this.type.toUpperCase())+(this.nameComponents?" ("+c.join(", ")+")":""));return a},getValues:function(a,c){var e=c.period,b=a.xData;a=a.yData;var g=a.length,f=0,d=0,h=[],k=[],m=[],l=-1;if(!(b.length<e)){for(p(a[0])&&(l=c.index?c.index:0);f<e-
1;)d+=0>l?a[f]:a[f][l],f++;for(c=f;c<g;c++){d+=0>l?a[c]:a[c][l];var n=[b[c],d/e];h.push(n);k.push(n[0]);m.push(n[1]);d-=0>l?a[c-f]:a[c-f][l]}return{values:h,xData:k,yData:m}}},destroy:function(){this.dataEventsToUnbind.forEach(function(a){a()});q.prototype.destroy.apply(this,arguments)}});""});k(a,"Stock/Indicators/WilliamsRIndicator.js",[a["Core/Series/Series.js"],a["Mixins/ReduceArray.js"],a["Core/Utilities.js"]],function(a,d,k){var g=d.getArrayExtremes,m=k.isArray;a.seriesType("williamsr","sma",
{params:{period:14}},{nameBase:"Williams %R",getValues:function(a,d){d=d.period;var f=a.xData,k=(a=a.yData)?a.length:0,l=[],p=[],q=[],h;if(!(f.length<d)&&m(a[0])&&4===a[0].length){for(h=d-1;h<k;h++){var n=a.slice(h-d+1,h+1);var e=g(n,2,1);n=e[0];e=e[1];var c=a[h][3];n=(e-c)/(e-n)*-100;f[h]&&(l.push([f[h],n]),p.push(f[h]),q.push(n))}return{values:l,xData:p,yData:q}}}});""});k(a,"masters/indicators/williams-r.src.js",[],function(){})});
//# sourceMappingURL=williams-r.js.map