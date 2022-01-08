/// <reference types="vite/client" />

// Using `import donutGlb from '/src/donut.glb'` will yeild the string for the url of the donut.glb file.
declare module '*.glb' {
  const value: string
  export default value
}
