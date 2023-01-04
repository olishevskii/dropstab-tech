export class DateUtil {
  public static isSimilarDay(date1: Date, date2: Date): boolean {
    const preparedDay1 = new Date(date1);
    preparedDay1.setHours(0, 0, 0, 0);

    const prepareDay2 = new Date(date2);
    prepareDay2.setHours(0, 0, 0, 0);

    return preparedDay1.getTime() === prepareDay2.getTime();
  }
}