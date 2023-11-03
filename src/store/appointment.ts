import { generateTimeIntervals } from "@/lib/utils";
import { defineStore } from "pinia";
import axios from "axios";

interface AppointmentState {
    openTime: string
    closeTime: string
    appointments: Appointment[]
    timeOptions: string[]
}

const url = "http://localhost:4005"

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
        },
        getAllBookings() {
            axios.get(url)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log("ERR ",error)
            })
        },
        addBookings() {
            axios.post(url, {})
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log("ERR ",error)
            })
        },
        updateBooking() {
            axios.put(url, {})
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log("ERR ",error)
            })
        },
        deleteBooking() {
            axios.delete(url, {})
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log("ERR ",error)
            })
        },

    }
})