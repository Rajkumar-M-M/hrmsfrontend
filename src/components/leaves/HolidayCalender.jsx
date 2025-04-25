
import React, { useState } from 'react';

// Define holidays
const holidays = [
  { date: '2024-01-14', name: 'Pongal' },
  { date: '2024-01-15', name: 'Thai Pongal' },
  { date: '2024-04-14', name: 'Tamil New Year' },
  { date: '2024-08-15', name: 'Independence Day' },
  { date: '2024-10-02', name: 'Gandhi Jayanti' },
  { date: '2024-12-25', name: 'Christmas' },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('year'); // 'year' or 'month'

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleMonthClick = (month) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setView('month');
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const startDay = getStartDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const blankDays = Array.from({ length: startDay }, () => null);

  const isHoliday = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.some(holiday => holiday.date === dateStr);
  };

  const getHolidaysForMonth = (monthIndex) => {
    const monthStr = String(monthIndex + 1).padStart(2, '0');
    return holidays.filter(holiday => holiday.date.startsWith(`${currentDate.getFullYear()}-${monthStr}`));
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // Get the current month (0-11)

  return (
    <div className="flex flex-col h-auto">
      {view === 'year' ? (
        <>
          <div>
            <h2 className="text-lg font-bold text-center p-4 flex justify-between items-center">
              <button onClick={handlePrevYear} className="text-lg font-bold hover:text-blue-300">
                &lt;Prev Year
              </button>
              {currentDate.getFullYear()}
              <button onClick={handleNextYear} className="text-lg font-bold hover:text-blue-300">
                Next Year&gt;
              </button>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4">
            {months.map((month, index) => (
              <div
                key={index}
                onClick={() => handleMonthClick(index)}
                className={`flex flex-col justify-center items-center border border-gray-300 p-4 cursor-pointer ${
                  currentDate.getFullYear() === currentYear && index === currentMonth 
                    ? 'bg-yellow-200' // Highlight current month if it matches the displayed year and month
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <div className="text-lg font-bold">{month}</div>
                {/* Display holidays for the month */}
                <ul className="mt-2 text-xs text-gray-700">
                  {getHolidaysForMonth(index).map(holiday => (
                    <li key={holiday.date}>{holiday.name} ({holiday.date.split('-')[2]})</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center">
              <button onClick={handlePrevMonth} className="text-lg font-bold hover:text-blue-300 mx-2">
                &lt; Month
              </button>
            </div>
            {/* Clicking on the month name returns to the year view */}
            <h2 
              onClick={() => setView('year')}
              className="text-lg font-bold cursor-pointer hover:underline"
            >
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center">
              <button onClick={handleNextMonth} className="text-lg font-bold hover:text-blue-300 mx-2">
                Month &gt;
              </button>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-7 border-t">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold py-4 bg-gray-200 border-b border-gray-300">
                {day}
              </div>
            ))}
            {blankDays.map((_, index) => (
              <div key={index} className="border-b border-gray-300"></div>
            ))}
            {daysArray.map((day) => {
              const isCurrentDate =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              const isHolidayDate = isHoliday(day);
              const holidayName = isHolidayDate 
                ? holidays.find(h => h.date === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`).name
                : null;

              return (
                <div
                  key={day}
                  className={`text-center border-b border-gray-300 py-10 ${
                    isCurrentDate
                      ? 'bg-blue-300 text-white'
                      : isHolidayDate
                      ? 'bg-red-300 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {day}
                  {holidayName && <div className="text-xs text-gray-800">{holidayName}</div>}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;

