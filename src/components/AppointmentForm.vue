<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppointmentStore } from "@/store/appointment";
import 'dhtmlx-scheduler'
import { SchedulerStatic } from 'dhtmlx-scheduler'

const store = useAppointmentStore();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    appointmentDate: z.date(),
    fromTime: z.string(),
    toTime: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  // console.log("Form submitted!", values);

  const scheduler: SchedulerStatic = (window as any).scheduler
  const st = `${format(values.appointmentDate, 'yyyy-MM-dd')} ${values.fromTime}`
  const en = `${format(values.appointmentDate, 'yyyy-MM-dd')} ${values.toTime}`
  scheduler.addEvent({
    start_date: st,
    end_date: en,
    text:   values.description,
    author: values.name,
  });

  form.resetForm()
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Joan Doe" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Desc -->
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Describe the service you require"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Date -->
    <FormField v-slot="{ componentField, value, handleInput }" name="appointmentDate">
      <FormItem class="flex flex-col">
        <FormLabel>Appointment Date</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[240px] ps-3 text-start font-normal',
                    !value && 'text-muted-foreground'
                  )
                "
              >
                <span>{{ value ? format(value, "PPP") : "Pick a date" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="flex w-auto flex-col space-y-2 p-2 ">
            <Select
              @update:model-value="
                (val) => handleInput(addDays(new Date(), parseInt(val)))
              "
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preset date" />
              </SelectTrigger>
              <SelectContent position="item-aligned" class="bg-gray-300">
                <SelectItem value="0"> Today </SelectItem>
                <SelectItem value="1"> Tomorrow </SelectItem>
                <SelectItem value="3"> In 3 days </SelectItem>
                <SelectItem value="7"> In a week </SelectItem>
              </SelectContent>
            </Select>

            <Calendar v-bind="componentField" />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Times -->
    <div class="flex gap-4">
      <!-- From Time -->
      <FormField v-slot="{ componentField }" name="fromTime">
        <FormItem>
          <FormLabel>Start Time</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
            </FormControl>
            <SelectContent class="bg-gray-300">
              <SelectGroup>
                  <SelectItem 
                      v-for="(option, index) in store.timeOptions" 
                      :key="index" 
                      :value="option"
                  >
                    {{ option }}
                  </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- To Time -->
      <FormField v-slot="{ componentField }" name="toTime">
        <FormItem>
          <FormLabel>End Time</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
            </FormControl>
            <SelectContent class="bg-gray-300">
              <SelectGroup>
                  <SelectItem 
                      v-for="(option, index) in store.timeOptions" 
                      :key="index" 
                      :value="option"
                  >
                    {{ option }}
                  </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Submit -->
    <div class="mt-4 flex justify-end">
      <Button type="submit"> Submit </Button>
    </div>
  </form>
</template>
