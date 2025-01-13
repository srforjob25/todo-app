export const formatToJapaneseDate = (targetDate: Date) => {
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const day = String(targetDate.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
};

export const getDateDifferenceInDays = (targetDate: Date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - currentDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
