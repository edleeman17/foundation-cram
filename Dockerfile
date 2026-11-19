FROM nginx:1.31.6-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
# A fresh named volume copies this ownership, so the nginx worker can save progress.
RUN mkdir -p /data/.tmp && chown -R nginx:nginx /data
VOLUME /data
EXPOSE 80
