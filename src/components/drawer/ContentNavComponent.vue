<script setup lang="ts">
import {ref} from "vue";

const link = ref('inbox')

const menuMain = [
  { label: 'Dashboard', icon: 'inbox', route: '/' },
  { label: 'Agendar Transferência', icon: 'send', route: '/scheduler' },
  { label: 'Extrato', icon: 'delete', route: '/statement' }
]

const menuConfig = [
  { label: 'Configurações', icon: 'settings', route: '/settings' },
  { label: 'Ajuda & Feedback', icon: 'help', route: '/help' }
]
</script>

<template>
  <q-list bordered padding class="rounded-borders text-primary">
    <q-item
      v-for="item in menuMain"
      :key="item.route"
      :to="item.route"
      clickable
      v-ripple
      :active="link === item.icon"
      @click="link = item.icon"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item
      v-for="item in menuConfig"
      :key="item.route"
      :to="item.route"
      clickable
      v-ripple
      :active="link === item.icon"
      @click="link = item.icon"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<style lang="sass">
.my-menu-link
  color: white
  background: $secondary
</style>
