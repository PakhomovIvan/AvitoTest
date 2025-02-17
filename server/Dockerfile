# Используем Node.js как базовый образ
FROM node:alpine

# Устанавливаем рабочий каталог внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json (или yarn.lock)
COPY server/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы бэкенда
COPY server/ .

# Указываем, какой порт будет использоваться (порт, на котором слушает ваш сервер)
EXPOSE 3000

# Команда для запуска приложения (запуск node app.js)
CMD ["node", "app.js"]