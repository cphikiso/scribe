type Timestamp = {
  _nanoseconds: number;
  _seconds: number;
  seconds: number;
};

export default function formatTimestamp(timestamp: Timestamp): string {
  const seconds = timestamp._seconds || timestamp.seconds;
  const date = new Date(seconds * 1000);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}hr`;
  } else if (diffInSeconds < 518400) {
    return `${Math.floor(diffInSeconds / 86400)}d`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

const timestamp: Timestamp = { _nanoseconds: 496000000, _seconds: 1682890857 };
console.log(formatTimestamp(timestamp));
