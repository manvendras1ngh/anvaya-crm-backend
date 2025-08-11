# 📊 Anvaya CRM Backend

> A Node.js REST API for managing leads, agents, and reports in a CRM system

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/anvaya
CORS_ORIGIN=http://localhost:3000
```

---

## 📁 Project Architecture

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

## 🌐 API Endpoints

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

### 🏢 Sales Agents
```
POST   /agents             → Create new agent
GET    /agents             → Fetch all agents
```

### 📈 Reports & Analytics
```
GET    /reports/last-week  → Leads closed in last week
GET    /reports/pipeline   → Total leads in pipeline
```

---

## 📋 Data Models

### 🎯 Lead Schema
| Field | Type | Description |
|-------|------|-------------|
| `name` | String* | Lead's full name |
| `source` | Enum* | Website, Referral, Cold Call, Advertisement, Email, Other |
| `salesAgent` | ObjectId* | Reference to assigned agent |
| `status` | Enum | New, Contacted, Qualified, Proposal Sent, Closed |
| `tags` | Array | Custom tags for categorization |
| `timeToClose` | Number* | Expected days to close deal |
| `priority` | Enum | High, Medium, Low |
| `createdAt` | Date | Auto-generated timestamp |
| `updatedAt` | Date | Auto-updated on changes |
| `closedAt` | Date | Set when status becomes "Closed" |

_*Required fields_

### 👤 Sales Agent Schema
| Field | Type | Description |
|-------|------|-------------|
| `name` | String* | Agent's full name |
| `email` | String* | Unique email address |
| `createdAt` | Date | Registration timestamp |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js with ES6 modules
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **CORS:** Cross-origin resource sharing enabled
- **Environment:** dotenv configuration

## 🔧 Server Features

✅ **JSON parsing** with 16kb limit  
✅ **CORS enabled** for cross-origin requests  
✅ **MongoDB integration** via Mongoose  
✅ **Error handling** middleware  
✅ **Environment-based** configuration  
✅ **RESTful API** design patterns