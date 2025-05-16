import json
from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task
from django.http import  JsonResponse
from django.contrib.auth import authenticate, login,logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import AnonymousUser


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


def VerificarUsuario(request):
    if isinstance(request.user, AnonymousUser):
        print("ejecutando")
        return JsonResponse({
            "mensaje":"false"
        })
    else:
        return JsonResponse({
            "mensaje":"true"
        })

@csrf_exempt
def AutenticarUsuario(request):
    data = json.loads(request.body)  # Decodifica el JSON
    
    
    username = data.get('username')  
    password = data.get('password')
    user = authenticate(username = username, password = password)
    if user is not None:
        login(request,user)
        if user.is_authenticated:
            return JsonResponse({
            'mensaje':"Succesfull",
            'user': {
                    'id': user.id,
                    'username': user.username,
                }
        })
        
    else:
        return JsonResponse({
            "mensaje":"Las Credenciales son incorrectas"
        })
        
def test(request):
    
    if isinstance(request.user,AnonymousUser):
        return JsonResponse({
            "mensaje": "El Usuario es instancia de Anonymous"
        })
    else: 
        user = request.user
        return JsonResponse({
            "mensaje": "Si esta autenticado y este es el usuario: ",
            "user": user
        })

