const algo = { name: "AES-GCM", length: 256 }

const unpack = (packed: any) => {
  let string = '';
  if (typeof window !== 'undefined' && window.atob) {
    // running in the browser
    string = window.atob(packed);
  } else {
    // running in Node.js
    string = Buffer.from(packed, 'base64').toString('binary');
  }
  const buffer = new ArrayBuffer(string.length);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i);
  }
  return buffer;
};

const pack = (buffer: any) => {
  let packed = '';
  if (typeof window !== 'undefined' && window.btoa) {
    // running in the browser
    packed = window.btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer)))
    )
  } else {
    // running in Node.js
    packed = Buffer.from(
      new Uint8Array(buffer)
    ).toString('base64');
  }
  return packed;
}

export const encrypt = async (payload: string, encKey: string): Promise<any> => {
  if(!payload) throw new Error('Payload is required')
  if(!encKey) throw new Error('Encryption key is required')
  const data = new TextEncoder().encode(payload)
  const key = await window.crypto.subtle.importKey("raw", new TextEncoder().encode(encKey), algo, false, ['encrypt', 'decrypt'])
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const r = await window.crypto.subtle.encrypt({ ...algo, iv }, key, data).then((encryptedData) => encryptedData)
  return pack(iv) + pack(r)
}

export const decrypt = async (payload: any, encKey: string): Promise<string> => {
  if(!payload) throw new Error('Payload is required')
  if(!encKey) throw new Error('Encryption key is required')
  const ivPacked = payload.slice(0, 16)
  const encryptedPackedData = payload.slice(16)
  const encryptedData = unpack(encryptedPackedData)
  const key = await window.crypto.subtle.importKey("raw", new TextEncoder().encode(encKey), algo, false, ['encrypt', 'decrypt'])
  const iv = unpack(ivPacked)
  const r = await window.crypto.subtle.decrypt({ ...algo, iv }, key, encryptedData)
  return new TextDecoder().decode(r)

}