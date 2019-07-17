FROM postgres:latest
ADD ./initdb/initdb.sql /docker-entrypoint-initdb.d/
ENTRYPOINT [ "docker-entrypoint.sh" ]
EXPOSE 5432
CMD [ "postgres" ]