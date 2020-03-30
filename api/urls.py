from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/',views.login,name = 'login'),
    path('createUser/',views.createUser,name='create User'),
    path('logout/',views.logout,name='Logout')
]