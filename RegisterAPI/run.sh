pip install -r requirements.txt
python3 manage.py makemigrations RegisterApp
python3 manage.py migrate RegisterApp
python3 manage.py migrate
python3 manage.py runserver