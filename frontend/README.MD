# 🚀 MotoGo — Aplicativo de Moto-Táxi Premium

> Aplicativo móvel para gerenciamento e solicitação de corridas de moto-táxi com condutores selecionados e treinados pela empresa.  
> Modernizando o transporte urbano em Oriximiná com segurança, qualidade e eficiência.

---

## 📱 Tecnologias Utilizadas

- ⚛️ **React Native (Expo)**
- 🌐 **Expo Router**
- 🖼 **Lucide Icons + Expo Vector Icons**
- 🌍 **Google Maps API (geolocalização)**
- 🔐 **JWT (JSON Web Token) para autenticação (backend)**

---

## 📦 Estrutura do Projeto

```
/frontend
  ├── .bolt/
  ├── .expo/
  ├── app/
  │   ├── (tabs)/
  │   │   ├── _layout.tsx
  ├── assets/images/
  │   ├── favicon.png
  │   └── icon.png
  ├── hooks/
  │   └── useFrameworkReady.ts
  ├── node_modules/
  ├── .gitignore
  ├── .npmrc
  ├── .prettierrc
  ├── app.json
  ├── expo-env.d.ts
  ├── package-lock.json
  ├── package.json
  └── tsconfig.json
```

---

## 🛠️ Pré-requisitos

- Node.js (v18 ou superior)
- Expo CLI instalado globalmente:
  ```bash
  npm install -g expo-cli
  ```

---

## ⚙️ Instalação e Uso

Clone o projeto:

```bash
git clone https://github.com/seu-usuario/moto-go.git
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto no modo desenvolvimento:

```bash
npm run dev
```

---

## 📲 Execução no Expo (Modo Interativo)

Após rodar `npm run dev`, o Expo Metro Bundler abrirá automaticamente no terminal com as seguintes opções:

```
Metro waiting on exp://SEU-IP:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
› Web is waiting on http://localhost:8081

› Using Expo Go
› Press s │ switch to development build
› Press a │ open Android emulator
› Press w │ open web (PWA)
› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

Logs for your project will appear below. Press Ctrl+C to exit.
```

✅ **Modo rápido de testar:**

- No Android: Abra o app Expo Go, escaneie o QR Code.
- No iOS: Use a câmera do iPhone para escanear o QR Code.
- No Web: Abra o app Expo Go, abra o navegador e acesse a URL `http://localhost:8081`.

---

## 🔧 Dependências Principais

- `expo` `^53.0.0`
- `expo-router` `~5.0.2`
- `@react-navigation/native`
- `@expo/vector-icons`
- `lucide-react-native`
- `react-native-reanimated`
- `react-native-gesture-handler`

---

## 🧑‍💻 Contribuição

1. Faça um fork do repositório.
2. Crie uma branch nova com sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'feat: descrição da sua alteração'
   ```
4. Push para a branch:
   ```bash
   git push origin feature/nome-da-feature
   ```
5. Abra um Pull Request.

---

## 👨‍💼 Autor

> Desenvolvido por **Victo Hugo**  
> Projeto MotoGo 🚖

---
