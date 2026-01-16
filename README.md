# URL Shortener Platform

[![Build](https://img.shields.io/github/actions/workflow/status/PiyushK-T/url-shortner-platform/nodejs.yml?branch=main&label=build&logo=github)](https://github.com/PiyushK-T/url-shortner-platform/actions)
[![Coverage](https://img.shields.io/badge/coverage-88%25-brightgreen)](#tests)
[![License](https://img.shields.io/github/license/PiyushK-T/url-shortner-platform)](LICENSE)

A **microservices-based URL shortener platform** built with **TypeScript**, **Node.js**, and **Express**.  
This project implements a full microservices architecture with **authentication**, **URL shortening**, and **analytics tracking**.

---

## 🏗 Architecture

The platform consists of the following services:

```

+-----------------+       +-----------------+       +-----------------+
|                 |       |                 |       |                 |
|   API Gateway   +------->   Auth Service  |       |  URL Service    |
|                 |       |                 |       |                 |
+-----------------+       +-----------------+       +-----------------+
|
v
+-----------------+
|                 |
| Analytics Service|
|                 |
+-----------------+

```

- **API Gateway:** Routes requests to all services.
- **Auth Service:** User registration and login with JWT authentication.
- **URL Service:** Shortens URLs, resolves codes, and tracks clicks.
- **Analytics Service:** Receives analytics events asynchronously.

---

## 🛠 Tech Stack

- **Language:** TypeScript
- **Server:** Node.js, Express
- **Testing:** Jest
- **Environment:** dotenv
- **Version Control:** Git
- **Deployment:** Docker/Kubernetes-ready

---

## 📂 Folder Structure

```

services/
│
├─ api-gateway/
│   ├─ src/
│   ├─ tests/
│   ├─ tsconfig.json
│
├─ auth-service/
│   ├─ src/
│   ├─ tests/
│   ├─ tsconfig.json
│
├─ url-service/
│   ├─ src/
│   ├─ tests/
│   ├─ tsconfig.json
│
├─ analytics-service/
│   ├─ src/
│   ├─ tests/
│   ├─ tsconfig.json

````

---

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/PiyushK-T/url-shortner-platform.git
cd url-shortner-platform/services/<service-name>
````

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

Fill in the `.env` values for each service.

4. **Run the service**

```bash
npm run dev   # development mode
npm start     # production mode
```

5. **Run tests**

```bash
npm test
```

---

## 📄 API Endpoints

### API Gateway

* Routes requests to respective microservices.

### Auth Service

* `POST /register` – Register a user
* `POST /login` – Login a user

### URL Service

* `POST /url` – Shorten a URL
* `GET /:code` – Resolve a URL

### Analytics Service

* `POST /analytics/track` – Track events
* `GET /health` – Health check

---

## 🧪 Tests & Coverage

* **Auth Service:** User registration/login, JWT validation.
* **URL Service:** Shorten/resolve URLs.
* **Analytics Service:** Smoke test, health check, POST tracking.
* Run all tests:

```bash
npm test
```

* Example coverage badge shown above (~88%).

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 💡 Notes

* Services are **fully decoupled** and can run independently.
* Analytics events are **asynchronous** to avoid blocking.
* Environment config handled with `dotenv`.
* Designed for **scalability**: can easily add more services.
