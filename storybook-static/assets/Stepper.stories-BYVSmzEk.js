import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n,n as r}from"./iframe-Dz0QWbzT.js";function i(){return(0,o.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 12 12`,fill:`none`,"aria-hidden":`true`,children:(0,o.jsx)(`path`,{d:`M2.5 6.2 5 8.5l4.5-5`,stroke:`#fff`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`})})}function a({current:e,onStepClick:t}){return(0,o.jsx)(`ol`,{className:`stepper`,children:s.map((n,r)=>{let a=r<e?`done`:r===e?`active`:`upcoming`;return(0,o.jsxs)(`li`,{className:`step`,"data-state":a,children:[(0,o.jsxs)(`div`,{className:`step__track`,children:[(0,o.jsx)(`span`,{className:`step__line step__line--left`+(r<=e?` is-done`:``)}),r<e&&t?(0,o.jsx)(`button`,{type:`button`,className:`step__circle`,onClick:()=>t(r),"aria-label":`Go to ${n}`,children:(0,o.jsx)(i,{})}):(0,o.jsxs)(`span`,{className:`step__circle`,children:[a===`done`&&(0,o.jsx)(i,{}),a===`active`&&(0,o.jsx)(`span`,{className:`step__dot step__dot--active`}),a===`upcoming`&&(0,o.jsx)(`span`,{className:`step__dot`})]}),(0,o.jsx)(`span`,{className:`step__line step__line--right`+(r<e?` is-done`:``)})]}),(0,o.jsx)(`span`,{className:`step__label t-md-semibold`,children:n})]},n)})})}var o,s;function c(){return(c=t((()=>{n(),o=r(),s=[`Storage Type`,`Storage Settings`,`Share Details`,`Features`,`Users & Groups`,`Review & Confirm`],a.__docgenInfo={description:``,methods:[],displayName:`Stepper`}})))()}var l,u,d,f,p,m,h,g;function _(){return(_=t((()=>{l=e(n(),1),c(),u=r(),d={title:`Components/Stepper`,component:a,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{current:{control:{type:`range`,min:0,max:5,step:1}}},args:{current:2}},f={render:e=>(0,u.jsx)(a,{...e})},p={render:()=>{let[e,t]=(0,l.useState)(2);return(0,u.jsx)(a,{current:e,onStepClick:t})}},m={render:e=>(0,u.jsx)(a,{...e}),args:{current:0}},h={render:e=>(0,u.jsx)(a,{...e}),args:{current:5}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <Stepper {...args} />
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [current, setCurrent] = useState(2);
    return <Stepper current={current} onStepClick={setCurrent} />;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <Stepper {...args} />,
  args: {
    current: 0
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <Stepper {...args} />,
  args: {
    current: 5
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Interactive`,`FirstStep`,`LastStep`]})))()}_();export{f as Default,m as FirstStep,p as Interactive,h as LastStep,g as __namedExportsOrder,d as default};