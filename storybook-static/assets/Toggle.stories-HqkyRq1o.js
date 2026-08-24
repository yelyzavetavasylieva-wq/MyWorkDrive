import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n,n as r}from"./iframe-BhUndE_p.js";function i({checked:e,onChange:t,id:n,ariaLabel:r}){return(0,a.jsx)(`button`,{type:`button`,id:n,role:`switch`,"aria-checked":e,"aria-label":r,className:`toggle`+(e?` toggle--on`:``),onClick:()=>t(!e),children:(0,a.jsx)(`span`,{className:`toggle__knob`})})}var a;function o(){return(o=t((()=>{n(),a=r(),i.__docgenInfo={description:``,methods:[],displayName:`Toggle`}})))()}function s({checked:e=!1,...t}){let[n,r]=(0,c.useState)(e);return(0,l.jsx)(i,{...t,checked:n,onChange:r})}var c,l,u,d,f,p,m;function h(){return(h=t((()=>{c=e(n(),1),o(),l=r(),u={title:`Components/Toggle`,component:i,tags:[`autodocs`],argTypes:{checked:{control:`boolean`},ariaLabel:{control:`text`},onChange:{action:`changed`}},args:{ariaLabel:`Toggle setting`}},d={render:e=>(0,l.jsx)(s,{...e}),args:{checked:!1}},f={render:e=>(0,l.jsx)(s,{...e}),args:{checked:!0}},p={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[(0,l.jsx)(s,{checked:!1,ariaLabel:`Off`}),(0,l.jsx)(s,{checked:!0,ariaLabel:`On`})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <Controlled {...args} />,
  args: {
    checked: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <Controlled {...args} />,
  args: {
    checked: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'center'
  }}>\r
      <Controlled checked={false} ariaLabel="Off" />\r
      <Controlled checked ariaLabel="On" />\r
    </div>
}`,...p.parameters?.docs?.source}}},m=[`Off`,`On`,`Both`]})))()}h();export{p as Both,d as Off,f as On,m as __namedExportsOrder,u as default};