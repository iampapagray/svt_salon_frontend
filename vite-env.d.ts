/// <reference types="vite/client" />
declare var __dirname: string;

interface Appointment {
    id: number;
  start_date: string;
  end_date: string;
  text: string;
  author: string;
}