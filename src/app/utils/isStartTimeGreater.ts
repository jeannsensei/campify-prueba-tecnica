export const isStartTimeGreaterThanEndTime = (
  startTime: string,
  endTime: string
): boolean => {
  const startTimeDate = new Date(`1/1/1999 ${startTime}`);
  const endTimeDate = new Date(`1/1/1999 ${endTime}`);
  const isStartTimeGreater = startTimeDate > endTimeDate;

  return isStartTimeGreater;
};
