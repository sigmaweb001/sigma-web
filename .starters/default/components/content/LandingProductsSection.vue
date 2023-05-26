<script setup lang="ts">
import LandingModule from "./LandingModule.vue";
</script>

<template>
  <div class="grid xl:grid-cols-4 gap-10 mt-20">
    <LandingModule name="Transcode Live" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/ingest"
      description="Convert the original audio, video and image signals into suitable, compatible formats that can be played on different receivers for live streaming content." />
    <LandingModule name="Interactive" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/nuxt-parse"
      description="The audience can interact, participate, or influence the streaming experience in some way that encourage real-time exchanges, creating deeper connections and driving revenue opportunities." />
    <LandingModule name="SSAI" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/nuxt-parse"
      description="A combination of manifest manipulation, ad server communication, and ad bitrate and resolution normalization, all of which happens on the server-side before presenting a manifest to clients." />
    <LandingModule name="Livestream" icon="carbon:ibm-cloud-pak-manta-automated-data-lineage" link="/nuxt-session"
      description="Allows to receive and broadcast (distribute) multiple streams of live radio and television events." />
  </div>
</template>
