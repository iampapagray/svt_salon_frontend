<script lang="ts" setup>
import { ref } from "vue";
import Scheduler from "@/components/Scheduler.vue";
import AddAppointment from "@/components/AddAppointment.vue";
import { useAppointmentStore } from "@/store/appointment";

const store = useAppointmentStore();
store.initDefaults()

type Event = {
  id: number;
  start_date: string;
  end_date: string;
  text: string;
};

const events = ref<Event[]>([
  {
    id: 1,
    start_date: "2023-11-02 15:00",
    end_date: "2023-11-02 16:00",
    text: "Event 1",
  },
  {
    id: 2,
    start_date: "2023-11-05 8:00",
    end_date: "2023-11-05 10:00",
    text: "Event 2",
  },
]);

const logEventUpdate = (
  id: number,
  mode: "create" | "update" | "delete",
  ev: Event
) => {
  // Handle the event update here
  console.log("Event ID:", id);
  console.log("Event MODE:", mode);
  console.log("Event Event:", ev);
};
</script>

<template>
  <div class="mx-auto max-w-7xl md:p-10">
    <div
      className="mt-8 w-full flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0"
    >
      <h3 className="mb-3 font-bold text-3xl text-gray-900">Elles-alon</h3>

      <AddAppointment />
    </div>
    <div class="mt-2">
      <Scheduler
        class="overflow-hidden min-h-screen lg:min-h-[70vh] xl:min-h-[65vh] relative inline-block w-full"
        :events="events"
        @event-updated="logEventUpdate"
      ></Scheduler>
    </div>
  </div>
</template>

<style lang="scss"></style>
