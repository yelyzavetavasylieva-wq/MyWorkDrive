import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n,n as r}from"./iframe-DkNeqK-d.js";import{_ as i,f as a}from"./icons-8vQlFunK.js";function o({label:e,placement:t=`right`,children:n}){let[r,i]=(0,s.useState)(!1),a=(0,s.useId)();return(0,c.jsxs)(`span`,{className:`tt-wrap`,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),onFocusCapture:()=>i(!0),onBlurCapture:()=>i(!1),children:[s.cloneElement(n,{"aria-describedby":r?a:void 0}),r&&(0,c.jsx)(`span`,{role:`tooltip`,id:a,className:`tt tt--${t} t-xs-semibold`,children:e})]})}var s,c;function l(){return(l=t((()=>{s=e(n(),1),c=r(),o.__docgenInfo={description:``,methods:[],displayName:`Tooltip`,props:{placement:{defaultValue:{value:`'right'`,computed:!1},required:!1}}}})))()}function u(){return(0,d.jsx)(`button`,{type:`button`,className:`icon-box icon-20`,"aria-label":`More info`,style:{background:`none`,border:`none`,color:`var(--fg-quaternary)`,cursor:`pointer`,padding:0},children:(0,d.jsx)(a,{})})}var d,f,p,m,h;function g(){return(g=t((()=>{n(),l(),i(),d=r(),f={title:`Components/Tooltip`,component:o,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Hover or focus the trigger to reveal the tooltip pill.`}}},argTypes:{label:{control:`text`},placement:{control:`inline-radio`,options:[`right`,`left`,`top`,`bottom`]}},args:{label:`Guest access is disabled in Settings`,placement:`right`}},p={render:e=>(0,d.jsx)(`div`,{style:{padding:80},children:(0,d.jsx)(o,{...e,children:(0,d.jsx)(u,{})})})},m={render:()=>(0,d.jsx)(`div`,{style:{display:`flex`,gap:96,padding:80},children:[`right`,`left`,`top`,`bottom`].map(e=>(0,d.jsx)(o,{label:`Placement: ${e}`,placement:e,children:(0,d.jsx)(u,{})},e))})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    padding: 80
  }}>\r
      <Tooltip {...args}>\r
        <Trigger />\r
      </Tooltip>\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 96,
    padding: 80
  }}>\r
      {['right', 'left', 'top', 'bottom'].map(p => <Tooltip key={p} label={\`Placement: \${p}\`} placement={p}>\r
          <Trigger />\r
        </Tooltip>)}\r
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Placements`]})))()}g();export{p as Default,m as Placements,h as __namedExportsOrder,f as default};