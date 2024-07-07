
from .models import Todo, CustomUser
from rest_framework import serializers
from django.conf import settings
import uuid
from django.core.mail import send_mail


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "name", "email", "password" ]
        extra_kwargs = {"password":{"write_only": True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = CustomUser.objects.create(**validated_data)
        if password is not None:
            user.set_password(password)
            user.save()
        return user

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", "task", "created_at", "is_completed", "author"]
        extra_kwargs = {"author":{"read_only": True}}

class TodoCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['is_completed']
        

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value

    def save(self):
        email = self.validated_data['email']
        user = CustomUser.objects.get(email=email)
        user.password_reset_token = uuid.uuid4()
        user.save()
        reset_link = f"{settings.FRONTEND_URL}/password-reset-confirm/{user.password_reset_token}/"
        send_mail(
            'Password Reset',
            f'Click the link to reset your password: {reset_link}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        
class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    new_password = serializers.CharField(write_only=True)

    def validate_token(self, value):
        if not CustomUser.objects.filter(password_reset_token=value).exists():
            raise serializers.ValidationError("Invalid or expired token.")
        return value

    def save(self):
        token = self.validated_data['token']
        new_password = self.validated_data['new_password']
        user = CustomUser.objects.get(password_reset_token=token)
        user.set_password(new_password)
        user.password_reset_token = None
        user.save()