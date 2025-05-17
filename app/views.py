import json
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task
from django.http import  JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
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

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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
    usuario = User.objects.filter(username = username).first()
    if username =="":
        return JsonResponse({
            'mensaje':"vacio"
        }) 
    elif usuario is not None:
        return JsonResponse({
            'mensaje':"no valido"
        }) 
    else:
        return JsonResponse({
            "mensaje":"valido"
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
@csrf_exempt
def CrearUsuario(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    data = json.loads(request.body)  # Decodifica el JSON
    username = data.get('username')
    password = data.get('password')
    
    user = User.objects.create_user(
    username= username,
    password= password
    )
    return JsonResponse({
        "mensaje":"hecho",
        "user":{
            "id": user.id,
            "username": user.username
        }
    }, status=201)
    
@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"csrfToken": "Obtenido automáticamente"})