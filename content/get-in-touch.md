---
title: Home
navigation: false
layout: basic
main:
  fluid: false
---
::container-section{aos="fade-up" padding="{space.12} 0 {space.12}" }
#root
  ::glow
  ---
  height: 100%
  maskGradient:
    light:
      initial: radial-gradient(circle at 51% 44%, rgba(0,0,0, 1) -16%, rgba(0,0,0, 0) 74%)
      lg: radial-gradient(at 35% 65%, red, rgba(255, 0, 0, 0) 85%)
    dark:
      initial: radial-gradient(circle at 51% 44%, rgba(0,0,0, 1) -16%, rgba(0,0,0, 0) 84%)
      lg: radial-gradient(at 35% 65%, rgba(0,0,0, 1), rgba(255, 0, 0, 0) 85%)
  gradient:
    light:
      initial: radial-gradient(circle at 40% 50%, {color.primary.400}, {color.secondary.400} 52%)
      lg: conic-gradient({color.secondary.200} 0%, {color.secondary.200} 12%, {color.secondary.300} 22%, {color.secondary.500} 30%, {color.primary.300} 44%)
    dark:
      initial: radial-gradient(circle at 40% 50%, {color.primary.600}, {color.secondary.700} 52%)
      lg: radial-gradient(circle at 55% 72%, {color.primary.600} 0%, {color.primary.700} 12%, {color.primary.800} 22%, {color.secondary.800} 40%, {color.secondary.900} 64%)
  noise: true
  backgroundImage: linear-gradient(transparent 100%, {docus.body.backgroundColor})
  afterBlendMode:
    light: color
    dark: multiply
  ---
  ::

#default
  ::section-header
  #title
    Lets Share
    ::gradient-text
    #default
      &nbsp;Your Project
    ::
  #description
    Our team would love the opportunity to talk to you about your project and business case.
  ::
  ::ContactForm
  ::
::
