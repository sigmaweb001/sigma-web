<script lang="ts" setup>
useHead({
  title: 'Home',
})

const benefitOne = {
  // title: 'Highlight your benefits',
  // desc: 'You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.',
  image: '/benefit-one.png',
  bullets: [
    {
      title: 'Ingest',
      desc: 'Get your content and data from different streaming sources.',
      icon: 'i-ri:box-2-line',
    },
    {
      title: 'Transcoder',
      desc: 'Converts original audio, video and image signals into suitable, compatible formats to play on different receivers.',
      icon: 'i-ri:barcode-box-line',
    },
    {
      title: 'Packager',
      desc: 'Data encapsulation and encryption enables service providers to secure content through digital rights management.',
      icon: 'i-ri:inbox-unarchive-line',
    },
    {
      title: 'Origin',
      desc: 'Perform transport of manifest and segment files using ABR technologies, such as Apple HLS and MPEG, DASH.',
      icon: 'i-ri:honor-of-kings-line',
    },
  ],
}

const benefitTwo = {
  title: 'Products',
  desc: '',
  image: '/benefit-two.png',
  bullets: [
    {
      title: 'Transcode Live',
      desc: 'Convert the original audio, video and image signals into suitable, compatible formats that can be played on different receivers for live streaming content.',
      icon: 'i-ri:live-line',
    },
    {
      title: 'Interactive',
      desc: 'The audience can interact, participate, or influence the streaming experience in some way that encourage real-time exchanges, creating deeper connections and driving revenue opportunities.',
      icon: 'i-ri:star-smile-line',
    },
    {
      title: 'SSAI',
      desc: 'A combination of manifest manipulation, ad server communication, and ad bitrate and resolution normalization, all of which happens on the server-side before presenting a manifest to clients.',
      icon: 'i-ri:advertisement-line',
    },
    {
      title: 'Livestream',
      desc: 'Allows to receive and broadcast (distribute) multiple streams of live radio and television events.',
      icon: 'i-ri:broadcast-line',
    },
  ],
}
</script>

<template>
  <div>
    <SectionHero />
    <SectionTitle pretitle="Core Components" title="Unleashing the Potential in Sigma Streaming Platform">

    </SectionTitle>
    <SectionBenefits :data="benefitOne" />

    <SectionBenefits img-pos="right" :data="benefitTwo" />

    <SectionTitle pretitle="Highlights Features" title="What's included">
      <!-- This section is to highlight a promo or demo video of your product.
      Analysts say a landing page with video has 3% more conversion rate. So,
      don't forget to add one. Just like this. -->
    </SectionTitle>
    <SectionHighlights />
    <!-- <SectionVideo /> -->

    <SectionTitle pretitle="Testimonials" title="Why customers love us?">
      <!-- Testimonails is a great way to increase the brand trust and awareness.
      Use this section to highlight your popular customers. -->
    </SectionTitle>
    <SectionCustomers />
    <!-- <SectionTestimonials /> -->

    <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
      Answer your customers possible questions here, it will increase the
      conversion rate as well as support or chat requests.
    </SectionTitle>
    <SectionFaq />
    <SectionCta />
  </div>
</template>
