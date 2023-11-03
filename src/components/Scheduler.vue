<template>
  <div ref="scheduler"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'dhtmlx-scheduler'
import { SchedulerStatic } from 'dhtmlx-scheduler'

const scheduler: SchedulerStatic = (window as any).scheduler // eslint-disable-line

export default defineComponent({
name: "scheduler",
props: {
  events: {
    type: Array<Appointment>,
    default() {
      return []
    },
  },
},

methods: {
  $_initDataProcessor: function() {
      if (!scheduler.$_dataProcessorInitialized) {
        scheduler.createDataProcessor((entity: any, action: any, data: any, id: any) => { 
          this.$emit(`${entity}-updated`, id, action, data);
        });
        scheduler.$_dataProcessorInitialized = true;
      }
    },
},
mounted: function () {
  // const scheduler: SchedulerStatic = (window as any).scheduler // eslint-disable-line
  scheduler.skin = "material";
  scheduler.config.header = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next",
  ];  
  scheduler.config.first_hour = 8
  scheduler.config.last_hour = 19

  this.$_initDataProcessor();
  scheduler.init(
    this.$refs.scheduler as HTMLElement,
    new Date(),
    "week"
  );

  scheduler.attachEvent("onClick", function (id:number, e: any,){
       //any custom logic here
       console.log("ID", id)
       console.log("Ev", e)

      //  scheduler.addEvent({
      //     start_date: "02-10-2023 19:00",
      //     end_date:   "02-10-2023 19:30",
      //     text:   "Meeting",
      //     author: "John",
      // });
       return true;
  });
  scheduler.parse(this.$props.events);

},
});
</script>

<style>
@import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>