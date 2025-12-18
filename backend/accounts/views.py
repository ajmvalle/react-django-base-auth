import json


from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from .serializers import RegisterSerializer
from django.contrib.auth import authenticate, login, logout, get_user_model

User = get_user_model()


def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    data = json.loads(request.body)
    user = authenticate(
        request, username=data.get("username"), password=data.get("password")
    )

    if user is None:
        return JsonResponse({"error": "Credenciales inválidas"}, status=401)

    login(request, user)
    return JsonResponse(
        {
            "message": "Login correcto",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        }
    )


def register_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    data = json.loads(request.body)

    serializer = RegisterSerializer(data=data)

    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)

    user = serializer.save()

    login(request, user)

    return JsonResponse(
        {
            "message": "Usuario creado",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        },
        status=201,
    )

def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Sesión cerrada"})


@login_required
def dashboard_view(request):
    return JsonResponse(
        {"message": "Bienvenido al dashboard", "user": request.user.username}
    )


def me_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "No autenticado"}, status=401)

    user = request.user
    return JsonResponse(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
    )


@ensure_csrf_cookie
def csrf_view(request):
    return JsonResponse({"message": "CSRF cookie set"})
