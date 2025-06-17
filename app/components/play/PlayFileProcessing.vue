<script lang="ts" setup>
// No logic needed for static UI
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <div class="w-full max-w-md bg-black/60 rounded-3xl shadow-xl p-8 flex flex-col gap-6">
      <!-- Logo and Title -->
      <div class="flex items-center gap-3">
        <img
          src="/logo_sigma.png"
          alt="Sigma logo"
          class="h-12"
        >
        <span class="text-3xl font-bold text-white tracking-wide">SIGMA</span>
      </div>
      <!-- Subtitle -->
      <div class="text-white text-lg font-semibold">
        Hệ thống Sigma AI Per-title Encoding<br>bắt đầu xử lý ...
      </div>
      <!-- Status List -->
      <div class="flex flex-col gap-3 w-full  mx-auto">
        <div class="flex items-center gap-4">
          <span class="text-green-500 text-xl">✔</span>
          <span class="text-gray-200 text-lg">Tải video thành công</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-yellow-500 text-xl">⏳</span>
          <span class="text-orange-400 text-lg font-semibold">Chờ đến lượt xử lý video</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="w-5" />
          <span class="text-gray-300 text-lg">Đang thực hiện transcode video</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="w-5" />
          <span class="text-gray-300 text-lg">AI đang phân tích video...</span>
        </div>
      </div>
    </div>
  </div>
</template>
