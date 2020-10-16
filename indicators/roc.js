/*
 Highstock JS v8.2.0 (2020-10-16)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,l,n,b){a.hasOwnProperty(l)||(a[l]=b.apply(null,n))}a=a?a._modules:{};g(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var l=a.error;return{isParentLoaded:function(a,
b,f,m,g){if(a)return m?m(a):!0;l(g||this.generateMessage(f,b));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});g(a,"Stock/Indicators/SMAIndicator.js",[a["Core/Series/Series.js"],a["Core/Globals.js"],a["Mixins/IndicatorRequired.js"],a["Core/Utilities.js"]],function(a,g,n,b){var f=a.seriesTypes,m=b.addEvent,l=b.error,u=b.extend,p=b.isArray,q=b.pick,r=b.splat,
h=g.Series,e=f.ohlc.prototype,t=n.generateMessage;m(g.Series,"init",function(d){d=d.options;d.useOhlcData&&"highcharts-navigator-series"!==d.id&&u(this,{pointValKey:e.pointValKey,keys:e.keys,pointArrayMap:e.pointArrayMap,toYData:e.toYData})});m(h,"afterSetOptions",function(d){d=d.options;var a=d.dataGrouping;a&&d.useOhlcData&&"highcharts-navigator-series"!==d.id&&(a.approximation="ohlc")});a.seriesType("sma","line",{name:void 0,tooltip:{valueDecimals:4},linkedTo:void 0,compareToMain:!1,params:{index:0,
period:14}},{processData:function(){var a=this.options.compareToMain,k=this.linkedParent;h.prototype.processData.apply(this,arguments);k&&k.compareValue&&a&&(this.compareValue=k.compareValue)},bindTo:{series:!0,eventName:"updatedData"},hasDerivedData:!0,useCommonDataGrouping:!0,nameComponents:["period"],nameSuffixes:[],calculateOn:"init",requiredIndicators:[],requireIndicators:function(){var a={allLoaded:!0};this.requiredIndicators.forEach(function(d){f[d]?f[d].prototype.requireIndicators():(a.allLoaded=
!1,a.needed=d)});return a},init:function(a,b){function d(){var a=c.points||[],d=(c.xData||[]).length,b=c.getValues(c.linkedParent,c.options.params)||{values:[],xData:[],yData:[]},k=[],e=!0;if(d&&!c.hasGroupedData&&c.visible&&c.points)if(c.cropped){if(c.xAxis){var f=c.xAxis.min;var g=c.xAxis.max}d=c.cropData(b.xData,b.yData,f,g);for(f=0;f<d.xData.length;f++)k.push([d.xData[f]].concat(r(d.yData[f])));d=b.xData.indexOf(c.xData[0]);f=b.xData.indexOf(c.xData[c.xData.length-1]);-1===d&&f===b.xData.length-
2&&k[0][0]===a[0].x&&k.shift();c.updateData(k)}else b.xData.length!==d-1&&b.xData.length!==d+1&&(e=!1,c.updateData(b.values));e&&(c.xData=b.xData,c.yData=b.yData,c.options.data=b.values);!1===c.bindTo.series&&(delete c.processedXData,c.isDirty=!0,c.redraw());c.isDirtyData=!1}var c=this,k=c.requireIndicators();if(!k.allLoaded)return l(t(c.type,k.needed));h.prototype.init.call(c,a,b);a.linkSeries();c.dataEventsToUnbind=[];if(!c.linkedParent)return l("Series "+c.options.linkedTo+" not found! Check `linkedTo`.",
!1,a);c.dataEventsToUnbind.push(m(c.bindTo.series?c.linkedParent:c.linkedParent.xAxis,c.bindTo.eventName,d));if("init"===c.calculateOn)d();else var e=m(c.chart,c.calculateOn,function(){d();e()});return c},getName:function(){var a=this.name,b=[];a||((this.nameComponents||[]).forEach(function(a,c){b.push(this.options.params[a]+q(this.nameSuffixes[c],""))},this),a=(this.nameBase||this.type.toUpperCase())+(this.nameComponents?" ("+b.join(", ")+")":""));return a},getValues:function(a,b){var d=b.period,
c=a.xData;a=a.yData;var f=a.length,e=0,g=0,m=[],k=[],l=[],h=-1;if(!(c.length<d)){for(p(a[0])&&(h=b.index?b.index:0);e<d-1;)g+=0>h?a[e]:a[e][h],e++;for(b=e;b<f;b++){g+=0>h?a[b]:a[b][h];var n=[c[b],g/d];m.push(n);k.push(n[0]);l.push(n[1]);g-=0>h?a[b-e]:a[b-e][h]}return{values:m,xData:k,yData:l}}},destroy:function(){this.dataEventsToUnbind.forEach(function(a){a()});h.prototype.destroy.apply(this,arguments)}});""});g(a,"Stock/Indicators/ROCIndicator.js",[a["Core/Series/Series.js"],a["Core/Utilities.js"]],
function(a,g){var l=g.isArray;a.seriesType("roc","sma",{params:{index:3,period:9}},{nameBase:"Rate of Change",getValues:function(a,f){var b=f.period,g=a.xData,n=(a=a.yData)?a.length:0,p=[],q=[],r=[],h=-1;if(!(g.length<=b)){l(a[0])&&(h=f.index);for(f=b;f<n;f++){var e=0>h?(e=a[f-b])?(a[f]-e)/e*100:null:(e=a[f-b][h])?(a[f][h]-e)/e*100:null;e=[g[f],e];p.push(e);q.push(e[0]);r.push(e[1])}return{values:p,xData:q,yData:r}}}});""});g(a,"masters/indicators/roc.src.js",[],function(){})});
//# sourceMappingURL=roc.js.map