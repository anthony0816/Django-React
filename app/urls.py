from django.urls import path, include
from rest_framework import routers
from app import views
from rest_framework.documentation import include_docs_urls 
from rest_framework_simplejwt.views import  TokenRefreshView
from .views import MyTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView,'tasks')


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks API')),
    path('user/', views.AutenticarUsuario, name='user'),
    path('verificar-user/', views.VerificarUsuario, name='verificar-user'),
    path('test/', views.test, name='test'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create-user/', views.CrearUsuario, name="crearUsuario"),
    path('csrf-token/', views.csrf_token_view),
]