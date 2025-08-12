# Anvaya CRM Backend

A Node.js REST API for managing leads, agents, and reports in a CRM system

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/manvendras1ngh/anvaya-crm-backend.git
   ```
2. Enter the directory:
   ```
   cd <dir-name>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=<your mongo db credentials>
CORS_ORIGIN=<your frontend url>
```

---

## Project Architecture

```
anvaya-backend/
│
├── 📂 controllers/        # Business logic handlers
│   ├── agents.controllers.js
│   ├── leads.controllers.js
│   └── reports.controllers.js
│
├── 📂 models/            # MongoDB data schemas
│   ├── leads.models.js
│   ├── salesAgents.models.js
│   ├── comments.models.js
│   └── tags.models.js
│
├── 📂 routes/            # API endpoint definitions
│   ├── agents.routes.js
│   ├── leads.routes.js
│   └── reports.routes.js
│
├── 📂 db/                # Database configuration
│   └── db.connect.js
│
├── 📂 utils/             # Helper functions
│   ├── asyncWrapper.js
│   └── data.js
│
└── 📄 index.js           # Server entry point
```

---

## API Endpoints

**Base URL:** `http://localhost:3000/api/v1`

### 👥 Leads Management

```
POST   /leads              → Create new lead
GET    /leads              → Fetch all leads
PUT    /leads/:id          → Update specific lead
DELETE /leads/:id          → Remove lead
POST   /leads/add/bulk     → Create multiple leads
POST   /leads/:id/comments → Add comment to lead
GET    /leads/:id/comments → Get lead comments
```

### Sales Agents

```
POST   /agents             → Create new agent
GET    /agents             → Fetch all agents
```

### Reports & Analytics

```
GET    /reports/last-week  → Leads closed in last week
GET    /reports/pipeline   → Total leads in pipeline
```

---

## Tech Stack

- **Runtime:** Node.js with ES6 modules
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **CORS:** Cross-origin resource sharing enabled
- **Environment:** dotenv configuration

## Server Features

**JSON parsing** with 16kb limit  
**CORS enabled** for cross-origin requests  
**MongoDB integration** via Mongoose  
**Error handling** middleware  
**Environment-based** configuration  
**RESTful API** design patterns
