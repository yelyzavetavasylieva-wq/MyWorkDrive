import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n,n as r}from"./iframe-DkNeqK-d.js";var i,a,o,s,c,l;function u(){return(u=t((()=>{i=e(n(),1),a=r(),o={title:`Design System/Chip`,parameters:{layout:`padded`},tags:[`autodocs`]},s={render:()=>(0,a.jsxs)(`div`,{className:`chip-group`,children:[(0,a.jsx)(`button`,{type:`button`,className:`chip chip--active`,children:`All`}),(0,a.jsx)(`button`,{type:`button`,className:`chip`,children:`Users`}),(0,a.jsx)(`button`,{type:`button`,className:`chip`,children:`Groups`})]})},c={render:()=>{let[e,t]=(0,i.useState)(`all`);return(0,a.jsx)(`div`,{className:`chip-group`,children:[[`all`,`All`],[`user`,`Users`],[`group`,`Groups`]].map(([n,r])=>(0,a.jsx)(`button`,{type:`button`,className:`chip`+(e===n?` chip--active`:``),onClick:()=>t(n),children:r},n))})}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="chip-group">\r
      <button type="button" className="chip chip--active">All</button>\r
      <button type="button" className="chip">Users</button>\r
      <button type="button" className="chip">Groups</button>\r
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('all');
    return <div className="chip-group">\r
        {[['all', 'All'], ['user', 'Users'], ['group', 'Groups']].map(([k, lbl]) => <button key={k} type="button" className={'chip' + (active === k ? ' chip--active' : '')} onClick={() => setActive(k)}>{lbl}</button>)}\r
      </div>;
  }
}`,...c.parameters?.docs?.source}}},l=[`Static`,`Interactive`]})))()}u();export{c as Interactive,s as Static,l as __namedExportsOrder,o as default};