import express from 'express';
import blocRoute from './route/blocRoute';
import compteRoute from './route/compteRoute';
import etudiantRoute from './route/etudiantRoute';
import chambreRoute from './route/chambreRoute';
import locateurRoute from './route/locateurRoute';
import inscriptionRoute from './route/inscriptionRoute';
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use('/bloc', blocRoute);

app.use('/compte', compteRoute);
app.use('/etudiant', etudiantRoute);
app.use('/chambre', chambreRoute);
app.use('/locateur', locateurRoute);
app.use('/inscription', inscriptionRoute);

app.get('/', (req, res) => res.send('HELLO'));
app.listen(PORT, console.log('SERVER RUNNING'));
