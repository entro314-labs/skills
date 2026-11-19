# MyRoomie: Comprehensive Development Guide (2025-2030)

## 1. Executive Summary

MyRoomie is a unified flatsharing service platform comprising three primary pillars:

1. **MyRoomie Living (B2C)**: AI-powered flatmate matching with community features
2. **MyRoomie Manage (B2B)**: Property management portal with predictive maintenance and dynamic pricing
3. **MyRoomie Pro (Enterprise)**: Corporate/University relocation management solutions

This guide serves as the definitive technical specification for both AI agents and human development teams working on the platform through 2030.

## 2. Business Objectives & Key Performance Indicators

| Objective | KPI Target | Timeline | Owner |
|-----------|------------|----------|-------|
| Increase TAM via new configurations | +20% addressable users | Q2 2027 | CPO + Head of Product |
| Boost ARR | €2M run-rate, growing to €17.55M | Q2 2027, 2030-31 | CFO |
| Elevate matching accuracy | Initial 75% → 85% (AUC ≥ 0.83) → 90% | Q4 2025, 2027, 2030 | Head of AI |
| Cut landlord churn | < 8% annual | Q2 2027 | Head of Success |
| Predictive maintenance accuracy | Initial 50% → 80% | 2025, 2029 | Head of AI |
| Dynamic pricing yield improvement | Initial 10-15% → 25% | 2025, 2030 | Head of AI |
| Fraud detection | 95% → 98% accuracy | Ongoing | Security Team |
| Monthly active users | 45K → 180K → 1.2M | Q4 2025, 2027, 2031 | Growth Team |
| Premium conversion | 12% | 2030-2031 | Growth Team |

## 3. Platform Architecture

### 3.1 High-Level Architecture

```
┌─────────── Frontends ───────────┐   Next.js 15.x (Web) / React Native (Mobile)
│                                 │   Tailwind CSS 4.1 + shadcn/ui
└─────────────────────────────────┘
          ▲        │ REST+WS / GraphQL
┌─────────┴────────┐  API Gateway (BFF)
│  Domain Services │  Users · Properties · Matching · Community · Payments · Enterprise · Admin
└─────────┬────────┘  Node.js/TypeScript serverless functions
          │ gRPC / Async (NATS)
┌─────────┴────────┐  ML Orchestrator (Kubeflow)
│  AI Pipelines    │  Training · Feature Store · Model Registry
└─────────┬────────┘
          │
┌─────────▼──────────┐  Data Layer - Supabase PG, pgvector, Redis, Neo4j (Housing Graph)
└────────────────────┘  Pinecone vector DB, Cloud Storage
```

### 3.2 Micro-Frontend Structure

The platform follows a domain-driven design with these key domains:

- Users
- Properties
- Matching
- Community
- Payments
- Enterprise
- Admin

Each domain is implemented using:

- Frontend: Domain-specific Next.js components and React Native screens
- Backend: API services segmented per domain, implemented as microservices via Supabase and Vercel Edge Functions

### 3.3 AI and Data Layers

- **Housing Graph**: Connected knowledge graph of users, properties, and communities (Neo4j or PostgreSQL with graph extensions)
- **Matching Engine**: TensorFlow.js models running compatibility scoring
- **Predictive Maintenance**: Anomaly detection and IoT data processing
- **Dynamic Pricing**: Time-series forecasting with rule-based adjustments
- **Fraud Detection**: Behavioral anomaly detection and document verification

## 4. Technical Stack Details

### 4.1 Frontend Technologies

- **Web**: Next.js 15.x with App Router (React 19.1)
- **Mobile**: React Native (via Expo)
- **Styling**: Tailwind CSS 4.1 with shadcn/ui components
- **Animation**: Framer Motion
- **State Management**: React Query, Zustand
- **Client-side AI**: TensorFlow.js for compatibility scoring

### 4.2 Backend Technologies

- **Primary Platform**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Serverless Functions**: Vercel Edge Functions
- **API Patterns**: REST, GraphQL, WebSockets
- **Message Broker**: NATS for async communication

### 4.3 AI/ML Technologies

- **Model Training**: Kubeflow, MLflow
- **Feature Storage**: Feast 0.40
- **Vector Database**: Pinecone, pgvector
- **Model Serving**: ONNX runtime, FastAPI
- **Data Processing**: Spark 3.x

