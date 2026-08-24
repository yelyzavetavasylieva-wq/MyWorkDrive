import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n,n as r}from"./iframe-Dz0QWbzT.js";function i({checked:e=!1,indeterminate:t=!1,onChange:n,ariaLabel:r}){return(0,a.jsx)(`button`,{type:`button`,role:`checkbox`,"aria-checked":t?`mixed`:e,"aria-label":r,className:`checkbox`+(e||t?` checkbox--on`:``),onClick:()=>n(!e),children:t?(0,a.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 12 12`,fill:`none`,"aria-hidden":`true`,children:(0,a.jsx)(`path`,{d:`M2.5 6H9.5`,stroke:`#fff`,strokeWidth:`1.6`,strokeLinecap:`round`})}):e?(0,a.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 12 12`,fill:`none`,"aria-hidden":`true`,children:(0,a.jsx)(`path`,{d:`M10 3L4.75 8.5L2 5.75`,stroke:`#fff`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`})}):null})}var a;function o(){return(o=t((()=>{n(),a=r(),i.__docgenInfo={description:``,methods:[],displayName:`Checkbox`,props:{checked:{defaultValue:{value:`false`,computed:!1},required:!1},indeterminate:{defaultValue:{value:`false`,computed:!1},required:!1}}}})))()}function s({checked:e=!1,indeterminate:t=!1,...n}){let[r,a]=(0,c.useState)(e);return(0,l.jsx)(i,{...n,checked:r,indeterminate:t&&!r,onChange:a})}var c,l,u,d,f,p,m,h;function g(){return(g=t((()=>{c=e(n(),1),o(),l=r(),u={title:`Components/Checkbox`,component:i,tags:[`autodocs`],argTypes:{checked:{control:`boolean`},indeterminate:{control:`boolean`},ariaLabel:{control:`text`},onChange:{action:`changed`}},args:{ariaLabel:`Select row`}},d={render:e=>(0,l.jsx)(s,{...e}),args:{checked:!1}},f={render:e=>(0,l.jsx)(s,{...e}),args:{checked:!0}},p={render:e=>(0,l.jsx)(s,{...e}),args:{checked:!1,indeterminate:!0}},m={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[(0,l.jsx)(s,{ariaLabel:`Unchecked`}),(0,l.jsx)(s,{checked:!0,ariaLabel:`Checked`}),(0,l.jsx)(s,{indeterminate:!0,ariaLabel:`Indeterminate`})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
  render: args => <Controlled {...args} />,
  args: {
    checked: false,
    indeterminate: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'center'
  }}>\r
      <Controlled ariaLabel="Unchecked" />\r
      <Controlled checked ariaLabel="Checked" />\r
      <Controlled indeterminate ariaLabel="Indeterminate" />\r
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Unchecked`,`Checked`,`Indeterminate`,`AllStates`]})))()}g();export{m as AllStates,f as Checked,p as Indeterminate,d as Unchecked,h as __namedExportsOrder,u as default};