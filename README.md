# Bangladesh Railway Ticket Booking Automation

This project contains automated tests for the Bangladesh Railway ticket booking system using Playwright.

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. **Create environment configuration:**
   ```bash
   cp .env.example .env
   ```

4. **Fill in ALL required values** in the `.env` file:
   ```env
   RAILWAY_USERNAME=your_mobile_number
   RAILWAY_PASSWORD="your_password"

   # Search Parameters (ALL REQUIRED)
   SEARCH_FROM=Dhaka
   SEARCH_TO=Joydebpur
   SEARCH_DATE=28-May-2025
   SEARCH_CLASS=S_CHAIR

   # Booking Parameters (ALL REQUIRED)
   TRAIN_NAME=PADMA EXPRESS
   PREFERRED_SEATS=A1,A2,B1,B2
   NUMBER_OF_SEATS=1
   ```

5. **Important Setup Notes:**
   - **Credentials**: Use your registered Bangladesh Railway mobile number and password
   - **Password Quotes**: Use quotes around password if it contains special characters (e.g., `#`, `@`, `!`)
   - **Date Format**: Use `DD-MMM-YYYY` format (e.g., `28-May-2025`)
   - **Account Balance**: Ensure your railway account has sufficient balance for booking
   - **Security**: The `.env` file is ignored by git to protect your credentials

## Running Tests

To run tests in headed mode:
```bash
npm test
```

To run tests with UI mode:
```bash
npm run test:ui
```

## Test Description

The test automation uses API-based testing to avoid UI-related issues and provide more reliable testing:

### Test Case 1: Authentication API Testing
- Tests various common login API endpoints (/api/auth/login, /api/login, etc.)
- Attempts authentication with mobile number and password
- Verifies API endpoints exist and respond appropriately
- Handles different response formats and authentication methods

### Test Case 2: Search API Endpoint Discovery
- Tests access to search-related API endpoints
- Checks for endpoints like /api/search, /api/trains/search, /api/stations
- Verifies endpoints are accessible and respond with appropriate status codes
- Identifies which endpoints require authentication

### Test Case 3: Train Search API Testing
- Performs actual train search requests via API
- Tests search with parameters (from: Dhaka, to: Rajshahi, class: SNIGDHA)
- Tries both POST and GET methods with search data
- Verifies search functionality through API calls

### Test Case 4: User Profile API Testing
- Tests access to user profile API endpoints
- Checks endpoints like /api/user/profile, /api/profile, /api/me
- Verifies profile-related functionality is accessible via API

### Test Case 5: Booking API Endpoint Discovery
- Tests access to booking-related API endpoints
- Checks endpoints like /api/booking, /api/tickets, /api/reservations
- Verifies booking functionality endpoints exist and are accessible

### Test Case 6: Complete API Booking Flow
- Performs end-to-end ticket booking using API calls only
- Reads search and booking parameters from .env file
- Attempts authentication via multiple API endpoints
- Searches for trains using configured parameters (from, to, date, class)
- Looks for specific train by name (configurable via TRAIN_NAME)
- Attempts booking via multiple booking API endpoints
- Includes seat selection preferences (configurable via PREFERRED_SEATS)
- **Smart Fallback Logic**: If preferred seats are not available, automatically tries:
  - Generic seat patterns based on NUMBER_OF_SEATS
  - Common seat naming conventions
  - Seat count-only booking requests
- Provides comprehensive API request/response logging
- Tests booking endpoints even when search results are not available

### Test Case 7: API Endpoint Verification
- Verifies all API endpoints are accessible before real booking
- Tests search URL with configured parameters
- Checks authentication endpoints availability
- Validates booking endpoints accessibility
- Provides configuration summary for verification
- Ensures system readiness for real booking attempts

### Test Case 8: **REAL Ticket Booking with OTP Handling**
- **⚠️ PERFORMS ACTUAL TICKET BOOKING - USE WITH CAUTION**
- Complete end-to-end real booking flow with valid credentials
- Handles splash page and language selection automatically
- Performs real login with credentials from .env file
- Searches for and books the configured train (from TRAIN_NAME environment variable)
- **Complete Booking Flow**:
  1. **Search Results** → Finds and clicks BOOK NOW button (using classes: `book-now-btn seatsLayout`)
  2. **Coach Selection** → Automatically selects available coach (using class: `bg-[#FFFFFF]`)
  3. **Seat Selection** → Tries preferred seats first, falls back to available seats
  4. **Continue Purchase** → Clicks "CONTINUE PURCHASE" button
  5. **OTP Page** → **Automatically reaches "Enter Your OTP Code" page**
  6. **Manual OTP Entry** → **Switches to UI mode for manual OTP entry (10 minutes timeout)**
- **Smart Seat Selection**:
  - Tries preferred seats first (A1,A2,B1,B2)
  - Falls back to any available seats if preferred unavailable
  - Handles multiple seat selection strategies
