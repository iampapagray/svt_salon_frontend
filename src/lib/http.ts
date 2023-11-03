import axios from "axios"

const url = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:4005"

export const fetchAppointments = async (): Promise<Appointment[] | string> => {
    return axios
        .get(url)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}

export const storeAppointment = async (appointment: Appointment): Promise<Appointment[] | string> => {
    return axios
        .post(url, appointment)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}

export const modifyAppointment = async (appointment: Appointment): Promise<Appointment[] | string> => {
    return axios
        .put(url, appointment)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}

export const cancelAppointment = async (appointmentId: number): Promise<Appointment[] | string> => {
    return axios
        .post(`${url}?id=${appointmentId}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error
        })
}
