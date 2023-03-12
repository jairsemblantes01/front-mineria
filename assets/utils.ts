export function filetob64 (file:any) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result?.toString().replace('data:', '').replace(/^.+,/, ''))
    reader.onerror = error => reject(error)
  })
}
export async function b64toblob (base64Data: string, mime: string) {
  const base64Response = await fetch(`data:${mime};base64,${base64Data}`)
  const blob = await base64Response.blob()
  return blob
}
export async function downloadInB64 (doc: string, name: string, mime: string = 'application/pdf', isBlob: boolean = false) {
  const blob = isBlob ? doc : URL.createObjectURL(await b64toblob(doc, mime))
  const urlEncode = blob
  const linkElement = window.document.createElement('a')
  linkElement.addEventListener('click', () => {
    setTimeout(() => window.URL.revokeObjectURL(urlEncode), 100)
  })
  linkElement.href = urlEncode
  // if (/Firefox/.test(userAgent) && filename.includes('pdf')) {
  //   linkElement.target = '_blank'
  // } else {
  //   linkElement.download = filename
  // }
  linkElement.download = name
  linkElement.click()
}
