export const LEVEL = {
  'INFO': 'INFO',
  'WARNING': 'WARNING',
  'ERROR': 'ERROR',
  'SEVERE': 'SEVERE',
  'CRITICAL': 'CRITICAL'
}

// console.tron.display({
//   name: '🔥 IGNITE 🔥',
//   preview: 'You should totally expand this',
//   value: {
//     '💃': 'Welcome to the future!',
//     subObject,
//     someInlineFunction: () => true,
//     someGeneratorFunction: startup,
//     someNormalFunction: selectAvatar
//   }
// })
//
//

export function log (level, message, args) {
  if (console.tron) {
    console.tron.display({
      name: level,
      preview: message,
      value: args || null
    })
  } else {
    console.log(level, message)
  }
}
