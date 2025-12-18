from django.contrib.auth import get_user_model
from rest_framework import serializers
import re

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        error_messages={
            "invalid": "Solo letras, números o guión bajo.",
            "blank": "El usuario es obligatorio.",
        }
    )
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def validate_username(self, value):
        value = value.lower()
        
        if " " in value:
            raise serializers.ValidationError("El usuario no puede contener espacios.")

        if len(value) < 8:
            raise serializers.ValidationError(
                "El usuario debe tener al menos 8 caracteres."
            )

        if not re.match(r"^[a-z0-9_]+$", value):
            raise serializers.ValidationError("Solo letras, números o guión bajo.")

        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
