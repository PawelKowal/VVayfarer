(this.webpackJsonpvvayfarer=this.webpackJsonpvvayfarer||[]).push([[0],{112:function(e,a,t){},113:function(e,a,t){},115:function(e,a,t){"use strict";t.r(a);var n,r=t(0),l=t.n(r),c=t(9),i=t.n(c),o=(t(88),t(89),t(42)),m=t(11),s=t(32),u=t(48),d=t(50),E=t.n(d),p=t(68),f=t(36),g=t(69),v=t.n(g).a.create({baseURL:"https://localhost:5001"}),b=Object(f.b)("user/getUser",function(){var e=Object(p.a)(E.a.mark((function e(a){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/api/users/"+a);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()),h=Object(f.c)(),w=Object(f.d)({name:"user",initialState:h.getInitialState({status:"idle",error:null}),reducers:{userLoaded:h.setAll},extraReducers:(n={},Object(u.a)(n,b.pending,(function(e,a){e.status="loading",e.error=null})),Object(u.a)(n,b.fulfilled,(function(e,a){"loading"===e.status&&(h.upsertOne(e,a),e.status="succeeded")})),Object(u.a)(n,b.rejected,(function(e,a){"loading"===e.status&&(e.status="failed",e.error=a.payload)})),n)}),y=(w.actions.userLoaded,h.getSelectors((function(e){return e.user})).selectById,w.reducer),j=t(40),O=t(151),x=t(143),S=t(152),k=t(154),C=t(155),N=t(147),B=t(148),L=(t(112),t(149)),D=(t(113),function(){var e=Object(r.useState)(""),a=Object(j.a)(e,2),t=a[0],n=a[1],c=Object(r.useState)(""),i=Object(j.a)(c,2),o=i[0],m={email:n,password:i[1]},s=function(e){m[e.target.name](e.target.value)};return l.a.createElement("form",{id:"login_form",onSubmit:function(){console.log("XD")}},l.a.createElement(x.a,{container:!0,direction:"column",spacing:3},l.a.createElement(x.a,{item:!0},"Let's go on a trip!"),l.a.createElement(x.a,{item:!0},l.a.createElement(L.a,{type:"email",name:"email",label:"E-mail",variant:"filled",value:t,onChange:s})),l.a.createElement(x.a,{item:!0},l.a.createElement(L.a,{type:"password",name:"email",label:"Password",variant:"filled",value:o,onChange:s})),l.a.createElement(x.a,{item:!0},l.a.createElement(S.a,{variant:"outlined",color:"primary"},"Sign in"))))}),F=function(){return l.a.createElement("div",null,l.a.createElement("form",{id:"reg-form"},l.a.createElement(x.a,{container:!0,direction:"column",spacing:1},l.a.createElement(x.a,{item:!0},l.a.createElement(L.a,{type:"text",label:"First name",variant:"filled"})),l.a.createElement(x.a,{item:!0},l.a.createElement(L.a,{type:"text",label:"Last name",variant:"filled"})),l.a.createElement(x.a,{item:!0},l.a.createElement(L.a,{type:"email",label:"E-mail",variant:"filled"})),l.a.createElement(x.a,{item:!0},l.a.createElement(L.a,{type:"password",label:"Password",variant:"filled"})),l.a.createElement(x.a,{item:!0},l.a.createElement(L.a,{type:"password",label:"Repeat password",variant:"filled"})))))},I=function(){var e=Object(r.useState)(!1),a=Object(j.a)(e,2),t=a[0],n=a[1],c=l.a.createElement(O.a,{className:"leftBox"},l.a.createElement(x.a,{container:!0,direction:"column",spacing:2},l.a.createElement(x.a,{item:!0,className:"siteName"},"VVayfarer"),l.a.createElement(x.a,{item:!0,className:"siteDescription"},"Welcome on my tourist social networking site."))),i=l.a.createElement(O.a,{className:"rightBox"},l.a.createElement(x.a,{container:!0,direction:"column",spacing:3},l.a.createElement(x.a,{item:!0},l.a.createElement(D,null)),l.a.createElement(x.a,{item:!0},"Don't have account?"),l.a.createElement(x.a,{item:!0},l.a.createElement(S.a,{variant:"outlined",color:"primary",onClick:function(){return n(!0)}},"Sign up")))),o=l.a.createElement(k.a,{open:t,onClose:function(){return n(!1)}},l.a.createElement(C.a,{id:"form-dialog-title",className:"dialogTitle"},"Create account"),l.a.createElement(N.a,null,l.a.createElement(F,null)),l.a.createElement(B.a,null,l.a.createElement(S.a,{onClick:function(){return n(!1)},color:"primary",variant:"outlined"},"Sign up")));return l.a.createElement(l.a.Fragment,null,l.a.createElement(x.a,{container:!0,direction:"row"},c,i),o)},R=function(){return l.a.createElement("div",null,"Hello")};var W=function(){return l.a.createElement(o.a,null,l.a.createElement(m.a,{exact:!0,path:"/",component:I}),l.a.createElement(m.a,{exact:!0,path:"/posts",component:R}))},J=Object(f.a)({reducer:{user:y}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{store:J},l.a.createElement(W,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},83:function(e,a,t){e.exports=t(115)},88:function(e,a,t){},89:function(e,a,t){}},[[83,1,2]]]);
//# sourceMappingURL=main.b942e598.chunk.js.map