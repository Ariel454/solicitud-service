const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { sendSOAPRequest } = require('../services/soapClient');

// Middleware de autenticación
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'mi_clave_privada'); // cambia a clave real
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'No autorizado' });
  }
}

// POST /solicitudes
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const result = await sendSOAPRequest(req.body);
    res.json({ estado: result || 'en revisión' });
  } catch (error) {
    res.status(500).json({ message: 'Error procesando solicitud' });
  }
});

// GET /solicitudes/{id} — Simulado
router.get('/:id', authenticateJWT, (req, res) => {
  res.json({ id: req.params.id, estado: 'procesado' });
});

module.exports = router;
