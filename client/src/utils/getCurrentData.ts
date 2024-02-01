export function getCurrnetData(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}
export function getCurrentData2(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
}
export function getCurrentData3(date: Date): string {
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour}시 ${minute}분`;
}
