/*
 Highstock JS v8.2.0 (2020-10-16)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,h,k,e){a.hasOwnProperty(h)||(a[h]=e.apply(null,k))}a=a?a._modules:{};g(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var h=a.error;return{isParentLoaded:function(a,
e,b,f,n){if(a)return f?f(a):!0;h(n||this.generateMessage(b,e));return!1},generateMessage:function(a,e){return'Error: "'+a+'" indicator type requires "'+e+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});g(a,"Stock/Indicators/SMAIndicator.js",[a["Core/Series/Series.js"],a["Core/Globals.js"],a["Mixins/IndicatorRequired.js"],a["Core/Utilities.js"]],function(a,h,g,e){var b=a.seriesTypes,f=e.addEvent,n=e.error,k=e.extend,p=e.isArray,r=e.pick,v=e.splat,
m=h.Series,q=b.ohlc.prototype,u=g.generateMessage;f(h.Series,"init",function(d){d=d.options;d.useOhlcData&&"highcharts-navigator-series"!==d.id&&k(this,{pointValKey:q.pointValKey,keys:q.keys,pointArrayMap:q.pointArrayMap,toYData:q.toYData})});f(m,"afterSetOptions",function(d){d=d.options;var a=d.dataGrouping;a&&d.useOhlcData&&"highcharts-navigator-series"!==d.id&&(a.approximation="ohlc")});a.seriesType("sma","line",{name:void 0,tooltip:{valueDecimals:4},linkedTo:void 0,compareToMain:!1,params:{index:0,
period:14}},{processData:function(){var d=this.options.compareToMain,a=this.linkedParent;m.prototype.processData.apply(this,arguments);a&&a.compareValue&&d&&(this.compareValue=a.compareValue)},bindTo:{series:!0,eventName:"updatedData"},hasDerivedData:!0,useCommonDataGrouping:!0,nameComponents:["period"],nameSuffixes:[],calculateOn:"init",requiredIndicators:[],requireIndicators:function(){var d={allLoaded:!0};this.requiredIndicators.forEach(function(a){b[a]?b[a].prototype.requireIndicators():(d.allLoaded=
!1,d.needed=a)});return d},init:function(d,a){function b(){var d=c.points||[],a=(c.xData||[]).length,b=c.getValues(c.linkedParent,c.options.params)||{values:[],xData:[],yData:[]},f=[],e=!0;if(a&&!c.hasGroupedData&&c.visible&&c.points)if(c.cropped){if(c.xAxis){var l=c.xAxis.min;var n=c.xAxis.max}a=c.cropData(b.xData,b.yData,l,n);for(l=0;l<a.xData.length;l++)f.push([a.xData[l]].concat(v(a.yData[l])));a=b.xData.indexOf(c.xData[0]);l=b.xData.indexOf(c.xData[c.xData.length-1]);-1===a&&l===b.xData.length-
2&&f[0][0]===d[0].x&&f.shift();c.updateData(f)}else b.xData.length!==a-1&&b.xData.length!==a+1&&(e=!1,c.updateData(b.values));e&&(c.xData=b.xData,c.yData=b.yData,c.options.data=b.values);!1===c.bindTo.series&&(delete c.processedXData,c.isDirty=!0,c.redraw());c.isDirtyData=!1}var c=this,e=c.requireIndicators();if(!e.allLoaded)return n(u(c.type,e.needed));m.prototype.init.call(c,d,a);d.linkSeries();c.dataEventsToUnbind=[];if(!c.linkedParent)return n("Series "+c.options.linkedTo+" not found! Check `linkedTo`.",
!1,d);c.dataEventsToUnbind.push(f(c.bindTo.series?c.linkedParent:c.linkedParent.xAxis,c.bindTo.eventName,b));if("init"===c.calculateOn)b();else var l=f(c.chart,c.calculateOn,function(){b();l()});return c},getName:function(){var a=this.name,b=[];a||((this.nameComponents||[]).forEach(function(a,d){b.push(this.options.params[a]+r(this.nameSuffixes[d],""))},this),a=(this.nameBase||this.type.toUpperCase())+(this.nameComponents?" ("+b.join(", ")+")":""));return a},getValues:function(a,b){var d=b.period,
c=a.xData;a=a.yData;var f=a.length,e=0,n=0,l=[],h=[],g=[],k=-1;if(!(c.length<d)){for(p(a[0])&&(k=b.index?b.index:0);e<d-1;)n+=0>k?a[e]:a[e][k],e++;for(b=e;b<f;b++){n+=0>k?a[b]:a[b][k];var m=[c[b],n/d];l.push(m);h.push(m[0]);g.push(m[1]);n-=0>k?a[b-e]:a[b-e][k]}return{values:l,xData:h,yData:g}}},destroy:function(){this.dataEventsToUnbind.forEach(function(a){a()});m.prototype.destroy.apply(this,arguments)}});""});g(a,"Stock/Indicators/ATRIndicator.js",[a["Core/Series/Series.js"],a["Core/Utilities.js"]],
function(a,h){function k(a,e){return Math.max(a[1]-a[2],"undefined"===typeof e?0:Math.abs(a[1]-e[3]),"undefined"===typeof e?0:Math.abs(a[2]-e[3]))}var e=h.isArray;a.seriesType("atr","sma",{params:{period:14}},{getValues:function(a,f){f=f.period;var b=a.xData,h=(a=a.yData)?a.length:0,g=1,r=0,v=0,m=[],q=[],u=[],d;var l=[[b[0],a[0]]];if(!(b.length<=f)&&e(a[0])&&4===a[0].length){for(d=1;d<=h;d++)if(l.push([b[d],a[d]]),f<g){var t=f;var c=b[d-1],w=k(a[d-1],a[d-2]);t=[c,(r*(t-1)+w)/t];r=t[1];m.push(t);q.push(t[0]);
u.push(t[1])}else f===g?(r=v/(d-1),m.push([b[d-1],r]),q.push(b[d-1]),u.push(r)):v+=k(a[d-1],a[d-2]),g++;return{values:m,xData:q,yData:u}}}});""});g(a,"Stock/Indicators/NATRIndicator.js",[a["Core/Series/Series.js"]],function(a){var g=a.seriesTypes.atr;a.seriesType("natr","sma",{tooltip:{valueSuffix:"%"}},{requiredIndicators:["atr"],getValues:function(a,e){var b=g.prototype.getValues.apply(this,arguments),f=b.values.length,h=e.period-1,k=a.yData,p=0;if(b){for(;p<f;p++)b.yData[p]=b.values[p][1]/k[h][3]*
100,b.values[p][1]=b.yData[p],h++;return b}}});""});g(a,"masters/indicators/natr.src.js",[],function(){})});
//# sourceMappingURL=natr.js.map