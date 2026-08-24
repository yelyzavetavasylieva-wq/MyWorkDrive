import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n,n as r}from"./iframe-Dz0QWbzT.js";import{_ as i,a,n as o,r as s}from"./icons-BxwLj085.js";function c({page:e,onPage:t,rows:n,onRowsClick:r}){return(0,l.jsxs)(`div`,{className:`pagination`,children:[(0,l.jsxs)(`button`,{type:`button`,className:`rows-select t-md-regular`,onClick:r,children:[(0,l.jsx)(`span`,{children:`Show ${n} rows`}),(0,l.jsx)(`span`,{className:`icon-box icon-20 rows-select__chevron`,children:(0,l.jsx)(a,{})})]}),(0,l.jsxs)(`div`,{className:`page-group`,children:[(0,l.jsx)(`button`,{type:`button`,className:`page-btn page-btn--arrow`,"aria-label":`Previous page`,disabled:e<=1,onClick:()=>t(Math.max(1,e-1)),children:(0,l.jsx)(`span`,{className:`icon-box icon-20`,children:(0,l.jsx)(o,{})})}),u.map((n,r)=>n===`…`?(0,l.jsx)(`span`,{className:`page-btn page-btn--ellipsis t-sm-regular`,children:`…`},`e${r}`):(0,l.jsx)(`button`,{type:`button`,"aria-current":e===n?`page`:void 0,className:`page-btn`+(e===n?` page-btn--active t-sm-semibold`:` t-sm-regular`),onClick:()=>t(n),children:n},n)),(0,l.jsx)(`button`,{type:`button`,className:`page-btn page-btn--arrow`,"aria-label":`Next page`,disabled:e>=10,onClick:()=>t(Math.min(10,e+1)),children:(0,l.jsx)(`span`,{className:`icon-box icon-20`,children:(0,l.jsx)(s,{})})})]})]})}var l,u;function d(){return(d=t((()=>{n(),i(),l=r(),u=[1,2,3,`…`,8,9,10],c.__docgenInfo={description:``,methods:[],displayName:`Pagination`}})))()}function f({page:e=1,...t}){let[n,r]=(0,p.useState)(e);return(0,m.jsx)(c,{...t,page:n,onPage:r})}var p,m,h,g,_,v,y;function b(){return(b=t((()=>{p=e(n(),1),d(),m=r(),h={title:`Components/Pagination`,component:c,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{page:{control:{type:`number`,min:1,max:10}},rows:{control:{type:`select`},options:[10,25,50,100]},onPage:{action:`page`},onRowsClick:{action:`rowsClick`}},args:{rows:10}},g={render:e=>(0,m.jsx)(f,{...e}),args:{page:1}},_={render:e=>(0,m.jsx)(f,{...e}),args:{page:3}},v={render:e=>(0,m.jsx)(f,{...e}),args:{page:10}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Controlled {...args} />,
  args: {
    page: 1
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Controlled {...args} />,
  args: {
    page: 3
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <Controlled {...args} />,
  args: {
    page: 10
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`MiddlePage`,`LastPage`]})))()}b();export{g as Default,v as LastPage,_ as MiddlePage,y as __namedExportsOrder,h as default};