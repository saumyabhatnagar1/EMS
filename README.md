# EMS

## Requirements for API to run

1. Install Python 3 and above

2. Django 2 and above ( pip install django-admin )
	check command(windows) django-admin --version it should be 2 and above

3. pip install dnspython 

4. Install Git

5. Install MongoDB

6. Install Postman to test apis




## To run the api

run mongod ( mongodb server )

Navigate to Project

    pip install -r requirements.txt
    
    python manage.py makemigrations
    
    python manage.py migrate
    
    python manage.py runserver

##Load Initial Data
```
run mongodb server

python manage.py loaddata db/init_users.json --app api.Employee
```

Navigate to browser

	hit : http://localhost:8000/api
then you should be seeing "Hello World"



## Requirements to run UI

1. Install Node version 12 and above

2. Install angular latest ( `npm install --save -g @angular/cli `)

3. Install required node_modules ( `npm install` )


##To run UI

`ng serve --open`
 
 ( which will open a angular server in http://localhost:4200 )

