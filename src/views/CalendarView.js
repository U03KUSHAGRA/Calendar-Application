// src/views/CalendarView.js
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

const styles = {
  calendarContainer: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  filterSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  activeFilter: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  inactiveFilter: {
    backgroundColor: '#e9ecef',
    color: '#495057',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    zIndex: 1000,
    maxWidth: '500px',
    width: '90%',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  eventForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  legend: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all');
  const [newEvent, setNewEvent] = useState({
    title: '',
    companyName: '',
    type: '',
    notes: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setEvents(storedEvents);
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      companyName: '',
      type: '',
      notes: '',
      date: arg.dateStr,
      time: '',
    });
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setNewEvent({
      title: clickInfo.event.title,
      companyName: clickInfo.event.extendedProps.companyName,
      type: clickInfo.event.extendedProps.type,
      notes: clickInfo.event.extendedProps.notes,
      date: clickInfo.event.startStr.split('T')[0],
      time: clickInfo.event.startStr.split('T')[1]?.slice(0, 5) || '',
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    const updatedEvents = selectedEvent
      ? events.map(event =>
          event.id === selectedEvent.id
            ? { ...newEvent, id: event.id }
            : event
        )
      : [...events, { ...newEvent, id: Date.now().toString() }];

    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setShowModal(false);
  };

  const getFilteredEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      if (filter === 'past') return eventDate < today;
      if (filter === 'upcoming') return eventDate >= today;
      return true;
    }).map(event => ({
      id: event.id,
      title: `${event.companyName}: ${event.type}`,
      start: event.date + (event.time ? `T${event.time}` : ''),
      extendedProps: {
        companyName: event.companyName,
        type: event.type,
        notes: event.notes,
      },
      backgroundColor: event.type === 'Meeting' ? '#28a745' :
                      event.type === 'Email' ? '#007bff' :
                      event.type === 'Phone Call' ? '#dc3545' : '#ffc107',
    }));
  };

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.header}>
        <h2>Communication Calendar</h2>
        <div style={styles.filterSection}>
          {['all', 'past', 'upcoming'].map(filterType => (
            <button
              key={filterType}
              style={{
                ...styles.filterButton,
                ...(filter === filterType ? styles.activeFilter : styles.inactiveFilter),
              }}
              onClick={() => setFilter(filterType)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, backgroundColor: '#28a745' }}></div>
          <span>Meeting</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, backgroundColor: '#007bff' }}></div>
          <span>Email</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, backgroundColor: '#dc3545' }}></div>
          <span>Phone Call</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, backgroundColor: '#ffc107' }}></div>
          <span>Other</span>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}
        events={getFilteredEvents()}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height="auto"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
      />

      {showModal && (
        <>
          <div style={styles.modalOverlay} onClick={() => setShowModal(false)} />
          <div style={styles.modal}>
            <h3>{selectedEvent ? 'Edit Communication' : 'New Communication'}</h3>
            <div style={styles.eventForm}>
              <input
                style={styles.input}
                type="text"
                placeholder="Company Name"
                value={newEvent.companyName}
                onChange={(e) => setNewEvent({ ...newEvent, companyName: e.target.value })}
              />
              <select
                style={styles.input}
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="Meeting">Meeting</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Other">Other</option>
              </select>
              <input
                style={styles.input}
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <input
                style={styles.input}
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
              <textarea
                style={styles.input}
                placeholder="Notes"
                value={newEvent.notes}
                onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                rows="4"
              />
              <div style={styles.buttonGroup}>
                <button
                  style={{ ...styles.button, ...styles.cancelButton }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button style={styles.button} onClick={handleSubmit}>
                  {selectedEvent ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarView;