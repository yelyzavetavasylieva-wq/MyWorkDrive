import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{f as t,n}from"./iframe-DkNeqK-d.js";import{_ as r,d as i,h as a,l as o,s,t as c,u as l}from"./icons-8vQlFunK.js";var u,d,f,p,m,h,g;function _(){return(_=e((()=>{t(),r(),u=n(),d={title:`Design System/Badges`,parameters:{layout:`padded`},tags:[`autodocs`]},f=[[`globe`,l,`Public sharing`],[`lock`,i,`Lock`],[`download`,c,`Download`],[`docedit`,s,`Office Online edit`]],p=({children:e})=>(0,u.jsx)(`div`,{className:`t-sm-semibold`,style:{color:`var(--text-tertiary)`,marginBottom:10},children:e}),m={render:()=>(0,u.jsxs)(`div`,{children:[(0,u.jsx)(p,{children:`Feature badges (.feature-badge)`}),(0,u.jsx)(`div`,{className:`feature-badges`,children:f.map(([e,t])=>(0,u.jsx)(`span`,{className:`feature-badge`,children:(0,u.jsx)(`span`,{className:`icon-box feature-badge__icon`,children:(0,u.jsx)(t,{width:`12`,height:`12`})})},e))}),(0,u.jsx)(`div`,{style:{marginTop:16,display:`flex`,gap:16,color:`var(--text-tertiary)`,fontSize:12},children:f.map(([e,,t])=>(0,u.jsx)(`span`,{children:t},e))})]})},h={render:()=>(0,u.jsxs)(`div`,{children:[(0,u.jsx)(p,{children:`Status icons (.status-icon--error / --warning)`}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[(0,u.jsx)(`span`,{className:`icon-box icon-16 status-icon status-icon--error`,children:(0,u.jsx)(o,{})}),(0,u.jsx)(`span`,{className:`icon-box icon-16 status-icon status-icon--warning`,children:(0,u.jsx)(a,{})})]})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div>\r
      <Label>Feature badges (.feature-badge)</Label>\r
      <div className="feature-badges">\r
        {FEATURES.map(([k, Ico]) => <span key={k} className="feature-badge"><span className="icon-box feature-badge__icon"><Ico width="12" height="12" /></span></span>)}\r
      </div>\r
      <div style={{
      marginTop: 16,
      display: 'flex',
      gap: 16,
      color: 'var(--text-tertiary)',
      fontSize: 12
    }}>\r
        {FEATURES.map(([k,, name]) => <span key={k}>{name}</span>)}\r
      </div>\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div>\r
      <Label>Status icons (.status-icon--error / --warning)</Label>\r
      <div style={{
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }}>\r
        <span className="icon-box icon-16 status-icon status-icon--error"><IconErrorCircle /></span>\r
        <span className="icon-box icon-16 status-icon status-icon--warning"><IconWarning /></span>\r
      </div>\r
    </div>
}`,...h.parameters?.docs?.source}}},g=[`FeatureBadges`,`StatusIcons`]})))()}_();export{m as FeatureBadges,h as StatusIcons,g as __namedExportsOrder,d as default};