<script lang="ts" setup>
import Scheduler from "@/components/Scheduler.vue"
import AddAppointment from "@/components/AddAppointment.vue"
import { useAppointmentStore } from "@/store/appointment"
import { storeToRefs } from "pinia"
import { useToast } from "@/components/ui/toast/use-toast"

const store = useAppointmentStore()
store.initDefaults()

const { appointments, isReady } = storeToRefs(store)
const { toast } = useToast()

const logEventUpdate = (id: number, mode: "create" | "update" | "delete", ev: Appointment) => {
    // Handle the event update here
    switch (mode) {
        case "create":
            store.addBookings(ev).catch((err) => {
                toast({
                    title: "Oops...",
                    description: err,
                })
            })
            break
        case "update":
            store.updateBooking(ev).catch((err) => {
                toast({
                    title: "Oops...",
                    description: err,
                })
            })
            break
        case "delete":
            store.deleteBooking(id).catch((err) => {
                toast({
                    title: "Oops...",
                    description: err,
                })
            })
            break
        default:
            break
    }
}
</script>

<template>
    <div class="mx-auto max-w-7xl md:p-10">
        <div className="mt-8 w-full flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
            <h3 className="mb-3 font-bold text-3xl text-gray-900">Elles-alon</h3>

            <AddAppointment />
        </div>
        <div class="mt-2">
            <Scheduler
                v-if="isReady"
                class="overflow-hidden min-h-screen lg:min-h-[70vh] xl:min-h-[65vh] relative inline-block w-full"
                :events="appointments"
                @event-updated="logEventUpdate"
            ></Scheduler>
        </div>
    </div>
</template>

<style lang="scss"></style>
