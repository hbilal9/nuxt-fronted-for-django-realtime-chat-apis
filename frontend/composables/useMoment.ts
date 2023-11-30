import moment from "moment";

// last seen 2 hours ago

export function useLastSeen(date: string) {
  return moment(date).fromNow();
}