
// AQUI VA COMO SE CONFIGURA EL ARCHIVO DEFAULT DE nginx

server {
    //...

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ...
}

server {
    listen 80;

    location / {
        proxy_pass http://localhost:6557;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


server {
    listen 80;
    server_name tu_dominio_o_direccion_ip;

    root /ruta_completa_a_la_carpeta_build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 80;
    server_name tu_dominio_o_direccion_ip;

    root /ruta_completa_a_la_carpeta_build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    error_page 404 /404.html;
    location = /404.html {
        root /ruta_completa_a_la_carpeta_build;
    }
}