### 4.4 DevOps & Infrastructure

- **Hosting**: Vercel for frontend & serverless, Supabase for backend
- **CI/CD**: GitHub Actions
- **Monitoring**: OpenTelemetry → Tempo, Loki → Grafana
- **Logging**: Winston, Vercel Analytics, LogRocket
- **Error Tracking**: Sentry

## 5. Feature Requirements by Domain

### 5.1 User Domain

#### Registration & Verification

- Social login (Google, Apple, Facebook)
- Multi-step verification with fraud detection (95-98% accuracy)
- KYC integration for identity verification

#### Profile Management

- Lifestyle & personality questionnaires (MBTI/Big 5)
- Preference settings for matching
- Budget and location filters
- Media uploads (photos, videos)

#### AI Matching

- Detailed compatibility scores
- Explainable AI insights
- Mutual opt-in system
- Match feedback loop for model improvement

#### Onboarding UX

- Progressive form design
- Tooltips and guided flows
- Gamification elements
- User preference storage and refinement

#### API Endpoints

- `POST /v1/users` ⇢ `201 Created`
- `PATCH /v1/users/{id}/preferences` ⇢ `200 OK`
- `/auth/signup`, `/auth/login`, `/auth/verify`
- `/users/{id}`, `/preferences`, `/personality-assessment`

#### Events

- `user.created` Δ
- `user.preferences.updated` Δ

#### Data Storage

- `public.users`, `public.preferences`
- Latency SLA: P95 < 150 ms (read), < 250 ms (write)

### 5.2 Property Domain

#### Listing Management

- Detailed property input forms
- Room classification and amenities tagging
- Calendar integration for availability
- Virtual tour integration
- Media management (photos, videos, floor plans)

#### Booking Engine

- Room reservations with lease durations (1-12 months)
- Different lease types: standard, weekday, event, nomad_pass, live_work
- Payment scheduling
- iCal exports and imports

#### Predictive Maintenance

- Task alerts based on IoT sensor data
- Automated vendor coordination
- Maintenance history tracking
- Anomaly detection for preventative alerts

#### Dynamic Pricing

- Real-time pricing suggestions based on AI analytics
- Seasonal adjustments
- Event-driven surge pricing
- Yield management optimization

#### API Endpoints

- CRUD for properties & rooms (`/v1/properties`, `/v1/rooms`)
- `POST /v1/rooms/{id}/availability` (accepts iCal blobs)
- `/properties`, `/rooms`, `/bookings`

#### Pricing Engine

- Runs hourly cron
- Writes `dynamic_price` field into `public.rooms_prices`
- Uses `pricing-v2` Prophet model + rule-based surcharges

### 5.3 Community Domain

#### Events & Groups

- Creation and management interfaces
- Calendar integration and RSVP functionality
- Interest-based grouping
- Event analytics

#### Messaging

- Real-time chat functionality
- Encrypted channels
- Multimedia message support
- Mentions and threading

#### Community Health

- Monitoring tools with conflict prediction
- Sentiment analysis on communications
- WebSocket channel `wss://…/community/{community_id}` for realtime chat
- Middleware pushes `community.sentiment.divergent` Δ to Success team

#### API Endpoints

- `/communities`, `/events`, `/messages`

### 5.4 Enterprise Domain

#### Relocation Management

- Custom branded portals
- Bulk booking functionality
- HR system integration
- Relocation status tracking

#### Reporting & Analytics

- Customizable analytics dashboards
- Cost and satisfaction metrics
- Usage statistics
- ROI calculators

#### Bulk Workflows

- Batch invites
- Group bookings
- Centralized billing
- Integration hooks for enterprise systems

#### API Endpoints

- `/enterprise/clients`, `/enterprise/relocations`

### 5.5 Payment/Billing Domain

- Stripe Connect integration
- Webhook receiver publishes `payment.succeeded` Δ
- Idempotency key = `tenant_id:invoice_isoDate`
- Support for deposit-free options (Flatfair integration)
- Multi-currency support
- Subscription management for premium features

## 6. AI/ML Components & Specifications

### 6.1 AI Matching Engine

#### Input Data

- User preferences
- Personality scores (MBTI/Big 5)
- Historical match success rates
- Behavioral data

#### Model Type

