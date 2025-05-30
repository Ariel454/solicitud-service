const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const solicitudesRoutes = require('./routes/solicitudes');

const app = express();
app.use(bodyParser.json());

app.use('/solicitudes', solicitudesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SolicitudService running on port ${PORT}`));
