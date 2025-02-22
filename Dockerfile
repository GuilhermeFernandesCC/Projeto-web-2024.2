FROM postgres:latest

# Can be overwrite by ENV
ENV POSTGRES_USER=usuario1
ENV POSTGRES_PASSWORD=senha1
ENV POSTGRES_DB=lunarmaps_db
# Port
EXPOSE 5432

CMD [ "postgres" ]