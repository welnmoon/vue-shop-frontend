<template>
  <div class="h-full flex flex-col gap-2 bg-white shadow rounded-md p-4 border border-zinc-300">
    <header>
      <slot name="header" />
    </header>

    <div class="flex flex-col gap-2 flex-1">
      <slot />
    </div>

    <footer class="mt-auto">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts"></script>
