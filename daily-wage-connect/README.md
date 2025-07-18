# DailyWageConnect

A responsive React.js platform that connects households with daily-wage workers like electricians, maids, plumbers, and gardeners. Built with Tailwind CSS for modern, mobile-friendly design.

## Features

### For Users (Homeowners)
- **Worker Search**: Browse and search workers by category, location, and ratings
- **Booking System**: Book workers with date/time selection and service details
- **Profile Management**: View worker profiles with ratings, experience, and availability
- **Tool Rental**: Rent tools from verified workers
- **Notifications**: Real-time notifications for booking confirmations and updates
- **Dashboard**: View booking history and manage requests

### For Workers (Service Providers)
- **Profile Management**: Complete profile setup with services, rates, and availability
- **Job Management**: Accept/decline job requests with detailed information
- **Availability Calendar**: Manage available time slots with interactive calendar
- **Tool Listings**: Add and manage tools available for rent
- **Earnings Tracking**: View earnings summary and completed jobs
- **Dashboard**: Comprehensive worker dashboard with all features

### General Features
- **Responsive Design**: Mobile-first design that works on all devices
- **User Authentication**: Separate login/registration for Users and Workers
- **Real-time Notifications**: Toast notifications for important updates
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Category-based Search**: Filter by service categories (Electrician, Plumber, Maid, Gardener)

## Tech Stack

- **Frontend**: React.js 19.1.0
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.7.0
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: Heroicons (via Tailwind CSS)
- **Build Tool**: Create React App

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd daily-wage-connect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── LandingPage.js          # Homepage with hero section and features
│   ├── LoginPage.js            # User/Worker login and registration
│   ├── UserDashboard.js        # User dashboard with worker search
│   ├── WorkerDashboard.js      # Worker dashboard with profile management
│   ├── WorkerCard.js           # Worker profile card component
│   ├── BookingModal.js         # Worker booking modal
│   ├── ToolRentalPage.js       # Tool rental marketplace
│   ├── ToolCard.js             # Tool display card
│   ├── ToolRentalModal.js      # Tool rental booking modal
│   ├── WorkerAvailabilityCalendar.js  # Calendar for worker availability
│   └── NotificationSystem.js   # Toast notification system
├── data/
│   └── dummyData.js           # Sample data for workers, tools, bookings
├── App.js                     # Main app component with routing
├── index.js                   # React app entry point
└── index.css                  # Tailwind CSS and custom styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Key Components

### Landing Page
- Hero section with call-to-action buttons
- Service categories showcase
- How it works section
- Professional navigation and footer

### User Dashboard
- Worker search and filtering
- Category-based browsing
- Booking management
- Quick stats and recent bookings sidebar

### Worker Dashboard
- Tabbed interface for different sections
- Profile editing with service details
- Job request management
- Availability calendar
- Tool management
- Earnings tracking

### Tool Rental System
- Tool marketplace with search and filters
- Category-based filtering
- Price range filtering
- Tool rental booking with date selection

### Notification System
- Toast notifications for user actions
- Different notification types (success, error, info, warning)
- Auto-dismiss functionality
- Real-time updates

## Dummy Data

The application includes comprehensive dummy data for:
- 6 sample workers across different categories
- 6 sample tools available for rent
- Sample bookings and notifications
- Realistic profile information with photos from Unsplash

## Responsive Design

The application is fully responsive and includes:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized for tablets and desktops
- Consistent experience across devices

## Future Enhancements

- Backend API integration
- Real-time chat between users and workers
- Payment processing integration
- GPS-based location services
- Push notifications
- Advanced search filters
- Rating and review system
- Admin dashboard
- Multi-language support

## License

This project is licensed under the MIT License.
