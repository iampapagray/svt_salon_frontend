import { generateTimeIntervals } from "@/lib/utils"
import { defineStore } from "pinia"
import axios from "axios"

interface AppointmentState {
    openTime: string
    closeTime: string
    appointments: Appointment[]
    timeOptions: string[]
    isReady: boolean
}

const url = "http://localhost:4005"

export const useAppointmentStore = defineStore({
    id: "appointment",
    state(): AppointmentState {
        return {
            openTime: "8:00",
            closeTime: "19:00",
            appointments: [],
            timeOptions: [],
            isReady: false,
        }
    },
    getters: {},
    actions: {
        initDefaults() {
            // generate time options
            this.timeOptions = generateTimeIntervals(this.openTime, this.closeTime)

            this.getAllBookings()
        },
        getAllBookings() {
            axios
                .get(url)
                .then((response) => {
                    if (typeof response.data != "string") {
                        setTimeout(() => {
                            this.appointments = response.data
                            this.isReady = true
                        }, 1000)
                    }
                })
                .catch((error) => {
                    console.log("ERR ", error)
                    this.isReady = true
                })
        },
        addBookings(booking: Appointment) {
            axios
                .post(url, booking)
                .then((response) => {
                    if (typeof response.data != "string") {
                        setTimeout(() => {
                            this.appointments = response.data
                        }, 500)
                    }
                })
                .catch((error) => {
                    console.log("ERR ", error)
                })
        },
        updateBooking(booking: Appointment) {
            axios
                .put(url, booking)
                .then((response) => {
                    if (typeof response.data != "string") {
                        setTimeout(() => {
                            this.appointments = response.data
                        }, 500)
                    }
                })
                .catch((error) => {
                    console.log("ERR ", error)
                })
        },
        deleteBooking(bookingId: number) {
            axios
                .delete(`${url}?id=${bookingId}`)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log("ERR ", error)
                })
        },
    },
})
