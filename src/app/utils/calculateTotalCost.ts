export const calculateTotalCost = (
    startDateTime: Date,
    startTime: string,
    hourlyRate: number
  ) => {
    // Convert startDateTime to a Date object and replace the time with startTime
    const start: any = new Date(startDateTime);
    const [hours, minutes] = startTime.split(":").map(Number);
    console.log(startTime, hours);
    start.setHours(hours, minutes, 0, 0); // Update the time part of startDate
    console.log(start);
    // Get the current date and time
    const current: any = new Date();
  
    // Check if the current date and time is the same or later than the booking time
    const isBookingTimeReached = current >= start;
  
    if (isBookingTimeReached) {
      // Calculate the difference in time if booking time is reached
      const diffInMs = current - start; // Difference in milliseconds
      const totalHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
      const totalTime = `${Math.floor(totalHours)}:${Math.floor(
        (totalHours - Math.floor(totalHours)) * 60
      )}`;
      // Calculate total cost, rounding up to the nearest hour
      const totalCost = Math.ceil(totalHours) * hourlyRate;
  
      return { totalCost, totalTime };
    } else {
      // If the current time is before the booking time, return zero cost and zero hours
      return { totalCost: 0, totalTime: 0 };
    }
  };
  
  export const calculateDailyCost = (
    startDate: Date,
    startTime: string,
    dailyRate: number,
    hourlyRate: number
  ) => {
    // Convert startDateTime to a Date object and set the start time
    const start: any = new Date(startDate);
    const [hours, minutes] = startTime.split(":").map(Number);
    start.setHours(hours, minutes, 0, 0); // Set the time part of startDate
    
    // Get the current date and time
    const current: any = new Date();
  
    // Check if the current date and time is the same or later than the booking time
    const isBookingTimeReached = current >= start;
  
    if (isBookingTimeReached) {
      // Calculate the difference in time in milliseconds
      const diffInMs = current - start;
  
      // Convert milliseconds to hours
      const totalHours = diffInMs / (1000 * 60 * 60);
  
      // Calculate the number of full days (8 hours per day)
      const fullDays = Math.floor(totalHours / 8);
      const remainingHours = totalHours % 8;
  
      // Calculate the total cost
      let totalCost = fullDays * dailyRate;
  
      // Add cost for remaining hours
      if (remainingHours > 0) {
        if (remainingHours <= 8) {
          // If remaining hours are less than or equal to 8, apply a prorated daily rate
          totalCost += (remainingHours / 8) * dailyRate;
        } else {
          // If remaining hours exceed 8, apply the daily rate for the first 8 hours
          totalCost += dailyRate;
  
          // Apply the hourly rate for additional hours beyond 8
          const extraHours = remainingHours - 8;
          totalCost += extraHours * hourlyRate;
        }
      }
  
      // Calculate the total time in days and hours
      const totalTime = `${Math.floor(totalHours / 24)}:${Math.floor(
        totalHours % 24
      )}`;
  
      return { totalCost, totalTime };
    } else {
      // If the current time is before the booking time, return zero cost and zero hours
      return { totalCost: 0, totalTime: "0:00" };
    }
  };
  