from django.urls import path

from api.controllers import accountController, timesheetsController, leavesController, projectController, \
    principleController, permissionController, notificationController

urlpatterns = [
    path('', accountController.index, name='index'),
    path('principle/', principleController.index, name='principle'),
    path('login/', accountController.login, name='login'),
    path('createUser/', accountController.createUser, name='create User'),
    path('account/profile', accountController.getUserProfile, name='profile'),
    path('logout/', accountController.logout, name='Logout'),
    path('accounts/', accountController.getAllAccounts, name='get all accounts'),
    path('account/updateProfile', accountController.updateUserProfile, name='update Profile'),
    

    path('timesheets/', timesheetsController.index, name='time sheets'),
    path('timesheets/add', timesheetsController.add, name='add time sheet'),
    path('timesheets/find', timesheetsController.find, name='find time sheet'),
    path('timesheets/admin/update', timesheetsController.update, name='admin update time sheet'),
    path('timesheets/findAll', timesheetsController.findAll, name='find all time sheets'),

    path('leaves/new', leavesController.addLeave, name='leave request'),
    path('leaves/findByUsername', leavesController.getLeavesData, name='leave detail'),
    path('leaves/updateStatus', leavesController.updateLeaveStatus, name='leave status update'),
    path('leavetype/add', leavesController.addLeaveType, name='add leave type'),
    path('leavetype/find', leavesController.getLeaveType, name='get leave types'),
    path('leavetype/update', leavesController.updateLeaveType, name='get leave type'),
    path('leavetype/delete', leavesController.deleteLeaveType, name='delete leave type'),
    path('leaves/fetchAll', leavesController.findAllLeaves, name='all leaves detail'),
    path('leavetype/findById', leavesController.getLeaveTypeById, name='leave type by id'),


    path('project/new', projectController.addProject, name='add project'),
    path('project/getAll', projectController.getProjects, name='get project'),
    path('project/getByID', projectController.getProjectsByID, name='get project by ID'),
    path('project/getByAssignTo', projectController.getProjectsByAssignTo, name='get project by assignTo'),
    path('tasks/new', projectController.addTask, name='add task'),
    path('tasks/getByProjectID', projectController.getTaskByProjectID, name='get tasks by project_id'),
    path('tasks/getByAssignTo', projectController.getTaskByAssignTo, name='get tasks by assignTo'),
    path('tasks/update', projectController.updateTaskStatus, name='update task status'),
    path('project/addTeamMember', projectController.addTeamMember, name='add team member'),
    path('project/getTeam', projectController.getTeamDetail, name='get team detail'),

    path('permission/add', permissionController.addPermission, name='add permission'),
    path('permission/get', permissionController.getPermissionDetail, name='get permission details'),

    path('notifications/add', notificationController.addNotification, name='add notification'),
    path('notifications/findAll', notificationController.findAllNotifications, name='find all notification'),
    path('notifications/find', notificationController.findNotificationsById, name='find notifications by id'),
]
