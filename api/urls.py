from django.urls import path

from api.controllers import accountController, timesheetsController, leavesController, projectController, \
    principleController

urlpatterns = [
    path('', accountController.index, name='index'),
    path('principle/', principleController.index, name='principle'),
    path('login/', accountController.login, name='login'),
    path('createUser/', accountController.createUser, name='create User'),
    path('account/profile', accountController.getUserProfile, name='profile'),
    path('logout/', accountController.logout, name='Logout'),
    path('account/updateProfile', accountController.updateUserProfile, name='update Profile'),

    path('timesheets/', timesheetsController.index, name='time sheets'),
    path('timesheets/add', timesheetsController.add, name='add time sheet'),
    path('timesheets/find', timesheetsController.find, name='find time sheet'),
    path('timesheets/admin/update', timesheetsController.update, name='admin update time sheet'),

    path('leaves/new', leavesController.addLeave, name='leave request'),
    path('leaves/findAll', leavesController.getLeavesData, name='leave detail'),
    path('leaves/updateStatus', leavesController.updateLeaveStatus, name='leave status update'),

    path('project/new', projectController.addProject, name='add project'),
    path('project/findAll', projectController.getProjects, name='get project'),
    path('task/new', projectController.addTask, name='add task'),
    path('task/find', projectController.getTasks, name='get task'),
    path('project/addTeam',projectController.addTeamMember, name='add team member'),
    path('project/team', projectController.getTeamDetail, name='get team detail'),
]
