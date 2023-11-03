import { generateTimeIntervals } from "@/lib/utils"
import { defineStore } from "pinia"
import { cancelAppointment, fetchAppointments, modifyAppointment, storeAppointment } from "@/lib/http"

interface AppointmentState {
    openTime: string
    closeTime: string
    appointments: Appointment[]
    timeOptions: string[]
    isReady: boolean
}

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
            this.timeOptions = generateTimeIntervals(this.openTime, this.closeTime)

            this.getAllBookings()
        },
        async getAllBookings() {
            return new Promise((resolve, reject) => {
                fetchAppointments()
                    .then((data) => {
                        if (typeof data != "string") {
                            setTimeout(() => {
                                this.appointments = data
                                this.isReady = true
                                resolve("ok")
                            }, 1000)
                        } else {
                            this.isReady = true
                            reject(data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        async addBookings(booking: Appointment) {
            return new Promise((resolve, reject) => {
                storeAppointment(booking)
                    .then((data) => {
                        if (typeof data != "string") {
                            setTimeout(() => {
                                this.appointments = data
                                resolve("ok")
                            }, 1000)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        async updateBooking(booking: Appointment) {
            return new Promise((resolve, reject) => {
                modifyAppointment(booking)
                    .then((data) => {
                        if (typeof data != "string") {
                            setTimeout(() => {
                                this.appointments = data
                                resolve("ok")
                            }, 1000)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        async deleteBooking(bookingId: number) {
            return new Promise((resolve, reject) => {
                cancelAppointment(bookingId)
                    .then((data) => {
                        if (typeof data != "string") {
                            setTimeout(() => {
                                this.appointments = data
                                resolve("ok")
                            }, 1000)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    },
})
