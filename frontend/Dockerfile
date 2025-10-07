FROM node:20-alpine

WORKDIR /app

# 의존성 설치
COPY package*.json ./

# 소스 복사
COPY . .

RUN npm install

# 빌드
RUN npm run build

EXPOSE 3000

# 실행
CMD ["npm", "start"]
