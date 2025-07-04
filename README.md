# Personal Task Management Application

A modern, feature-rich task management application built with React.js. This application provides a clean and intuitive interface for managing your daily tasks with advanced features like priority levels, search functionality, and dark mode support.

## Features

### Core Functionality
- ✅ **Simple Login** - Username-based authentication stored in localStorage
- ✅ **Task Management** - Add, edit, delete, and toggle task completion
- ✅ **Task Display** - Clean, organized task list with priority indicators
- ✅ **Task Filtering** - Filter by all, active, or completed tasks
- ✅ **Data Persistence** - All data saved to localStorage

### Advanced Features
- 🔍 **Search Functionality** - Search tasks by title and description
- 🌙 **Dark Mode Toggle** - Switch between light and dark themes
- 🎯 **Task Priority Levels** - High, medium, and low priority with visual indicators
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ♿ **Accessibility** - Full keyboard navigation and screen reader support

### User Experience
- 📊 **Task Statistics** - View total, active, and completed task counts
- 🎨 **Modern UI** - Beautiful, clean interface with smooth animations
- ⚡ **Fast Performance** - Optimized React functional components with hooks
- 💾 **Auto-save** - Changes are automatically saved to localStorage

## Technology Stack

- **Frontend**: React.js 18.2.0
- **Styling**: CSS3 with CSS Variables for theming
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: localStorage API
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project files, navigate to the project directory
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically reload when you make changes

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Usage Guide

### Getting Started
1. **Login**: Enter a username (minimum 2 characters) to access the application
2. **Add Tasks**: Use the form to create new tasks with title, description, and priority
3. **Manage Tasks**: Click checkboxes to mark complete, edit button to modify, or delete button to remove
4. **Filter Tasks**: Use the filter buttons to view all, active, or completed tasks
5. **Search**: Use the search bar to find specific tasks
6. **Dark Mode**: Toggle the theme using the moon/sun icon in the header

### Task Management
- **Adding Tasks**: Fill out the task form with a title (required), optional description, and priority level
- **Editing Tasks**: Click the edit (✏️) button on any active task to modify it
- **Completing Tasks**: Click the checkbox to mark tasks as complete/incomplete
- **Deleting Tasks**: Click the delete (🗑️) button twice to confirm deletion
- **Priority Levels**: 
  - 🔴 High Priority (red indicator)
  - 🟡 Medium Priority (yellow indicator)
  - 🟢 Low Priority (green indicator)

### Filtering and Search
- **All Tasks**: View all tasks regardless of status
- **Active**: View only incomplete tasks
- **Completed**: View only completed tasks
- **Search**: Type in the search box to filter tasks by title or description
- **Clear Completed**: Remove all completed tasks at once

## Project Structure

```
src/
├── components/
│   ├── Login.js              # Login component
│   ├── Login.css             # Login styles
│   ├── TaskManager.js        # Main task management component
│   ├── TaskManager.css       # Task manager styles
│   ├── TaskForm.js           # Task creation/editing form
│   ├── TaskForm.css          # Task form styles
│   ├── TaskList.js           # Task list container
│   ├── TaskList.css          # Task list styles
│   ├── TaskItem.js           # Individual task component
│   ├── TaskItem.css          # Task item styles
│   ├── TaskFilters.js        # Filtering and search component
│   └── TaskFilters.css       # Filter styles
├── App.js                    # Main application component
├── App.css                   # Global application styles
├── index.js                  # Application entry point
└── index.css                 # Global CSS reset and base styles
```

## Features in Detail

### Data Persistence
- All tasks are automatically saved to localStorage
- User preferences (username, dark mode) are persisted
- Data is user-specific (multiple users can use the same browser)

### Responsive Design
- Mobile-first approach with breakpoints at 768px and 480px
- Touch-friendly interface on mobile devices
- Optimized layouts for different screen sizes

### Accessibility
- Full keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus indicators for all interactive elements
- Semantic HTML structure

### Performance
- Functional components with React Hooks
- Efficient re-rendering with proper dependency arrays
- Optimized CSS with CSS variables for theming
- Minimal bundle size with no external dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

This project is open source and available under the MIT License.

## Future Enhancements

Potential features for future versions:
- Task categories/tags
- Due dates and reminders
- Task sharing and collaboration
- Export/import functionality
- Drag and drop reordering
- Task templates
- Advanced filtering options
- Task analytics and insights