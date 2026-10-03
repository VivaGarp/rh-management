from django.urls import path
from .views import (
    EmpleadolistCreateAPIView,
    EmpleadoRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path('api/empleados', EmpleadolistCreateAPIView.as_view(), name='empleado-list-create'),
    path('api/empleados/<int:pk>', EmpleadoRetrieveUpdateDestroyAPIView.as_view(), name='empleado-detail'),
]