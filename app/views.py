import json
from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task
from django.http import  JsonResponse
from django.contrib.auth import authenticate, login,logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Task.objects.all()
        user_id = self.request.query_params.get('user_id')
        
        if user_id:
            try:
                queryset = queryset.filter(user_id=int(user_id))  # 👈 ¡Cambio clave aquí!
            except (ValueError, TypeError):
                pass
        
        return queryset

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

