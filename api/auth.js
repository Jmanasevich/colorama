export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { usuario, clave } = req.body;
  
  // Usuarios definidos en variable de entorno como JSON
  // Formato: [{"usuario":"juan","clave":"1234","nombre":"Juan Pérez"}]
  let usuarios = [];
  try {
    usuarios = JSON.parse(process.env.USUARIOS || '[]');
  } catch(e) {
    return res.status(500).json({ ok: false, error: 'Config error' });
  }

  const match = usuarios.find(u => u.usuario === usuario && u.clave === clave);
  
  if (match) {
    return res.status(200).json({ ok: true, nombre: match.nombre });
  } else {
    return res.status(401).json({ ok: false, error: 'Credenciales incorrectas' });
  }
}
