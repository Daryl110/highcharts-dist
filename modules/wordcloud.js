/*
 Highcharts JS v8.2.0 (2020-10-16)

 (c) 2016-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/wordcloud",["highcharts"],function(p){a(p);a.Highcharts=p;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function p(a,g,h,l){a.hasOwnProperty(g)||(a[g]=l.apply(null,h))}a=a?a._modules:{};p(a,"Mixins/DrawPoint.js",[],function(){var a=function(a){return"function"===typeof a},g=function(h){var l,k=this,g=k.graphic,r=h.animatableAttribs,
p=h.onComplete,x=h.css,q=h.renderer,y=null===(l=k.series)||void 0===l?void 0:l.options.animation;if(k.shouldDraw())g||(k.graphic=g=q[h.shapeType](h.shapeArgs).add(h.group)),g.css(x).attr(h.attribs).animate(r,h.isNew?!1:y,p);else if(g){var t=function(){k.graphic=g=g.destroy();a(p)&&p()};Object.keys(r).length?g.animate(r,void 0,function(){t()}):t()}};return{draw:g,drawPoint:function(a){(a.attribs=a.attribs||{})["class"]=this.getClassName();g.call(this,a)},isFn:a}});p(a,"Mixins/Polygon.js",[a["Core/Globals.js"],
a["Core/Utilities.js"]],function(a,g){var h=g.find,l=g.isArray,k=g.isNumber,p=a.deg2rad,r=function(c,b){b=k(b)?b:14;b=Math.pow(10,b);return Math.round(c*b)/b},F=function(c,b){var a=b[0]-c[0];c=b[1]-c[1];return[[-c,a],[c,-a]]},x=function(c,b){c=c.map(function(c){return c[0]*b[0]+c[1]*b[1]});return{min:Math.min.apply(this,c),max:Math.max.apply(this,c)}},q=function(c,b){var a=c[0];c=c[1];var m=p*-b;b=Math.cos(m);m=Math.sin(m);return[r(a*b-c*m),r(a*m+c*b)]},y=function(c,b,a){c=q([c[0]-b[0],c[1]-b[1]],
a);return[c[0]+b[0],c[1]+b[1]]},t=function(c){var b=c.axes;if(!l(b)){b=[];var a=a=c.concat([c[0]]);a.reduce(function(c,a){var m=F(c,a)[0];h(b,function(b){return b[0]===m[0]&&b[1]===m[1]})||b.push(m);return a});c.axes=b}return b},C=function(c,b){c=t(c);b=t(b);return c.concat(b)};return{getBoundingBoxFromPolygon:function(c){return c.reduce(function(b,c){var a=c[0];c=c[1];b.left=Math.min(a,b.left);b.right=Math.max(a,b.right);b.bottom=Math.max(c,b.bottom);b.top=Math.min(c,b.top);return b},{left:Number.MAX_VALUE,
right:-Number.MAX_VALUE,bottom:-Number.MAX_VALUE,top:Number.MAX_VALUE})},getPolygon:function(c,b,a,m,g){var h=[c,b],l=c-a/2;c+=a/2;a=b-m/2;b+=m/2;return[[l,a],[c,a],[c,b],[l,b]].map(function(b){return y(b,h,-g)})},isPolygonsColliding:function(c,b){var a=C(c,b);return!h(a,function(a){var g=x(c,a);a=x(b,a);return!!(a.min>g.max||a.max<g.min)})},movePolygon:function(a,b,g){return g.map(function(c){return[c[0]+a,c[1]+b]})},rotate2DToOrigin:q,rotate2DToPoint:y}});p(a,"Series/WordcloudSeries.js",[a["Core/Series/Series.js"],
a["Mixins/DrawPoint.js"],a["Core/Globals.js"],a["Mixins/Polygon.js"],a["Core/Utilities.js"]],function(a,g,h,l,k){function p(f,d){var e=!1,a=f.rect,b=f.polygon,c=f.lastCollidedWith,g=function(d){var e=d.rect;(e=!(e.left>a.right||e.right<a.left||e.top>a.bottom||e.bottom<a.top))&&(f.rotation%90||d.rotation%90)&&(e=B(b,d.polygon));return e};c&&((e=g(c))||delete f.lastCollidedWith);e||(e=!!K(d,function(d){var e=g(d);e&&(f.lastCollidedWith=d);return e}));return e}function r(f,d){d=4*f;var e=Math.ceil((Math.sqrt(d)-
1)/2),a=2*e+1,b=Math.pow(a,2),c=!1;--a;1E4>=f&&("boolean"===typeof c&&d>=b-a&&(c={x:e-(b-d),y:-e}),b-=a,"boolean"===typeof c&&d>=b-a&&(c={x:-e,y:-e+(b-d)}),b-=a,"boolean"===typeof c&&(c=d>=b-a?{x:-e+(b-d),y:e}:{x:e,y:e-(b-d-a)}),c.x*=5,c.y*=5);return c}function F(f,d,e){var a=2*Math.max(Math.abs(e.top),Math.abs(e.bottom));e=2*Math.max(Math.abs(e.left),Math.abs(e.right));return Math.min(0<e?1/e*f:1,0<a?1/a*d:1)}function x(f,d,e){e=e.reduce(function(f,d){d=d.dimensions;var a=Math.max(d.width,d.height);
f.maxHeight=Math.max(f.maxHeight,d.height);f.maxWidth=Math.max(f.maxWidth,d.width);f.area+=a*a;return f},{maxHeight:0,maxWidth:0,area:0});e=Math.max(e.maxHeight,e.maxWidth,.85*Math.sqrt(e.area));var a=f>d?f/d:1;f=d>f?d/f:1;return{width:e*a,height:e*f,ratioX:a,ratioY:f}}function q(f,d,a,c){var e=!1;u(f)&&u(d)&&u(a)&&u(c)&&0<f&&-1<d&&c>a&&(e=a+d%f*((c-a)/(f-1||1)));return e}function y(f,d){var a,c=[];for(a=1;1E4>a;a++)c.push(f(a,d));return function(f){return 1E4>=f?c[f-1]:!1}}function t(f,a){var d=
a.width/2,c=-(a.height/2),b=a.height/2;return!(-(a.width/2)<f.left&&d>f.right&&c<f.top&&b>f.bottom)}function C(a,d){var f=d.placed,c=d.field,b=d.rectangle,g=d.polygon,h=d.spiral,l=1,k={x:0,y:0},m=a.rect=z({},b);a.polygon=g;for(a.rotation=d.rotation;!1!==k&&(p(a,f)||t(m,c));)k=h(l),A(k)&&(m.left=b.left+k.x,m.right=b.right+k.x,m.top=b.top+k.y,m.bottom=b.bottom+k.y,a.polygon=G(k.x,k.y,g)),l++;return k}function c(a,d){if(A(a)&&A(d)){var f=d.bottom-d.top;var c=d.right-d.left;d=a.ratioX;var b=a.ratioY;
f=c*d>f*b?c:f;a=L(a,{width:a.width+f*d*2,height:a.height+f*b*2})}return a}var b=h.noop,J=l.getBoundingBoxFromPolygon,m=l.getPolygon,B=l.isPolygonsColliding,G=l.movePolygon,z=k.extend,K=k.find,M=k.isArray,u=k.isNumber,A=k.isObject,L=k.merge,D=h.Series;l={animate:D.prototype.animate,animateDrilldown:b,animateDrillupFrom:b,setClip:b,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};D.prototype.bindAxes.call(this);z(this.yAxis.options,
a);z(this.xAxis.options,a)},pointAttribs:function(a,d){a=h.seriesTypes.column.prototype.pointAttribs.call(this,a,d);delete a.stroke;delete a["stroke-width"];return a},deriveFontSize:function(a,d,c){a=u(a)?a:0;d=u(d)?d:1;c=u(c)?c:1;return Math.floor(Math.max(c,a*d))},drawPoints:function(){var a=this,d=a.hasRendered,b=a.xAxis,g=a.yAxis,k=a.group,h=a.options,l=h.animation,p=h.allowExtendPlayingField,r=a.chart.renderer,q=r.text().add(k),t=[],B=a.placementStrategy[h.placementStrategy],D=h.rotation,G=a.points.map(function(a){return a.weight}),
H=Math.max.apply(null,G),E=a.points.concat().sort(function(a,d){return d.weight-a.weight});a.group.attr({scaleX:1,scaleY:1});E.forEach(function(d){var c=a.deriveFontSize(1/H*d.weight,h.maxFontSize,h.minFontSize);c=z({fontSize:c+"px"},h.style);q.css(c).attr({x:0,y:0,text:d.name});c=q.getBBox(!0);d.dimensions={height:c.height,width:c.width}});var v=x(b.len,g.len,E);var I=y(a.spirals[h.spiral],{field:v});E.forEach(function(b){var f=a.deriveFontSize(1/H*b.weight,h.maxFontSize,h.minFontSize);f=z({fontSize:f+
"px"},h.style);var e=B(b,{data:E,field:v,placed:t,rotation:D}),g=z(a.pointAttribs(b,b.selected&&"select"),{align:"center","alignment-baseline":"middle",x:e.x,y:e.y,text:b.name,rotation:e.rotation}),q=m(e.x,e.y,b.dimensions.width,b.dimensions.height,e.rotation),n=J(q),w=C(b,{rectangle:n,polygon:q,field:v,placed:t,spiral:I,rotation:e.rotation});!w&&p&&(v=c(v,n),w=C(b,{rectangle:n,polygon:q,field:v,placed:t,spiral:I,rotation:e.rotation}));if(A(w)){g.x+=w.x;g.y+=w.y;n.left+=w.x;n.right+=w.x;n.top+=w.y;
n.bottom+=w.y;e=v;if(!u(e.left)||e.left>n.left)e.left=n.left;if(!u(e.right)||e.right<n.right)e.right=n.right;if(!u(e.top)||e.top>n.top)e.top=n.top;if(!u(e.bottom)||e.bottom<n.bottom)e.bottom=n.bottom;v=e;t.push(b);b.isNull=!1}else b.isNull=!0;if(l){var x={x:g.x,y:g.y};d?(delete g.x,delete g.y):(g.x=0,g.y=0)}b.draw({animatableAttribs:x,attribs:g,css:f,group:k,renderer:r,shapeArgs:void 0,shapeType:"text"})});q=q.destroy();b=F(b.len,g.len,v);a.group.attr({scaleX:b,scaleY:b})},hasData:function(){return A(this)&&
!0===this.visible&&M(this.points)&&0<this.points.length},placementStrategy:{random:function(a,b){var c=b.field;b=b.rotation;return{x:Math.round(c.width*(Math.random()+.5)/2)-c.width/2,y:Math.round(c.height*(Math.random()+.5)/2)-c.height/2,rotation:q(b.orientations,a.index,b.from,b.to)}},center:function(a,b){b=b.rotation;return{x:0,y:0,rotation:q(b.orientations,a.index,b.from,b.to)}}},pointArrayMap:["weight"],spirals:{archimedean:function(a,b){var c=b.field;b=!1;c=c.width*c.width+c.height*c.height;
var d=.8*a;1E4>=a&&(b={x:d*Math.cos(d),y:d*Math.sin(d)},Math.min(Math.abs(b.x),Math.abs(b.y))<c||(b=!1));return b},rectangular:function(a,b){a=r(a,b);b=b.field;a&&(a.x*=b.ratioX,a.y*=b.ratioY);return a},square:r},utils:{extendPlayingField:c,getRotation:q,isPolygonsColliding:B,rotate2DToOrigin:l.rotate2DToOrigin,rotate2DToPoint:l.rotate2DToPoint},getPlotBox:function(){var a=this.chart,b=a.inverted,c=this[b?"yAxis":"xAxis"];b=this[b?"xAxis":"yAxis"];return{translateX:(c?c.left:a.plotLeft)+(c?c.len:
a.plotWidth)/2,translateY:(b?b.top:a.plotTop)+(b?b.len:a.plotHeight)/2,scaleX:1,scaleY:1}}};g={draw:g.drawPoint,shouldDraw:function(){return!this.isNull},isValid:function(){return!0},weight:1};"";a.seriesType("wordcloud","column",{allowExtendPlayingField:!0,animation:{duration:500},borderWidth:0,clip:!1,colorByPoint:!0,minFontSize:1,maxFontSize:25,placementStrategy:"center",rotation:{from:0,orientations:2,to:90},showInLegend:!1,spiral:"rectangular",style:{fontFamily:"sans-serif",fontWeight:"900",
whiteSpace:"nowrap"},tooltip:{followPointer:!0,pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.weight}</b><br/>'}},l,g)});p(a,"masters/modules/wordcloud.src.js",[],function(){})});
//# sourceMappingURL=wordcloud.js.map