"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7241],{7241:(y,m,s)=>{s.d(m,{K:()=>o});var f=s(467),P=s(2784),g=s(4412),e=s(3953),u=s(8287),p=s(1182),c=s(4742),E=s(4964),M=s(177),C=s(4341);function _(l,h){if(1&l){const i=e.RV6();e.j41(0,"div",11)(1,"div",12)(2,"div",13)(3,"div",14)(4,"h1",15),e.EFF(5),e.k0s(),e.j41(6,"p",16),e.EFF(7),e.k0s()(),e.j41(8,"div",17)(9,"div",18)(10,"span",19),e.EFF(11,"4.8"),e.k0s(),e.j41(12,"span",20),e.EFF(13,"Calificaci\xf3n"),e.k0s()(),e.j41(14,"div",18)(15,"span",19),e.EFF(16,"150"),e.k0s(),e.j41(17,"span",20),e.EFF(18,"Viajes"),e.k0s()()()()(),e.j41(19,"div",21)(20,"h2",22),e.EFF(21,"Informaci\xf3n Personal"),e.k0s(),e.j41(22,"div",23)(23,"div",24),e.nrm(24,"ion-icon",25),e.j41(25,"div",26)(26,"ion-label"),e.EFF(27,"Nombre de usuario"),e.k0s(),e.j41(28,"ion-input",27),e.mxI("ngModelChange",function(t){e.eBV(i);const a=e.XpG(2);return e.DH7(a.userProfile.username,t)||(a.userProfile.username=t),e.Njj(t)}),e.k0s()()(),e.j41(29,"div",24),e.nrm(30,"ion-icon",28),e.j41(31,"div",26)(32,"ion-label"),e.EFF(33,"Nombre"),e.k0s(),e.j41(34,"ion-input",27),e.mxI("ngModelChange",function(t){e.eBV(i);const a=e.XpG(2);return e.DH7(a.userProfile.name,t)||(a.userProfile.name=t),e.Njj(t)}),e.k0s()()(),e.j41(35,"div",24),e.nrm(36,"ion-icon",29),e.j41(37,"div",26)(38,"ion-label"),e.EFF(39,"Tel\xe9fono"),e.k0s(),e.j41(40,"ion-input",27),e.mxI("ngModelChange",function(t){e.eBV(i);const a=e.XpG(2);return e.DH7(a.userProfile.phone,t)||(a.userProfile.phone=t),e.Njj(t)}),e.k0s()()(),e.j41(41,"div",24),e.nrm(42,"ion-icon",30),e.j41(43,"div",26)(44,"ion-label"),e.EFF(45,"Fecha de creaci\xf3n"),e.k0s(),e.j41(46,"ion-datetime",31),e.mxI("ngModelChange",function(t){e.eBV(i);const a=e.XpG(2);return e.DH7(a.createdAtIso,t)||(a.createdAtIso=t),e.Njj(t)}),e.bIt("ionChange",function(t){e.eBV(i);const a=e.XpG(2);return e.Njj(a.onDateChange(t))}),e.k0s()()()()()()}if(2&l){const i=e.XpG(2);e.R7$(5),e.JRh(i.userProfile.name||i.userProfile.username||"Usuario"),e.R7$(2),e.JRh(i.userProfile.email),e.R7$(16),e.AVh("editing",i.isEditing),e.R7$(5),e.R50("ngModel",i.userProfile.username),e.Y8G("readonly",!i.isEditing),e.R7$(),e.AVh("editing",i.isEditing),e.R7$(5),e.R50("ngModel",i.userProfile.name),e.Y8G("readonly",!i.isEditing),e.R7$(),e.AVh("editing",i.isEditing),e.R7$(5),e.R50("ngModel",i.userProfile.phone),e.Y8G("readonly",!i.isEditing),e.R7$(),e.AVh("editing",i.isEditing),e.R7$(5),e.R50("ngModel",i.createdAtIso),e.Y8G("readonly",!i.isEditing)("max",i.maxDate)}}function O(l,h){if(1&l&&(e.qex(0),e.DNE(1,_,47,19,"div",10),e.bVm()),2&l){const i=e.XpG();e.R7$(),e.Y8G("ngIf",i.userProfile)}}function x(l,h){1&l&&(e.j41(0,"div",32),e.nrm(1,"ion-spinner"),e.j41(2,"p"),e.EFF(3,"Cargando perfil..."),e.k0s()())}function r(l,h){if(1&l){const i=e.RV6();e.j41(0,"ion-footer",1)(1,"ion-toolbar")(2,"ion-button",33),e.bIt("click",function(){e.eBV(i);const t=e.XpG();return e.Njj(t.toggleEdit())}),e.nrm(3,"ion-icon",34),e.EFF(4),e.k0s()()()}if(2&l){const i=e.XpG();e.R7$(3),e.Y8G("name",i.isEditing?"save-outline":"create-outline"),e.R7$(),e.SpI(" ",i.isEditing?"Guardar cambios":"Editar perfil"," ")}}let o=(()=>{var l;class h{constructor(n,t,a,d,v){this.firebaseService=n,this.afAuth=t,this.toastController=a,this.modalController=d,this.router=v,this.userProfile=null,this.isEditing=!1,this.userId=null,this.selectedSegment="info",this.isLoading$=new g.t(!0),this.createdAtIso="",this.maxDate=(new Date).toISOString()}ngOnInit(){this.loadUserProfile()}loadUserProfile(){this.afAuth.authState.subscribe(n=>{n?(console.log("Usuario autenticado:",n),this.userId=n.uid,this.firebaseService.getUserProfile(this.userId).subscribe(t=>{console.log("Perfil recibido de Firebase:",t),t?(this.userProfile=t,this.createdAtIso=t.createdAt.toDate().toISOString(),console.log("Perfil de usuario cargado:",this.userProfile)):(console.log("No se encontr\xf3 perfil, creando uno por defecto"),this.createDefaultProfile(n.uid,n.email||"")),this.isLoading$.next(!1)},t=>{console.error("Error al obtener el perfil:",t),this.isLoading$.next(!1),this.showToast("Error al cargar el perfil","danger")})):(this.isLoading$.next(!1),console.log("No hay usuario autenticado"),this.showToast("No se pudo autenticar al usuario","warning"))})}createDefaultProfile(n,t){const a={createdAt:P.Dc.now(),email:t,name:t.split("@")[0],phone:"",profileImage:"",username:t.split("@")[0]};this.firebaseService.setUserProfile(n,a).then(()=>{this.userProfile=a,this.createdAtIso=a.createdAt.toDate().toISOString(),console.log("Perfil por defecto creado:",this.userProfile),this.isLoading$.next(!1),this.showToast("Perfil creado","success")}).catch(d=>{console.error("Error al crear perfil por defecto:",d),this.showToast(`Error al crear perfil: ${d.message}`,"danger"),this.isLoading$.next(!1)})}toggleEdit(){this.isEditing=!this.isEditing}updateProfile(){var n=this;return(0,f.A)(function*(){if(n.userProfile&&n.userId)try{yield n.firebaseService.updateUserProfile(n.userId,n.userProfile),console.log("Perfil actualizado:",n.userProfile),n.isEditing=!1,n.showToast("Perfil actualizado con \xe9xito","success"),n.dismissModal(!0)}catch(t){console.error("Error al actualizar el perfil:",t),n.showToast("Error al actualizar el perfil","danger")}})()}onFileSelected(n){var t;const a=null===(t=n.target.files)||void 0===t?void 0:t[0];if(a){const d=new FileReader;d.onload=v=>{var b;this.userProfile&&null!==(b=v.target)&&void 0!==b&&b.result&&(this.userProfile.profileImage=v.target.result)},d.readAsDataURL(a)}}showToast(n,t){var a=this;return(0,f.A)(function*(){yield(yield a.toastController.create({message:n,duration:2e3,color:t})).present()})()}onDateChange(n){if(this.userProfile){const t=new Date(n.detail.value);this.userProfile.createdAt=P.Dc.fromDate(t),this.createdAtIso=t.toISOString()}}formatDate(n){return n.toDate().toLocaleDateString("es-ES",{day:"2-digit",month:"short",year:"numeric"})}dismissModal(n=!1){this.modalController.dismiss({refresh:n})}navigateTo(n){switch(n){case"profile":break;case"payment-methods":this.router.navigate(["/payment-methods"]);break;case"trip-history":this.router.navigate(["/trip-history"])}}}return(l=h).\u0275fac=function(n){return new(n||l)(e.rXU(u.f),e.rXU(p.DS),e.rXU(c.K_),e.rXU(c.W3),e.rXU(E.Ix))},l.\u0275cmp=e.VBU({type:l,selectors:[["app-user-profile"]],decls:16,vars:6,consts:[["loading",""],[1,"ion-no-border"],["color","primary"],["slot","start"],[3,"click"],["name","close-outline"],["slot","end"],[1,"ion-no-padding"],[4,"ngIf","ngIfElse"],["class","ion-no-border",4,"ngIf"],["class","profile-container",4,"ngIf"],[1,"profile-container"],[1,"profile-header"],[1,"header-content"],[1,"profile-info"],[1,"profile-name"],[1,"profile-email"],[1,"profile-stats"],[1,"stat-item"],[1,"stat-value"],[1,"stat-label"],[1,"profile-content"],[1,"section-title"],[1,"user-data-container"],[1,"user-data-item"],["name","person-outline"],[1,"data-content"],[3,"ngModelChange","ngModel","readonly"],["name","text-outline"],["name","call-outline"],["name","calendar-outline"],["displayFormat","DD MMM YYYY",3,"ngModelChange","ionChange","ngModel","readonly","max"],[1,"loading-container"],["expand","block",1,"edit-button",3,"click"],["slot","start",3,"name"]],template:function(n,t){if(1&n){const a=e.RV6();e.j41(0,"ion-header",1)(1,"ion-toolbar",2)(2,"ion-buttons",3)(3,"ion-button",4),e.bIt("click",function(){return e.eBV(a),e.Njj(t.dismissModal())}),e.nrm(4,"ion-icon",5),e.k0s()(),e.j41(5,"ion-title"),e.EFF(6,"Mi Perfil"),e.k0s(),e.j41(7,"ion-buttons",6)(8,"ion-button",4),e.bIt("click",function(){return e.eBV(a),e.Njj(t.toggleEdit())}),e.EFF(9),e.k0s()()()(),e.j41(10,"ion-content",7),e.DNE(11,O,2,1,"ng-container",8),e.nI1(12,"async"),e.DNE(13,x,4,0,"ng-template",null,0,e.C5r),e.k0s(),e.DNE(15,r,5,2,"ion-footer",9)}if(2&n){const a=e.sdS(14);e.R7$(9),e.SpI(" ",t.isEditing?"Cancelar":"Editar"," "),e.R7$(2),e.Y8G("ngIf",!1===e.bMT(12,4,t.isLoading$))("ngIfElse",a),e.R7$(4),e.Y8G("ngIf",t.userProfile)}},dependencies:[M.bT,C.BC,C.vS,c.Jm,c.QW,c.W9,c.A9,c.M0,c.eU,c.iq,c.$w,c.he,c.w2,c.BC,c.ai,c.Je,c.Gw,M.Jj],styles:['[_nghost-%COMP%]{--page-background: #f0f4f8;--card-background: #ffffff;--primary-color: #4a90e2;--secondary-color: #50e3c2;--accent-color: #ff6b6b;--text-color: #2c3e50;--text-light: #7f8c8d;--item-background: #e8f0fe;--item-background-editing: #d0e1fd}ion-content[_ngcontent-%COMP%]{--background: var(--page-background)}.profile-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:100%;background-color:var(--page-background);animation:_ngcontent-%COMP%_fadeIn .5s ease-out}.profile-header[_ngcontent-%COMP%]{background:linear-gradient(135deg,var(--primary-color),var(--secondary-color));padding:40px 20px;color:#fff;position:relative;overflow:hidden}.profile-header[_ngcontent-%COMP%]:before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,#fff3,#fff0 80%);animation:_ngcontent-%COMP%_rotate 20s linear infinite}.header-content[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;position:relative;z-index:1}.profile-info[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px}.profile-name[_ngcontent-%COMP%]{font-size:32px;font-weight:700;margin:0;text-shadow:0 2px 4px rgba(0,0,0,.1);animation:_ngcontent-%COMP%_slideInDown .5s ease-out}.profile-email[_ngcontent-%COMP%]{font-size:18px;opacity:.9;margin:5px 0 0;animation:_ngcontent-%COMP%_slideInUp .5s ease-out .2s both}.profile-stats[_ngcontent-%COMP%]{display:flex;justify-content:space-around;background-color:#ffffff1a;border-radius:12px;padding:15px;animation:_ngcontent-%COMP%_fadeIn .5s ease-out .4s both}.stat-item[_ngcontent-%COMP%]{text-align:center;transition:transform .3s ease}.stat-item[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.stat-value[_ngcontent-%COMP%]{font-size:28px;font-weight:700;display:block}.stat-label[_ngcontent-%COMP%]{font-size:14px;opacity:.8}.profile-content[_ngcontent-%COMP%]{flex:1;background:var(--card-background);border-radius:20px 20px 0 0;margin-top:-20px;padding:30px 20px;box-shadow:0 -4px 10px #0000001a;position:relative;z-index:2}.section-title[_ngcontent-%COMP%]{font-size:24px;font-weight:600;color:var(--text-color);margin-bottom:20px;animation:_ngcontent-%COMP%_slideInLeft .5s ease-out}ion-list[_ngcontent-%COMP%]{background:transparent}ion-item[_ngcontent-%COMP%]{--padding-start: 0;--inner-padding-end: 0;--background: transparent;margin-bottom:20px}ion-label[_ngcontent-%COMP%]{color:var(--text-light);font-size:14px;font-weight:500}ion-input[_ngcontent-%COMP%]{--padding-start: 0;font-size:16px;--color: var(--text-color)}ion-icon[_ngcontent-%COMP%]{color:var(--primary-color);font-size:24px;margin-right:15px}.loading-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;background-color:var(--page-background)}.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%]{margin-bottom:20px}ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: var(--card-background);--border-color: transparent}.edit-button[_ngcontent-%COMP%]{--background: var(--primary-color);--background-activated: var(--secondary-color);--border-radius: 8px;font-weight:600;margin:0 16px;transition:all .3s ease}.edit-button[_ngcontent-%COMP%]:hover{--background: var(--secondary-color);transform:translateY(-2px);box-shadow:0 4px 8px #0003}.edit-button[_ngcontent-%COMP%]:active{transform:scale(.98)}.user-data-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}.user-data-item[_ngcontent-%COMP%]{display:flex;align-items:center;background-color:var(--item-background);border-radius:12px;padding:16px;transition:all .3s ease;animation:_ngcontent-%COMP%_fadeInUp .5s ease-out both}.user-data-item[_ngcontent-%COMP%]:nth-child(1){animation-delay:.6s}.user-data-item[_ngcontent-%COMP%]:nth-child(2){animation-delay:.7s}.user-data-item[_ngcontent-%COMP%]:nth-child(3){animation-delay:.8s}.user-data-item[_ngcontent-%COMP%]:nth-child(4){animation-delay:.9s}.user-data-item.editing[_ngcontent-%COMP%]{background-color:var(--item-background-editing);transform:scale(1.02);box-shadow:0 4px 8px #0000001a}.user-data-item[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 6px 12px #0000001a}.user-data-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:24px;color:var(--primary-color);margin-right:16px;transition:transform .3s ease}.user-data-item[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%]{transform:scale(1.2)}.user-data-item[_ngcontent-%COMP%]   .data-content[_ngcontent-%COMP%]{flex:1}.user-data-item[_ngcontent-%COMP%]   .data-content[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{display:block;font-size:14px;color:var(--text-light);margin-bottom:4px;transition:color .3s ease}.user-data-item[_ngcontent-%COMP%]   .data-content[_ngcontent-%COMP%]   ion-datetime[_ngcontent-%COMP%]{--padding-start: 0;font-size:16px;--color: var(--text-color);transition:color .3s ease}.user-data-item.editing[_ngcontent-%COMP%]   .data-content[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:var(--primary-color)}.user-data-item.editing[_ngcontent-%COMP%]   .data-content[_ngcontent-%COMP%]   ion-datetime[_ngcontent-%COMP%]{--color: var(--accent-color)}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_slideInDown{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}@keyframes _ngcontent-%COMP%_slideInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes _ngcontent-%COMP%_slideInLeft{0%{opacity:0;transform:translate(-20px)}to{opacity:1;transform:translate(0)}}@keyframes _ngcontent-%COMP%_fadeInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes _ngcontent-%COMP%_rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_pulse{0%{transform:scale(1)}50%{transform:scale(1.05)}to{transform:scale(1)}}.edit-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse 2s infinite}']}),h})()},8287:(y,m,s)=>{s.d(m,{f:()=>C});var f=s(467),P=s(7673),g=s(6354),e=s(5558),u=s(6697),p=s(3953),c=s(6340),E=s(1182),M=s(4964);let C=(()=>{var _;class O{constructor(r,o,l){this.firestore=r,this.afAuth=o,this.router=l}getRandomDriver(){return this.firestore.collection("drivers").valueChanges({idField:"id"}).pipe((0,g.T)(r=>r[Math.floor(Math.random()*r.length)]))}getAllDrivers(){return this.firestore.collection("drivers").valueChanges({idField:"id"})}getUserTrips(r){return this.firestore.collection("trips",o=>o.where("userId","==",r).orderBy("date","desc")).valueChanges({idField:"id"})}getUserProfile(r){return this.firestore.collection("active_users").doc(r).valueChanges().pipe((0,g.T)(o=>o?{createdAt:o.createdAt,email:o.email,name:o.name||"",phone:o.phone||"",profileImage:o.profileImage||"",username:o.username||""}:null))}setUserProfile(r,o){return this.firestore.collection("active_users").doc(r).set(o,{merge:!0})}updateUserProfile(r,o){return this.firestore.collection("active_users").doc(r).set(o,{merge:!0})}getCurrentUserId(){return this.afAuth.authState.pipe((0,g.T)(r=>r?r.uid:null))}getPaymentMethods(){return console.log("Iniciando getPaymentMethods"),this.afAuth.authState.pipe((0,e.n)(r=>r?(console.log("Usuario autenticado, ID:",r.uid),this.firestore.collection(`users/${r.uid}/cards`).valueChanges({idField:"id"}).pipe((0,g.T)(o=>(console.log("M\xe9todos de pago obtenidos (longitud):",o.length),console.log("M\xe9todos de pago obtenidos (contenido):",JSON.stringify(o)),o)))):(console.log("No hay usuario autenticado en getPaymentMethods"),(0,P.of)([]))))}addPaymentMethod(r){return this.afAuth.authState.pipe((0,u.s)(1),(0,e.n)(o=>{if(!o)throw new Error("No user authenticated");return this.firestore.collection(`users/${o.uid}/cards`).add(r)}),(0,g.T)(()=>{}))}updatePaymentMethod(r,o){return this.afAuth.authState.pipe((0,u.s)(1),(0,e.n)(l=>{if(!l)throw new Error("No user authenticated");return this.firestore.doc(`users/${l.uid}/cards/${r}`).update(o)}))}deletePaymentMethod(r){return this.afAuth.authState.pipe((0,u.s)(1),(0,e.n)(o=>{if(!o)throw new Error("No user authenticated");return this.firestore.doc(`users/${o.uid}/cards/${r}`).delete()}))}getDrivers(){return this.firestore.collection("drivers").valueChanges().pipe((0,g.T)(r=>r))}logout(){var r=this;return(0,f.A)(function*(){try{yield r.afAuth.signOut(),localStorage.removeItem("user"),localStorage.removeItem("username"),r.router.navigate(["/login"])}catch(o){throw console.error("Error durante el cierre de sesi\xf3n:",o),o}})()}getTripHistory(){return this.afAuth.authState.pipe((0,e.n)(r=>r?this.firestore.collection(`users/${r.uid}/trips`,o=>o.orderBy("date","desc")).valueChanges({idField:"id"}).pipe((0,u.s)(1),(0,g.T)(o=>(console.log("Historial de viajes obtenido:",o),o))):(0,P.of)([])))}}return(_=O).\u0275fac=function(r){return new(r||_)(p.KVO(c.Qe),p.KVO(E.DS),p.KVO(M.Ix))},_.\u0275prov=p.jDH({token:_,factory:_.\u0275fac,providedIn:"root"}),O})()},2784:(y,m,s)=>{s.d(m,{Dc:()=>f.Dc});var f=s(9583)}}]);