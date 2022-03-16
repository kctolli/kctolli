import firebase_admin
from firebase_admin import credentials

#cred = credentials.Certificate("firebase-adminsdk.json")
#firebase_admin.initialize_app(cred)

cred_obj = firebase_admin.credentials.Certificate('firebase-adminsdk.json')
app = firebase_admin.initialize_app(cred_obj, {'databaseURL':"https://kctolli-github-default-rtdb.firebaseio.com"})

default_app = firebase_admin.initialize_app()

ref = app.reference("/")
print(ref.order_by_child("Summary").get())
