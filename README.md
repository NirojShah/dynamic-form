# Dynamic Form - Backend Server

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

### 2. **Organization Management**
- Organization creation and setup
- Multi-organization support
- Organization-based form management
- User-organization associations

### 3. **Form Management**
- ✅ Create new forms with custom fields
- ✅ Add fields to existing forms
- ✅ Get all forms for an organization
- ✅ Get form details by name and organization
- ✅ Update form information and fields
- ✅ Delete forms (soft delete with status change)
- ✅ Archive forms for organization
- ✅ Retrieve archived forms

### 4. **Public Forms**
- ✅ Create public form templates
- ✅ Generate public shareable links
- ✅ Get all public forms with pagination
- ✅ Clone public forms to private forms
- ✅ Public form submission without authentication
- ✅ File upload support in public forms

### 5. **Form Responses & Analytics**
- ✅ Collect form submissions
- ✅ Retrieve and paginate form responses
- ✅ Analytics dashboard with performance metrics
- ✅ Track submissions over time (today + last 6 days)
- ✅ Dashboard charts and statistics
- ✅ Process and display response data

### 6. **Form Validation**
- Field-level validation
- Form structure validation
- User response validation
- Required field checking

### 7. **Security**
- CORS protection
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
- Paginate through submissions
- Filter and search responses
- Export response data

### Analytics Dashboard
- Track form performance
- View submission trends
- 7-day submission chart
- Response rates
- Form engagement metrics

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

## 📝 Recent Improvements

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
- [ ] Advanced form filtering and search
- [ ] Form templates and presets
- [ ] Conditional form logic
- [ ] WebSocket support for real-time updates
- [ ] Export forms to various formats
- [ ] Form permissions and sharing with users
- [ ] Advanced analytics and reporting

## 📧 Contact & Support

For issues, feature requests, or contributions, please visit:
- **GitHub Issues:** [dynamic-form/issues](https://github.com/NirojShah/dynamic-form/issues)
- **GitHub Repository:** [dynamic-form](https://github.com/NirojShah/dynamic-form)

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

---

**Built with ❤️ by Niroj Shah**
