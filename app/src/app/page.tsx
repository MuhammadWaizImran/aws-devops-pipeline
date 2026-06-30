export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div style={{ maxWidth: "700px" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚀</div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#38bdf8", marginBottom: "0.5rem" }}>
          AWS DevOps Pipeline
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "2rem" }}>
          Deployed automatically via <strong style={{ color: "#f1f5f9" }}>GitHub Actions</strong> →{" "}
          <strong style={{ color: "#f1f5f9" }}>HashiCorp Packer</strong> →{" "}
          <strong style={{ color: "#f1f5f9" }}>Terraform</strong> on <strong style={{ color: "#f1f5f9" }}>AWS</strong>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌐", label: "Route 53", desc: "DNS Routing" },
            { icon: "⚖️", label: "ALB", desc: "Load Balancer" },
            { icon: "🖥️", label: "EC2 ASG", desc: "Auto Scaling" },
            { icon: "🗄️", label: "RDS", desc: "Multi-AZ DB" },
            { icon: "🔐", label: "KMS", desc: "Encryption" },
            { icon: "📊", label: "CloudWatch", desc: "Monitoring" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#1e293b", borderRadius: "12px", padding: "1.25rem", border: "1px solid #334155" }}>
              <div style={{ fontSize: "1.75rem" }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: "#38bdf8", marginTop: "0.5rem" }}>{item.label}</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: "12px", padding: "1.5rem", border: "1px solid #334155" }}>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>
            Instance: <span style={{ color: "#4ade80" }}>Healthy</span> &nbsp;|&nbsp;
            Region: <span style={{ color: "#f1f5f9" }}>us-east-1</span> &nbsp;|&nbsp;
            Environment: <span style={{ color: "#fbbf24" }}>Production</span>
          </p>
        </div>
      </div>
    </main>
  );
}
