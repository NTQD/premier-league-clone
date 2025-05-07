# Premier League Clone

Dự án này là bản clone của trang web Premier League (https://www.premierleague.com/) sử dụng React, TypeScript, Material UI và Tailwind CSS.

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd premier-league-clone
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng ở chế độ development:
```bash
npm run dev
```

4. Build ứng dụng cho production:
```bash
npm run build
```

## Cấu trúc dự án

```
src/
  ├── assets/        # Hình ảnh và tài nguyên tĩnh
  ├── components/    # UI Components
  │   ├── layout/    # Layout components (Header, Footer, etc.)
  │   ├── common/    # Shared components
  │   ├── home/      # Home page components
  │   ├── fixtures/  # Fixtures components
  │   └── table/     # Table components
  ├── context/       # React Context API
  ├── hooks/         # Custom hooks
  ├── pages/         # Main pages
  ├── services/      # API services
  ├── theme/         # MUI theme configs
  ├── types/         # TypeScript types/interfaces
  ├── utils/         # Utility functions
  ├── App.tsx        # Main App component
  └── main.tsx       # Entry point
```

## Công nghệ sử dụng

- React (v19.0.0)
- TypeScript
- Material UI - Thư viện UI components
- Tailwind CSS - Utility-first CSS framework
- React Router - Routing
- React Query - Quản lý state server
- Axios - HTTP client

## Tính năng

- Responsive design
- Navigation đa cấp
- Hiển thị kết quả trận đấu
- Bảng xếp hạng giải đấu
- Tin tức và highlight
- Thông tin câu lạc bộ và cầu thủ

## Hướng dẫn phát triển thêm

1. Bổ sung API và backend integration
2. Thêm tính năng Fantasy Premier League
3. Thêm trang chi tiết cho Club và Player
4. Tích hợp video player
5. Cải thiện animation và hiệu ứng chuyển trang

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
