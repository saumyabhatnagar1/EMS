#from importlib import import_module
#from django.conf import settings
#SessionStore = import_module(settings.SESSION_ENGINE).SessionStore

from django.contrib.sessions.backends.db import SessionStore
principle = SessionStore()
principle['username'] = None  # None means no user logged in
principle['role'] = None #None means no user logged in


def setUsername(email):
    principle['username'] = email

def getUsername():
    return principle['username']

def setRole(_role):
    principle['role'] = _role

def getRole():
    return principle['role']

def isLoggedIn():
    return principle['username'] != None

def removeCurrentUser():
    principle['username'] = None
    principle['role'] = None

def getUser():
    return {'username':principle['username'],'role':principle['role']}