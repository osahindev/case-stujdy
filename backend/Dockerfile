FROM python:3

WORKDIR /code/backend

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["flask", "--app", "flaskapp", "run", "--host=0.0.0.0", "--debug"]