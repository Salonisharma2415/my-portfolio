const codeLines = [
  <><span className="token-purple">&lt;?php</span></>,
  <><span className="token-purple">declare</span>(strict_types: <span className="token-orange">1</span>);</>,
  <><span className="token-purple">namespace</span> App\Controller\Api;</>,
  <><span className="token-purple">use</span> App\Controller\AppController;</>,
  <></>,
  <><span className="token-purple">class</span> <span className="token-green">PatientsController</span> <span className="token-purple">extends</span> AppController</>,
  <>{'{'}</>,
  <>{'  '}<span className="token-purple">public function</span> <span className="token-blue">view</span>(<span className="token-orange">string</span> <span className="token-red">$id</span>): Response</>,
  <>{'  '}{'{'}</>,
  <>{'    '}<span className="token-red">$patient</span> = <span className="token-purple">$this</span>-&gt;fetchTable(<span className="token-yellow">'Patients'</span>)</>,
  <>{'      '}-&gt;find()</>,
  <>{'      '}-&gt;contain([<span className="token-yellow">'LabResults'</span>])</>,
  <>{'      '}-&gt;where([<span className="token-yellow">'Patients.id'</span> =&gt; <span className="token-red">$id</span>])</>,
  <>{'      '}-&gt;firstOrFail();</>,
  <></>,
  <>{'    '}<span className="token-purple">return</span> <span className="token-purple">$this</span>-&gt;response</>,
  <>{'      '}-&gt;withType(<span className="token-yellow">'application/json'</span>)</>,
  <>{'      '}-&gt;withStringBody(json_encode([</>,
  <>{'        '}<span className="token-yellow">'success'</span> =&gt; <span className="token-orange">true</span>,</>,
  <>{'        '}<span className="token-yellow">'data'</span> =&gt; <span className="token-red">$patient</span>,</>,
  <>{'      '}]));</>,
  <>{'  }'}</>,
  <>{'}'}<i className="workspace-caret" aria-hidden="true" /></>,
]

const technologies = ['PHP', 'CakePHP', 'JavaScript', 'MySQL', 'REST API']

export default function DeveloperWorkspace() {
  return (
    <div className="developer-workspace" role="group" aria-label="Developer workspace preview with a CakePHP REST API controller, connected API terminal, and MySQL database">
      <div className="workspace-window">
        <header className="workspace-titlebar">
          <span className="workspace-window-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="workspace-brand"><b>&lt;/&gt;</b> studio</span>
          <span className="workspace-window-spacer" />
          <span className="workspace-titlebar-status"><i /> PHP workspace</span>
        </header>

        <div className="workspace-tabbar">
          <span className="workspace-active-tab"><i /> PatientsController.php <b>×</b></span>
          <span className="workspace-secondary-tab">routes.php</span>
        </div>

        <div className="workspace-body">
          <aside className="workspace-activity" aria-hidden="true">
            <span className="is-active">▤</span><span>⌕</span><span>⑂</span><span>◷</span>
          </aside>
          <aside className="workspace-explorer" aria-label="Project files">
            <p>EXPLORER</p>
            <span>⌄ <b>API</b></span>
            <span className="file-active">　⌄ Controllers</span>
            <span>　　<span className="file-php">◉</span> PatientsController.php</span>
            <span>　　<span className="file-php">◉</span> AppController.php</span>
            <span>⌄ Models</span>
            <span>　⌄ Table</span>
            <span>　　<span className="file-model">◈</span> PatientsTable.php</span>
            <span>　<span className="file-js">◇</span> routes.php</span>
          </aside>
          <div className="workspace-editor">
            <div className="workspace-breadcrumb">API <span>›</span> Controllers <span>›</span> PatientsController.php</div>
            <pre className="workspace-code" aria-label="CakePHP API controller code"><code>{codeLines.map((line, index) => (
                <span className="workspace-code-line" key={index}>
                  <span className="workspace-line-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="workspace-code-content">{line}</span>
                </span>
              ))}</code></pre>
            <div className="workspace-minimap" aria-hidden="true">
              {Array.from({ length: 15 }, (_, index) => <i key={index} />)}
            </div>
          </div>
        </div>

        <footer className="workspace-statusbar">
          <span>⎇ main</span><span>PHP 8.3</span><span>UTF-8</span><span>Ln 23, Col 2</span>
        </footer>
      </div>

      <div className="workspace-terminal">
        <div className="workspace-panel-heading"><span><i /> Terminal</span><b>•••</b></div>
        <p><span className="terminal-prompt">$</span> curl /api/patients/42/results</p>
        <strong><i /> 200 OK <span>— API Connected</span></strong>
      </div>

      <div className="workspace-database">
        <span className="database-mark" aria-hidden="true"><i /><i /><i /></span>
        <span><b>MySQL</b><small>Database connected</small></span>
        <i className="database-connection" aria-hidden="true" />
      </div>

      <div className="workspace-tech-labels" aria-label="Technologies shown">
        {technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
    </div>
  )
}