- Ensemble methods (LightGBM)
- Deep learning models
- Current version: `match-v3.5`, targeting `match-v3.6`

#### Performance Specifications

- Accuracy Targets: 75% initial (2025), 85% by 2027 (AUC ≥ 0.83), 90% by 2030
- Online Feature Vector: pulled from Redis (TTL = 1h)
- Weekly ROC AUC ≥ 0.80; False-positive rate < 0.1

#### Endpoint

- `GET /v1/matches?user_id=…&limit=20`
- Returns ordered list `[ {match_id, score, rationales[] } ]`
- Latency target: P95 < 200ms

### 6.2 Predictive Maintenance & Pricing

#### Data Inputs

- IoT sensor data
- Historical maintenance logs
- Pricing data (historical, competitive)
- Seasonality factors
- Event calendars

#### Model Outputs

- Maintenance alerts
- Pricing recommendations
- Anomaly detection signals

#### Performance Metrics

- Maintenance prediction accuracy: initial 50%, target 80% by 2029
- Pricing yield improvement: initial 10-15%, target 25% by 2030
- Model refresh rate: weekly or after 5K new labeled pairs

### 6.3 Fraud Detection

#### Techniques

- Behavioral anomaly detection
- Document verification
- Multi-layered approach

#### Performance Target

- Current accuracy: 95%
- Target accuracy: 98%
- False positive rate < 5%

### 6.4 Natural Language Housing Advisor

- LLM-powered conversational agent
- Knowledge base: Housing Graph
- Personalized recommendations
- Multi-lingual support

### 6.5 AI Pipeline Definition (Kubeflow YAML refs)

| Step | Artifact | Tooling | Trigger |
|------|----------|---------|---------|
|`ingest_raw_events`|`s3://raw/{date}`|Spark 3|hourly|
|`feature_eng`|`feature_store.user_features`|Feast 0.40|after ingest|
|`train_match_v3.6`|`mlflow:/matches/{run_id}`|MLflow+LightGBM|weekly or 5K new labeled pairs|
|`evaluate`|`report.html`|Great Expectations|post-train|
|`promote_prod`|`model_registry`|MLflow REST|if AUC ↑ & guardrails pass|

## 7. Data Models & APIs

### 7.1 Core Entities & Relationships

- **User - Match - Conversation - Message** (1:N flows)
- **Property - Room - Booking** (1:N)
- **Community - Membership - Event - RSVP**
- **EnterpriseClient - Employee - Relocation**

### 7.2 Data Model Additions (DDL snippets)

```sql
CREATE TYPE lease_type AS ENUM ('standard', 'weekday', 'event', 'nomad_pass', 'live_work');
ALTER TABLE rooms ADD COLUMN lease_type lease_type DEFAULT 'standard';
ALTER TABLE users ADD COLUMN care_level INT CHECK (care_level BETWEEN 0 AND 5);
```

### 7.3 Service & API Specifications

> **Notation**: `⇢`=request, `⇠`=response, `Δ`=event emit.

#### User Service

- **Endpoints**:
  - `POST /v1/users` ⇢ `201 Created`
  - `PATCH /v1/users/{id}/preferences` ⇢ `200 OK`
  - `/auth/signup`, `/auth/login`, `/auth/verify`
- **Events**:
  - `user.created` Δ
  - `user.preferences.updated` Δ
- **Latency SLA**: P95 < 150 ms (read), < 250 ms (write)
- **Data Store**: `public.users`, `public.preferences`

#### Matching Service

- **Endpoint**: `GET /v1/matches?user_id=…&limit=20`
  - Returns ordered list `[ {match_id, score, rationales[] } ]`
- **Model**: `match-v3.5` (LightGBM ensemble) served via FastAPI + ONNX runtime
- **Online Feature Vector**: pulled from Redis (TTL = 1h)
- **KPIs**: weekly ROC AUC ≥ 0.80; False-positive rate < 0.1

#### Property Service

- CRUD for properties & rooms (`/v1/properties`, `/v1/rooms`)
- `POST /v1/rooms/{id}/availability` accepts iCal blobs; projects event-surge overrides

#### Pricing Engine

- Runs hourly cron; writes `dynamic_price` field into `public.rooms_prices`
- Uses `pricing-v2` Prophet model + rule-based surcharges (event, weekday-only, nomad-pass bundles)

