(this["webpackJsonpopen-mic-nights"]=this["webpackJsonpopen-mic-nights"]||[]).push([[0],{106:function(e,t){},259:function(e,t,a){},275:function(e,t){},277:function(e,t){},295:function(e,t){},331:function(e,t){},333:function(e,t){},365:function(e,t){},367:function(e,t){},368:function(e,t){},373:function(e,t){},375:function(e,t){},381:function(e,t){},383:function(e,t){},402:function(e,t){},414:function(e,t){},417:function(e,t){},466:function(e,t,a){"use strict";a.r(t);var n=a(111),r=a(112),s=a(116),c=a(115),i=a(113),o=a(12),l=a(230),d=a(232),u=a(233),b=a(7),h=a.n(b),j=a(110),m=a.n(j),p=a(231),O=a.n(p),g=(a(259),a(114)),f=a.p+"static/media/milano-2.80d62e66.png",x=a(42),v=a(0),y=a(262).GoogleSpreadsheet,w="1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8",F="https://docs.google.com/spreadsheets/d/"+w,k="AIzaSyBf1UOdCb4_NT4h_g4Wzz4taWIok5cpeCQ";function N(e){var t=e.column,a=t.filterValue,n=t.setFilter,r=t.preFilteredRows,s=t.id,c=h.a.useMemo((function(){var e=new Set;return r.forEach((function(t){e.add(t.values[s])})),Object(u.a)(e.values())}),[s,r]);return Object(v.jsxs)("select",{className:"select is-small",value:a,onChange:function(e){n(e.target.value||void 0)},children:[Object(v.jsx)("option",{value:"",children:"All"}),c.map((function(e,t){return Object(v.jsx)("option",{value:e,children:e},t)}))]})}function C(e){var t=e.column,a=t.filterValue,n=t.setFilter;return Object(v.jsx)("input",{className:"input is-small",value:a||"",onChange:function(e){return n(e.target.value)}})}function I(){var e=Object(b.useState)({headerValues:null,rows:[],isFetching:!1}),t=Object(d.a)(e,2),a=t[0],n=t[1];Object(b.useEffect)((function(){Object(l.a)(Object(i.a)().mark((function e(){var t,r,s;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n(Object(o.a)(Object(o.a)({},a),{},{isFetching:!0})),(t=new y(w)).useApiKey(k),e.next=6,t.loadInfo();case 6:return r=t.sheetsByIndex[0],e.next=9,r.getRows();case 9:s=e.sent,n({headerValues:r.headerValues,rows:s,isFetching:!1}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),console.error(e.t0),n(Object(o.a)(Object(o.a)({},a),{},{isFetching:!1}));case 17:case"end":return e.stop()}}),e,null,[[0,13]])})))()}),[]);var r=h.a.useMemo((function(){return a.isFetching||null==a.headerValues?[]:a.rows.map((function(e){return{Address:e.Address,AudienceEntryFee:e["Audience Entry Fee"],HowToBook:e["Contact / Book a Spot"],Language:e.Language,Category:e["Event Category"],SubCategory:e["Event Sub-Category"],Status:e.Status,OrganizerName:e["Organizer Name"],Description:e["Event Description"],FacebookGroup:e["Facebook Group"],FacebookPage:e["Facebook Page"],Frequency:e.Frequency,Indoor:e["Indoor / Outdoor"],Instagram:e.Instagram,Latitude:e.Latitude,Level:e["Comedian Level"],Longitude:e.Longitude,Name:e.Name,PayToPlay:e["Pay to Play"],RowNumber:e.rowNumber,Time:e["Event Time"],UpdateInfoFormLink:e["Update Info Form Link"],Venue:e.Venue,WalkIn:e["Walk-in"],Weekday:e["Weekday / Month"],Website:e.Website,WheelchairAccess:e["Wheelchair Access"]}}))}),[a]),s=h.a.useMemo((function(){return a.isFetching||null==a.headerValues?[]:[{Header:"",accessor:"UpdateInfoFormLink",disableFilters:!0,Cell:function(e){var t=e.row;return Object(v.jsx)("a",{href:t.original.UpdateInfoFormLink,target:"_blank",children:Object(v.jsx)(x.c,{})})}},{Header:"",accessor:"Instagram",disableFilters:!0,Cell:function(e){var t=e.row;return Object(v.jsx)("a",{href:t.original.Instagram,children:Object(v.jsx)(x.b,{})})}},{Header:"",accessor:"FacebookPage",disableFilters:!0,Cell:function(e){var t=e.row;return Object(v.jsx)("a",{href:t.original.FacebookPage,children:Object(v.jsx)(x.a,{})})}},{Header:"Name",accessor:"Name",disableFilters:!0,Filter:C},{Header:"Description",accessor:"Description",hideInitially:!0,Filter:C},{Header:"Category",accessor:"Category",hideInitially:!0,Filter:C},{Header:"Sub Category",accessor:"SubCategory",hideInitially:!0,Filter:C},{Header:"Status",accessor:"Status",Filter:N,filter:"equals"},{Header:"Organizer Name",accessor:"OrganizerName",hideInitially:!0,Filter:C},{Header:"Audience Entry Fee",accessor:"AudienceEntryFee",hideInitially:!0,Filter:N},{Header:"Level",accessor:"Level",Filter:N,filter:"equals"},{Header:"Language",accessor:"Language",Filter:N},{Header:"Frequency",accessor:"Frequency",Filter:N},{Header:"Weekday",accessor:"Weekday",Filter:N},{Header:"Time",accessor:"Time",Filter:C},{Header:"Venue",accessor:"Venue",Filter:C,disableFilters:!0},{Header:"Website",accessor:"Website",hideInitially:!0,disableFilters:!0},{Header:"Address",accessor:"Address",Filter:C,disableFilters:!0},{Header:"Wheelchair Access",accessor:"WheelchairAccess",hideInitially:!0,Filter:N},{Header:"How To Book",accessor:"HowToBook",Filter:C,disableFilters:!0},{Header:"Facebook Group",accessor:"FacebookGroup",hideInitially:!0,disableFilters:!0,Cell:function(e){var t=e.row;return Object(v.jsx)("a",{href:t.original.FacebookGroup,children:t.original.FacebookGroup})}}]}),[a]),c=h.a.useMemo((function(){return[{id:"BackOn",value:"Yes"}]})),u=Object(g.useTable)({columns:s,data:r,initialState:{hiddenColumns:s.filter((function(e){return e.hideInitially})).map((function(e){return e.accessor})),filters:c}},g.useFilters),j=u.getTableProps,m=u.getTableBodyProps,p=u.headerGroups,O=u.rows,f=u.prepareRow,F=u.allColumns;return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"columns is-multiline",children:[Object(v.jsx)("span",{className:"map column is-12-mobile is-5-desktop",children:Object(v.jsx)(L,{results:O})}),Object(v.jsxs)("span",{className:"table_wrapper column is-12-mobile is-7-desktop",children:[Object(v.jsxs)("div",{id:"table-dropdown",className:"dropdown",children:[Object(v.jsx)("div",{className:"dropdown-trigger",children:Object(v.jsx)("button",{className:"button",onClick:function(){return document.getElementById("table-dropdown").classList.toggle("is-active")},children:"Select columns \ud83d\udd3d"})}),Object(v.jsx)("div",{className:"dropdown-menu",id:"dropdown-menu",role:"menu",children:F.map((function(e){return Object(v.jsx)("div",{className:"dropdown-content",children:Object(v.jsxs)("label",{className:"checkbox",children:[Object(v.jsx)("input",Object(o.a)({type:"checkbox"},e.getToggleHiddenProps())),e.id]})},e.id)}))})]}),Object(v.jsxs)("table",Object(o.a)(Object(o.a)({className:"table is-hoverable"},j()),{},{children:[Object(v.jsx)("thead",{children:p.map((function(e){return Object(v.jsx)("tr",Object(o.a)(Object(o.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(v.jsxs)("th",Object(o.a)(Object(o.a)({},e.getHeaderProps()),{},{children:[e.render("Header"),Object(v.jsx)("div",{children:e.canFilter?e.render("Filter"):null})]}))}))}))}))}),Object(v.jsx)("tbody",Object(o.a)(Object(o.a)({},m()),{},{children:O.map((function(e){return f(e),Object(v.jsx)("tr",Object(o.a)(Object(o.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(v.jsx)("td",Object(o.a)(Object(o.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))]})]})})}var H=function(e){var t=e.name;return Object(v.jsx)("div",{style:{position:"relative",bottom:50,left:"-45px",textAlign:"center",width:220,backgroundColor:"white",boxShadow:"0 2px 7px 1px rgba(0, 0, 0, 0.3)",padding:10,fontSize:14,zIndex:100,borderRadius:"25px"},children:Object(v.jsx)("div",{style:{fontSize:16},children:t})})},S=function(e){Object(s.a)(a,e);var t=Object(c.a)(a);function a(e){return Object(n.a)(this,a),t.call(this,e)}return Object(r.a)(a,[{key:"render",value:function(){return Object(v.jsx)("div",{className:this.props.show?"has-background-warning":"has-background-primary-dark",style:{border:"1px solid white",borderRadius:"50%",height:20,width:20,zIndex:10,cursor:"pointer"},children:this.props.show&&Object(v.jsx)(H,{name:this.props.name})})}}]),a}(h.a.Component),L=function(e){Object(s.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e))._onChildClick=function(e,t){r.setState((function(t){var a=t.results.findIndex((function(e){return e.show}));a>0&&t.results[a].original.RowNumber!=parseInt(e)&&(t.results[a].show=!1),a=t.results.findIndex((function(t){return t.original.RowNumber==parseInt(e)})),t.results[a].show=!t.results[a].show;for(var n=document.querySelectorAll("td"),r=null,s=0;s<n.length;s++)if(n[s].textContent==t.results[a].original.Name){r=n[s];break}return r.parentNode.style.backgroundColor="#fffcb3",setTimeout((function(){return r.parentNode.style.backgroundColor="white"}),2e3),r.scrollIntoView({behavior:"smooth",block:"nearest"}),{results:t.results}}))},r.state={results:[]},r}return Object(r.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.results!=e.results&&this.setState((function(e,t){return{results:t.results.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{show:!1})}))}}))}},{key:"render",value:function(){return Object(v.jsx)("div",{id:"map",children:Object(v.jsx)(O.a,{bootstrapURLKeys:{key:k},defaultCenter:{lat:45.463336,lng:9.187174},defaultZoom:13,onChildClick:this._onChildClick,children:this.state.results.map((function(e){return Object(v.jsx)(S,{lat:e.original.Latitude,lng:e.original.Longitude,name:e.original.Name,show:e.show},e.original.RowNumber)}))})})}}]),a}(h.a.Component);function A(){var e=[{question:"Found a bug? Wanna contribute? Rip the site and f**k us?",answer:Object(v.jsxs)("p",{children:["Here's our ",Object(v.jsx)("a",{href:"https://github.com/morettimarco/open-mic-nights",children:"Git repo"}),"! Take a look at my code!"]})},{question:"How can I view the raw data of app?",answer:Object(v.jsxs)("p",{children:["Head to the ",Object(v.jsx)("a",{href:F,children:"Google Sheet."})]})},{question:"Credits",answer:Object(v.jsxs)("p",{children:["Many thanks to the original project ",Object(v.jsx)("a",{href:"https://apuchitnis.github.io/open-mic-nights/",children:"London Standup Comedy Map"}),"  and to the awsome ",Object(v.jsx)("a",{href:"https://apuchitnis.github.io/",children:" Apu Chitnis"})," for sharing it."]})}];return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("nav",{className:"navbar is-light has-shadow py-4 mb-2",children:[Object(v.jsxs)("div",{className:"navbar-brand",children:[Object(v.jsx)("a",{className:"navbar-item",children:Object(v.jsx)("img",{src:f,style:{maxHeight:"150px"}})}),Object(v.jsxs)("div",{className:"navbar-burger",onClick:function(){return document.getElementById("nav-links").classList.toggle("is-active")},children:[Object(v.jsx)("span",{}),Object(v.jsx)("span",{}),Object(v.jsx)("span",{})]})]}),Object(v.jsxs)("div",{className:"navbar-menu",id:"nav-links",children:[Object(v.jsx)("div",{className:"navbar-start",children:Object(v.jsxs)("div",{className:"navbar-item",children:[Object(v.jsx)("p",{className:"title",children:"Milan Standup Comedy Map"}),Object(v.jsx)("p",{className:"subtitle",children:" - Perform comedy near you"})]})}),Object(v.jsxs)("div",{className:"navbar-end",children:[Object(v.jsx)("a",{className:"navbar-item",href:"https://forms.gle/vDuLfQ7Bc9iKxT2o8",children:"\ud83c\udfa4 Submit an open mic night"}),Object(v.jsx)("a",{className:"navbar-item",href:"https://www.instagram.com/_anarchytect/",children:"\ud83d\udce3 Contact me for feedbacks!"})]})]})]}),Object(v.jsx)(I,{}),Object(v.jsx)("div",{className:"section",children:Object(v.jsx)("div",{className:"container",children:Object(v.jsx)("div",{className:"columns is-vcentered",children:e.map((function(e){return Object(v.jsx)("div",{className:"column",children:Object(v.jsxs)("div",{className:"card",children:[Object(v.jsx)("div",{className:"card-header",children:Object(v.jsx)("div",{className:"card-header-title",children:e.question})}),Object(v.jsx)("div",{className:"card-content",children:Object(v.jsx)("div",{className:"content",children:e.answer})})]})},e.question)}))})})})]})}var T=document.getElementById("app");m.a.render(Object(v.jsx)(A,{}),T)}},[[466,1,2]]]);
//# sourceMappingURL=main.deeccd46.chunk.js.map