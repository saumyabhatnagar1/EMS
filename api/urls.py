from django.urls import path

from api.controllers import accountController, timesheetsController, leavesController, projectController, \
    principleController, permissionController, notificationController
from . import views

urlpatterns = [
    path('accounts/createAccount/',
         accountController.createAccount, name='create Account'),#used
    path('accounts/getAccount/', views.getAccount, name='getAccount Account'),
    path('accounts/getAllAccounts/',
         accountController.getAllAccounts, name='get All accounts'),#used

    path('principle/', principleController.index, name='principle'),
    path('account/profile', accountController.getUserProfile, name='profile'),
    path('accounts/', accountController.getAllAccounts, name='get all accounts'),
    path('account/updateProfile',
         accountController.updateUserProfile, name='update Profile'),#problem
    path('account/countEmployeeByGender', accountController.countEmployeeByGender, name='count employee by gender'),

    path('timesheets/add/', timesheetsController.add, name='add time sheet'),
    path('timesheets/find/', timesheetsController.find, name='find time sheet'),
    path('timesheets/update/', timesheetsController.update,
         name='admin update time sheet'),
    path('timesheets/getByEmpId', timesheetsController.getByEmpId,
         name='find all time sheets'),
    path('timesheets/getByDate', timesheetsController.getByDate, name='get by date'),
    path('timesheets/getByMonth', timesheetsController.getByMonth, name='get by month'),
    path('timesheets/getByYear', timesheetsController.getByYear, name='get by year'),

    path('leaves/new', leavesController.addLeave, name='leave request'),
    path('leaves/findByUsername',
         leavesController.getLeavesData, name='leave detail'),
    path('leaves/updateStatus', leavesController.updateLeaveStatus,
         name='leave status update'),
    path('leavetype/add', leavesController.addLeaveType, name='add leave type'),
    path('leavetype/find', leavesController.getLeaveType, name='get leave types'),
    path('leavetype/update', leavesController.updateLeaveType, name='get leave type'),
    path('leavetype/delete', leavesController.deleteLeaveType,
         name='delete leave type'),
    path('leaves/fetchAll', leavesController.findAllLeaves,
         name='all leaves detail'),#problem
    path('leavetype/findById', leavesController.getLeaveTypeById,
         name='leave type by id'),

    path('project/new', projectController.addProject, name='add project'),
    path('project/getAll', projectController.getProjects, name='get project'),
    path('project/getByID', projectController.getProjectsByID,
         name='get project by ID'),
    path('project/getByAssignTo', projectController.getProjectsByAssignTo,
         name='get project by assignTo'),
    path('tasks/new', projectController.addTask, name='add task'),
    path('tasks/getByProjectID', projectController.getTaskByProjectID,
         name='get tasks by project_id'),
    path('tasks/getByAssignTo', projectController.getTaskByAssignTo,
         name='get tasks by assignTo'),
    path('tasks/update', projectController.updateTaskStatus,
         name='update task status'),
    path('task/addComment', projectController.addComment, name='add comment'),
    path('task/getAllComments', projectController.getAllComments, name='get all comments'),
    path('project/addTeamMember',
         projectController.addTeamMember, name='add team member'),
    path('project/getTeam', projectController.getTeamDetail, name='get team detail'),#to be used
    path('project/getFreeEmployee', projectController.getFreeEmployee, name='get free employees'),
    path('project/updateProjectStatus', projectController.updateProjectStatus, name='update working status'),#to be used
    path('project/getNumberOfProjects', projectController.getNumbersOfProjects, name='get numbers of projects'),# to be used

    path('permission/add', permissionController.addPermission, name='add permission'),
    path('permission/get', permissionController.getPermissionDetail,
         name='get permission details'),

    path('addNotice/', notificationController.addNotification,
         name='add notification'),
    path('getAllNotices/', notificationController.getAllNotifications,
         name='find all notification'),
    path('getNoticesByType/', notificationController.getNotificationsByType, name= 'get notifications by type'),
    path('notifications/find', notificationController.findNotificationsById,
         name='find notifications by id'),
]
