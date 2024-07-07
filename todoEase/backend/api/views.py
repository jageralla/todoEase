from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializer import TodoSerializer, CustomUserSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny


class TodoListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        todos = Todo.objects.filter(author=request.user).order_by('id')
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TodoUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        todo = Todo.objects.get(author=request.user, pk=pk)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TodoUpdateCompletionView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            todo = Todo.objects.get(author=request.user, pk=pk)
        except Todo.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TodoDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        Todo.objects.filter(author=request.user, pk=pk).delete()
        return Response({"status": "deleted"},status=status.HTTP_204_NO_CONTENT)
    


class CreateUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
class PasswordResetView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password reset link has been sent to your email.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServerStatusView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({"server status": "online"})