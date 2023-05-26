import { defineTheme } from 'pinceau'

export default defineTheme({
  docus: {
    landing: {
      sectionHeader: {
        alignItems: 'center',
        subtitle:  {
          fontWeight: 700,
          fontSize: '{fontSize.2xl}',
        },
        title: {
        }
      },
      hero: {
        content: {
          title: {
            gradientText: {
              initial: 'linear-gradient(114deg, {color.gray.100} 10%, {color.gray.300} 54%, {color.gray.600})',
              dark: 'linear-gradient(114deg, {color.gray.200} 10%, {color.gray.400} 54%, {color.gray.700})'
            },
            mixBlendMode: 'exclusion'
          }
        }
      },
      card: {
        wrapper: {
          backgroundImage: {
            initial: 'linear-gradient(180deg, rgba({temp.color.gray.100}, 0.3), rgba({temp.color.gray.100}, 0.6))',
            dark: 'linear-gradient(180deg, rgba({temp.color.gray.800}, 0.3), rgba({temp.color.gray.900}, 0.6))',
          }
        }
      }
    }
  },
  color: {
    primary: {
      50: '#FFE8D5',
      100: '#FEDDC1',
      200: '#FEC798',
      300: '#FEB070',
      400: '#FD9A47',
      500: '#FD841F',
      600: '#E26802',
      700: '#AA4E02',
      800: '#733501',
      900: '#3B1B01',
    },
  }
})
