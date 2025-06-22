const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Endpoint de teste
app.get('/', (req, res) => {
  res.send('MotoGo Backend API rodando 🚀');
});

// Endpoint de solicitação de corrida
app.post('/rides', (req, res) => {
  const { origin, destination, rideType, paymentMethod } = req.body;

  console.log('Recebido nova solicitação de corrida:', req.body);

  // Aqui podemos futuramente validar ou consultar banco de dados

  setTimeout(() => {
    res.json({
      success: true,
      driverFound: true,
      estimatedArrival: '4 minutos',
      driver: {
        name: 'João Silva',
        moto: 'Honda CG 160',
        placa: 'ABC-1234'
      }
    });
  }, 1500); // Simulação de tempo de busca por motorista
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando na porta ${PORT}`);
});
