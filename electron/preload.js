// A Bridge between your svelte app and electron window.

const { ipcRenderer, contextBridge } = require("electron")

const WINDOW_API = {
    getVersion: () => ipcRenderer.invoke("get/version")
}

/*
    This will expose our WINDOW_API as "api" to our Svelte Files,
    using which we can call getVersion function defined here.
*/
contextBridge.exposeInMainWorld("api", WINDOW_API)