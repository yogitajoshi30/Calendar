import React, { useState, useEffect } from 'react';

const Calendar = () => {
    // State to manage the current month and year
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false); // For modal visibility
    const [selectedDay, setSelectedDay] = useState(null); // To store selected day
    const [eventToEdit, setEventToEdit] = useState(null); // To store event for editing

    // Load events from localStorage on initial load
    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('events'));
        if (savedEvents) {
            // Convert string back to Date object for the 'date' field
            const eventsWithDates = savedEvents.map(event => ({
                ...event,
                date: new Date(event.date), // Convert string back to Date object
            }));
            setEvents(eventsWithDates);
        }
    }, []);

    // Save events to localStorage whenever events change
    useEffect(() => {
        if (events.length > 0) {
            // Convert Date object to ISO string before saving to localStorage
            const eventsToSave = events.map(event => ({
                ...event,
                date: event.date.toISOString(), // Convert Date to string
            }));
            localStorage.setItem('events', JSON.stringify(eventsToSave));
        }
    }, [events]);

    // Function to change the month
    const changeMonth = (increment) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentDate(newDate);
    };

    // Function to generate the days of the month
    const getDaysInMonth = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const days = [];

        // Fill the days array with each day of the month
        for (let i = 1; i <= endOfMonth.getDate(); i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            days.push(date);
        }
        return days;
    };

    // Event handler for adding an event
    const addEvent = (day) => {
        setSelectedDay(day);
        setShowModal(true);
    };

    // Event handler for saving a new event
    const saveEvent = (eventName, startTime, endTime, description) => {
        if (eventName) {
            const newEvent = {
                id: Date.now(), // Unique ID for each event
                name: eventName,
                date: selectedDay,
                startTime,
                endTime,
                description,
            };
            const updatedEvents = [...events, newEvent];
            setEvents(updatedEvents);
            setShowModal(false);
        }
    };

    // Event handler for editing an event
    const editEvent = (event) => {
        setEventToEdit(event);
        setSelectedDay(event.date);
        setShowModal(true);
    };

    // Event handler for saving the edited event
    const updateEvent = (id, eventName, startTime, endTime, description) => {
        const updatedEvents = events.map((event) =>
            event.id === id
                ? { ...event, name: eventName, startTime, endTime, description }
                : event
        );
        setEvents(updatedEvents);
        setShowModal(false);
        setEventToEdit(null);
    };

    // Event handler for deleting an event
    const deleteEvent = (id) => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
    };

    // Function to check if there's an event for a given day
    const getEventsForDay = (day) => {
        return events.filter(event => event.date.toDateString() === day.toDateString());
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg w-96 flex flex-col items-center">
            <div className="flex justify-between w-full p-4 items-center">
                <button onClick={() => changeMonth(-1)} className="text-white p-2 bg-gray-500 hover:text-gray-900 rounded">Previous</button>
                <h1 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
                <button onClick={() => changeMonth(1)} className="text-white p-2 bg-gray-500 hover:text-gray-900 rounded">Next</button>
            </div>
            <div className="flex font-bold m-2 w-auto">
                <div className="w-12 text-center">Sun</div>
                <div className="w-12 text-center">Mon</div>
                <div className="w-12 text-center">Tue</div>
                <div className="w-12 text-center">Wed</div>
                <div className="w-12 text-center">Thu</div>
                <div className="w-12 text-center">Fri</div>
                <div className="w-12 text-center">Sat</div>
            </div>
            <div className="grid grid-cols-7">
                {getDaysInMonth().map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => addEvent(day)}
                    >
                        <div className={`w-8 h-8 rounded-full p-1 ${day.toDateString() === new Date().toDateString() ? 'bg-yellow-500' : 'bg-white'}`}>
                            {day.getDate()}
                        </div>
                        {getEventsForDay(day).length > 0 && (
                            <div className="text-xs w-12 text-pink-500">
                                {getEventsForDay(day).map((event, idx) => (
                                    <div key={idx} className="truncate" onClick={() => editEvent(event)}>
                                        {event.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Modal for Adding/Editing Event */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-xl w-96">
                        <h2 className="text-xl font-semibold">{eventToEdit ? 'Edit Event' : 'Add Event'}</h2>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Event Name"
                                className="border p-2 w-full mb-2"
                                defaultValue={eventToEdit ? eventToEdit.name : ''}
                                id="event-name"
                            />
                            <input
                                type="text"
                                placeholder="Start Time"
                                className="border p-2 w-full mb-2"
                                defaultValue={eventToEdit ? eventToEdit.startTime : ''}
                                id="start-time"
                            />
                            <input
                                type="text"
                                placeholder="End Time"
                                className="border p-2 w-full mb-2"
                                defaultValue={eventToEdit ? eventToEdit.endTime : ''}
                                id="end-time"
                            />
                            <textarea
                                placeholder="Description (optional)"
                                className="border p-2 w-full mb-4"
                                defaultValue={eventToEdit ? eventToEdit.description : ''}
                                id="description"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => {
                                        const eventName = document.getElementById("event-name").value;
                                        const startTime = document.getElementById("start-time").value;
                                        const endTime = document.getElementById("end-time").value;
                                        const description = document.getElementById("description").value;
                                        if (eventToEdit) {
                                            updateEvent(eventToEdit.id, eventName, startTime, endTime, description);
                                        } else {
                                            saveEvent(eventName, startTime, endTime, description);
                                        }
                                    }}
                                    className="bg-green-500 text-white p-2 rounded"
                                >
                                    {eventToEdit ? 'Update Event' : 'Save Event'}
                                </button>
                                {eventToEdit && (
                                    <button
                                        onClick={() => deleteEvent(eventToEdit.id)}
                                        className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Delete Event
                                    </button>
                                )}
                            </div>
                        </div>
                        <button
                            className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Calendar;
