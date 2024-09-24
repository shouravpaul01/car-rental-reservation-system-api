export const calculateTotalCost = (
  startDate: Date,
  startTime: string,
  hourlyRate: number
) => {
  // Create the full date-time string in UTC
  const datePart = startDate.toISOString().split("T")[0]; // Get the date part (YYYY-MM-DD)
  const combinedDateTimeString = `${datePart}T${startTime}:00.000Z`;

  // Create the booking date from the combined string (assumes UTC initially)
  let bookingDate: any = new Date(combinedDateTimeString);

  bookingDate.setHours(bookingDate.getHours());

  // Get the current date and time in the specified timezone
  const currentDate: any = new Date();

  // Adjust for the desired timezone by adding the offset (Bangladesh = GMT+6)
  currentDate.setHours(currentDate.getHours() + 6);

  // Check if the current date and time is the same or later than the booking time
  const isBookingTimeReached = currentDate >= bookingDate;

  if (isBookingTimeReached) {
    // Calculate the difference in time if booking time is reached
    const diffInMs = currentDate - bookingDate; // Difference in milliseconds
    const totalHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
    
    // Calculate total cost, rounding up to the nearest hour
    const totalCost = Math.ceil(totalHours) * hourlyRate;

    return { totalCost };
  } else {
    // If the current time is before the booking time, return zero cost and zero hours
    return { totalCost: 0};
  }
};

export const calculateDailyCost = (
  startDate: Date,
  startTime: string,
  dailyRate: number,
  hourlyRate: number
) => {
  // Create the full date-time string in UTC
  const datePart = startDate.toISOString().split("T")[0]; // Get the date part (YYYY-MM-DD)
  const combinedDateTimeString = `${datePart}T${startTime}:00.000Z`;

  // Create the booking date from the combined string (assumes UTC initially)
  let bookingDate: any = new Date(combinedDateTimeString);

  bookingDate.setHours(bookingDate.getHours());

  // Get the current date and time in the specified timezone
  const currentDate: any = new Date();

  // Adjust for the desired timezone by adding the offset (Bangladesh = GMT+6)
  currentDate.setHours(currentDate.getHours() + 6);

  // Check if the current date and time is the same or later than the booking time
  const isBookingTimeReached = currentDate >= bookingDate;

  if (isBookingTimeReached) {
    // Calculate the difference in time in milliseconds
    const diffInMs = currentDate - bookingDate;

    // Convert milliseconds to hours
    const totalHours = diffInMs / (1000 * 60 * 60);

    // Calculate the number of full days (8 hours per day)
    const fullDays = Math.floor(totalHours / 8);
    const remainingHours = totalHours % 8;

    // Calculate the total cost
    let totalCost = fullDays * dailyRate;
    // Add cost for remaining hours
    if (remainingHours > 0) {
      // Apply the hourly rate for additional hours beyond 8
      totalCost = totalCost + remainingHours * hourlyRate;
    }

    return { totalCost };
  } else {
    // If the current time is before the booking time, return zero cost and zero hours
    return { totalCost: 0 };
  }
};
