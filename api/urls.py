from django.urls import path

from api.controller import accountController
from . import views

urlpatterns = [
    path('', accountController.index, name='index'),
    path('login/', accountController.login, name='login'),
    path('createUser/', accountController.createUser, name='create User'),
    path('logout/', accountController.logout, name='Logout')
]
