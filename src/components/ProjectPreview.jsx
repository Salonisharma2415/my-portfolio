export default function ProjectPreview({ project, index }) {
  return (
    <div className={`project-preview-art preview-${index + 1}`} role="img" aria-label={`${project.name} workflow illustration`}>
      <div className="preview-window" aria-hidden="true">
        <div className="preview-window-top"><span className="preview-dots"><i /><i /><i /></span><span>WORKFLOW OVERVIEW</span><span>↗</span></div>
        <div className="preview-window-body">
          <div className="preview-sidebar"><b>{project.name === 'Smart HMS' ? 'H' : project.name === 'PMS' ? 'P' : 'W'}</b><i /><i /><i /><i /></div>
          <div className="preview-main">
            <div className="preview-heading"><div><small>{project.preview.eyebrow}</small><b>{project.preview.title}</b></div><span className="preview-filter">OVERVIEW</span></div>
            {project.preview.type === 'units' ? (
              <div className="unit-preview-grid">{project.preview.items.map((item, itemIndex) => <div className="unit-preview" key={item}><span>UNIT {item.slice(0, 4)}</span><b>{item.split('·')[1]}</b><i className={`unit-status unit-status-${itemIndex}`} /></div>)}</div>
            ) : (
              <div className="preview-flow-list">{project.flow.map((item, itemIndex) => <div className="preview-flow-row" key={item}><span className={`preview-step-icon step-${itemIndex}`}>{String(itemIndex + 1).padStart(2, '0')}</span><b>{item}</b><i className={itemIndex < 2 ? 'step-done' : ''} />{itemIndex < project.flow.length - 1 && <span className="preview-row-connector" />}</div>)}</div>
            )}
            <div className="preview-bottom-lines"><i /><i /><i /></div>
          </div>
        </div>
      </div>
      <div className="preview-orb preview-orb-one" /><div className="preview-orb preview-orb-two" />
    </div>
  )
}