#### Payment/Billing

- Stripe Connect; webhook receiver publishes `payment.succeeded` Δ
- Idempotency key = `tenant_id:invoice_isoDate`

#### Community Service

- WebSocket channel `wss://…/community/{community_id}` for realtime chat
- Sentiment analysis middleware pushes `community.sentiment.divergent` Δ to Success team

#### Enterprise Service

- `/enterprise/clients`, `/enterprise/relocations`
- Custom portal endpoints with branded interfaces

## 8. Non-Functional Requirements

### 8.1 Security & Compliance

- **Authentication**: Multi-factor authentication via Supabase Auth
- **Authorization**: JWT-based secure sessions
- **RBAC**: Roles = `user`, `premium`, `owner`, `enterprise_admin`, `internal.*`
- **Data Privacy**: GDPR-compliant data handling
- **Communication**: End-to-end encrypted messaging
- **GDPR tooling**: `DELETE /v1/gdpr/erase/{user_id}` cascades via event bus
- **3D-Secure**: Mandatory for first €500 to prevent fraud

### 8.2 Performance & Scalability

- **Backend Latency**: P95 < 150 ms for reads, < 250 ms for writes
- **Frontend Performance**: 99th percentile page load < 200ms
- **Scalability**: Containerized backend services for easy scaling
- **Global Deployment**: CDN deployment for static assets
- **Resilience**: Multi-region redundancy and failover setups
- **Rate Limiting**: Envoy filter; 100 req/min free-tier, 500 req/min premium
- **Redis Caching**: Feature store with 1-hour TTL

### 8.3 Accessibility & Localization

- **Accessibility**: WCAG AA compliance
- **Mobile Responsiveness**: Mobile-first, responsive design
- **Internationalization**: i18n support for 11+ languages
- **Localization**: Dynamic date/currency formatting
- **UI Standards**: Clean, minimalist aesthetics with high contrast (ratio ≥ 4.5:1)
- **Keyboard Navigation**: Full support for keyboard-only users

## 9. Development Workflow & Environments

### 9.1 Branch Strategy & Environments

| Stage | Branch prefix | CI checks | Deployment |
|-------|--------------|-----------|------------|
|Feature|`feat/`|lint, unit-tests|Ephemeral Vercel preview URL|
|Release|`release/YYYY-MM-DD`|add integration tests|Staging (Vercel + Supabase-staging)|
|Prod|`main`|e2e + load test|Vercel production + blue/green|

### 9.2 Code Review & Quality

- **Code Owners**: CODEOWNERS file enforced; 2-reviewer rule
- **AI Models**: Version tags `model-name-vX.Y`. Rollback by env var switch
- **PR-Reviewer Bot**: Subscribes to GitHub webhooks; rejects PR if open-API schema changed without updating markdown doc
- **Data-Quality Bot**: Polls BigQuery metrics; alerts Slack if null-ratio > 2%
- **Auto-Rollback Bot**: Listens to `model.promoted`; if 5% uplift not hit in 24h → revert
- **Linting**: ESLint, Prettier, TypeScript strict mode

### 9.3 CI/CD Pipelines

- **Frontend**: GitHub Actions → Vercel deployment
- **Backend**: GitHub Actions → Supabase deployment
- **AI/ML**: Kubeflow pipelines → Model Registry
- **Testing**: Automated via GitHub Actions

## 10. Testing & Quality Assurance

### 10.1 Backend Testing

- 80% line coverage requirement
- Contract tests via Pact
- Integration tests for cross-service flows
- Load testing for critical endpoints

### 10.2 Frontend Testing

- Jest for unit tests
- Playwright for E2E testing of top 15 user flows
- Accessibility testing via axe-core
- Visual regression testing

### 10.3 AI/ML Testing

- Must beat moving baseline by ≥ 2 percentage points AUC
- Bias checks (gender, age) Δ ≤ 1%
- Regular A/B tests for matching and pricing
- Periodic model retraining cycles

### 10.4 Security Testing

- Regular penetration testing
- OWASP Top 10 compliance checks
- Dependency vulnerability scanning
- Security audit logging

## 11. Delivery Timeline & Milestones

### 11.1 Phase 1 (2025)

