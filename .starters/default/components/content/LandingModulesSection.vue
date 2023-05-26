<script setup lang="ts">
import LandingModule from "./LandingModule.vue";
</script>

<template>
  <div class="grid xl:grid-cols-4 gap-10 mt-20">
    <LandingModule name="Ingest" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/ingest"
      description="Get your content and data from different streaming sources." />
    <LandingModule name="Transcoder" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/nuxt-parse"
      description="Converts original audio, video and image signals into suitable, compatible formats to play on different receivers." />
    <LandingModule name="Packager" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/nuxt-parse"
      description="Data encapsulation and encryption enables service providers to secure content through digital rights management." />
    <LandingModule name="Origin" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/nuxt-session"
      description="Perform transport of manifest and segment files using ABR technologies, such as Apple HLS and MPEG
      DASH" />
  </div>
</template>
