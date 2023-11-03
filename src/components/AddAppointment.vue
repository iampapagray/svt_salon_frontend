<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import AppointmentForm  from "@/components/AppointmentForm.vue"
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Add Appointment
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] bg-gray-300">
      <DialogHeader>
        <DialogTitle>Appointment</DialogTitle>
        <DialogDescription>
          Specify appointment details and save changes.
        </DialogDescription>
      </DialogHeader>
      <AppointmentForm />
    </DialogContent>
  </Dialog>
</template>