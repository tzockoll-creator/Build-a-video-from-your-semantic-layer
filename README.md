# Build a Video from Your Semantic Layer

Generate animated video summaries of well performance data using Remotion and MicroStrategy's Strategy semantic layer (via MCP).

<p align="center">
  <img src="assets/preview.gif" alt="Well Performance Video Preview" width="720" />
</p>

## How It Works

1. **Query the semantic layer** — Data is pulled from a MicroStrategy Strategy Cloud datasource using the Strategy MCP tools (list schemas, list models, SQL queries)
2. **Structure the data** — Query results are shaped into typed TypeScript data modules
3. **Render with Remotion** — React components animate the data into a polished 30-second MP4 video (1920x1080, 30fps)

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Data Source** | [MicroStrategy Strategy Cloud](https://www.microstrategy.com/) | Semantic layer hosting well performance data |
| **Data Access** | Strategy MCP (Model Context Protocol) | Query schemas, models, and run SQL against the semantic layer |
| **Video Framework** | [Remotion](https://www.remotion.dev/) v4 | React-based programmatic video creation |
| **Language** | TypeScript + React | Component authoring and type safety |
| **Runtime** | Node.js | Build and render pipeline |
| **Output** | H.264 MP4 | Final video codec/format |

## Video Scenes

The generated video contains 6 animated scenes:

| Scene | Duration | Content |
|-------|----------|---------|
| Title | 5s | Portfolio headline stats (total wells, avg CAPEX, IRR, payout) |
| Basin Overview | 6s | Animated bar chart of EUR Oil by basin + metric cards |
| Capital Tiers | 5s | Tier comparison cards with IRR/CAPEX bars |
| Pipeline Status | 5s | Stacked bar by development stage + detail rows |
| Risk Matrix | 5s | 3x3 geological/execution risk heatmap + insights |
| Summary | 4s | Key takeaways and recommendations |

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Chrome** (Remotion downloads a headless shell automatically on first render)
- Access to a **MicroStrategy Strategy Cloud** environment with MCP tools (for pulling fresh data)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/tzockoll-creator/Build-a-video-from-your-semantic-layer.git
cd Build-a-video-from-your-semantic-layer

# Install dependencies
npm install

# Preview in Remotion Studio (live editing)
npm run studio

# Render the final video
npm run render
```

The rendered video will be output to `out/well-performance.mp4`.

## Customizing with Your Own Data

1. **Query your semantic layer** using the Strategy MCP tools:
   - `list_schemas` — discover available datasources
   - `list_mosaic_models` — find tables within a schema
   - `list_columns` — inspect columns and their metadata
   - `query` — write's SQL to pull the data you need

2. **Update `src/data.ts`** with your query results

3. **Modify the scene components** in `src/scenes/` to match your data structure

## Project Structure

```
src/
├── index.ts                  # Remotion entry point
├── Root.tsx                  # Composition registration (resolution, fps, duration)
├── WellPerformanceVideo.tsx  # Main composition — sequences all scenes
├── data.ts                   # Well performance data (from Strategy MCP queries)
└── scenes/
    ├── TitleScene.tsx        # Animated title with headline KPIs
    ├── BasinOverview.tsx     # Basin breakdown with bar charts
    ├── CapitalTiers.tsx      # Capital tier comparison cards
    ├── PipelineStatus.tsx    # Development pipeline stacked bar
    ├── RiskAndOutlook.tsx    # Risk matrix heatmap + insights
    └── ClosingScene.tsx      # Summary and recommendations
```

## License

ISC
