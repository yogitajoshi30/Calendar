# Dynamic Calendar Application

This dynamic calendar application allows users to manage their schedules effectively. The app is built with React.js and styled using TailwindCSS, leveraging localStorage for data persistence. It includes features for adding, editing, and deleting events and supports smooth navigation between months.

## Features

- **Add Events:** Users can add events with details such as event name, start time, end time, and an optional description.
- **Edit Events:** Modify event details easily through an intuitive modal interface.
- **Delete Events:** Remove events directly from the calendar.
- **Month Navigation:** Navigate seamlessly between months to view and manage events.
- **Local Data Persistence:** Events are saved in localStorage, ensuring they persist even after refreshing or restarting the app.
- **Conflict Prevention:** Prevent overlapping events on the same day.
- **Responsive Design:** The app is styled using TailwindCSS for a responsive and modern UI.

## Running the App Locally

Follow these steps to run the application on your local machine:

### Prerequisites

- Node.js and npm installed. You can download them from [Node.js Official Site](https://nodejs.org/).

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yogitajoshi30/Calendar.git
   cd Calendar
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` to view the app.

### Additional Notes

- Ensure your browser supports modern JavaScript features for the best experience.
- TailwindCSS is used for styling, so the app will look polished out of the box. If you wish to customize styles, modify the Tailwind configuration or CSS files accordingly.
- The app's events data is stored in `localStorage`. To reset the app's data, clear the browser's localStorage for this application.

### Deployment

You can deploy this app on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) for live usage. Ensure you build the app using the command:
```bash
npm run build
```

This will generate a `build/` directory that you can use for deployment.
