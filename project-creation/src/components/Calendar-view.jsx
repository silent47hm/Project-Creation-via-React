// components/CalendarView.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CalendarView({ projects }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get all projects due on the selected date
  const projectsDueToday = projects.filter((project) => {
    return new Date(project.dueDate).toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Project Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">
          Projects Due on {selectedDate.toDateString()}:
        </h3>
        {projectsDueToday.length > 0 ? (
          <ul className="space-y-2">
            {projectsDueToday.map((project) => (
              <li key={project.id} className="bg-gray-100 p-3 rounded">
                <p className="font-bold">{project.name}</p>
                <p className="text-sm">{project.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No projects due on this day.</p>
        )}
      </div>
    </div>
  );
}

export default CalendarView;
