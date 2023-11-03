<script lang="ts" setup>
import { ArrowRight } from 'lucide-vue-next';
import {Button} from '@/components/ui/button'

</script>

<template>
    <div class="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            Elles-alon is now public!
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Your one-stop shop for all <span className="text-primary">hair needs.</span>
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Elles-alon gives you an easy way to book your appointments. Simply
          choose an available date and time to reserve your appointment.
        </p>

        <router-link to="/bookings" class="mt-4">
            
            <Button variant="default" class="rounded-full">
              Book now <ArrowRight className="ml-4 h-4 w-4" />
            </Button>
        </router-link>
    </div>
</template>

<style lang="scss"></style>