from django.urls import path

from api.controllers import accountController, timesheetsController, leavesController, projectController

urlpatterns = [
    path('', accountController.index, name='index'),
    path('login/', accountController.login, name='login'),
    path('createUser/', accountController.createUser, name='create User'),
    path('account/profile', accountController.getUserProfile, name='profile'),
    path('logout/', accountController.logout, name='Logout'),

    path('timesheets/', timesheetsController.index, name='time sheets'),
    path('timesheets/add', timesheetsController.add, name='add time sheet'),
    path('timesheets/find', timesheetsController.find, name='find time sheet'),
    path('timesheets/admin/update', timesheetsController.update, name='admin update time sheet'),

    path('leaves/new', leavesController.addLeave, name='leave request'),
    path('leaves/findAll', leavesController.getLeavesData, name='leave detail'),

    path('project/new', projectController.addProject, name='add project'),
    path('project/findAll', projectController.getProject, name='get project')
]
