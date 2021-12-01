import listAllEndpoints from 'express-list-endpoints'
import type { Express } from 'express'

export const getEndpointInfoHTML = (app: Express): string => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: sans-serif">
    <h1 style="font-size: 20px">Available endpoints</h1>
    <ul>
      ${listAllEndpoints(app).reduce((acc, { path, methods }) => {
        return acc + `<li><pre>path: ${path}</pre><pre>methods: ${methods}</pre></li>`
      }, '')}
    </ul>
  </body>
  </html>`
}
