/*
 Highstock JS v8.2.0 (2020-10-16)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/stochastic",["highcharts","highcharts/modules/stock"],function(h){a(h);a.Highcharts=h;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function h(a,d,l,b){a.hasOwnProperty(d)||(a[d]=b.apply(null,l))}a=a?a._modules:{};h(a,"Mixins/MultipleLines.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,d){var l=d.defined,
b=d.error,t=d.merge,g=a.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(f){var a=[];(this.pointArrayMap||[]).forEach(function(b){b!==f&&a.push("plot"+b.charAt(0).toUpperCase()+b.slice(1))});return a},toYData:function(a){var f=[];(this.pointArrayMap||[]).forEach(function(b){f.push(a[b])});return f},translate:function(){var a=this,b=a.pointArrayMap,d=[],l;d=a.getTranslatedLinesNames();g.prototype.translate.apply(a,
arguments);a.points.forEach(function(f){b.forEach(function(b,t){l=f[b];null!==l&&(f[d[t]]=a.yAxis.toPixels(l,!0))})})},drawGraph:function(){var a=this,d=a.linesApiNames,n=a.points,m=n.length,p=a.options,k=a.graph,h={options:{gapSize:p.gapSize}},r=[],e;a.getTranslatedLinesNames(a.pointValKey).forEach(function(a,b){for(r[b]=[];m--;)e=n[m],r[b].push({x:e.x,plotX:e.plotX,plotY:e[a],isNull:!l(e[a])});m=n.length});d.forEach(function(e,d){r[d]?(a.points=r[d],p[e]?a.options=t(p[e].styles,h):b('Error: "There is no '+
e+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=a["graph"+e],g.prototype.drawGraph.call(a),a["graph"+e]=a.graph):b('Error: "'+e+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=n;a.options=p;a.graph=k;g.prototype.drawGraph.call(a)}}});h(a,"Mixins/ReduceArray.js",[],function(){return{minInArray:function(a,d){return a.reduce(function(a,b){return Math.min(a,
b[d])},Number.MAX_VALUE)},maxInArray:function(a,d){return a.reduce(function(a,b){return Math.max(a,b[d])},-Number.MAX_VALUE)},getArrayExtremes:function(a,d,l){return a.reduce(function(a,k){return[Math.min(a[0],k[d]),Math.max(a[1],k[l])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});h(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var d=a.error;return{isParentLoaded:function(a,b,k,g,f){if(a)return g?g(a):!0;d(f||this.generateMessage(k,b));return!1},generateMessage:function(a,b){return'Error: "'+
a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});h(a,"Stock/Indicators/SMAIndicator.js",[a["Core/Series/Series.js"],a["Core/Globals.js"],a["Mixins/IndicatorRequired.js"],a["Core/Utilities.js"]],function(a,d,l,b){var k=a.seriesTypes,g=b.addEvent,f=b.error,h=b.extend,n=b.isArray,m=b.pick,p=b.splat,u=d.Series,v=k.ohlc.prototype,r=l.generateMessage;g(d.Series,"init",function(a){a=a.options;a.useOhlcData&&"highcharts-navigator-series"!==
a.id&&h(this,{pointValKey:v.pointValKey,keys:v.keys,pointArrayMap:v.pointArrayMap,toYData:v.toYData})});g(u,"afterSetOptions",function(a){a=a.options;var e=a.dataGrouping;e&&a.useOhlcData&&"highcharts-navigator-series"!==a.id&&(e.approximation="ohlc")});a.seriesType("sma","line",{name:void 0,tooltip:{valueDecimals:4},linkedTo:void 0,compareToMain:!1,params:{index:0,period:14}},{processData:function(){var a=this.options.compareToMain,b=this.linkedParent;u.prototype.processData.apply(this,arguments);
b&&b.compareValue&&a&&(this.compareValue=b.compareValue)},bindTo:{series:!0,eventName:"updatedData"},hasDerivedData:!0,useCommonDataGrouping:!0,nameComponents:["period"],nameSuffixes:[],calculateOn:"init",requiredIndicators:[],requireIndicators:function(){var a={allLoaded:!0};this.requiredIndicators.forEach(function(e){k[e]?k[e].prototype.requireIndicators():(a.allLoaded=!1,a.needed=e)});return a},init:function(a,b){function e(){var a=c.points||[],e=(c.xData||[]).length,b=c.getValues(c.linkedParent,
c.options.params)||{values:[],xData:[],yData:[]},d=[],q=!0;if(e&&!c.hasGroupedData&&c.visible&&c.points)if(c.cropped){if(c.xAxis){var f=c.xAxis.min;var n=c.xAxis.max}e=c.cropData(b.xData,b.yData,f,n);for(f=0;f<e.xData.length;f++)d.push([e.xData[f]].concat(p(e.yData[f])));e=b.xData.indexOf(c.xData[0]);f=b.xData.indexOf(c.xData[c.xData.length-1]);-1===e&&f===b.xData.length-2&&d[0][0]===a[0].x&&d.shift();c.updateData(d)}else b.xData.length!==e-1&&b.xData.length!==e+1&&(q=!1,c.updateData(b.values));q&&
(c.xData=b.xData,c.yData=b.yData,c.options.data=b.values);!1===c.bindTo.series&&(delete c.processedXData,c.isDirty=!0,c.redraw());c.isDirtyData=!1}var c=this,d=c.requireIndicators();if(!d.allLoaded)return f(r(c.type,d.needed));u.prototype.init.call(c,a,b);a.linkSeries();c.dataEventsToUnbind=[];if(!c.linkedParent)return f("Series "+c.options.linkedTo+" not found! Check `linkedTo`.",!1,a);c.dataEventsToUnbind.push(g(c.bindTo.series?c.linkedParent:c.linkedParent.xAxis,c.bindTo.eventName,e));if("init"===
c.calculateOn)e();else var q=g(c.chart,c.calculateOn,function(){e();q()});return c},getName:function(){var a=this.name,b=[];a||((this.nameComponents||[]).forEach(function(a,c){b.push(this.options.params[a]+m(this.nameSuffixes[c],""))},this),a=(this.nameBase||this.type.toUpperCase())+(this.nameComponents?" ("+b.join(", ")+")":""));return a},getValues:function(a,b){var e=b.period,c=a.xData;a=a.yData;var d=a.length,f=0,g=0,h=[],l=[],m=[],k=-1;if(!(c.length<e)){for(n(a[0])&&(k=b.index?b.index:0);f<e-
1;)g+=0>k?a[f]:a[f][k],f++;for(b=f;b<d;b++){g+=0>k?a[b]:a[b][k];var p=[c[b],g/e];h.push(p);l.push(p[0]);m.push(p[1]);g-=0>k?a[b-f]:a[b-f][k]}return{values:h,xData:l,yData:m}}},destroy:function(){this.dataEventsToUnbind.forEach(function(a){a()});u.prototype.destroy.apply(this,arguments)}});""});h(a,"Stock/Indicators/StochasticIndicator.js",[a["Core/Series/Series.js"],a["Mixins/MultipleLines.js"],a["Mixins/ReduceArray.js"],a["Core/Utilities.js"]],function(a,d,h,b){var k=b.isArray,g=b.merge,f=a.seriesTypes.sma,
l=h.getArrayExtremes;a.seriesType("stochastic","sma",{params:{periods:[14,3]},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>%K: {point.y}<br/>%D: {point.smoothed}<br/>'},smoothedLine:{styles:{lineWidth:1,lineColor:void 0}},dataGrouping:{approximation:"averages"}},g(d,{nameComponents:["periods"],nameBase:"Stochastic",pointArrayMap:["y","smoothed"],parallelArrays:["x","y","smoothed"],pointValKey:"y",linesApiNames:["smoothedLine"],
init:function(){f.prototype.init.apply(this,arguments);this.options=g({smoothedLine:{styles:{lineColor:this.color}}},this.options)},getValues:function(a,b){var d=b.periods[0];b=b.periods[1];var g=a.xData,h=(a=a.yData)?a.length:0,r=[],e=[],q=[],n=null,c;if(!(h<d)&&k(a[0])&&4===a[0].length){for(c=d-1;c<h;c++){var m=a.slice(c-d+1,c+1);var t=l(m,2,1);var w=t[0];m=a[c][3]-w;w=t[1]-w;m=m/w*100;e.push(g[c]);q.push([m,null]);c>=d-1+(b-1)&&(n=f.prototype.getValues.call(this,{xData:e.slice(-b),yData:q.slice(-b)},
{period:b}),n=n.yData[0]);r.push([g[c],m,n]);q[q.length-1][1]=n}return{values:r,xData:e,yData:q}}}}));""});h(a,"masters/indicators/stochastic.src.js",[],function(){})});
//# sourceMappingURL=stochastic.js.map