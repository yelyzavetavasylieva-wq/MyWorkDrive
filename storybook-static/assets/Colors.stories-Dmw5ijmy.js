import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{f as t,n}from"./iframe-Dz0QWbzT.js";function r({token:e}){return(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,i.jsx)(`div`,{style:{height:64,borderRadius:`var(--radius-md)`,background:`var(${e})`,border:`1px solid var(--border-card)`,boxShadow:`var(--shadow-xs)`}}),(0,i.jsx)(`code`,{style:{fontSize:12,color:`var(--text-tertiary)`},children:e})]})}var i,a,o,s,c;function l(){return(l=e((()=>{t(),i=n(),a={title:`Foundations/Colors`,parameters:{layout:`fullscreen`},tags:[`autodocs`]},o=[{name:`Text`,tokens:[`--text-primary`,`--text-primary-2`,`--text-secondary`,`--text-secondary-hover`,`--text-tertiary`,`--text-tertiary-2`,`--text-quaternary`,`--text-placeholder`,`--text-brand-link`,`--text-white`]},{name:`Background`,tokens:[`--bg-primary`,`--bg-secondary`,`--bg-tertiary`,`--bg-active`,`--bg-primary-hover`,`--bg-error-secondary`,`--bg-error-solid`,`--bg-brand-solid`,`--bg-overlay`]},{name:`Border`,tokens:[`--border-primary`,`--border-primary-2`,`--border-secondary`,`--border-card`,`--border-tertiary`]},{name:`Foreground (icons)`,tokens:[`--fg-brand`,`--fg-secondary`,`--fg-tertiary`,`--fg-quaternary`,`--fg-quinary`,`--fg-error`,`--fg-warning`,`--brand-200`]}],s={render:()=>(0,i.jsx)(`div`,{style:{padding:32,background:`var(--bg-primary)`},children:o.map(e=>(0,i.jsxs)(`section`,{style:{marginBottom:40},children:[(0,i.jsx)(`h3`,{className:`t-lg-semibold`,style:{marginBottom:16,color:`var(--text-primary)`},children:e.name}),(0,i.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(160px, 1fr))`,gap:20},children:e.tokens.map(e=>(0,i.jsx)(r,{token:e},e))})]},e.name))})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 32,
    background: 'var(--bg-primary)'
  }}>\r
      {GROUPS.map(g => <section key={g.name} style={{
      marginBottom: 40
    }}>\r
          <h3 className="t-lg-semibold" style={{
        marginBottom: 16,
        color: 'var(--text-primary)'
      }}>{g.name}</h3>\r
          <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 20
      }}>\r
            {g.tokens.map(t => <Swatch key={t} token={t} />)}\r
          </div>\r
        </section>)}\r
    </div>
}`,...s.parameters?.docs?.source}}},c=[`Palette`]})))()}l();export{s as Palette,c as __namedExportsOrder,a as default};