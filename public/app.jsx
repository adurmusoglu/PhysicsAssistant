const { useState } = React;

const TOOL_IDS = {
  XY_COMPONENTS: "xy-components",
  MAGNITUDE_ANGLE: "magnitude-angle",
  VECTOR_SUM: "vector-sum",
  ABOUT: "about",
};

const MENU = [
  {
    id: TOOL_IDS.XY_COMPONENTS,
    label: "Resolve a vector into x and y components",
    description: "Use magnitude + direction to get the horizontal and vertical components.",
  },
  {
    id: TOOL_IDS.MAGNITUDE_ANGLE,
    label: "Build a vector from its components",
    description: "Convert x/y components into a magnitude and angle.",
  },
  {
    id: TOOL_IDS.VECTOR_SUM,
    label: "Add multiple vectors together",
    description: "Combine any number of vectors into a single resultant vector.",
  },
  {
    id: TOOL_IDS.ABOUT,
    label: "Future topics",
    description: "See what calculations are coming next!",
  },
];

const formatNumber = (value) =>
  Number.isFinite(value) ? Number.parseFloat(value).toFixed(3) : "–";

function ResultCard({ result }) {
  if (!result) {
    return null;
  }

  return (
    <section className="result-card" aria-live="polite">
      <h4>{result.title}</h4>
      {result.description && <p className="helper-text">{result.description}</p>}
      <div className="result-grid">
        {result.rows.map((row) => (
          <div key={row.label} className="result-item">
            <span className="result-label">{row.label}</span>
            <span className="result-value">
              {formatNumber(row.value)}
              {row.suffix ? <span> {row.suffix}</span> : null}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function XYComponentsForm({ onSubmit, loading }) {
  const [magnitude, setMagnitude] = useState("");
  const [angle, setAngle] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!magnitude || !angle) {
      setShowValidation(true);
      return;
    }

    onSubmit("/api/vector-components", {
      magnitude: Number(magnitude),
      angleDegrees: Number(angle),
    });
  };

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <h3>Vector → Components</h3>
      <p className="helper-text">
        Supply a vector's magnitude and direction to see its horizontal and vertical
        components.
      </p>
      <div className="form-row">
        <label htmlFor="magnitude-input">Vector magnitude</label>
        <input
          id="magnitude-input"
          type="number"
          step="any"
          min="0"
          value={magnitude}
          onChange={(event) => setMagnitude(event.target.value)}
          placeholder="e.g. 12.8"
        />
      </div>
      <div className="form-row">
        <label htmlFor="angle-input">Angle from +x axis (degrees)</label>
        <input
          id="angle-input"
          type="number"
          step="any"
          value={angle}
          onChange={(event) => setAngle(event.target.value)}
          placeholder="e.g. 42"
        />
      </div>
      {showValidation && (!magnitude || !angle) ? (
        <div className="alert" role="alert">
          Enter both a magnitude and an angle to run the calculation.
        </div>
      ) : null}
      <button type="submit" className="primary" disabled={loading}>
        {loading ? "Calculating…" : "Calculate components"}
      </button>
    </form>
  );
}

function MagnitudeAngleForm({ onSubmit, loading }) {
  const [xComponent, setXComponent] = useState("");
  const [yComponent, setYComponent] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (xComponent === "" || yComponent === "") {
      setShowValidation(true);
      return;
    }

    onSubmit("/api/vector-from-components", {
      xComponent: Number(xComponent),
      yComponent: Number(yComponent),
    });
  };

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <h3>Components → Vector</h3>
      <p className="helper-text">
        Provide the x and y components of a vector and we will calculate the magnitude and
        its direction from the positive x-axis.
      </p>
      <div className="form-row">
        <label htmlFor="x-component">X component</label>
        <input
          id="x-component"
          type="number"
          step="any"
          value={xComponent}
          onChange={(event) => setXComponent(event.target.value)}
          placeholder="e.g. 5.4"
        />
      </div>
      <div className="form-row">
        <label htmlFor="y-component">Y component</label>
        <input
          id="y-component"
          type="number"
          step="any"
          value={yComponent}
          onChange={(event) => setYComponent(event.target.value)}
          placeholder="e.g. -3.2"
        />
      </div>
      {showValidation && (xComponent === "" || yComponent === "") ? (
        <div className="alert" role="alert">
          Enter values for both components to run the calculation.
        </div>
      ) : null}
      <button type="submit" className="primary" disabled={loading}>
        {loading ? "Crunching numbers…" : "Calculate magnitude & angle"}
      </button>
    </form>
  );
}

