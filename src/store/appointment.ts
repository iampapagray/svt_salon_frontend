import { generateTimeIntervals } from "@/lib/utils";
import { defineStore } from "pinia";


interface Appointment {}

interface AppointmentState {
    openTime: string
    closeTime: string
    appointments: Appointment[]
    timeOptions: string[]
}

export const useAppointmentStore = defineStore({
    id: "appointment",
    state(): AppointmentState {
        return {
            openTime: "8:00",
            closeTime: "19:00",
            appointments: [],
            timeOptions: []
        }
    },
    getters: {

    },
    actions: {
        initDefaults() {
            // generate time options
            this.timeOptions = generateTimeIntervals(this.openTime, this.closeTime)
        }
    }
})