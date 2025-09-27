import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTopic, setCurrentTopic] = useState('docker');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const topics = {
    docker: {
      title: '🐳 Docker Fundamentals',
      content: 'Docker revolutionizes application deployment through containerization. It packages applications with all dependencies into portable, lightweight containers that run consistently across any environment.',
      keyPoints: [
        'Containers vs Virtual Machines: 10x lighter resource usage',
        'Build once, run anywhere philosophy',
        'Microservices architecture enabler',
        'DevOps pipeline integration'
      ],
      diagram: 'docker-architecture',
      stats: { containers: '13B+', companies: '11M+', downloads: '5B+' }
    },
    ci_cd: {
      title: '🔄 CI/CD Pipelines',
      content: 'Continuous Integration and Deployment automate the entire software delivery lifecycle, reducing deployment time from weeks to minutes while improving code quality.',
      keyPoints: [
        'Automated testing catches bugs early (saves 80% debugging time)',
        'Rolling deployments with zero downtime',
        'Feature flags for controlled releases',
        'Infrastructure as Code (IaC) integration'
      ],
      diagram: 'cicd-pipeline',
      stats: { deployments: '100+/day', 'failure rate': '<1%', 'rollback time': '< 5min' }
    },
    kubernetes: {
      title: '☸️ Kubernetes Orchestration',
      content: 'Kubernetes orchestrates containerized applications at scale, managing everything from load balancing to auto-scaling across distributed infrastructure.',
      keyPoints: [
        'Auto-scaling based on CPU/memory metrics',
        'Self-healing: automatic pod replacement',
        'Service discovery and load balancing',
        'Rolling updates with health checks'
      ],
      diagram: 'k8s-cluster',
      stats: { nodes: '5000+', pods: '150K+', 'uptime': '99.99%' }
    },
    monitoring: {
      title: '📊 DevOps Monitoring',
      content: 'Comprehensive observability through metrics, logs, and traces provides real-time insights into application performance and infrastructure health.',
      keyPoints: [
        'Golden signals: Latency, Traffic, Errors, Saturation',
        'Distributed tracing for microservices',
        'Alert fatigue reduction through smart filtering',
        'SLA/SLO monitoring and reporting'
      ],
      diagram: 'monitoring-stack',
      stats: { 'data points': '1M+/sec', 'alert response': '< 30sec', 'dashboards': '500+' }
    }
  };

  const DiagramComponent = ({ type }) => {
    const diagrams = {
      'docker-architecture': (
        <div className="diagram docker-diagram">
          <div className="diagram-title">Docker Architecture</div>
          <div className="docker-layers">
            <div className="layer app-layer">Application Layer</div>
            <div className="layer runtime-layer">Docker Runtime</div>
            <div className="layer os-layer">Host OS Kernel</div>
            <div className="layer hardware-layer">Hardware Infrastructure</div>
          </div>
          <div className="vs-section">
            <div className="comparison">
              <div className="docker-side">
                <h4>🐳 Docker Container</h4>
                <div className="resource-bar">
                  <div className="resource-usage" style={{width: '30%'}}>30% Resources</div>
                </div>
              </div>
              <div className="vm-side">
                <h4>💻 Virtual Machine</h4>
                <div className="resource-bar">
                  <div className="resource-usage vm-usage" style={{width: '80%'}}>80% Resources</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      'cicd-pipeline': (
        <div className="diagram pipeline-diagram">
          <div className="diagram-title">CI/CD Pipeline Flow</div>
          <div className="pipeline-flow">
            <div className="stage">
              <div className="stage-icon">👨‍💻</div>
              <div className="stage-name">Code Commit</div>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <div className="stage-icon">🔨</div>
              <div className="stage-name">Build</div>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <div className="stage-icon">🧪</div>
              <div className="stage-name">Test</div>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <div className="stage-icon">🚀</div>
              <div className="stage-name">Deploy</div>
            </div>
          </div>
          <div className="pipeline-metrics">
            <div className="metric">
              <span className="metric-value">2min</span>
              <span className="metric-label">Build Time</span>
            </div>
            <div className="metric">
              <span className="metric-value">5min</span>
              <span className="metric-label">Test Suite</span>
            </div>
            <div className="metric">
              <span className="metric-value">30sec</span>
              <span className="metric-label">Deploy Time</span>
            </div>
          </div>
        </div>
      ),
      'k8s-cluster': (
        <div className="diagram k8s-diagram">
          <div className="diagram-title">Kubernetes Cluster</div>
          <div className="cluster">
            <div className="master-node">
              <div className="node-title">Master Node</div>
              <div className="component">API Server</div>
              <div className="component">etcd</div>
              <div className="component">Controller</div>
            </div>
            <div className="worker-nodes">
              {[1, 2, 3].map(i => (
                <div key={i} className="worker-node">
                  <div className="node-title">Worker Node {i}</div>
                  <div className="pod">Pod A</div>
                  <div className="pod">Pod B</div>
                  <div className="pod">Pod C</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      'monitoring-stack': (
        <div className="diagram monitoring-diagram">
          <div className="diagram-title">Monitoring Stack</div>
          <div className="monitoring-layers">
            <div className="mon-layer">
              <div className="layer-title">📱 Dashboards</div>
              <div className="tools">Grafana • Kibana • Custom</div>
            </div>
            <div className="mon-layer">
              <div className="layer-title">⚠️ Alerting</div>
              <div className="tools">AlertManager • PagerDuty</div>
            </div>
            <div className="mon-layer">
              <div className="layer-title">📊 Metrics</div>
              <div className="tools">Prometheus • InfluxDB</div>
            </div>
            <div className="mon-layer">
              <div className="layer-title">📝 Logs</div>
              <div className="tools">ElasticSearch • Fluentd</div>
            </div>
            <div className="mon-layer">
              <div className="layer-title">🔍 Tracing</div>
              <div className="tools">Jaeger • Zipkin</div>
            </div>
          </div>
        </div>
      )
    };

    return diagrams[type] || <div>Diagram not found</div>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="title-section">
            <h1> Malvika's DevOps Mastery Hub</h1>
            <p>Advanced DevOps concepts with real-world metrics and best practices</p>
          </div>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      
      <nav className="topic-nav">
        {Object.keys(topics).map(topic => (
          <button 
            key={topic}
            onClick={() => setCurrentTopic(topic)}
            className={`nav-btn ${currentTopic === topic ? 'active' : ''}`}
          >
            {topics[topic].title}
          </button>
        ))}
      </nav>

      <main className="content">
        <div className="topic-section">
          <div className="topic-card">
            <h2>{topics[currentTopic].title}</h2>
            <p className="topic-description">{topics[currentTopic].content}</p>
            
            <div className="key-points">
              <h3>🎯 Key Benefits</h3>
              <ul>
                {topics[currentTopic].keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="diagram-section">
            <DiagramComponent type={topics[currentTopic].diagram} />
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stats-header">
            <h3>📈 Real-world Impact</h3>
          </div>
          <div className="stats-items">
            {Object.entries(topics[currentTopic].stats).map(([key, value]) => (
              <div key={key} className="stat-item">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{key}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="system-info">
          <div className="info-item">
            <span className="label">🐳 Container Status:</span>
            <span className="status running">Running ✅</span>
          </div>
          <div className="info-item">
            <span className="label">⚡ Build Time:</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="info-item">
            <span className="label">🌍 Environment:</span>
            <span className="env-badge">{process.env.NODE_ENV || 'development'}</span>
          </div>
          <div className="info-item">
            <span className="label">🎨 Theme:</span>
            <span>{darkMode ? 'Dark' : 'Light'}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
