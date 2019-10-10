FROM node:12

# set the working directory in the container
WORKDIR /app

# COPY the package json and package json lock files
COPY package*.json ./

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# perform npm install
RUN npm install

# copy all files to the work directory
COPY . .

# собираем приложение для production с минификацией
RUN npm run build

EXPOSE 8080

CMD npm run start