function VectorSumForm({ onSubmit, loading }) {
  const [vectors, setVectors] = useState([
    { id: 1, magnitude: "", angle: "" },
    { id: 2, magnitude: "", angle: "" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [showValidation, setShowValidation] = useState(false);

  const updateVector = (id, field, value) => {
    setVectors((current) =>
      current.map((vector) =>
        vector.id === id
          ? {
              ...vector,
              [field]: value,
            }
          : vector
      )
    );
  };

  const addVector = () => {
    setVectors((current) => [
      ...current,
      { id: nextId, magnitude: "", angle: "" },
    ]);
    setNextId((id) => id + 1);
  };

  const removeVector = (id) => {
    setVectors((current) =>
      current.length > 1 ? current.filter((vector) => vector.id !== id) : current
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasEmpty = vectors.some((vector) => !vector.magnitude || !vector.angle);

    if (hasEmpty) {
      setShowValidation(true);
      return;
    }

    onSubmit("/api/vector-sum", {
      vectors: vectors.map((vector) => ({
        magnitude: Number(vector.magnitude),
        angleDegrees: Number(vector.angle),
      })),
    });
  };

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <h3>Add Vectors</h3>
      <p className="helper-text">
        Supply as many vectors as you like. Magnitudes can be in any unit – the result will
        use the same units.
      </p>
      <div className="vectors-list">
        {vectors.map((vector, index) => (
          <div key={vector.id} className="vector-card">
            <div className="vector-card-header">
              <span>Vector {index + 1}</span>
              <div className="vector-actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => removeVector(vector.id)}
                  disabled={vectors.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="form-row">
              <label htmlFor={`vector-${vector.id}-magnitude`}>Magnitude</label>
              <input
                id={`vector-${vector.id}-magnitude`}
                type="number"
                step="any"
                min="0"
                value={vector.magnitude}
                onChange={(event) => updateVector(vector.id, "magnitude", event.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor={`vector-${vector.id}-angle`}>
                Angle from +x axis (degrees)
              </label>
              <input
                id={`vector-${vector.id}-angle`}
                type="number"
                step="any"
                value={vector.angle}
                onChange={(event) => updateVector(vector.id, "angle", event.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="secondary" onClick={addVector}>
        + Add another vector
      </button>
      {showValidation &&
      vectors.some((vector) => !vector.magnitude || !vector.angle) ? (
        <div className="alert" role="alert">
          Every vector needs a magnitude and an angle before we can add them together.
        </div>
      ) : null}
      <button type="submit" className="primary" disabled={loading}>
        {loading ? "Summing vectors…" : "Calculate resultant vector"}
      </button>
    </form>
  );
}

function FutureTopicsPanel() {
  return (
    <section className="panel form-grid">
      <h3>Future Topics</h3>
      <p className="helper-text">
        The Physics Assistant is still growing! Expect momentum conservation tools,
        projectile motion solvers, and work & energy helpers in upcoming updates.
      </p>
      <p className="helper-text">
        Have an idea you would like to see? Drop a note in the project repository and let us
        know what would make your homework easier.
      </p>
    </section>
  );
}

function App() {
  const [activeTool, setActiveTool] = useState(TOOL_IDS.XY_COMPONENTS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeTool = (toolId) => {
    setActiveTool(toolId);
    setResult(null);
    setErrorMessage("");
    setLoading(false);
  };

  const handleSubmit = async (endpoint, payload) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Unable to perform calculation");
      }

      const data = await response.json();
      setResult(transformResult(activeTool, data));
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-symbol">⚛︎</span>
          <h1>Physics Assistant</h1>
        </div>
        <p>
          An upgraded toolkit for vector calculations in mechanics courses. Quickly resolve
          vectors, recombine components, or sum entire sets without fumbling with your
          calculator.
        </p>
      </header>
      <main className="content">
        <section className="hero">
          <h2>Master vectors with confidence</h2>
          <p>
            Built by a fellow student, this assistant automates the repetitive calculations so
            you can focus on the real physics insights. Pick a task below to get started.
          </p>
        </section>
        <section className="workspace">
          <nav className="tool-menu" aria-label="Calculation menu">
            <h3>Choose a calculator</h3>
            {MENU.map((item) => (
              <button
                key={item.id}
                className={`tool-button ${activeTool === item.id ? "active" : ""}`}
                type="button"
                onClick={() => changeTool(item.id)}
              >
                <strong>{item.label}</strong>
                <br />
                <span className="helper-text">{item.description}</span>
              </button>
            ))}
          </nav>
          <div className="work-area">
            {activeTool === TOOL_IDS.XY_COMPONENTS && (
              <XYComponentsForm onSubmit={handleSubmit} loading={loading} />
            )}
            {activeTool === TOOL_IDS.MAGNITUDE_ANGLE && (
              <MagnitudeAngleForm onSubmit={handleSubmit} loading={loading} />
            )}
            {activeTool === TOOL_IDS.VECTOR_SUM && (
              <VectorSumForm onSubmit={handleSubmit} loading={loading} />
            )}
            {activeTool === TOOL_IDS.ABOUT && <FutureTopicsPanel />}

            {errorMessage && (
              <div className="alert" role="alert">
                {errorMessage}
              </div>
            )}

            <ResultCard result={result} />
          </div>
        </section>
      </main>
      <footer>
        Crafted with ☕ and plenty of physics textbooks. Open source on GitHub.
      </footer>
    </div>
  );
}

function transformResult(toolId, data) {
  switch (toolId) {
    case TOOL_IDS.XY_COMPONENTS:
      return {
        title: "Vector components",
        description: "Your vector split into perpendicular components.",
        rows: [
          { label: "X component", value: data.xComponent },
          { label: "Y component", value: data.yComponent },
        ],
      };
    case TOOL_IDS.MAGNITUDE_ANGLE:
      return {
        title: "Vector magnitude & direction",
        description: "Combined magnitude and the direction measured counter-clockwise from +x.",
        rows: [
          { label: "Magnitude", value: data.magnitude },
          { label: "Angle", value: data.angleDegrees, suffix: "°" },
        ],
      };
    case TOOL_IDS.VECTOR_SUM:
      return {
        title: "Resultant vector",
        description: "Components, magnitude, and heading of the summed vector.",
        rows: [
          { label: "Resultant X", value: data.totalX },
          { label: "Resultant Y", value: data.totalY },
          { label: "Magnitude", value: data.magnitude },
          { label: "Angle", value: data.angleDegrees, suffix: "°" },
        ],
      };
    default:
      return null;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
