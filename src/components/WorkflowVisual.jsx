const hospitalSteps = ['Patient', 'Investigation', 'Lab result', 'Pharmacy']

export default function WorkflowVisual() {
  return (
    <div className="workflow-visual" role="img" aria-label="Illustration of connected hospital, property management and purchase-to-dispatch workflows">
      <div className="visual-grid" />
      <div className="visual-orbit visual-orbit-one" />
      <div className="visual-orbit visual-orbit-two" />

      <div className="visual-card hms-card">
        <div className="visual-card-head">
          <div className="visual-brand"><span className="visual-brand-icon">H</span><div><b>Smart HMS</b><small>CONNECTED CARE FLOW</small></div></div>
          <span className="visual-live"><i /> WORKFLOW</span>
        </div>
        <div className="visual-card-title"><span>Hospital operations</span><b>01 / 03</b></div>
        <div className="hospital-flow">
          {hospitalSteps.map((step, index) => (
            <div className="hospital-flow-step" key={step}>
              <span className={`flow-node node-${index + 1}`}>{['＋', '⌕', '↗', '✚'][index]}</span>
              <b>{step}</b>
              {index < hospitalSteps.length - 1 && <span className="flow-connector" />}
            </div>
          ))}
        </div>
        <div className="visual-card-footer"><span>Inventory & reports connect across the journey</span><span className="footer-spark">✳</span></div>
      </div>

      <div className="visual-card pms-card">
        <div className="mini-card-top"><span className="mini-icon purple">⌂</span><span className="mini-label">PROPERTY MANAGEMENT</span></div>
        <b className="mini-title">PMS portfolio</b>
        <div className="mini-tags"><span>Units</span><span>Occupancy</span><span>Receipts</span></div>
        <div className="mini-meter"><i /></div>
        <small>Owner · Tenant · Rented</small>
      </div>

      <div className="visual-card purchase-card">
        <div className="mini-card-top"><span className="mini-icon amber">↗</span><span className="mini-label">STORE OPERATIONS</span></div>
        <b className="mini-title">Purchase to dispatch</b>
        <div className="purchase-flow"><span>PO</span><i /><span>Store</span><i /><span>Dispatch</span></div>
      </div>

      <div className="visual-caption"><span className="caption-pulse" /> SYSTEMS THAT KEEP WORK MOVING</div>
    </div>
  )
}
