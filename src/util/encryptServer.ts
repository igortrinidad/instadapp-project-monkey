import { webcrypto } from 'node:crypto'
const algo = { name: 'AES-GCM', length: 256 }

export const unpack = (packed) => {
  let string = ''
  if (typeof window !== 'undefined' && window.atob) {
    // running in the browser
    string = window.atob(packed)
  } else {
    // running in Node.js
    string = Buffer.from(packed, 'base64').toString('binary')
  }
  const buffer = new ArrayBuffer(string.length)
  const bufferView = new Uint8Array(buffer)
  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i)
  }
  return buffer
}

export const pack = (buffer: any) => {
  let packed = ''
  if (typeof window !== 'undefined' && window.btoa) {
    // running in the browser
    packed = window.btoa(
      String.fromCharCode.apply(null, new Uint8Array(buffer))
    )
  } else {
    // running in Node.js
    packed = Buffer.from(
      new Uint8Array(buffer)
    ).toString('base64')
  }
  return packed
}

export const encondeBase64 = (str: string): string => {
  if (typeof window !== 'undefined' && window.btoa) {
    return window.btoa(str)
  } else {
    return Buffer.from(str).toString('base64')
  }
}

export const decodeBase64 = (str: string, enconding: string = 'hex'): string => {
  if (typeof window !== 'undefined' && window.atob) {
    return window.atob(str)
  } else {
    return Buffer.from(str, 'base64').toString(enconding)
  }
}

export const encrypt = async (payload: string, encKey: string): Promise<any> => {
  const data = new TextEncoder().encode(payload)
  const key = await webcrypto.subtle.importKey(
    'raw', 
    new TextEncoder().encode(encKey),
    algo,
    false,
    ['encrypt', 'decrypt']
  )
  const iv = webcrypto.getRandomValues(new Uint8Array(12))
  const r = await webcrypto.subtle.encrypt({ ...algo, iv }, key, data).then((encryptedData) => encryptedData)
  return pack(iv) + pack(r)
}

export const decrypt = async (payload: any, encKey: string): Promise<string> => {

  const ivPacked = payload.slice(0, 16)
  const encryptedPackedData = payload.slice(16)
  const encryptedData = unpack(encryptedPackedData)

  const key = await webcrypto.subtle.importKey(
    'raw', 
    new TextEncoder().encode(encKey), 
    algo, 
    false, 
    ['encrypt', 'decrypt']
  )
  const iv = unpack(ivPacked)
  const r = await webcrypto.subtle.decrypt({ ...algo, iv }, key, encryptedData)
  return new TextDecoder().decode(r)
}
