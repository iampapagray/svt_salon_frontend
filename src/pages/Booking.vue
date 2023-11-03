<script lang="ts" setup>
// import { ref } from "vue";
import Scheduler from "@/components/Scheduler.vue";
import AddAppointment from "@/components/AddAppointment.vue";
import { useAppointmentStore } from "@/store/appointment";
import { storeToRefs } from 'pinia'

const store = useAppointmentStore();
store.initDefaults()

const { appointments, isReady } = storeToRefs(store)

const logEventUpdate = (
  id: number,
  mode: "create" | "update" | "delete",
  ev: Appointment
) => {
  // Handle the event update here
  console.log("Event ID:", id);
  console.log("Event MODE:", mode);
  console.log("Event Event:", ev);
};
</script>

<template>
  <div class="mx-auto max-w-7xl md:p-10">
    {{ appointments }}
    <div
      className="mt-8 w-full flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0"
    >
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
