/*
 Highstock JS v8.2.0 (2020-10-16)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/macd",["highcharts","highcharts/modules/stock"],function(p){a(p);a.Highcharts=p;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function p(a,d,q,n){a.hasOwnProperty(d)||(a[d]=n.apply(null,q))}a=a?a._modules:{};p(a,"Stock/Indicators/EMAIndicator.js",[a["Core/Series/Series.js"],a["Core/Utilities.js"]],function(a,d){var q=
d.correctFloat,n=d.isArray;a.seriesType("ema","sma",{params:{index:3,period:9}},{accumulatePeriodPoints:function(a,g,f){for(var m=0,b=0,c;b<a;)c=0>g?f[b]:f[b][g],m+=c,b++;return m},calculateEma:function(a,g,f,d,b,c,r){a=a[f-1];g=0>c?g[f-1]:g[f-1][c];d="undefined"===typeof b?r:q(g*d+b*(1-d));return[a,d]},getValues:function(a,g){var f=g.period,d=a.xData,b=(a=a.yData)?a.length:0,c=2/(f+1),r=[],l=[],m=[],q=-1;if(!(b<f)){n(a[0])&&(q=g.index?g.index:0);g=this.accumulatePeriodPoints(f,q,a);for(g/=f;f<b+
1;f++){var h=this.calculateEma(d,a,f,c,h,q,g);r.push(h);l.push(h[0]);m.push(h[1]);h=h[1]}return{values:r,xData:l,yData:m}}}});""});p(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var d=a.error;return{isParentLoaded:function(a,n,m,g,f){if(a)return g?g(a):!0;d(f||this.generateMessage(m,n));return!1},generateMessage:function(a,d){return'Error: "'+a+'" indicator type requires "'+d+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});
p(a,"Stock/Indicators/SMAIndicator.js",[a["Core/Series/Series.js"],a["Core/Globals.js"],a["Mixins/IndicatorRequired.js"],a["Core/Utilities.js"]],function(a,d,q,n){var m=a.seriesTypes,g=n.addEvent,f=n.error,p=n.extend,b=n.isArray,c=n.pick,r=n.splat,l=d.Series,t=m.ohlc.prototype,u=q.generateMessage;g(d.Series,"init",function(b){b=b.options;b.useOhlcData&&"highcharts-navigator-series"!==b.id&&p(this,{pointValKey:t.pointValKey,keys:t.keys,pointArrayMap:t.pointArrayMap,toYData:t.toYData})});g(l,"afterSetOptions",
function(b){b=b.options;var a=b.dataGrouping;a&&b.useOhlcData&&"highcharts-navigator-series"!==b.id&&(a.approximation="ohlc")});a.seriesType("sma","line",{name:void 0,tooltip:{valueDecimals:4},linkedTo:void 0,compareToMain:!1,params:{index:0,period:14}},{processData:function(){var b=this.options.compareToMain,a=this.linkedParent;l.prototype.processData.apply(this,arguments);a&&a.compareValue&&b&&(this.compareValue=a.compareValue)},bindTo:{series:!0,eventName:"updatedData"},hasDerivedData:!0,useCommonDataGrouping:!0,
nameComponents:["period"],nameSuffixes:[],calculateOn:"init",requiredIndicators:[],requireIndicators:function(){var b={allLoaded:!0};this.requiredIndicators.forEach(function(a){m[a]?m[a].prototype.requireIndicators():(b.allLoaded=!1,b.needed=a)});return b},init:function(b,a){function c(){var b=e.points||[],a=(e.xData||[]).length,c=e.getValues(e.linkedParent,e.options.params)||{values:[],xData:[],yData:[]},h=[],k=!0;if(a&&!e.hasGroupedData&&e.visible&&e.points)if(e.cropped){if(e.xAxis){var l=e.xAxis.min;
var d=e.xAxis.max}a=e.cropData(c.xData,c.yData,l,d);for(l=0;l<a.xData.length;l++)h.push([a.xData[l]].concat(r(a.yData[l])));a=c.xData.indexOf(e.xData[0]);l=c.xData.indexOf(e.xData[e.xData.length-1]);-1===a&&l===c.xData.length-2&&h[0][0]===b[0].x&&h.shift();e.updateData(h)}else c.xData.length!==a-1&&c.xData.length!==a+1&&(k=!1,e.updateData(c.values));k&&(e.xData=c.xData,e.yData=c.yData,e.options.data=c.values);!1===e.bindTo.series&&(delete e.processedXData,e.isDirty=!0,e.redraw());e.isDirtyData=!1}
var e=this,h=e.requireIndicators();if(!h.allLoaded)return f(u(e.type,h.needed));l.prototype.init.call(e,b,a);b.linkSeries();e.dataEventsToUnbind=[];if(!e.linkedParent)return f("Series "+e.options.linkedTo+" not found! Check `linkedTo`.",!1,b);e.dataEventsToUnbind.push(g(e.bindTo.series?e.linkedParent:e.linkedParent.xAxis,e.bindTo.eventName,c));if("init"===e.calculateOn)c();else var k=g(e.chart,e.calculateOn,function(){c();k()});return e},getName:function(){var b=this.name,a=[];b||((this.nameComponents||
[]).forEach(function(b,e){a.push(this.options.params[b]+c(this.nameSuffixes[e],""))},this),b=(this.nameBase||this.type.toUpperCase())+(this.nameComponents?" ("+a.join(", ")+")":""));return b},getValues:function(a,c){var l=c.period,e=a.xData;a=a.yData;var d=a.length,h=0,g=0,f=[],r=[],m=[],k=-1;if(!(e.length<l)){for(b(a[0])&&(k=c.index?c.index:0);h<l-1;)g+=0>k?a[h]:a[h][k],h++;for(c=h;c<d;c++){g+=0>k?a[c]:a[c][k];var n=[e[c],g/l];f.push(n);r.push(n[0]);m.push(n[1]);g-=0>k?a[c-h]:a[c-h][k]}return{values:f,
xData:r,yData:m}}},destroy:function(){this.dataEventsToUnbind.forEach(function(b){b()});l.prototype.destroy.apply(this,arguments)}});""});p(a,"Stock/Indicators/MACDIndicator.js",[a["Core/Series/Series.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,d,q){var n=q.correctFloat,m=q.defined,g=q.merge,f=d.seriesTypes.sma,p=d.seriesTypes.ema;a.seriesType("macd","sma",{params:{shortPeriod:12,longPeriod:26,signalPeriod:9,period:26},signalLine:{zones:[],styles:{lineWidth:1,lineColor:void 0}},macdLine:{zones:[],
styles:{lineWidth:1,lineColor:void 0}},threshold:0,groupPadding:.1,pointPadding:.1,crisp:!1,states:{hover:{halo:{size:0}}},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Value: {point.MACD}<br/>Signal: {point.signal}<br/>Histogram: {point.y}<br/>'},dataGrouping:{approximation:"averages"},minPointLength:0},{nameComponents:["longPeriod","shortPeriod","signalPeriod"],requiredIndicators:["ema"],pointArrayMap:["y","signal","MACD"],parallelArrays:["x","y",
"signal","MACD"],pointValKey:"y",markerAttribs:d.noop,getColumnMetrics:d.seriesTypes.column.prototype.getColumnMetrics,crispCol:d.seriesTypes.column.prototype.crispCol,init:function(){f.prototype.init.apply(this,arguments);this.options&&(this.options=g({signalLine:{styles:{lineColor:this.color}},macdLine:{styles:{color:this.color}}},this.options),this.macdZones={zones:this.options.macdLine.zones,startIndex:0},this.signalZones={zones:this.macdZones.zones.concat(this.options.signalLine.zones),startIndex:this.macdZones.zones.length},
this.resetZones=!0)},toYData:function(b){return[b.y,b.signal,b.MACD]},translate:function(){var b=this,a=["plotSignal","plotMACD"];d.seriesTypes.column.prototype.translate.apply(b);b.points.forEach(function(c){[c.signal,c.MACD].forEach(function(l,d){null!==l&&(c[a[d]]=b.yAxis.toPixels(l,!0))})})},destroy:function(){this.graph=null;this.graphmacd=this.graphmacd&&this.graphmacd.destroy();this.graphsignal=this.graphsignal&&this.graphsignal.destroy();f.prototype.destroy.apply(this,arguments)},drawPoints:d.seriesTypes.column.prototype.drawPoints,
drawGraph:function(){for(var b=this,a=b.points,d=a.length,l=b.options,n=b.zones,p={options:{gapSize:l.gapSize}},h=[[],[]],k;d--;)k=a[d],m(k.plotMACD)&&h[0].push({plotX:k.plotX,plotY:k.plotMACD,isNull:!m(k.plotMACD)}),m(k.plotSignal)&&h[1].push({plotX:k.plotX,plotY:k.plotSignal,isNull:!m(k.plotMACD)});["macd","signal"].forEach(function(a,c){b.points=h[c];b.options=g(l[a+"Line"].styles,p);b.graph=b["graph"+a];b.currentLineZone=a+"Zones";b.zones=b[b.currentLineZone].zones;f.prototype.drawGraph.call(b);
b["graph"+a]=b.graph});b.points=a;b.options=l;b.zones=n;b.currentLineZone=null},getZonesGraphs:function(b){var a=f.prototype.getZonesGraphs.call(this,b),d=a;this.currentLineZone&&(d=a.splice(this[this.currentLineZone].startIndex+1),d.length?d.splice(0,0,b[0]):d=[b[0]]);return d},applyZones:function(){var a=this.zones;this.zones=this.signalZones.zones;f.prototype.applyZones.call(this);this.graphmacd&&this.options.macdLine.zones.length&&this.graphmacd.hide();this.zones=a},getValues:function(a,c){var b=
0,d=[],g=[],f=[];if(!(a.xData.length<c.longPeriod+c.signalPeriod)){var h=p.prototype.getValues(a,{period:c.shortPeriod});var k=p.prototype.getValues(a,{period:c.longPeriod});h=h.values;k=k.values;for(a=1;a<=h.length;a++)m(k[a-1])&&m(k[a-1][1])&&m(h[a+c.shortPeriod+1])&&m(h[a+c.shortPeriod+1][0])&&d.push([h[a+c.shortPeriod+1][0],0,null,h[a+c.shortPeriod+1][1]-k[a-1][1]]);for(a=0;a<d.length;a++)g.push(d[a][0]),f.push([0,null,d[a][3]]);c=p.prototype.getValues({xData:g,yData:f},{period:c.signalPeriod,
index:2});c=c.values;for(a=0;a<d.length;a++)d[a][0]>=c[0][0]&&(d[a][2]=c[b][1],f[a]=[0,c[b][1],d[a][3]],null===d[a][3]?(d[a][1]=0,f[a][0]=0):(d[a][1]=n(d[a][3]-c[b][1]),f[a][0]=n(d[a][3]-c[b][1])),b++);return{values:d,xData:g,yData:f}}}});""});p(a,"masters/indicators/macd.src.js",[],function(){})});
//# sourceMappingURL=macd.js.map