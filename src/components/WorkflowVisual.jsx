const results = [
  { name: 'Blood test', status: 'Ready', tone: 'ready' },
  { name: 'Chest X-ray', status: 'Ready', tone: 'ready' },
  { name: 'Lipid profile', status: 'Processing', tone: 'processing' },
]

const codeLines = [
  <><span className="api-keyword">&lt;?php</span></>,
  <><span className="api-variable">$statement</span> = <span className="api-variable">$pdo</span>-&gt;prepare(</>,
  <><span className="api-string">'SELECT * FROM lab_results</span></>,
  <><span className="api-string">  WHERE patient_id = ?'</span></>,
  <span>);</span>,
  <><span className="api-variable">$statement</span>-&gt;execute([<span className="api-variable">$patientId</span>]);</>,
  <><span className="api-keyword">echo</span> <span className="api-function">json_encode</span>([</>,
  <><span className="api-string">  'status'</span> =&gt; <span className="api-string">'success'</span>,</>,
  <><span className="api-string">  'items'</span> =&gt; <span className="api-variable">$statement</span>-&gt;fetchAll(PDO::FETCH_ASSOC),</>,
  <span>]);</span>,
]

export default function WorkflowVisual() {
  return (
    <div className="api-system-visual" role="group" aria-label="Example PHP lab results API and related software workflows">
      <div className="api-window">
        <div className="api-window-bar">
          <div className="api-window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span className="api-window-title">GET /api/lab-results/42</span>
          <span className="api-live"><i /> Live</span>
        </div>
        <div className="api-editor">
          <aside className="api-editor-rail" aria-hidden="true"><span className="active">⌘</span><span>⌕</span><span>▤</span><span>⋯</span></aside>
          <div className="api-code" aria-label="PHP prepared statement example">
          <pre><code>{codeLines.map((line, index) => (
            <span className="api-code-line" key={index}><span className="api-line-number">{String(index + 1).padStart(2, '0')}</span><span className="api-code-content">{line}</span></span>
          ))}</code></pre>
          </div>
        </div>
        <div className="api-response">
          <div className="api-response-meta">
            <span className="api-response-status">200 OK</span>
            <span>38 ms</span>
            <span>application/json</span>
          </div>
          <ul className="api-results" aria-label="Lab result response examples">
            {results.map((result, index) => (
              <li className="api-result-row" key={result.name} style={{ '--result-index': index }}>
                <span className="api-result-name">{result.name}</span>
                <span className={'api-result-status ' + result.tone}><i />{result.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="api-domain-row" aria-label="Software domains">
        <div><strong>Healthcare</strong><span>Lab results, pharmacy, records</span></div>
        <div><strong>Property</strong><span>Units, occupancy, receipts</span></div>
        <div><strong>Store ops</strong><span>Purchase order to dispatch</span></div>
      </div>
    </div>
  )
}
