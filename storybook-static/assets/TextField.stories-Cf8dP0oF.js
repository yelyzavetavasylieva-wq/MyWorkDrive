import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{f as t,n}from"./iframe-Dz0QWbzT.js";var r,i,a,o,s;function c(){return(c=e((()=>{t(),r=n(),i={title:`Design System/Text field`,parameters:{layout:`padded`},tags:[`autodocs`]},a=({label:e,required:t,hint:n,error:i,children:a})=>(0,r.jsxs)(`div`,{className:`form-field`,style:{marginBottom:24},children:[(0,r.jsxs)(`label`,{className:`t-sm-semibold form-label`,children:[e,` `,t&&(0,r.jsx)(`span`,{className:`req`,children:`*`})]}),a,i?(0,r.jsx)(`p`,{className:`t-sm-regular field-error`,children:i}):n&&(0,r.jsx)(`p`,{className:`t-sm-regular field-hint`,children:n})]}),o={render:()=>(0,r.jsxs)(`div`,{className:`form-card`,style:{maxWidth:560},children:[(0,r.jsx)(a,{label:`Empty (placeholder)`,children:(0,r.jsx)(`input`,{className:`text-input t-md-regular`,placeholder:`\\\\mwf\\network-share`})}),(0,r.jsx)(a,{label:`Filled`,children:(0,r.jsx)(`input`,{className:`text-input t-md-regular`,defaultValue:`Analytics bucket`})}),(0,r.jsx)(a,{label:`With hint`,hint:`Primary or secondary key from the storage account.`,children:(0,r.jsx)(`input`,{className:`text-input t-md-regular`,placeholder:`Enter a value`})}),(0,r.jsx)(a,{label:`Required, error`,required:!0,error:`Bucket name is required.`,children:(0,r.jsx)(`input`,{className:`text-input t-md-regular is-error`,placeholder:`my-bucket`})}),(0,r.jsx)(a,{label:`Password (masked)`,children:(0,r.jsx)(`input`,{className:`text-input t-md-regular`,type:`password`,defaultValue:`secretvalue`})}),(0,r.jsx)(a,{label:`Disabled`,children:(0,r.jsx)(`input`,{className:`text-input t-md-regular`,placeholder:`Disabled`,disabled:!0})})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="form-card" style={{
    maxWidth: 560
  }}>\r
      <Field label="Empty (placeholder)">\r
        <input className="text-input t-md-regular" placeholder="\\\\mwf\\network-share" />\r
      </Field>\r
      <Field label="Filled">\r
        <input className="text-input t-md-regular" defaultValue="Analytics bucket" />\r
      </Field>\r
      <Field label="With hint" hint="Primary or secondary key from the storage account.">\r
        <input className="text-input t-md-regular" placeholder="Enter a value" />\r
      </Field>\r
      <Field label="Required, error" required error="Bucket name is required.">\r
        <input className="text-input t-md-regular is-error" placeholder="my-bucket" />\r
      </Field>\r
      <Field label="Password (masked)">\r
        <input className="text-input t-md-regular" type="password" defaultValue="secretvalue" />\r
      </Field>\r
      <Field label="Disabled">\r
        <input className="text-input t-md-regular" placeholder="Disabled" disabled />\r
      </Field>\r
    </div>
}`,...o.parameters?.docs?.source}}},s=[`States`]})))()}c();export{o as States,s as __namedExportsOrder,i as default};