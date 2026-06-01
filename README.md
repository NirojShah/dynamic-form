# Dynamic Form - Backend Server

[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

A powerful and flexible Node.js/Express backend server for managing dynamic forms with advanced features including form creation, public form sharing, analytics, user management, and more.

## 🎯 Overview

Dynamic Form is a comprehensive form management system that allows organizations to:
- Create and manage dynamic forms with custom fields
- Share forms publicly without requiring authentication
- Track form submissions and responses
- Analyze form performance with detailed dashboards
- Archive and organize forms efficiently
- Manage multiple users and organizations

## 📋 Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB with Mongoose v9.3.3
- **Authentication:** JWT (JSON Web Tokens)
- **File Handling:** Express File Upload
- **CORS:** Cross-Origin Resource Sharing enabled
- **Development:** Nodemon for hot-reloading
- **Code Quality:** ESLint

## ✨ Features Implemented

### 1. **User Management**
- User signup and registration APIs
- JWT-based authentication
- User profile management
- Secure password handling
- ✅ User password update functionality

### 2. **Organization Management**
- Organization creation and setup
- Multi-organization support
- Organization-based form management
- User-organization associations
- Organization ID tracking in responses

### 3. **Form Management**
- ✅ Create new forms with custom fields
- ✅ Add fields to existing forms
- ✅ Get all forms for an organization
- ✅ Get form details by name and organization
- ✅ Update form information and fields
- ✅ Delete forms (soft delete with status change)
- ✅ Archive forms for organization
- ✅ Retrieve archived forms
- ✅ Response count tracking in form schema

### 4. **Public Forms**
- ✅ Create public form templates
- ✅ Generate public shareable links
- ✅ Get all public forms with pagination
- ✅ Clone public forms to private forms
- ✅ Public form submission without authentication
- ✅ File upload support in public forms

### 5. **Form Responses & Analytics**
- ✅ Collect form submissions with optimized storage
- ✅ Retrieve and paginate form responses
- ✅ Analytics dashboard with performance metrics
- ✅ Track submissions over time (today + last 6 days)
- ✅ Dashboard charts and statistics
- ✅ Process and display response data
- ✅ Dynamic collection creation based on formId-organizationId

### 6. **Form Validation**
- Field-level validation
- Form structure validation
- User response validation
- Required field checking

### 7. **Security**
- CORS protection with environment-based configuration
- Cookie-based session management
- JWT authentication
- Error handling with custom error utilities
- Async error handling middleware

## 📁 Project Structure

```
src/
├── module/
│   ├── form/
│   │   ├── form.controller.js      # Form request handlers
│   │   ├── form.service.js         # Business logic
│   │   ├── form.route.js           # API endpoints
│   │   ├── form.model.js           # MongoDB schema
│   │   ├── form.utility.js         # Helper functions
│   │   └── form.validation.js      # Validation logic
│   │
│   ├── form-data/
│   │   ├── form.data.controller.js
│   │   ├── form.data.service.js
│   │   └── form.data.model.js
│   │
│   ├── public-form-route/
│   │   ├── public.form.controller.js
│   │   ├── public.form.service.js
│   │   ├── public.form.route.js
│   │   └── public.form.utility.js
│   │
│   ├── user/
│   │   └── user management modules
│   │
│   └── organization/
│       └── organization management modules
│
├── route/
│   ├── app.js                      # Express app setup
│   └── application.route.js        # Route aggregator
│
├── utility/
│   ├── asyncErrorHandler.js        # Async error wrapper
│   ├── customError.js              # Custom error class
│   ├── globalErrorHandler.js       # Global error middleware
│   └── db_connection.js            # MongoDB connection
│
└── server.js                       # Main entry point

package.json                        # Dependencies and scripts
environment_setup.js               # Environment configuration
```

## 🚀 API Endpoints

### Form Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/app/v1/form/create` | Create a new form |
| POST | `/app/v1/form/create-fields` | Add fields to a form |
| POST | `/app/v1/form/form-fields` | Create form with fields |
| GET | `/app/v1/form/forms` | Get all forms for organization |
| GET | `/app/v1/form/:formName/:organization` | Get form details |
| PUT | `/app/v1/form/update` | Update form information |
| DELETE | `/app/v1/form/:key` | Delete a form |
| GET | `/app/v1/form/archieved` | Get archived forms |

### Public Form Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/app/v1/form/get-public-link` | Generate public link |
| PUT | `/app/v1/form/public` | Create public form template |
| GET | `/app/v1/form/public` | Get all public forms (paginated) |
| GET | `/public-form/:key` | Get public form details |
| POST | `/public-form/:key/submit` | Submit public form response |

### Form Response Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/app/v1/form/response/:key` | Get form submissions (paginated) |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/app/v1/user/update-password` | Update user password |

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/NirojShah/dynamic-form.git
   cd dynamic-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=7050
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGINS=http://localhost:3000,http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development mode (with hot-reload)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:7050`

## 📝 Scripts

```bash
npm run dev     # Development with nodemon
npm start       # Production mode
npm test        # Run tests
npm run lint    # Check code quality with ESLint
```

## 🔐 Environment Configuration

The project uses `environment_setup.js` to load environment variables from `.env` file:

```javascript
NODE_ENV=development|production
PORT=7050
MONGODB_URI=mongodb://...
JWT_SECRET=your_secret_key
CORS_ORIGINS=origin1,origin2,origin3
```

## 📊 Key Features in Detail

### Dynamic Field Creation
Forms support multiple field types:
- Text input
- Textarea
- Select/Dropdown
- Radio buttons
- Checkboxes
- File uploads
- And more...

### Form Response Tracking
- Collect responses with file attachments
- Dynamic collection creation per form-organization pair
- Optimized storage using formId-organizationId schema
- Paginate through submissions
- Filter and search responses
- Export response data

### Analytics Dashboard
- Track form performance with real-time metrics
- View submission trends
- 7-day submission chart
- Response rates and engagement metrics
- Response count tracking per form

### Public Form Sharing
- No authentication required for public forms
- Unique public links for each form
- Clone templates for reuse
- Collect submissions anonymously

## 🛡️ Error Handling

The application includes comprehensive error handling:
- Custom error messages
- Async error wrapper middleware
- Global error handler
- Validation error responses
- HTTP status codes

## 🤝 Contribution Guidelines

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 Recent Improvements (Latest)

- ✅ Dashboard Service Function Logic Update (PR #67)
- ✅ Dashboard Service Update (PR #66)
- ✅ Optimized form response data fetching from dynamic collections
- ✅ Enhanced analytics dashboard with response count tracking
- ✅ Refactored data fetching logic to use schema-based collections
- ✅ Removed unused import statements and optimized code
- ✅ User password update functionality
- ✅ Dynamic collection creation for form responses (formId-organizationId)
- ✅ Environment-based CORS origin configuration
- ✅ Organization ID in API responses
- ✅ Response format standardization (boolean success field)
- ✅ Added form response count field to schema definition
- ✅ Improved form utility functions for response processing
- ✅ Added API for fetching archived forms
- ✅ Implemented form archiving functionality
- ✅ Enhanced form update API
- ✅ Added public form creation and cloning
- ✅ Integrated analytics dashboard
- ✅ Improved user and organization management
- ✅ Enhanced form response collection
- ✅ Added comprehensive validation

## 📋 Upcoming Features

- [ ] Complete API to change form status to archive (Issue #36)
- [ ] Advanced form filtering and search capabilities
- [ ] Form templates and presets library
- [ ] Conditional form logic and branching
- [ ] WebSocket support for real-time updates
- [ ] Export forms to various formats (PDF, CSV, JSON)
- [ ] Form permissions and granular sharing with users
- [ ] Advanced analytics and reporting dashboard
- [ ] Form versioning and rollback functionality
- [ ] Bulk import/export of form responses
- [ ] Custom domain support for public forms
- [ ] Multi-language support for forms
- [ ] Form scheduling and automated workflows
- [ ] Email notifications for new responses
- [ ] Integration with third-party services (Zapier, IFTTT)

## 📧 Contact & Support

For issues, feature requests, or contributions, please visit:
- **GitHub Issues:** [dynamic-form/issues](https://github.com/NirojShah/dynamic-form/issues)
- **GitHub Repository:** [dynamic-form](https://github.com/NirojShah/dynamic-form)

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

---

**Built with ❤️ by Niroj Shah**
