import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTimeIntervals(startTime: string, endTime: string): string[] {
  const intervals: string[] = [];

  const start = new Date(`1970-01-01 ${startTime}`);
  const end = new Date(`1970-01-01 ${endTime}`);

  // Loop through time intervals with 30-minute increments
  while (start < end) {
    const timeString = start.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    intervals.push(timeString);
    start.setMinutes(start.getMinutes() + 30);
  }

  return intervals;
}