| Sprint | Dates | Epics | Exit Criteria |
|--------|-------|-------|---------------|
|S-01|05-May → 16-May|Schema refactor for `lease_type`; API version bump|DDL deployed; 0 prod incidents|
|S-02|19-May → 30-May|Deposit-free checkout|Flatfair sandbox TXs succeed; UAT sign-off|
|S-03|02-Jun → 13-Jun|Weekday lease calendar|Availability split logic; iCal export verified|
|S-04|16-Jun → 27-Jun|Nomad Pass bundle MVP|Price engine handles multi-city; paywall upsell|

**By Q4 2025**:

- Core B2C platform (signup, profiles, matching)
- Minimal B2B listing functionality
- Basic Enterprise MVP
- 75% matching accuracy
- 45K MAUs
- 246 properties onboarded

### 11.2 Phase 2 (2026-2027)

- B2B management tools
- Dynamic pricing v1
- Predictive maintenance v1
- React Native mobile app
- 10-15% yield lift
- 50% maintenance accuracy
- 180K users

### 11.3 Phase 3 (2028-2029)

- Advanced community features
- NLP advisor beta
- VR tours
- Blockchain deposits
- Predictive maintenance v2
- 85% matching accuracy
- 70% maintenance accuracy

### 11.4 Phase 4 (2030-2031)

- Full-scale enterprise relocation
- Marketplace for services
- 90% match accuracy
- 25% pricing uplift
- 1.2M users
- 12% premium conversion
- €17.55M ARR

## 12. Team Structure & Responsibilities

### 12.1 Core Teams

- **Product Team**: Product Owner, UX Designers, Product Analysts
- **AI Team**: Data Scientists for matching, pricing, maintenance, fraud, NLP
- **Backend Team**: API Services, Database, Cloud Infrastructure
- **Frontend Team**: Web & Mobile UI/UX, Accessibility, i18n
- **DevOps Team**: CI/CD, Infrastructure, Monitoring
- **QA Team**: Test Automation, Manual Testing, Performance

### 12.2 Roles & Responsibilities

- **Product Owner**: Prioritize backlog, define acceptance criteria
- **AI Lead**: Model architecture, training pipelines, feature engineering
- **Backend Lead**: API design, microservice architecture, data modeling
- **Frontend Lead**: Component library, responsive design, performance
- **DevOps Lead**: Infrastructure as code, monitoring, security
- **QA Lead**: Test strategy, automation framework, quality gates

### 12.3 Communication & Collaboration

- **Agile Cadence**: 2-week sprints; planning, demos, retros
- **Tools**: GitHub for code, Jira for tickets, Slack for chat, Confluence for docs
- **Meetings**:
  - Weekly cross-team sync
  - Monthly roadmap review
  - Quarterly OKR planning
  - Regular synchronization between AI and Dev teams

## 13. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
|Vector DB cost spike|Medium|Budget overrun|Migrate to pgvector when embeddings > 50M|
|EU AI Act non-compliance|High|Legal fines|Add `explainability` endpoint returning weighted features|
|Stripe fraud disputes|Low|Revenue leakage|3-D Secure mandatory for first €500|
|Inference latency > 400ms|Medium|UX drop|Enable Redis feature cache + auto-scale ONNX pods|
|Maintenance prediction failures|Medium|User dissatisfaction|Fallback to rule-based alerts; human review|
|Privacy concerns|Medium|Trust erosion|Transparent data usage; strict permissions|
|Scaling challenges at 500K+ users|High|Performance degradation|Early load testing; database sharding plan|
|Community sentiment degradation|Medium|User churn|Proactive monitoring; Success team intervention|

## 14. Appendices & References

### 14.1 Technical Documentation

- OpenAPI 3.1 full spec
- MLflow model card template
- Edge-function cold-start budget cheatsheet
- Database schema diagrams
- Infrastructure architecture diagrams

### 14.2 UX/UI Resources

- Design system
- Component library
- Wireframes and prototypes
- Accessibility guidelines
- Analytics tracking plan

### 14.3 AI/ML Resources

- Feature dictionaries
- Training datasets documentation
- Model evaluation metrics
- A/B testing framework
- AI ethics guidelines

---

*This comprehensive development guide serves as the definitive specification for building the MyRoomie platform. All AI agents and development teams should refer to this document when implementing features, algorithms, and services. Updates to this guide must follow proper change control procedures.*
