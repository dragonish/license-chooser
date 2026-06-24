FROM giterhub/darkhttpd:latest

LABEL maintainer="dragonish"

COPY dist/spa /www/

EXPOSE 80

ENTRYPOINT [ "/darkhttpd" ]
CMD [ "/www" ]
