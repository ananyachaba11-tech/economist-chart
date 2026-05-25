import * as d3 from "d3"; // note we had to installed the full bundle here

const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];

const width = 800;
const height = 500;
const topPadding = 100;
const bottomPadding = 30;

const axisData = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // to check how solution handles making this array

export default function App() {
  const xScale = d3.scaleLinear().domain([0, 60]).range([0, width]); // note we had to write d3. here

  const yScale = d3 // note we had to write d3. here
    .scaleBand()
    .domain(data.map((d) => d.name)) // note that data.map gives an array
    .range([height - bottomPadding, topPadding])
    .padding(0.3);
  // I reversed it so the smallest value (i.e. hantavirus) corresponds to the last y point i.e. height: as data is currently in ascending order, this helps place it in
  // descending order without sorting data / adding another function to sort the data
  // Also, padding at top is added to accomodate for line number labels - they need to be in svg area.
  // Also, padding at bottom is added to accomodate for footer

  const allBars = data.map((d, i) => (
    <rect
      key={i}
      x={0}
      y={yScale(d.name)}
      width={xScale(d.count)}
      height={yScale.bandwidth()}
      fill="#006BA2"
    />
  ));

  const allLines = axisData.map((d, i) => (
    <line
      key={i}
      x1={xScale(d)}
      y1={topPadding + 10}
      x2={xScale(d)}
      y2={height - bottomPadding - 10}
      stroke={d > 0 ? "grey" : "black"}
      opacity={d > 0 ? 0.3 : 1}
      strokeWidth={1.1}
    />
  ));

  const lineLabels = axisData.map((d, i) => (
    <text
      key={i}
      x={xScale(d)}
      y={topPadding}
      fill="black"
      textAnchor="middle"
      opacity={0.8}
      style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 350 }}
    >
      {d}
    </text>
  ));

  const barLabels = data.map((d, i) => (
    <text
      key={i}
      x={d.count > 7 ? 10 : xScale(d.count) + 5} // #s 7, 10, 5 are arbitrary and based on visual appearance.
      y={yScale(d.name) + yScale.bandwidth() / 2}
      fill={d.count > 7 ? "white" : "#006BA2"}
      alignmentBaseline="middle"
      style={{ fontFamily: "sans-serif", fontWeight: 400, fontSize: 14 }}
    >
      {d.name}
    </text>
  ));

  const bottomText = (
    <g style={{ fontFamily: "sans-serif", fontWeight: 400, fontSize: 13 }}>
      <text x={0} y={height - 25} fill="black" opacity={0.6}>
        Sources: Laboratory-Acquired Infection Database; American Biological
        Safety Association
      </text>

      <text x={0} y={height - 5} fill="black" opacity={0.6}>
        The Economist
      </text>
    </g>
  );

  const Title = (
    <text
      x={0}
      y={topPadding - 60} // - number chosen based on visual appearance to balance red rectangle, title and subtitle together
      fill="black"
      style={{ fontFamily: "sans-serif", fontWeight: 550, fontSize: 20 }}
    >
      Escape artists
    </text>
  );

  const Subtitle = (
    <text
      x={0}
      y={topPadding - 35} // - number chosen based on visual appearance to balance red rectangle, title and subtitle together
      fill="black"
      style={{ fontFamily: "sans-serif", fontWeight: 300, fontSize: 15 }}
    >
      Number of laboratory-acquired infections,1970-2021
    </text>
  );

  const topbar1 = <rect x={0} y={0} fill="red" height="1" width={width} />;
  const topbar2 = <rect x={0} y={0} fill="red" height="10" width={40} />;

  return (
    <main>
      {/* inserted to style  elements such as centering the whole svg on the page */}
      <svg width={width} height={height} overflow="visible">
        {topbar1}
        {topbar2}
        {Title}
        {Subtitle}
        {allLines}
        {lineLabels}
        {allBars}
        {barLabels}
        {bottomText}
      </svg>
    </main>
  );
}
