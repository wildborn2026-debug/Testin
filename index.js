export default async function handler(req, res) {
  const xf = req.headers["x-forwarded-for"]
  const ip = xf ? xf.split(",")[0].trim() : null     // ← HERE

  // read raw body
  let raw = ""
  req.on("data", chunk => raw += chunk)
  await new Promise(r => req.on("end", r))

  let body = null
  try { body = JSON.parse(raw) } catch { body = raw || null }

  console.log({
    ip,                        // ← include in log object
    url: req.url,
    method: req.method,
    body
  })

  res.status(200).json({ ok: true })
}