- **Automated Passenger Details**:
  - Fills passenger names, ages, and gender
  - Supports multiple passengers based on NUMBER_OF_SEATS
- **UI Mode for OTP**:
  - Automatically handles payment method selection
  - **Switches to UI mode when OTP is required**
  - Keeps browser open for manual OTP entry
  - Waits up to 5 minutes for OTP completion
  - Takes screenshots at each step for debugging
- **Success Detection**: Automatically detects booking completion
- **Error Handling**: Comprehensive error detection and reporting

## Configuration

All test parameters are configurable via the `.env` file (copy from `.env.example`):

### **🔧 Required Configuration Variables:**

- **RAILWAY_USERNAME**: Your registered mobile number (REQUIRED)
- **RAILWAY_PASSWORD**: Your account password (REQUIRED, use quotes for special characters)

### **🔍 Search Parameters (ALL REQUIRED):**
- **SEARCH_FROM**: Origin station (e.g., Dhaka, Chittagong, Sylhet)
- **SEARCH_TO**: Destination station (e.g., Joydebpur, Rajshahi, Khulna)
- **SEARCH_DATE**: Journey date in DD-MMM-YYYY format (e.g., 28-May-2025)
- **SEARCH_CLASS**: Train class (e.g., S_CHAIR, SNIGDHA, AC_S, SHOVAN)

### **🎫 Booking Parameters (ALL REQUIRED):**
- **TRAIN_NAME**: Specific train to book (e.g., PADMA EXPRESS, TISTA EXPRESS, JAMALPUR EXPRESS)
- **PREFERRED_SEATS**: Comma-separated seat numbers (e.g., A1,A2,B1,B2)
- **NUMBER_OF_SEATS**: Number of seats to book (e.g., 1, 2, 3)

### **⚠️ Important Notes:**
- **No default values**: All variables must be explicitly set in `.env` file
- **Validation**: Tests will fail if any required variable is missing
- **Format matters**: Follow exact format examples for dates and seat numbers

## Notes

- **API-Based Testing**: Tests use HTTP requests instead of UI automation for better reliability
- **Endpoint Discovery**: Tests automatically discover and verify API endpoints
- **Authentication Testing**: Comprehensive testing of various login API patterns
- **Error Handling**: Tests handle different HTTP status codes and response formats
- **No UI Dependencies**: API tests are not affected by UI changes or JavaScript loading issues
- **Faster Execution**: API tests run much faster than UI-based tests
- **Better Debugging**: Clear API request/response logging for easier troubleshooting
- **Cross-Platform**: API tests work consistently across different environments
- **Configurable Parameters**: All search and booking preferences can be customized via .env file
- **Complete API Coverage**: Tests cover authentication, search, and booking via API endpoints
- **Intelligent Endpoint Discovery**: Automatically discovers and tests multiple API endpoint patterns

## Usage

### Run All Tests (Safe - No Real Booking)
```bash
npx playwright test
```

### Run API Endpoint Verification
```bash
npx playwright test --grep "should verify API endpoints before real booking"
```

### Run Specific Test Cases
```bash
# Test authentication endpoints
npx playwright test --grep "should be able to access authentication API"

# Test complete API booking flow (safe)
npx playwright test --grep "should be able to perform complete booking via API"

# Test configuration loading
npx playwright test --grep "should read configuration from environment variables"
```

### **⚠️ REAL BOOKING (Use with Valid Credentials Only)**
```bash
# Verify endpoints first
npx playwright test --grep "should verify API endpoints before real booking" --headed

# Perform REAL booking (will book actual ticket!)
npx playwright test --grep "should perform REAL ticket booking with OTP handling" --headed
```

### Run Tests in Headed Mode (Visible Browser)
```bash
npx playwright test --headed
```

### Debug Mode with Screenshots
```bash
npx playwright test --headed --debug
```

## Security & Safety Notes

### **🔒 Security Features:**
- **Environment Variables**: Credentials stored in `.env` file (not tracked by git)
- **Template File**: `.env.example` provides configuration template without sensitive data
- **Gitignore Protection**: `.env` file automatically excluded from version control
- **No Hardcoded Credentials**: All sensitive information externalized

### **⚠️ Safety Guidelines:**
- **Test Mode**: Most tests are safe and do not perform real bookings
- **Real Booking**: Only the "REAL ticket booking" test actually books tickets
- **Credentials**: Ensure valid credentials are in `.env` file before real booking
- **OTP Handling**: The system will pause for manual OTP entry during real booking
- **Screenshots**: All steps are captured for debugging and verification
- **Account Balance**: Check your railway account balance before running real booking tests

### **🚨 Important Warnings:**
- **Never commit `.env` file** to version control
- **Use test credentials** for development when possible
- **Real booking tests will charge your account** - use with caution
- **Always verify configuration** before running real booking tests