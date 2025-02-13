# Chuck Norris Jokes App

A modern React application that displays Chuck Norris jokes with features like categories, search, and sharing capabilities.

## Deploy
The project is deployed to AWS Amplify and can be accessed at the following URL:
```
https://main.dl9walq0mych2.amplifyapp.com/
```

## 🚀 Features

- Random joke generation
- Category-based filtering
- Search functionality
- Share jokes via Web Share API (with clipboard fallback)
- Favorite jokes management with local storage
- Responsive design
- Loading states and error handling
- Accessibility support

## 🛠️ Tech Stack

- **React** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Tanstack Query** - Data Fetching
- **Vitest** - Testing
- **MSW** - API Mocking
- **ESLint** - Code Quality
- **Prettier** - Code Formatting

## 🗂️ Project Structure

```
src/
├── api/          # API integration
├── components/   # UI components
├── hooks/        # Custom hooks
├── mocks/        # MSW handlers
├── types/        # TypeScript types
├── __tests__/    # Test files
└── styles/       # Global styles
```

## 🚦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Startamus/nuvem_frontend_test
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.chucknorris.io/jokes
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chuck Norris API](https://api.chucknorris.io/) for providing the jokes
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Tanstack Query](https://tanstack.com/query/latest) for data fetching
