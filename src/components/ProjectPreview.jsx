const previews = {
  'Smart HMS': {
    eyebrow: 'HOSPITAL OPERATIONS', title: 'Patient workflow',
    items: ['Patient visit', 'Investigation', 'Lab result', 'Pharmacy'], type: 'flow',
  },
  PMS: {
    eyebrow: 'PROPERTY MANAGEMENT', title: 'Unit occupancy',
    items: ['A-12 · Owner occupied', 'A-14 · Rented', 'B-03 · Tenant', 'B-04 · Available'], type: 'units',
  },
  Conquerent: {
    eyebrow: 'PURCHASE & STORE', title: 'Product lifecycle',
    items: ['Purchase order', 'Goods received', 'Store inventory', 'Dispatch'], type: 'flow',
  },
  'Pharmacy module': {
    eyebrow: 'PHARMACY OPERATIONS', title: 'Medicine workflow',
    items: ['Medicine catalog', 'Prescription review', 'Dispensing', 'Stock reports'], type: 'flow',
  },
  'IVF module': {
    eyebrow: 'CLINICAL WORKFLOW', title: 'Patient journey',
    items: ['Patient record', 'Treatment plan', 'Investigation', 'Clinical follow-up'], type: 'flow',
  },
}

export default function ProjectPreview({ name, index }) {
  const preview = previews[name]
  return (
    <div className={`project-preview-art preview-${index + 1}`} aria-label={`${name} workflow illustration`}>
      <div className="preview-window">
        <div className="preview-window-top"><span className="preview-dots"><i /><i /><i /></span><span>WORKFLOW OVERVIEW</span><span>↗</span></div>
        <div className="preview-window-body">
          <div className="preview-sidebar"><b>{name === 'Smart HMS' ? 'H' : name === 'PMS' ? 'P' : 'W'}</b><i /><i /><i /><i /></div>
          <div className="preview-main">
            <div className="preview-heading"><div><small>{preview.eyebrow}</small><b>{preview.title}</b></div><span className="preview-filter">OVERVIEW⌄</span></div>
            {preview.type === 'units' ? (
              <div className="unit-preview-grid">{preview.items.map((item, itemIndex) => <div className="unit-preview" key={item}><span>UNIT {item.slice(0, 4)}</span><b>{item.split('·')[1]}</b><i className={`unit-status unit-status-${itemIndex}`} /></div>)}</div>
            ) : (
              <div className="preview-flow-list">{preview.items.map((item, itemIndex) => <div className="preview-flow-row" key={item}><span className={`preview-step-icon step-${itemIndex}`}>{String(itemIndex + 1).padStart(2, '0')}</span><b>{item}</b><i className={itemIndex < 2 ? 'step-done' : ''} />{itemIndex < preview.items.length - 1 && <span className="preview-row-connector" />}</div>)}</div>
            )}
            <div className="preview-bottom-lines"><i /><i /><i /></div>
          </div>
        </div>
      </div>
      <div className="preview-orb preview-orb-one" /><div className="preview-orb preview-orb-two" />
    </div>
  )
}
